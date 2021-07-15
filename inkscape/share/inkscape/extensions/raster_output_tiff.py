#!/usr/bin/env python
"""
Convert PNG to Tiff using Raster Output extension.
"""

import inkex

class TiffOutput(inkex.RasterOutputExtension):
    def add_arguments(self, pars):
        pars.add_argument('--tab')
        pars.add_argument('--compression', default=None)
        pars.add_argument('--quality', type=int, default=95)

    def save(self, stream):
        self.img.convert('RGB').save(stream,
            format='tiff',
            compression=(self.options.compression or None),
            quality=100)
        # TODO: Add other fields such as copyright etc.

if __name__ == '__main__':
    TiffOutput().run()
