#!/usr/bin/env python
# coding=utf-8
#
# Copyright (C) 2008-2009 Alvin Penner, penner@vaxxine.com
#               2009, Christian Mayer, inkscape@christianmayer.de
#               2020, MartinOwens, doctormo@geek-2.com
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
#
"""
Input a DXF file >= (AutoCAD Release 13 == AC1012)
"""

import os
import re
import sys
import math

from collections import defaultdict
from urllib.parse import quote
from lxml import etree

import inkex

COLORS = [
    'PAD',
    '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#000000', '#808080',
    '#C0C0C0', '#FF0000', '#FF7F7F', '#CC0000', '#CC6666', '#990000', '#994C4C', '#7F0000',
    '#7F3F3F', '#4C0000', '#4C2626', '#FF3F00', '#FF9F7F', '#CC3300', '#CC7F66', '#992600',
    '#995F4C', '#7F1F00', '#7F4F3F', '#4C1300', '#4C2F26', '#FF7F00', '#FFBF7F', '#CC6600',
    '#CC9966', '#994C00', '#99724C', '#7F3F00', '#7F5F3F', '#4C2600', '#4C3926', '#FFBF00',
    '#FFDF7F', '#CC9900', '#CCB266', '#997200', '#99854C', '#7F5F00', '#7F6F3F', '#4C3900',
    '#4C4226', '#FFFF00', '#FFFF7F', '#CCCC00', '#CCCC66', '#989800', '#98984C', '#7F7F00',
    '#7F7F3F', '#4C4C00', '#4C4C26', '#BFFF00', '#DFFF7F', '#99CC00', '#B2CC66', '#729800',
    '#85984C', '#5F7F00', '#6F7F3F', '#394C00', '#424C26', '#7FFF00', '#BFFF7F', '#66CC00',
    '#99CC66', '#4C9800', '#72984C', '#3F7F00', '#5F7F3F', '#264C00', '#394C26', '#3FFF00',
    '#9FFF7F', '#33CC00', '#7FCC66', '#269800', '#5F984C', '#1F7F00', '#4F7F3F', '#134C00',
    '#2F4C26', '#00FF00', '#7FFF7F', '#00CC00', '#66CC66', '#009800', '#4C984C', '#007F00',
    '#3F7F3F', '#004C00', '#264C26', '#00FF3F', '#7FFF9F', '#00CC33', '#66CC7F', '#009826',
    '#4C985F', '#007F1F', '#3F7F4F', '#004C13', '#264C2F', '#00FF7F', '#7FFFBF', '#00CC66',
    '#66CC99', '#00984C', '#4C9872', '#007F3F', '#3F7F5F', '#004C26', '#264C39', '#00FFBF',
    '#7FFFDF', '#00CC99', '#66CCB2', '#009872', '#4C9885', '#007F5F', '#3F7F6F', '#004C39',
    '#264C42', '#00FFFF', '#7FFFFF', '#00CCCC', '#66CCCC', '#009898', '#4C9898', '#007F7F',
    '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#000000', '#808080',
    '#C0C0C0', '#FF0000', '#FF7F7F', '#CC0000', '#CC6666', '#990000', '#994C4C', '#7F0000',
    '#7F3F3F', '#4C0000', '#4C2626', '#FF3F00', '#FF9F7F', '#CC3300', '#CC7F66', '#992600',
    '#995F4C', '#7F1F00', '#7F4F3F', '#4C1300', '#4C2F26', '#FF7F00', '#FFBF7F', '#CC6600',
    '#CC9966', '#994C00', '#99724C', '#7F3F00', '#7F5F3F', '#4C2600', '#4C3926', '#FFBF00',
    '#FFDF7F', '#CC9900', '#CCB266', '#997200', '#99854C', '#7F5F00', '#7F6F3F', '#4C3900',
    '#4C4226', '#FFFF00', '#FFFF7F', '#CCCC00', '#CCCC66', '#989800', '#98984C', '#7F7F00',
    '#7F7F3F', '#4C4C00', '#4C4C26', '#BFFF00', '#DFFF7F', '#99CC00', '#B2CC66', '#729800',
    '#85984C', '#5F7F00', '#6F7F3F', '#394C00', '#424C26', '#7FFF00', '#BFFF7F', '#66CC00',
    '#99CC66', '#4C9800', '#72984C', '#3F7F00', '#5F7F3F', '#264C00', '#394C26', '#3FFF00',
    '#9FFF7F', '#33CC00', '#7FCC66', '#269800', '#5F984C', '#1F7F00', '#4F7F3F', '#134C00',
    '#2F4C26', '#00FF00', '#7FFF7F', '#00CC00', '#66CC66', '#009800', '#4C984C', '#007F00',
    '#3F7F3F', '#004C00', '#264C26', '#00FF3F', '#7FFF9F', '#00CC33', '#66CC7F', '#009826',
    '#4C985F', '#007F1F', '#3F7F4F', '#004C13', '#264C2F', '#00FF7F', '#7FFFBF', '#00CC66',
    '#66CC99', '#00984C', '#4C9872', '#007F3F', '#3F7F5F', '#004C26', '#264C39', '#00FFBF',
    '#7FFFDF', '#00CC99', '#66CCB2', '#009872', '#4C9885', '#007F5F', '#3F7F6F', '#004C39',
    '#264C42', '#00FFFF', '#7FFFFF', '#00CCCC', '#66CCCC', '#009898', '#4C9898', '#007F7F',
    '#3F7F7F', '#004C4C', '#264C4C', '#00BFFF', '#7FDFFF', '#0099CC', '#66B2CC', '#007298',
    '#4C8598', '#005F7F', '#3F6F7F', '#00394C', '#26424C', '#007FFF', '#7FBFFF', '#0066CC',
    '#6699CC', '#004C98', '#4C7298', '#003F7F', '#3F5F7F', '#00264C', '#26394C', '#003FFF',
    '#7F9FFF', '#0033CC', '#667FCC', '#002698', '#4C5F98', '#001F7F', '#3F4F7F', '#00134C',
    '#262F4C', '#0000FF', '#7F7FFF', '#0000CC', '#6666CC', '#000098', '#4C4C98', '#00007F',
    '#3F3F7F', '#00004C', '#26264C', '#3F00FF', '#9F7FFF', '#3300CC', '#7F66CC', '#260098',
    '#5F4C98', '#1F007F', '#4F3F7F', '#13004C', '#2F264C', '#7F00FF', '#BF7FFF', '#6600CC',
    '#9966CC', '#4C0098', '#724C98', '#3F007F', '#5F3F7F', '#26004C', '#39264C', '#BF00FF',
    '#DF7FFF', '#9900CC', '#B266CC', '#720098', '#854C98', '#5F007F', '#6F3F7F', '#39004C',
    '#42264C', '#FF00FF', '#FF7FFF', '#CC00CC', '#CC66CC', '#980098', '#984C98', '#7F007F',
    '#7F3F7F', '#4C004C', '#4C264C', '#FF00BF', '#FF7FDF', '#CC0099', '#CC66B2', '#980072',
    '#984C85', '#7F005F', '#7F3F6F', '#4C0039', '#4C2642', '#FF007F', '#FF7FBF', '#CC0066',
    '#CC6699', '#98004C', '#984C72', '#7F003F', '#7F3F5F', '#4C0026', '#4C2639', '#FF003F',
    '#FF7F9F', '#CC0033', '#CC667F', '#980026', '#984C5F', '#7F001F', '#7F3F4F', '#4C0013',
    '#4C262F', '#333333', '#5B5B5B', '#848484', '#ADADAD', '#D6D6D6', '#FFFFFF'
]

