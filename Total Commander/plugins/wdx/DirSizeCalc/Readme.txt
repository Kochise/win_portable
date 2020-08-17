DirSizeCalc 1.21
----------------

DirSizeCalc is a Content plugin for Total Commander.


Plugin description
------------------

DirSizeCalc counts the size of all files in a directory and displays the result. The calculation is done in background. This enables you to continue work while the calculation is in progress. 
If you use one of the "on demand" fields press the SPACE key on your keyboard to start the calculation. The "background" fields will immediately start the calculation when you enter the directory.
In addition some other related fields are provided.


Field descriptions
------------------

Size			File size
Compressed Size		Compressed Size is the file size when the compressed attribute is set. This field is only available on Windows NT based systems.
Directory Count		Count of all subdirectories in a directory.
File Count		Count of all files in a directory.
Empty			Retrieves if a directory neither subdirectories nor files.
Contains files		Retrieves if a directory contains any files.
Contains subdirectories Retrieves if a directory contains subdirectories.

	
System requirements
-------------------

You need Total Commander 6.50 or higher for this plugin. 
For user-defined units and placeholders Total Commander 6.52 is required.
To display compressed file sizes you need Windows NT/2000/XP.


Settings
--------

All settings are saved to the file "DirSizeCalc.ini". Changes are activated after Total Commander has been restarted. This file is created automatically during installation if it doesn't exist yet.


"DirSizeCalc.ini" location
--------------------------

DirSizeCalc.ini will be saved in the same directory as Wincmd.ini by default.
If you don't like this location you can simply move the file to one of the following destinations:

In a subdirectory called "DirSizeCalc" relative to the directory where Wincmd.ini is located
Plugin directory
Total Commander directory


Exclude Mount Points and Junctions from calculation
---------------------------------------------------

These settings affect fields for file sizes as well as fields for number of directories and -files.
There are settings for background and on demand fields.
In addition there are settings to exclude mount points and junctions on the highest and on lower levels. The highest level is the current directory. If junctions should be excluded on the highest level no file sizes for junctions will be calculated for the lower levels no matter which setting have been made for these levels.

TopFollowReparsePointsBackground	= Setting for directories on the top level for the background calculation.
TopFollowReparsePointsOnDemand		= Setting for directories on the top level for the calculation on demand.
SubFollowReparsePointsBackground	= Setting for directories on the sub levels for the background calculation.
SubFollowReparsePointsOnDemand		= Setting for directories on the sub levels for the calculation on demand.

0 = Exclude mount points and junctions from calculation.
1 = Exclude mount points from calculation but include junctions.
2 = Exclude junctions from calculation but include mount points.
3 = Calculate mount points and junctions.

By default all reparse points and junctions are calculated (all settings set to 3).

User-defined units
------------------

User-defined units allow to more accurate file sizes displaying.

To add a user-defined number-format a section must be added to the file "DirSizeCalc.ini". For the user-defined number-formats a naming convention has been introduced. These section names must be start with "CustomUnitConfig_". All following characters are used for the caption. Example:

CustomUnitConfig_MyDim. In this case the caption of the new unit is "MyDim".

The settings file contains some sample units.


Basic settings for user-defined number formats
----------------------------------------------

It's not required to define all settings for each single user-defined number format which are set all to the same value. For this purpose the section "Default_CustomUnitConfig" has been introduced. This section may contain the same settings as all other sections for user-defined number formats.

If one or multiple settings are not defined in this section default values will be used. The default values are:

AllowedUnits=1
NumberOfDigits=3
DecimalSeparator=,
LeadingZero=1
ThousandSeparator=.
WantByteDigits=0
WantThousandSeparator=1

AllowedUnits
------------

AllowedUnits=1		

These settings define in which dimension file size values are displayed.

A combination of the following values can be used:


1=Bytes
2=Kilobytes
4=Megabytes
8=Gigabytes

Example:

AllowedUnits is set to 5. This is a combination of byte and megabyte.


A directory contains files which have the following file sizes in bytes:


          234
       58.923
  923.345.789
