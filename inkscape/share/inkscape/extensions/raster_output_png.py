#!/usr/bin/env python
"""
Optimise PNG file using optipng
"""

import os
import inkex
from inkex.extensions import TempDirMixin
from inkex.command import call

class PngOutput(TempDirMixin, inkex.RasterOutputExtension):
    def add_arguments(self, pars):
        pars.add_argument('--tab')
        # Lossless options
        pars.add_argument('--interlace', type=inkex.Boolean, default=True)
        pars.add_argument('--level', type=int, default=5)
        # Lossy options
        pars.add_argument('--bitdepth', type=inkex.Boolean, default=False)
        pars.add_argument('--color', type=inkex.Boolean, default=False)
        pars.add_argument('--palette', type=inkex.Boolean, default=False)

    def load(self, stream):
        """Load the PNG file (prepare it for optipng)"""
        self.png_file = os.path.join(self.tempdir, 'input.png')
        with open(self.png_file, 'wb') as fhl:
            fhl.write(stream.read())

    def save(self, stream):
        """Pass the PNG file to optipng with the options"""
        options = {
            'o': self.options.level,
            'i': int(self.options.interlace),
            'nb': not self.options.bitdepth,
            'nc': not self.options.color,
            'np': not self.options.palette,
        }
        call('optipng',
            self.png_file,
            oldie=True,
            clobber=True,
            **options)

        if os.path.isfile(self.png_file):
            with open(self.png_file, 'rb') as fhl:
                stream.write(fhl.read())
        

if __name__ == '__main__':
    PngOutput().run()