def get_rgbcolor(dxfcolor):
    if dxfcolor in range(1,len(COLORS)):
        rgbcolor = COLORS[dxfcolor]
    else:
        rgbcolor = '#000000'
    return rgbcolor

class ValueConstruct(defaultdict):
    """Store values from the DXF and provide them as named attributes"""
    values = {
        '1': ('text', 'default'),
        '2': ('tag', 'block_name'),
        '3': ('mtext',),
        '6': ('line_type',),
        '8': ('layer_name',),
        '10': ('x1',),
        '11': ('x2',),
        '13': ('x3',),
        '14': ('x4',),
        '20': ('y1',),
        '21': ('y2',),
        '23': ('y3',),
        '24': ('y4',),
        '40': ('scale', 'knots', 'radius', 'width_ratio'),
        '41': ('ellipse_a1', 'insert_scale_x'),
        '42': ('ellipse_a2', 'bulge', 'insert_scale_y'),
        '50': ('angle',),
        '51': ('angle2',),
        '62': ('color',),
        '70': ('fill', 'flags'),
        '72': ('edge_type',),
        '73': ('sweep',), # ccw
        '92': ('path_type',),
        '93': ('num_edges',),
        '230': ('extrude',),
        '370': ('line_weight',),
    }
    attrs = dict([(name, a) for a, b in values.items() for name in b])

    def __init__(self):
        super().__init__(list)

    @classmethod
    def is_valid(cls, key):
        return key in cls.values

    def __getattr__(self, attr):
        is_list = attr.endswith('_list')
        key = attr[:-5] if is_list else attr
        if key in self.attrs:
            ret = self[self.attrs[key]]
            if not attr.endswith('_list'):
                return ret[0]
            return ret
        if attr.startswith('has_'):
            key = attr[4:]
            if key in self.attrs:
                return self.attrs[key] in self
        raise AttributeError(f"Can't find dxf attribute '{key}' {attr}")

    def __setattr__(self, attr, value):
        if not attr in self.attrs:
            raise AttributeError(f"Can't set bad dxf attribute '{key}'")
        if not isinstance(value, list):
            value = [value]
        self[self.attrs[attr]] = value

    def adjust_coords(self, xmin, ymin, scale, extrude, height):
        """Adjust the x,y coordinates to fit on the page"""
        for xgrp in set(['10', '11', '13', '14']) & set(self):  # scale/reflect x values
            for i in range(len(self[xgrp])):
                self[xgrp][i] = scale * (extrude * self[xgrp][i] - xmin)
        for ygrp in set(['20', '21', '23', '24']) & set(self):  # scale y values
            for i in range(len(self[ygrp])):
                self[ygrp][i] = height - scale * (self[ygrp][i] - ymin)

