#!/usr/bin/env python
"""
Convert PNG to Jpeg using Raster Output extension.
"""

import inkex

class JpegOutput(inkex.RasterOutputExtension):
    multi_inx = True # XXX Remove this after refactoring

    def add_arguments(self, pars):
        pars.add_argument('--tab')
        pars.add_argument('--quality', type=int, default=90)
        pars.add_argument('--progressive', type=inkex.Boolean, default=False)

    def save(self, stream):
        self.img.convert('RGB').save(stream,
            format='jpeg',
            quality=self.options.quality,
            progressive=self.options.progressive)

if __name__ == '__main__':
    JpegOutput().run()
