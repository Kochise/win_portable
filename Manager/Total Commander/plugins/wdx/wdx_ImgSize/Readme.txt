ImgSize v1.09, WDX Content Plugin for Total Commander, 2005 by J. Bleichroth

Plugin columns:    Width(x), Height(y), Pixel(x * y), Diagonal(diagonal length), 
                   Orientation (Square, Portrait, Landscape), Size (small, medium, large), 
                   Aspect ratio, Bpp

Supported formats: JPG GIF BMP PNG TIFF PSD PCX EPS/PS

Plugin purpose:    Sorting images by size

---------------------------------------------------

Changelog:
20050703 1.12 Bpp column added
20050702 1.11 Aspect ratio column internal format changed for TC 6.52 and higher
20050417 1.10 Aspect ratio column added
20050219 1.09 ImgSize.lng changed
20050218 1.08 auto language select, ini file changed to imgsize.ini (in plugin dir), english column names changed
20050208 1.07 PSD PCX EPS/PS support added, improved readme.txt
20050203 1.06 TIFF images support added
20050131 1.05 Some translations changed on user request
20050130 1.04 IniFile (usually (TC depending): contplug.ini) configurable texts and size definitions
20050128 1.03 Orientation (Square, Portrait, Landscape) column added, Size (small, medium, large) column added
20050128 1.02 additional file checks added, French language added
20050127 Initial release

---------------------------------------------------

Installation: 
- Standard: Open the plugin zip file (with a pluginst.inf file for automatic inst.) within TC
- Manual:   Use TC Menu -> Configuration -> Options -> Pugins -> 
            Content Plugins configure -> Add ...

---------------------------------------------------

Usage: 
- Use TC Menu -> Configuration -> Options -> Custom columns -> New/Edit ...
or
- Right-click on the (left or right) TC window columns - > Configure custom columns -> New/Edit ..

---------------------------------------------------

Addiional informations about the ini file (imgsize.ini):

See the TC Content Plugin IniFile (usually (TC depending): contplug.ini) section 
for the following details:

- For language support of 'Square', 'Portrait', 'Landscape', 'small', 'medium', 'large'
  please change the LanguageNo=N (N = 1..3), if the automatic language support does no 
  work as requested and set "TextLanguageAutoSelect=No".


- Enable/Disable EPS/PS File support: EpsFiles=N PsFiles=N (N = 0/1 or Yes/No)

- Size column definitions:
  small:  image smaller than: (x and y) or (x and y) or (x and y) ... ((0,0)= element not used)
  large:  image larger than:  (x and y) or (x and y) or (x and y) ... ((0,0)= element not used)
  medium: all other images
  
---------------------------------------------------