export_viewport = False
export_endsec = False

def re_hex2unichar(m):
    return unichr(int(m.group(1), 16))


def formatStyle(style):
    return str(inkex.Style(style))

def export_text(*args, **kwargs):
    return export_mtext(*args, **kwargs)

def export_mtext(vals):
    # mandatory group codes : (1 or 3, 10, 20) (text, x, y)
    if (vals.has_text or vals.has_mtext) and vals.has_x1 and vals.has_y1:
        x = vals.x1
        y = vals.y1
        # optional group codes : (21, 40, 50) (direction, text height mm, text angle)
        size = 12  # default fontsize in px
        if vals.has_scale:
            size = scale * textscale * vals.scale
        attribs = {'x': '%f' % x, 'y': '%f' % y, 'style': 'font-size: %.3fpx; fill: %s; font-family: %s' % (size, color, options.font)}
        angle = 0  # default angle in degrees
        if vals.has_angle:
            angle = vals.angle
            attribs.update({'transform': 'rotate (%f %f %f)' % (-angle, x, y)})
        elif vals.has_y2:
            if vals.y2 == 1.0:
                attribs.update({'transform': 'rotate (%f %f %f)' % (-90, x, y)})
            elif vals.y2 == -1.0:
                attribs.update({'transform': 'rotate (%f %f %f)' % (90, x, y)})
        node = layer.add(inkex.TextElement(**attribs))
        node.set('sodipodi:linespacing', '125%')
        text = ''
        if vals.has_mtext:
            text = ''.join(vals.mtext_list)
        if vals.has_text:
            text = vals.text
        found = text.find(r'\P')  # new line
        while found > -1:
            tspan = node.add(inkex.Tspan())
            tspan.set('sodipodi:role', 'line')
            tspan.text = text[:found]
            text = text[(found + 2):]
            found = text.find(r'\P')
        tspan = node.add(inkex.Tspan())
        tspan.set('sodipodi:role', 'line')
        tspan.text = text


def export_point(vals, w):
    # mandatory group codes : (10, 20) (x, y)
    if vals.has_x1 and vals.has_y1:
        if options.gcodetoolspoints:
            generate_gcodetools_point(vals.x1, vals.y1)
        else:
            generate_ellipse(vals.x1, vals.y1, w / 2, 0.0, 1.0, 0.0, 0.0)


def export_line(vals):
    """Draw a strait line from the dxf"""
    # mandatory group codes : (10, 11, 20, 21) (x1, x2, y1, y2)
    if vals.has_x1 and vals.has_x2 and vals.has_y1 and vals.has_y2:
        path = inkex.PathElement()
        path.style = style
        path.path = 'M %f,%f %f,%f' % (vals.x1, vals.y1, vals.x2, vals.y2)
        layer.add(path)