2.826.347.092

The result is the following (The exact display depends on the other settings as well):

      234 bytes
    0,056 MB
  880,571 MB
269.5,415 MB


The exact dimensions are:

0 bytes - 1023 bytes = bytes
1024 bytes - 1048575 = Kilobytes
1048576 - 1073741823 = Megabytes
> 1073741824 = Gigabytes

Conclusion: If a file size is inside a certain dimension, the size will be displayed in this dimension. Otherwise the size will be displayed in the next lower dimension defined in AllowedUnits.


NumberOfDigits
--------------

NumberOfDigits defined the number of floating point digits.


DecimalSeparator
----------------

DecimalSeparator defines which character is used as the decimal separator.



LeadingZero
-----------

LeadingZero defines if a leading zero will be displayed if a displayed size is smaller than one.

 
ThousandSeparator
-----------------

ThousandSeparator defines which character is used as the thousand separator.
The character "S" can be used to display a space character as thousand separator.


WantByteDigits
--------------

WantByteDigits defines if floating point digits are displayed when the dimension is bytes. The floating point value for these values is always zero.

Possible settings
WantByteDigits=O	No digits for file sizes in bytes
WantByteDigits=1	Digits for file sizes in bytes


WantThousandSeparator
---------------------

WantThousandSeparator defines if a thousand separator should be used or not.

WantThousandSeparator=0 NO  thousand separator
WantThousandSeparator=1	thousand separator


Version history
---------------


1.21
- FIXED		Executing file operations on directories wasn't possible in some cases after the field "Contains files" has been used.
- FIXED		Units had been shown for fields which are not able to display file sizes.

1.20
- ADDED		All fields can now be calculated in background or on demand.
- ADDED		No more limits on formatting and sorting user-defined units enabled through Plugin interface enhancements.
- ADDED		Plugin interface enhancements are now used to enable displaying of placeholders. They are shown until the calculation has been completed.
- ADDED		New fields "Contains files" and "Contains Subdirectories" added.

1.13		
- FIXED		Settings were not read in some cases.

1.12
- FIXED		Default settings file is now created during plugin installation.
- ADDED		Russian translation added.
- FIXED		Fixed faulty language file.

1.11
- FIXED		Fixed faulty installation file.

1.10
- ADDED		Settings are now managed in "DirSizeCalc.ini".
- ADDED		A new field "Empty" has been added. It indicates if a directory contains files or subdirectories.
- ADDED		User-defined number formats added. Requires Total Commander 6.52 or higher.
- ADDED		Mount Points and Junctions can now be excluded from calculation optionally.
- FIXED		The size of files which where opened exclusively had not been calculated.

1.07
- CHANGED	Plugin name changed to DirSizeCalc.
- ADDED		New fields "Directory Count" and "File Count" added. Both fields can be calculated in background or on demand.
- ADDED		All fields are now always sorted descending first.
- ADDED		A bug has been fixed which stopped dir size calculation on a directory change only for the first column when multiple DirSizeCalc columns are displayed.

1.06
- ADDED		Added support for the plugin function ContentStopGetValue.

1.05	
- FIXED		Error in installation file "pluginst.inf" fixed.

1.04
- ADDED		Support for units added.
- ADDED		Plugin installation file "pluginst.inf" added.
- ADDED		Support for compressed file size added (requires Windows NT/2000/XP).
- CHANGED	Plugin name changed to DirSize.

1.03
- ADDED     	Support for "on demand" displaying added.

1.02
- ADDED      	foreground directory size calculation.
- ADDED      	German language file.
- CHANGED   	Decreased file size.

1.01
- FIXED:   	Size for currently used files wasn't displayed.
- CHANGED:   	Increased speed.

1.00
-       	Initial release


Author contact
--------------

Visit the Total Commander Forum ( http://www.ghisler.ch ). Copyright (C) 2004, 2005 Christian Hillbricht.


License and Liability
--------------------

Any liability for damage of any sort is hereby denied.
All rights reserved. This Total Commander plugin is copyrighted freeware.