#!/usr/bin/env python
# coding=utf-8
#
# Copyright (C) 2011 Felipe Correa da Silva Sanches
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

from typing import Union

import inkex
from inkex.localization import inkex_gettext as _


class SetupTypographyCanvas(inkex.EffectExtension):
    """Resizes the canvas and creates typography-relevant guidelines"""

    def add_arguments(self, pars):
        pars.add_argument("-e", "--emsize", type=int, default=1000)
        pars.add_argument("-c", "--caps", type=int,
                          default=700, help="Caps Height")
        pars.add_argument("-x", "--xheight", type=int, default=500)
        pars.add_argument("-a", "--ascender", type=int, default=750)
        pars.add_argument("-d", "--descender", type=int, default=250)

    def create_horizontal_guideline(self, name: str, position: Union[int, float]) \
        -> inkex.BaseElement:
        """Create a horizontal guideline with name and position

        Args:
            name (str): the name of the guideline
            position (Union[int, float]): the vertical position of the guideline

        Returns:
            inkex.BaseElement: the created guideline
        """
        return self.svg.namedview \
                   .add(inkex.Guide().move_to(0, position, (0, 1)).update(inkscape__label=name))

    def effect(self):
        # Get all the options
        emsize = self.options.emsize
        ascender = self.options.ascender
        caps = self.options.caps
        xheight = self.options.xheight
        descender = self.options.descender

        # Get access to main SVG document element
        self.svg.set("width", str(emsize))
        self.svg.set("height", str(emsize))
        self.svg.set("viewBox", "0 0 " + str(emsize) + " " + str(emsize))

        baseline = descender
        # Create guidelines
        self.create_horizontal_guideline(_("baseline"), baseline)
        self.create_horizontal_guideline(_("ascender"), baseline + ascender)
        self.create_horizontal_guideline(_("caps"), baseline + caps)
        self.create_horizontal_guideline(_("xheight"), baseline + xheight)
        self.create_horizontal_guideline(_("descender"), baseline - descender)

        namedview = self.svg.namedview
        namedview.set('inkscape:document-units', 'px')
        namedview.set('inkscape:cx', str(emsize / 2.0))
        namedview.set('inkscape:cy', str(emsize / 2.0))


if __name__ == '__main__':
    SetupTypographyCanvas().run()