def export_spline(vals):
    # see : http://www.mactech.com/articles/develop/issue_25/schneider.html
    # mandatory group codes : (10, 20, 40, 70) (x[], y[], knots[], flags)
    if vals.has_flags and vals.has_knots and vals.x1_list \
            and len(vals.x1_list) == len(vals.y1_list):
        knots = vals.knots_list
        ctrls = len(vals.x1_list)
        if ctrls > 3 and len(knots) == ctrls + 4:  # cubic
            if ctrls > 4:
                for i in range(len(knots) - 5, 3, -1):
                    if knots[i] != knots[i - 1] and knots[i] != knots[i + 1]:
                        a0 = (knots[i] - knots[i - 2]) / (knots[i + 1] - knots[i - 2])
                        a1 = (knots[i] - knots[i - 1]) / (knots[i + 2] - knots[i - 1])
                        vals.x1_list.insert(i - 1, (1.0 - a1) * vals.x1_list[i - 2] + a1 * vals.x1_list[i - 1])
                        vals.y1_list.insert(i - 1, (1.0 - a1) * vals.y1_list[i - 2] + a1 * vals.y1_list[i - 1])
                        vals.x1_list[i - 2] = (1.0 - a0) * vals.x1_list[i - 3] + a0 * vals.x1_list[i - 2]
                        vals.y1_list[i - 2] = (1.0 - a0) * vals.y1_list[i - 3] + a0 * vals.y1_list[i - 2]
                        knots.insert(i, knots[i])
                for i in range(len(knots) - 6, 3, -2):
                    if knots[i] != knots[i + 2] and knots[i - 1] != knots[i + 1] and knots[i - 2] != knots[i]:
                        a1 = (knots[i] - knots[i - 1]) / (knots[i + 2] - knots[i - 1])
                        vals.x1_list.insert(i - 1, (1.0 - a1) * vals.x1_list[i - 2] + a1 * vals.x1_list[i - 1])
                        vals.y1_list.insert(i - 1, (1.0 - a1) * vals.y1_list[i - 2] + a1 * vals.y1_list[i - 1])
            ctrls = len(vals.x1_list)
            path = 'M %f,%f' % (vals.x1, vals.y1)
            for i in range(0, (ctrls - 1) // 3):
                path += ' C %f,%f %f,%f %f,%f' % (vals.x1_list[3 * i + 1], vals.y1_list[3 * i + 1], vals.x1_list[3 * i + 2], vals.y1_list[3 * i + 2], vals.x1_list[3 * i + 3], vals.y1_list[3 * i + 3])
            if vals.flags & 1:  # closed path
                path += ' z'
            attribs = {'d': path, 'style': style}
            etree.SubElement(layer, 'path', attribs)
        if ctrls == 3 and len(knots) == 6:  # quadratic
            path = 'M %f,%f Q %f,%f %f,%f' % (vals.x1, vals.y1, vals.x1_list[1], vals.y1_list[1], vals.x1_list[2], vals.y1_list[2])
            attribs = {'d': path, 'style': style}
            etree.SubElement(layer, 'path', attribs)
        if ctrls == 5 and len(knots) == 8:  # spliced quadratic
            path = 'M %f,%f Q %f,%f %f,%f Q %f,%f %f,%f' % (vals.x1, vals.y1, vals.x1_list[1], vals.y1_list[1], vals.x1_list[2], vals.y1_list[2], vals.x1_list[3], vals.y1_list[3], vals.x1_list[4], vals.y1_list[4])
            attribs = {'d': path, 'style': style}
            etree.SubElement(layer, 'path', attribs)


def export_circle(vals):
    # mandatory group codes : (10, 20, 40) (x, y, radius)
    if vals.has_x1 and vals.has_y1 and vals.has_radius:
        generate_ellipse(vals.x1, vals.y1, scale * vals.radius, 0.0, 1.0, 0.0, 0.0)

def export_arc(vals):
    # mandatory group codes : (10, 20, 40, 50, 51) (x, y, radius, angle1, angle2)
    if vals.has_x1 and vals.has_y1 and vals.has_radius and vals.has_angle and vals.has_angle2:
        generate_ellipse(vals.x1, vals.y1,
            scale * vals.radius, 0.0, 1.0, vals.angle * math.pi / 180.0,
            vals.angle2 * math.pi / 180.0)


def export_ellipse(vals):
    # mandatory group codes : (10, 11, 20, 21, 40, 41, 42) (xc, xm, yc, ym, width ratio, angle1, angle2)
    if vals.has_x1 and vals.has_x2 and vals.has_y1 and vals.has_y2 and \
            vals.has_width_ratio and vals.has_ellipse_a1 and vals.has_ellipse_a2:
        generate_ellipse(vals.x1, vals.y1, vals.x2, vals.y2, vals.width_ratio, vals.ellipse_a1, vals.ellipse_a2)


def export_leader(vals):
    # mandatory group codes : (10, 20) (x, y)
    if vals.has_x1 and vals.has_y1:
        if len(vals.x1_list) > 1 and len(vals.y1_list) == len(vals.x1_list):
            path = 'M %f,%f' % (vals.x1, vals.y1)
            for i in range(1, len(vals.x1_list)):
                path += ' %f,%f' % (vals.x1_list[i], vals.y1_list[i])
            attribs = {'d': path, 'style': style}
            etree.SubElement(layer, 'path', attribs)


def export_lwpolyline(vals):
    # mandatory group codes : (10, 20, 70) (x, y, flags)
    if vals.has_x1 and vals.has_y1 and vals.has_flags:
        if len(vals.x1_list) > 1 and len(vals.y1_list) == len(vals.x1_list):
            # optional group codes : (42) (bulge)
            iseqs = 0
            ibulge = 0
            if vals.flags & 1:  # closed path
                seqs.append('20')
                vals.x1_list.append(vals.x1)
                vals.y1_list.append(vals.y1)
            while seqs[iseqs] != '20':
                iseqs += 1
            path = 'M %f,%f' % (vals.x1, vals.y1)
            xold = vals.x1
            yold = vals.y1
            for i in range(1, len(vals.x1_list)):
                bulge = 0
                iseqs += 1
                while seqs[iseqs] != '20':
                    if seqs[iseqs] == '42':
                        bulge = vals.bulge_list[ibulge]
                        ibulge += 1
                    iseqs += 1
                if bulge:
                    sweep = 0  # sweep CCW
                    if bulge < 0:
                        sweep = 1  # sweep CW
                        bulge = -bulge
                    large = 0  # large-arc-flag
                    if bulge > 1:
                        large = 1
                    r = math.sqrt((vals.x1_list[i] - xold) ** 2 + (vals.y1_list[i] - yold) ** 2)
                    r = 0.25 * r * (bulge + 1.0 / bulge)
                    path += ' A %f,%f 0.0 %d %d %f,%f' % (r, r, large, sweep, vals.x1_list[i], vals.y1_list[i])
                else:
                    path += ' L %f,%f' % (vals.x1_list[i], vals.y1_list[i])
                xold = vals.x1_list[i]
                yold = vals.y1_list[i]
            if vals.flags & 1:  # closed path
                path += ' z'
            attribs = {'d': path, 'style': style}
            etree.SubElement(layer, 'path', attribs)


def export_hatch(vals):
    # mandatory group codes : (10, 20, 70, 72, 92, 93) (x, y, fill, Edge Type, Path Type, Number of edges)
    if vals.has_x1 and vals.has_y1 and vals.has_fill and vals.has_edge_type \
            and vals.has_path_type and vals.has_num_edges:
        if len(vals.x1_list) > 1 and len(vals.y1_list) == len(vals.x1_list):
            # optional group codes : (11, 21, 40, 50, 51, 73) (x, y, r, angle1, angle2, CCW)
            i10 = 1  # count start points
            i11 = 0  # count line end points
            i40 = 0  # count circles
            i72 = 0  # count edge type flags
            path = ''
            for i in range(0, len(vals.num_edges_list)):
                xc = vals.x1_list[i10]
                yc = vals.y1_list[i10]
                if vals.edge_type_list[i72] == 2:  # arc
                    rm = scale * vals.radius_list[i40]
                    a1 = vals.angle_list[i40]
                    path += 'M %f,%f ' % (xc + rm * math.cos(a1 * math.pi / 180.0), yc + rm * math.sin(a1 * math.pi / 180.0))
                else:
                    a1 = 0
                    path += 'M %f,%f ' % (xc, yc)
                for j in range(0, vals.num_edges_list[i]):
                    if vals.path_type_list[i] & 2:  # polyline
                        if j > 0:
                            path += 'L %f,%f ' % (vals.x1_list[i10], vals.y1_list[i10])
                        if j == vals.path_type_list[i] - 1:
                            i72 += 1
                    elif vals.edge_type_list[i72] == 2:  # arc
                        xc = vals.x1_list[i10]
                        yc = vals.y1_list[i10]
                        rm = scale * vals.radius_list[i40]
                        a2 = vals.angle2_list[i40]
                        diff = (a2 - a1 + 360) % 360
                        sweep = 1 - vals.sweep_list[i40]  # sweep CCW
                        large = 0  # large-arc-flag
                        if diff:
                            path += 'A %f,%f 0.0 %d %d %f,%f ' % (rm, rm, large, sweep, xc + rm * math.cos(a2 * math.pi / 180.0), yc + rm * math.sin(a2 * math.pi / 180.0))
                        else:
                            path += 'A %f,%f 0.0 %d %d %f,%f ' % (rm, rm, large, sweep, xc + rm * math.cos((a1 + 180.0) * math.pi / 180.0), yc + rm * math.sin((a1 + 180.0) * math.pi / 180.0))
                            path += 'A %f,%f 0.0 %d %d %f,%f ' % (rm, rm, large, sweep, xc + rm * math.cos(a1 * math.pi / 180.0), yc + rm * math.sin(a1 * math.pi / 180.0))
                        i40 += 1
                        i72 += 1
                    elif vals.edge_type_list[i72] == 1:  # line
                        path += 'L %f,%f ' % (vals.x2_list[i11], vals.y2_list[i11])
                        i11 += 1
                        i72 += 1
                    i10 += 1
                path += "z "
            if vals.has_fill:
                style = formatStyle({'fill': '%s' % color})
            else:
                style = formatStyle({'fill': 'url(#Hatch)', 'fill-opacity': '1.0'})
            attribs = {'d': path, 'style': style}
            etree.SubElement(layer, 'path', attribs)


def export_dimension(vals):
    # mandatory group codes : (10, 11, 13, 14, 20, 21, 23, 24) (x1..4, y1..4)
    if vals.has_x1 and vals.has_x2 and vals.has_x3 and vals.has_x4 and \
            vals.has_y1 and vals.has_y2 and vals.has_y3 and vals.has_y4:
        dx = abs(vals.x1 - vals.x3)
        dy = abs(vals.y1 - vals.y3)
        if (vals.x1 == vals.x4) and dx > 0.00001:
            d = dx / scale
            dy = 0
            path = 'M %f,%f %f,%f' % (vals.x1, vals.y1, vals.x3, vals.y1)
        elif (vals.y1 == vals.y4) and dy > 0.00001:
            d = dy / scale
            dx = 0
            path = 'M %f,%f %f,%f' % (vals.x1, vals.y1, vals.x1, vals.y3)
        else:
            return
        attribs = {'d': path, 'style': style + '; marker-start: url(#DistanceX); marker-end: url(#DistanceX); stroke-width: 0.25px'}
        etree.SubElement(layer, 'path', attribs)
        x = vals.x2
        y = vals.y2
        size = 12  # default fontsize in px
        if vals.has_mtext:
            if vals.mtext in DIMTXT:
                size = scale * textscale * DIMTXT[vals.mtext]
                if size < 2:
                    size = 2
        attribs = {'x': '%f' % x, 'y': '%f' % y, 'style': 'font-size: %.3fpx; fill: %s; font-family: %s; text-anchor: middle; text-align: center' % (size, color, options.font)}
        if dx == 0:
            attribs.update({'transform': 'rotate (%f %f %f)' % (-90, x, y)})
        node = etree.SubElement(layer, 'text', attribs)
        tspan = node.add(inkex.Tspan())
        tspan.set('sodipodi:role', 'line')
        tspan.text = str(float('%.2f' % d))


def export_insert(vals):
    # mandatory group codes : (2, 10, 20) (block name, x, y)
    if vals.has_block_name and vals.has_x1 and vals.has_y1:
        x = vals.x1 + scale * xmin
        y = vals.y1 - scale * ymin - height
        elem = layer.add(inkex.Use())
        elem.set('xlink:href', '#' + quote(vals.block_name.replace(" ", "_").encode("utf-8")))
        elem.transform = 'translate(%f, %f)' % (x, y)
        if vals.has_insert_scale_x and vals.has_insert_scale_y:
            elem.transform.add_scale(vals.insert_scale_x, vals.insert_scale_y)


def export_block(vals):
    # mandatory group codes : (2) (block name)
    if vals.has_block_name:
        global block
        block = etree.SubElement(defs, 'symbol', {'id': vals.block_name.replace(" ", "_")})


def export_endblk(vals):
    global block
    block = defs  # initiallize with dummy


def export_attdef(vals):
    # mandatory group codes : (1, 2) (default, tag)
    if vals.has_default and vals.has_tag:
        vals.text_list.append(vals.tag)
        export_mtext(vals)


def generate_ellipse(xc, yc, xm, ym, w, a1, a2):
    rm = math.sqrt(xm * xm + ym * ym)
    a = math.atan2(ym, xm)
    diff = (a2 - a1 + 2 * math.pi) % (2 * math.pi)
    if abs(diff) > 0.0000001 and abs(diff - 2 * math.pi) > 0.0000001:  # open arc
        large = 0  # large-arc-flag
        if diff > math.pi:
            large = 1
        xt = rm * math.cos(a1)
        yt = w * rm * math.sin(a1)
        x1 = xt * math.cos(a) - yt * math.sin(a)
        y1 = xt * math.sin(a) + yt * math.cos(a)
        xt = rm * math.cos(a2)
        yt = w * rm * math.sin(a2)
        x2 = xt * math.cos(a) - yt * math.sin(a)
        y2 = xt * math.sin(a) + yt * math.cos(a)
        path = 'M %f,%f A %f,%f %f %d 0 %f,%f' % (xc + x1, yc - y1, rm, w * rm, -180.0 * a / math.pi, large, xc + x2, yc - y2)
    else:  # closed arc
        path = 'M %f,%f A %f,%f %f 1 0 %f,%f %f,%f %f 1 0 %f,%f z' % (xc + xm, yc - ym, rm, w * rm, -180.0 * a / math.pi, xc - xm, yc + ym, rm, w * rm, -180.0 * a / math.pi, xc + xm, yc - ym)
    attribs = {'d': path, 'style': style}
    etree.SubElement(layer, 'path', attribs)


def generate_gcodetools_point(xc, yc):
    elem = layer.add(inkex.PathElement())
    elem.style = 'stroke:none;fill:#ff0000'
    elem.set('inkscape:dxfpoint', '1')
    elem.path = 'm %s,%s 2.9375,-6.34375 0.8125,1.90625 6.84375,-6.84375 0,0 0.6875,0.6875 -6.84375,6.84375 1.90625,0.8125 z' % (xc, yc)


#   define DXF Entities and specify which Group Codes to monitor

class DxfInput(inkex.InputExtension):
    def add_arguments(self, pars):
        pars.add_argument("--tab", default="Options")
        pars.add_argument("--scalemethod", default="manual")
        pars.add_argument("--scale", default="1.0")
        pars.add_argument("--textscale", default="1.0")        
        pars.add_argument("--xmin", default="0.0")
        pars.add_argument("--ymin", default="0.0")
        pars.add_argument("--gcodetoolspoints", default=True, type=inkex.Boolean)
        pars.add_argument("--encoding", dest="input_encode", default="latin_1")
        pars.add_argument("--font", default="Arial")

    def load(self, stream):
        return stream

    def effect(self):
        global options
        global defs
        global entity
        global seqs
        global style
        global layer
        global scale
        global textscale
        global color
        global extrude
        global xmin
        global ymin
        global height
        global DIMTXT

        options = self.options

        doc = self.get_template(width=210 * 96 / 25.4, height=297 * 96 / 25.4)
        svg = doc.getroot()
        defs = svg.defs
        marker = etree.SubElement(defs, 'marker', {'id': 'DistanceX', 'orient': 'auto', 'refX': '0.0', 'refY': '0.0', 'style': 'overflow:visible'})
        etree.SubElement(marker, 'path', {'d': 'M 3,-3 L -3,3 M 0,-5 L  0,5', 'style': 'stroke:#000000; stroke-width:0.5'})
        pattern = etree.SubElement(defs, 'pattern', {'id': 'Hatch', 'patternUnits': 'userSpaceOnUse', 'width': '8', 'height': '8', 'x': '0', 'y': '0'})
        etree.SubElement(pattern, 'path', {'d': 'M8 4 l-4,4', 'stroke': '#000000', 'stroke-width': '0.25', 'linecap': 'square'})
        etree.SubElement(pattern, 'path', {'d': 'M6 2 l-4,4', 'stroke': '#000000', 'stroke-width': '0.25', 'linecap': 'square'})
        etree.SubElement(pattern, 'path', {'d': 'M4 0 l-4,4', 'stroke': '#000000', 'stroke-width': '0.25', 'linecap': 'square'})

        def _get_line():
            return self.document.readline().strip().decode(options.input_encode)

        def get_line():
            return _get_line(), _get_line()

        def get_group(group):
            line = get_line()
            if line[0] == group:
                return float(line[1])
            return 0.0

        xmax = xmin = ymin = 0.0
        height = 297.0 * 96.0 / 25.4  # default A4 height in pixels
        measurement = 0  # default inches
        line = get_line()
        polylines = 0
        flag = 0  # (0, 1, 2, 3) = (none, LAYER, LTYPE, DIMTXT)
        layer_colors = {}  # store colors by layer
        layer_nodes = {}  # store nodes by layer
        linetypes = {}  # store linetypes by name
        DIMTXT = {}  # store DIMENSION text sizes

        while line[0] and line[1] != 'BLOCKS':
            line = get_line()
            if options.scalemethod == 'file':
                if line[1] == '$MEASUREMENT':
                    measurement = get_group('70')
            elif options.scalemethod == 'auto':
                if line[1] == '$EXTMIN':
                    xmin = get_group('10')
                    ymin = get_group('20')
                if line[1] == '$EXTMAX':
                    xmax = get_group('10')
            if flag == 1 and line[0] == '2':
                layername = line[1]
                layer_nodes[layername] = svg.add(inkex.Layer.new(layername))
            if flag == 2 and line[0] == '2':
                linename = line[1]
                linetypes[linename] = []
            if flag == 3 and line[0] == '2':
                stylename = line[1]
            if line[0] == '2' and line[1] == 'LAYER':
                flag = 1
            if line[0] == '2' and line[1] == 'LTYPE':
                flag = 2
            if line[0] == '2' and line[1] == 'DIMSTYLE':
                flag = 3
            if flag == 1 and line[0] == '62':
                layer_colors[layername] = int(line[1])
            if flag == 2 and line[0] == '49':
                linetypes[linename].append(float(line[1]))
            if flag == 3 and line[0] == '140':
                DIMTXT[stylename] = float(line[1])
            if line[0] == '0' and line[1] == 'ENDTAB':
                flag = 0

        if options.scalemethod == 'file':
            scale = 25.4  # default inches
            if measurement == 1.0:
                scale = 1.0  # use mm
        elif options.scalemethod == 'auto':
            scale = 1.0
            if xmax > xmin:
                scale = 210.0 / (xmax - xmin)  # scale to A4 width
        else:
            scale = float(options.scale)  # manual scale factor
            xmin = float(options.xmin)
            ymin = float(options.ymin)
        bname = os.path.basename(options.input_file)
        svg.desc = f"{bname} - scale = {scale}, origin = ({xmin}, {ymin}), method = {options.scalemethod}"
        scale *= 96.0 / 25.4  # convert from mm to pixels
        textscale = float(options.textscale)

        if '0' not in layer_nodes:
            layer_nodes['0'] = svg.add(inkex.Layer.new('0'))

            layer_colors['0'] = 7

        for linename in linetypes.keys():  # scale the dashed lines
            linetype = ''
            for length in linetypes[linename]:
                if length == 0:  # test for dot
                    linetype += ' 0.5,'
                else:
                    linetype += '%.4f,' % math.fabs(length * scale)
            if linetype == '':
                linetypes[linename] = 'stroke-linecap: round'
            else:
                linetypes[linename] = 'stroke-dasharray:' + linetype

        entity = ''
        inENTITIES = False
        block = defs  # initiallize with dummy
        while line[0] and (line[1] != 'ENDSEC' or not inENTITIES):
            line = get_line()
            if line[1] == 'ENTITIES':
                inENTITIES = True
            elif line[1] == 'POLYLINE':
                polylines += 1
            if entity and vals.is_valid(line[0]):
                seqs.append(line[0])  # list of group codes
                if line[0] in ('1', '2', '3', '6', '8'):  # text value
                    val = line[1].replace(r'\~', ' ')
                    val = re.sub(r'\\A.*;', '', val)
                    val = re.sub(r'\\H.*;', '', val)
                    val = re.sub(r'\^I', '', val)
                    val = re.sub(r'{\\L', '', val)
                    val = re.sub(r'}', '', val)
                    val = re.sub(r'\\S.*;', '', val)
                    val = re.sub(r'\\W.*;', '', val)
                    val = val
                    val = re.sub(r'\\U\+([0-9A-Fa-f]{4})', re_hex2unichar, val)
                elif line[0] in ('62', '70', '92', '93'):
                    val = int(line[1])
                else:  # unscaled float value
                    val = float(line[1])
                vals[line[0]].append(val)
            elif has_export(line[1]):
                if has_export(entity):
                    if block != defs:  # in a BLOCK
                        layer = block
                    elif vals.has_layer_name:  # use Common Layer Name
                        if not vals.layer_name:
                            vals.layer_name = '0'  # use default name
                        if vals.layer_name not in layer_nodes:
                            layer_nodes[vals.layer_name] = svg.add(inkex.Layer.new(vals.layer_name))
                        layer = layer_nodes[vals.layer_name]
                    color = '#000000'  # default color
                    if vals.has_layer_name:
                        if vals.layer_name in layer_colors:
                            color = get_rgbcolor(layer_colors[vals.layer_name])
                    if vals.has_color:  # Common Color Number
                        color = get_rgbcolor(vals.color)
                    style = formatStyle({'stroke': '%s' % color, 'fill': 'none'})
                    w = 0.5  # default lineweight for POINT
                    if vals.has_line_weight:  # Common Lineweight
                        if vals.line_weight > 0:
                            w = 96.0 / 25.4 * vals.line_weight / 100.0
                            if w < 0.5:
                                w = 0.5
                            style = formatStyle({'stroke': '%s' % color, 'fill': 'none', 'stroke-width': '%.1f' % w})
                    if vals.has_line_type:  # Common Linetype
                        if vals.line_type in linetypes:
                            style += ';' + linetypes[vals.line_type]
                    extrude = 1.0
                    if vals.has_extrude:
                        extrude = float(vals.extrude)

                    vals.adjust_coords(xmin, ymin, scale, extrude, height)

                    if extrude == -1.0:  # reflect angles
                        if vals.has_angle and vals.has_angle2:
                            vals.angle2, vals.angle = 180.0 - vals.angle, 180.0 - vals.angle2
                    exporter = get_export(entity)
                    if exporter:
                        if entity == 'POINT':
                            exporter(vals, w)
                        else:
                            exporter(vals)
                entity = line[1]
                vals = ValueConstruct()
                seqs = []

        if polylines:
            inkex.errormsg(_('%d ENTITIES of type POLYLINE encountered and ignored. Please try to convert to Release 13 format using QCad.') % polylines)
        self.document = doc

def get_export(opt):
    return globals().get('export_' + opt.lower(), None)

def has_export(opt):
    return get_export(opt) is not None

if __name__ == '__main__':
    DxfInput().run()
