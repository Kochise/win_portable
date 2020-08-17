ImageMetaData plugin 2.3.5.0 for Total Commander
================================================

Copyright © 2006-2013 by Udo Liess, Thomas Beutlich


 * Disclaimer:
--------------

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
http://www.fsf.org/licensing/licenses/gpl.txt


 * Installation:
----------------

Open the plugin archive using Total Commander and installation will start.

The default configuration file jpg-comment.ini is initialized during the very
first plugin initialization.


 * Update Remarks:
------------------

 o With version 2.3.0.0 the directory of jpg-comment.ini changed from the plugin
   directory to the same directory as the initialization file (wincmd.ini) of
   Total Commander. However, if a jpg-comment.ini with a valid [Metadata] section
   is found in the plugin directory this jpg-comment.ini is used instead.
 o With version 2.3.0.0 the metadata configuration of jpg-comment.ini changed.
   The section name changed from [Settings] to [Metadata]. The superfluous flag
   for repeatable IPTC metadata fields vanished.
 o With version 2.3.2.0 the pre-configured list of metadata changed in a non-
   compatible way. For compatibility reasons the previous metadata configuration
   is saved in backup file jpg-comment.old.ini. You can rename jpg-comment.old.ini
   to jpg-comment.ini to apply the old metadata setup. However, jpg-comment.old.ini
   will not be maintained for future versions of the plugin.


 * Description:
---------------

This plugin shows
 o Comment of JPG/JPEG and PNG files as whole or as single lines.
 o EXIF metadata of image files
 o IPTC metadata of image files
 o XMP metadata of image files

You can set/edit almost all fields inside Total Commander (requires TC7).

See http://dev.exiv2.org/wiki/exiv2/Supported_image_formats for the list of
supported file formats and its read/write access.

See configuration file jpg-comment.ini for the configuration of the metadata
fields.

This plugin uses the Exiv2 Image Metadata Library Vs. 0.24.


 * ChangeLog:
-------------

 o Version 2.3.5.0 (02.12.2013)
   - replaced Exiv2 library 0.23 (r2895) by 0.24 (r3205)
   - fixed experimental support of metadata dump as full text fields
   - replaced zlib library 1.2.7 by 1.2.8
 o Version 2.3.4.1 (07.10.2012)
   - replaced Exiv2 library 0.23 (r2749) by 0.23 (r2895)
   - fixed Exif date stamp: forward slash is also allowed as separator
 o Version 2.3.4.0 (26.07.2012)
   - added experimental support of metadata dump as full text fields
 o Version 2.3.3.0 (12.06.2012)
   - fixed access violations for invalid string conversions
   - added JPEG_CodePage, EXIF_CodePage, IPTC_CodePage and XMP_CodePage
     options to section [Settings] of jpg-comment.ini
   - removed CodePage option from section [Settings] of jpg-comment.ini
 o Version 2.3.2.0 (07.06.2012)
   - replaced Exiv2 library 0.22 (r2643) by 0.23 (r2749)
   - replaced Expat 2.0.1 by Expat 2.1.0
   - replaced zlib library 1.2.5 by 1.2.7
   - fixed trailing wide string conversion for ft_numeric_floating fields
   - fixed: trailing wide string for ft_numeric_floating fields displays max.
     5 decimal places
   - fixed code page issues for reading/writing metadata
   - fixed run-time exception when writing an empty/invalid time/date format
   - renamed/shortened and resorted all strings in default jpg-comment.ini
     (breaking compatibility, see remark above)
   - set ShowErrors in default jpg-comment.ini to off
   - added CodePage option to section [Settings] of jpg-comment.ini
 o Version 2.3.1.4 (09.01.2012)
   - renamed plugin to ImageMetaData
   - replaced Exiv2 library 0.22 (r2634) by 0.22 (r2643)
   - added section [Settings] again to jpg-comment.ini with option:
     ShowErrors
 o Version 2.3.1.3 (16.11.2011)
   - replaced Exiv2 library 0.22 (r2625) by 0.22 (r2634) to
     fix PNG Comment (http://dev.exiv2.org/issues/795)
 o Version 2.3.1.2 (21.10.2011)
   - replaced Exiv2 library 0.22 by 0.22 (r2625)
   - added GPSDateStamp and GPSTimeStamp to default jpg-comment.ini
   - shortened various strings in default jpg-comment.ini
   - removed MPRESS binary compression
 o Version 2.3.1.1 (06.10.2011)
   - replaced Exiv2 library 0.22 by 0.22 (r2620)
   - fixed PNG Description from ImageMagick as JPG.Comment
     (http://dev.exiv2.org/issues/793)
   - fixed: only call ContentEditValue() for fields of type ft_string or
     ft_stringw
 o Version 2.3.1.0 (18.09.2011)
   - replaced Exiv2 library 0.21.1 by 0.22
   - added EPS file extension to detection string
   - added 64 bit support
 o Version 2.3.0.4 (14.02.2010)
   - replaced Exiv2 library 0.21 (+ patch) by 0.21.1
 o Version 2.3.0.3 (06.12.2010)
   - replaced Exiv2 library 0.20 by 0.21 (+ patch)
   - replaced zlib library 1.2.3 by 1.2.5
   - added EXV, CR2, CRW, MRW, ARW, RW2, SR2, SRW, ORF, RAF and XMP file
     extensions to detection string
 o Version 2.3.0.2 (09.08.2010)
   - fixed: if a jpg-comment.ini with a valid [Metadata] section is found in
     the plugin directory this jpg-comment.ini is used instead
 o Version 2.3.0.1 (08.08.2010)
   - fixed trailing wide string for ft_numeric_floating fields
 o Version 2.3.0.0 (07.08.2010)
   - replaced Exiv2 library 0.18.2 by 0.20
   - changed directory of jpg-comment.ini from plugin directory to same directory
     as the initialization file (wincmd.ini) of Total Commander
   - changed metadata configuration file format (see above)
   - added support of Unicode file names
   - added support of Unicode field strings
   - added support of pretty printed field strings (read-only)
   - added various EXIF metadata to default jpg-comment.ini
 o Version 2.2.0.11 (25.06.2009)
   - replaced Exiv2 library 0.18.1 by 0.18.2
   - added experimental support for PGF files
 o Version 2.2.0.10 (08.05.2009)
   - fixed ft_numeric_32 and ft_numeric_64 type conversion
 o Version 2.2.0.9 (06.05.2009)
   - fixed metadata field detection performance
 o Version 2.2.0.8 (04.05.2009)
   - fixed error handling for getting multiple choice fields
 o Version 2.2.0.7 (28.04.2009)
   - fixed default configuration file handling
 o Version 2.2.0.6 (27.04.2009)
   - fixed default configuration file handling
 o Version 2.2.0.5 (20.04.2009)
   - added date/time support for XMP fields
   - fixed error handling for getting the time stamp
   - fixed date/time setting for IPTC fields
   - fixed exception message handling
 o Version 2.2.0.4 (16.04.2009)
   - added cache support for ContentGetValue()
   - added DNG, JP2, NEF, PEF, PNG and PSD file extensions to detection string
   - fixed JPG.Comment detection
   - fixed exception message handling
 o Version 2.2.0.3 (13.04.2009)
   - added exception message handling
   - fixed error handling for getting the time stamp
 o Version 2.2.0.2 (09.04.2009)
   - replaced Exiv2 library 0.18 by 0.18.1
   - added read support for UCS2 encoded Windows EXIF fields
   - added read support for EXIF Rational type
 o Version 2.2.0.1 (05.04.2009)
   - improved set value for multiple choice fields
 o Version 2.2.0.0 (04.04.2009)
   - added generic metadata interface by jpg-comment.ini
 o Version 2.1.5.0 (16.03.2009)
   - added EXIF fields SubSecTime, SubSecTimeOriginal and SubSecTimeDigitized
   - fixed IPTC fields Contact, LocationName and Urgency
   - added XMP field Rating
 o Version 2.1.4.1 (03.03.2009)
   - added French translation
   - added Spanish translation
 o Version 2.1.4.0 (20.12.2008)
   - replaced Exiv2 library 0.15 by 0.18
 o Version 2.1.3.1 (26.09.2008)
   - fixed EXIF fields DateTime, DateTimeOriginal and DateTimeDigitized
     (Thanks to sqa_wizard.)
 o Version 2.1.3.0 (23.09.2008)
   - added EXIF fields DateTime, DateTimeOriginal and DateTimeDigitized
 o Version 2.1.2.0 (13.07.2008)
   - added TIF and TIFF file extensions to detection string
 o Version 2.1.1.0 (17.03.2008)
   - added Danish translation (Thanks to petermad.)
   - added Polish translation (Thanks to fenix.)


 * References:
--------------

 o Content-Plugin Writer's Guide by Christian Ghisler
   - http://ghisler.fileburst.com/beta/contentpluginhelp210beta.zip


 * Acknowledgments:
-------------------

 o Exiv2 Image Metadata Library
   - http://www.exiv2.org


 * Trademark and Copyright Statements:
--------------------------------------

 o Total Commander is Copyright © 1993-2013 by Christian Ghisler, Ghisler Software GmbH.
   - http://www.ghisler.com


 * Feedback:
------------

If you have problems, questions, suggestions please contact Thomas Beutlich.
 o Email: support@tbeu.de
 o URL: http://tbeu.totalcmd.net