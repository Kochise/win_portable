#!/usr/bin/env python
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
This script deforms an object (the pattern) along other paths (skeletons)...
The first selected object is the pattern
the last selected ones are the skeletons.

Imagine a straight horizontal line L in the middle of the bounding box of the pattern.
Consider the normal bundle of L: the collection of all the vertical lines meeting L.
Consider this as the initial state of the plane; in particular, think of the pattern
as painted on these lines.

Now move and bend L to make it fit a skeleton, and see what happens to the normals:
they move and rotate, deforming the pattern.
"""
import copy
import math 

import inkex
from inkex.bezier import tpoint
from inkex.paths import CubicSuperPath

import pathmodifier


class PathAlongPath(pathmodifier.PathModifier):
    """Deform a path along a second path"""
    def add_arguments(self, pars):
        pars.add_argument("-n", "--noffset", type=float, default=0.0, help="normal offset")
        pars.add_argument("-t", "--toffset", type=float, default=0.0, help="tangential offset")
        pars.add_argument("-k", "--kind", type=str, default='')
        pars.add_argument("-c", "--copymode", default="Single",
                          help="repeat the path to fit deformer's length")
        pars.add_argument("-p", "--space", type=float, default=0.0)
        pars.add_argument("-v", "--vertical", type=inkex.Boolean, default=False,
                          help="reference path is vertical")
        pars.add_argument("-d", "--duplicate", type=inkex.Boolean, default=True,
                          help="duplicate pattern before deformation")
        pars.add_argument("--tab", help="The selected UI-tab when OK was pressed")


    def apply_diffeomorphism(self, bpt, skelcomp, lengths, isclosed, vects=()):
        """
        The kernel of this stuff:
        bpt is a base point and for v in vectors, v'=v-p is a tangent vector at bpt.
        """
        s = bpt[0] - skelcomp[0][0]
        i, t = self.lengthtotime(s, lengths, isclosed)
        if i == len(skelcomp) - 1:
            x, y = tpoint(skelcomp[i - 1], skelcomp[i], 1 + t)
            dx = (skelcomp[i][0] - skelcomp[i - 1][0]) / lengths[-1]
            dy = (skelcomp[i][1] - skelcomp[i - 1][1]) / lengths[-1]
        else:
            x, y = tpoint(skelcomp[i], skelcomp[i + 1], t)
            dx = (skelcomp[i + 1][0] - skelcomp[i][0]) / lengths[i]
            dy = (skelcomp[i + 1][1] - skelcomp[i][1]) / lengths[i]

        vx = 0
        vy = bpt[1] - skelcomp[0][1]
        if self.options.wave:
            bpt[0] = x + vx * dx
            bpt[1] = y + vy + vx * dy
        else:
            bpt[0] = x + vx * dx - vy * dy
            bpt[1] = y + vx * dy + vy * dx

        for v in vects:
            vx = v[0] - skelcomp[0][0] - s
            vy = v[1] - skelcomp[0][1]
            if self.options.wave:
                v[0] = x + vx * dx
                v[1] = y + vy + vx * dy
            else:
                v[0] = x + vx * dx - vy * dy
                v[1] = y + vx * dy + vy * dx

    def effect(self):
        if len(self.options.ids) < 2:
            raise inkex.AbortExtension("This extension requires two selected paths.")

        self.options.wave = (self.options.kind == "Ribbon")
        if self.options.copymode == "Single":
            self.options.repeat = False
            self.options.stretch = False
        elif self.options.copymode == "Repeated":
            self.options.repeat = True
            self.options.stretch = False
        elif self.options.copymode == "Single, stretched":
            self.options.repeat = False
            self.options.stretch = True
        elif self.options.copymode == "Repeated, stretched":
            self.options.repeat = True
            self.options.stretch = True

        patterns, skels = self.get_patterns_and_skeletons(True, self.options.duplicate)
        bboxes = [pattern.bounding_box() for pattern in patterns.values()]
        if None in bboxes: # for texts, we can't compute the bounding box
            raise inkex.AbortExtension("Please convert texts to path first")
        bbox = sum(bboxes, None)

        if self.options.vertical:
            # flipxy(bbox)...
            bbox = inkex.BoundingBox(-bbox.y, -bbox.x)

        width = bbox.width
        delta_x = width + self.options.space
        if delta_x < 0.01:
            raise inkex.AbortExtension("The total length of the pattern is too small\n"\
                "Please choose a larger object or set 'Space between copies' > 0")
        for pattern in patterns.values():
            if isinstance(pattern, inkex.PathElement):
                pattern.apply_transform()
                pattern.path = self._do_transform(skels, pattern.path.to_superpath(), delta_x, bbox)

    def _do_transform(self, skeletons, p0, dx, bbox):
        if self.options.vertical:
            self.flipxy(p0)
        newp = []
        for skelnode in skeletons.values():
            skelnode.apply_transform()
            cur_skeleton = skelnode.path.to_superpath()
            if self.options.vertical:
                self.flipxy(cur_skeleton)
            for comp in cur_skeleton:
                path = copy.deepcopy(p0)
                skelcomp, lengths = self.linearize(comp)
                
                skel_closed = all([math.isclose(i, j) for i, j in zip(skelcomp[0], skelcomp[-1])])
                
                length = sum(lengths)
                xoffset = skelcomp[0][0] - bbox.x.minimum + self.options.toffset
                yoffset = skelcomp[0][1] - bbox.y.center - self.options.noffset
                if self.options.repeat:
                    nb_copies = max(1, int(round((length + self.options.space) / dx)))
                    width = dx * nb_copies
                    if not skel_closed:
                        width -= self.options.space
                    bbox.x.maximum = bbox.x.minimum + width
                    new = []
                    for sub in path:
                        for _ in range(nb_copies):
                            new.append(copy.deepcopy(sub))
                            self.offset(sub, dx, 0)
                    path = new

                for sub in path:
                    self.offset(sub, xoffset, yoffset)

                if self.options.stretch:
                    if not bbox.width:
                        raise inkex.AbortExtension("The 'stretch' option requires that the pattern must have non-zero width :\nPlease edit the pattern width.")
                    for sub in path:
                        self.stretch(sub, length / bbox.width, 1, skelcomp[0])

                for sub in path:
                    for ctlpt in sub:
                        self.apply_diffeomorphism(ctlpt[1], skelcomp, lengths, skel_closed, (ctlpt[0], ctlpt[2]))

                if self.options.vertical:
                    self.flipxy(path)
                newp += path
        return CubicSuperPath(newp)


if __name__ == '__main__':
    PathAlongPath().run()
