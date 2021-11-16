#!/usr/bin/env python
# coding=utf-8
#
# Copyright (C) 2006 Jean-Francois Barraud, barraud@math.univ-lille1.fr
#               2021 Jonathan Neuhauser, jonathan.neuhauser@outlook.com
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
# barraud@math.univ-lille1.fr
#
"""
This code defines a basic class (PathModifier) of effects whose purpose is
to somehow deform given objects: one common tasks for all such effect is to
convert shapes, groups, clones to paths. The class has several functions to
make this (more or less!) easy.
As an example, a second class (Diffeo) is derived from it,
to implement deformations of the form X=f(x,y), Y=g(x,y)...
"""

import inkex
from inkex import PathElement, Group, Use
from inkex.bezier import pointdistance, beziersplitatt

# This deprecated API is used by some external extensions.
from inkex.deprecated import zSort # pylint: disable=unused-import

class PathModifier(inkex.EffectExtension):
    """Select list manipulation"""
    def expand_groups(self, elements, transferTransform=True):
        for node_id, node in list(elements.items()):
            if isinstance(node, inkex.Group):
                mat = node.transform
                for child in node:
                    if transferTransform:
                        child.transform = mat * child.transform
                    elements.update(self.expand_groups({child.get('id'): child}))
                if transferTransform and node.get("transform"):
                    del node.attrib["transform"]
                # Group is now replaced, so remove it.
                elements.pop(node_id)
        return elements

    def expand_clones(self, elements, transferTransform=True, replace=True):
        for node_id, node in list(elements.items()):
            if isinstance(node, Group):
                self.expand_groups(elements, transferTransform)
                self.expand_clones(elements, transferTransform, replace)
                # Hum... not very efficient if there are many clones of groups...

            elif isinstance(node, Use):
                newnode = node.unlink()
                elements.pop(node_id)
                newid = newnode.get('id')
                elements.update(self.expand_clones({newid: newnode}, transferTransform, replace))
        return elements

    def objects_to_paths(self, elements, replace=True):
        """Replace all non-paths with path objects"""
        for node in list(elements.values()):
            elem = node.to_path_element()
            if replace:
                node.replace_with(elem)
                elem.set('id', node.get('id'))
            elements[elem.get('id')] = elem

    def effect(self):
        raise NotImplementedError("overwrite this method in subclasses")
        self.objects_to_paths(self.svg.selected, True)
        self.bbox = self.svg.selection.bounding_box()
        for node in self.svg.selection.filter(PathElement):
            path = node.path.to_superpath()
            # do what ever you want with "path"!
            node.path = path
    
    @staticmethod
    def lengthtotime(l, lengths, isclosed):
        """
        Receives an arc length l, and returns the index of the segment in skelcomp
        containing the corresponding point, to gether with the position of the point on this segment.

        If the deformer is closed, do computations modulo the toal length.
        """
        if isclosed:
            l = l % sum(lengths)
        if l <= 0:
            return 0, l / lengths[0]
        i = 0
        while (i < len(lengths)) and (lengths[i] <= l):
            l -= lengths[i]
            i += 1
        t = l / lengths[min(i, len(lengths) - 1)]
        return i, t
    
    @staticmethod
    def flipxy(path):
        """Swaps x and y coordinate of all path vertices"""
        for pathcomp in path:
            for ctl in pathcomp:
                for pt in ctl:
                    tmp = pt[0]
                    pt[0] = -pt[1]
                    pt[1] = -tmp

    @staticmethod
    def offset(pathcomp, dx, dy):
        """Shifts a subpath by (dx, dy)"""
        for ctl in pathcomp:
            for pt in ctl:
                pt[0] += dx
                pt[1] += dy
    
    @staticmethod
    def stretch(pathcomp, xscale, yscale, org):
        """Stretches a subpath by (xscale, yscale) relative to origin org"""
        for ctl in pathcomp:
            for pt in ctl:
                pt[0] = org[0] + (pt[0] - org[0]) * xscale
                pt[1] = org[1] + (pt[1] - org[1]) * yscale
    
    @staticmethod
    def linearize(p, tolerance=0.001):
        """
        This function receives a component of a 'cubicsuperpath' and returns two things:
        The path subdivided in many straight segments, and an array containing the length of each segment.

        We could work with bezier path as well, but bezier arc lengths are (re)computed for each point
        in the deformed object. For complex paths, this might take a while.
        """
        zero = 0.000001
        i = 0
        d = 0
        lengths = []
        while i < len(p) - 1:
            box = pointdistance(p[i][1], p[i][2])
            box += pointdistance(p[i][2], p[i + 1][0])
            box += pointdistance(p[i + 1][0], p[i + 1][1])
            chord = pointdistance(p[i][1], p[i + 1][1])
            if (box - chord) > tolerance:
                b1, b2 = beziersplitatt([p[i][1], p[i][2], p[i + 1][0], p[i + 1][1]], 0.5)
                p[i][2][0], p[i][2][1] = b1[1]
                p[i + 1][0][0], p[i + 1][0][1] = b2[2]
                p.insert(i + 1, [[b1[2][0], b1[2][1]], [b1[3][0], b1[3][1]], [b2[1][0], b2[1][1]]])
            else:
                d = (box + chord) / 2
                lengths.append(d)
                i += 1
        new = [p[i][1] for i in range(0, len(p) - 1) if lengths[i] > zero]
        new.append(p[-1][1])
        lengths = [l for l in lengths if l > zero]
        return new, lengths

    def get_patterns_and_skeletons(self, expand_patterns=False, duplicate=False):
        """Gets the pattern node and skeleton (with applied transforms) from selection"""
        # first selected->pattern, all but first selected-> skeletons
        skeletons = self.svg.selection.paint_order()

        elem = skeletons.pop()
        if duplicate:
            elem = elem.duplicate()
        
        if expand_patterns:
            patterns = {elem.get_id(): elem}
            self.expand_clones(patterns, True, False)
            self.objects_to_paths(patterns)
        else:
            patterns = elem

        self.expand_clones(skeletons, True, False)
        self.objects_to_paths(skeletons)
        return patterns, skeletons.id_dict()



class Diffeo(PathModifier):
    def applyDiffeo(self, bpt, vects=()):
        # bpt is a base point and for v in vectors, v'=v-p is a tangent vector at bpt.
        # Defaults to identity!
        for v in vects:
            v[0] -= bpt[0]
            v[1] -= bpt[1]

        # -- your transformations go here:
        # x,y=bpt
        # bpt[0]=f(x,y)
        # bpt[1]=g(x,y)
        # for v in vects:
        #    vx,vy=v
        #    v[0]=df/dx(x,y)*vx+df/dy(x,y)*vy
        #    v[1]=dg/dx(x,y)*vx+dg/dy(x,y)*vy
        #
        # -- !caution! y-axis is pointing downward!

        for v in vects:
            v[0] += bpt[0]
            v[1] += bpt[1]

    def effect(self):
        self.expand_clones(self.svg.selected, True)
        self.expand_groups(self.svg.selected, True)
        self.objects_to_paths(self.svg.selected, True)
        self.bbox = self.svg.selection.bounding_box()
        for node in self.svg.selection.filter(PathElement):
            path = node.path.to_superpath()
            for sub in path:
                for ctlpt in sub:
                    self.applyDiffeo(ctlpt[1], (ctlpt[0], ctlpt[2]))
            node.path = path
