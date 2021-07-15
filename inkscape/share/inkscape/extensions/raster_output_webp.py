#!/usr/bin/env python
"""
Convert PNG to WebP using Raster Output extension.
"""

import inkex

class WebpOutput(inkex.RasterOutputExtension):
    def add_arguments(self, pars):
        pars.add_argument('--tab')
        pars.add_argument('--quality', type=int, default=75)
        pars.add_argument('--speed', type=int, default=3)
        pars.add_argument('--lossless', type=inkex.Boolean, default=True)

    def save(self, stream):
        self.img.save(stream,
            format='webp',
            quality=self.options.quality,
            lossless=self.options.lossless,
            method=self.options.speed)

if __name__ == '__main__':
    WebpOutput().run()
