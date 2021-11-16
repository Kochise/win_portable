Version Information Viewer Ver 2.07
===================================
http://physio-a.univ-tours.fr/tcplugins/

Version Information viewer plugin for Total Commander (version 5.50 and above only)

This viewer is intended to check all files for a Version Ressource and display it
it shows now static and delayed DLL dependency and File Header Information

Installation
-------------
To install copy "fileinfo.wlx" and "fileinfo.ini" in your plugin directory
and add these two lines to your wincmd.ini (in 5.50 and above)
....or use the Lister plugin interface (in 5.51)

[ListerPlugins]
0=C:\wincmd\plugin\fileinfo.wlx

(Change path to your real one )


additional DLL needed by fileinfo.wlx:
--------------------------------------
MFC42.DLL
MSVCRT.DLL
COMCTL32.DLL
IMAGEHLP.DLL


Description of "fileinfo.ini"
---------------------------
[Options]
RememberAP=0            : 1 = remember the last active page
autosave=1              : autosaving size and position of mmedia lister  (0 don't)
ActivePage=1            :
Undecorate=1            : demangle microsoft and borland C++ functions
Dump_res=0              : Dump Resources
ShowDebug=0             : Show Debug information
MaxDepth=2              : Depth of DLL Dependencies analysis

Rect=EA0200001401000081040000050300008E  : size and position of mmedia lister (remove line to reinit)

Warning : 
   default value for 'Maxdepth' is 2. on slow computer, set 1 to speed up.
   value > 4 can freeze computer for a long time

Tips :
------
- in 'Dll dependency' tab
   red icon : missing DLL
   yellow icon : missing function in DLL
   see options tab for more information
   depth of analysis can now be defined ( directly in "fileinfo.ini")

- in 'Imports / Exports' tab
   name of function copied on clipboard when you click on it   

- to use plugins, see plugins.txt

- you can save unpacked PE file with CTL-S

Some code come from :
--------------------
Enrico Frumento to provide me sources to extract typelib information
Thomas Weller for his file : file_ver.cpp ; Implementation of class CFileVersionInfo. (Last modified:  02/02/2002)
Giancarlo Iovino  for his HyperLink static control
Matt Pietrek for his helpfull articles on PE files format and some of his source. 
Christian Ghisler : author of Total Commander: for developing this great utilitie and for the lister plugin interface


History :
---------
2.07 - 24.08.2005
   - Added : Relocation entries
   - Added : Codeview format "RSDS"
   - Added : Option to enable/disable view of runtime function table
   - Added : Option to enable/disable view of relocations
   - Added : Some IMAGE_DEBUG_TYPE descriptors
   - Added : Some IMAGE_FILE_MACHINE descriptors
   - Fixed : Crash when dumping 64bits executables with IMAGE_ORDINAL_FLAG64 present
   - Fixed : Imported functions not shown in import tab if dll not found

2.06 - 08.07.2005
   - Updated : some characteristic flags
   - Added : compatibility with 64bits modules
   - Added : detection for Xbox system
   - Fixed : access to some files not freed
   - Fixed : crash after viewing lib/obj file
   - Fixed : Malware code executed when viewing doubtful DLL

2.05 - 20.01.2005
   - Updated : Display compressed PE-EXE ( Winzip ) 
   - Added : automatic plugin installation (TC 6.5 and above)
   - Added : filename in save dialog
   - Added : add the same extention to the file in save dialog if none is given
   - Fixed : button name in save dialog
   - Fixed : crash lister with some UPX compressed EXE files (Maxthon.exe)
   - Fixed : unaspack crash with some compressed-EXE

2.04b- 13.09.2004
   - Added : can save unpacked file with CTL-S
   - Fixed : start COM server with linked extensions (excel, PSP, photoshop,...)
   - Fixed : cannot rename or delete no extension's file after viewing

2.04a- 03.09.2004
   - Fixed : start excel.exe with cvs/csv file
   - Fixed : Scrollbars lost in "Import" tab

2.04 - 01.09.2004
   - Added : save "sort" state in "Import" tab
   - Added : Dump of LIB, OBJ, EXP files
   - Added : register OLE components even if typelib info isn't present
   - Fixed : start excel.exe with xls/cvs file
   - Fixed : Hscrollbar lost when sorting in "Import" tab

2.03 - 09.07.2004
   - Added : Option to change the depth of analysis in DLL dependencies
   - Added : Fix for cygwin DLL Dumping (bugged)
   - Added : group DLL redondance found in Import table
   - Added : typelib information of TLB files
   - Fixed : crash in 'Image File Header' when EXE have no Import Table
   - Fixed : crash with some Cygwin compiled DLL ( in parts )
   - Changed : rewriting some part (speed up file analysis)

2.02 - 18.06.2004
   - Fixed : crash in 'Import/Export' when you click outside selections
   - Fixed : increase compatibility with some EXE files
   - Fixed : hang with damaged executables
   - Added : read some unconventional VersionInfo
   - Added : Option to sort functions in 'Import/Export' tab
   - Added : Jump directly to tabs with CTRL-( 1 to 8 )
   - Added : register/unregister activex library
   - Added : typelib information
   - Added : image for SH3, SH4, SH5, ARM and AMD64 processors
   - Changed : page order to be more usefull with autosave option

2.01 - 20.03.2004
   - Added : %COMMANDER_PATH% can be used in fileinfo.ini for plugin paths   
   - Changed : rewriting some part (less memory used and speed up file analysis)
   - Fixed : crash with compressed-exe holding delay-load import
   - Fixed : crash in 'DLL dependency' on other EXE type than PE

2.00 - 16.03.2004
   - Added : can use plugin to pre-analysing, decoding or unpacking executables
   - Added : 'Dll dependency' test now missing functions
   - Added : copy of exported function undecorate or not(in 'Imports' tabs)
   - Added : Depth of analysis in DLL dependencies can now be chosen
   - Added : Delayed Import Table added to Dump
   - Added : Import/Export tabs
   - Added : Function imported can be tested and missing functions will be shown
   - Added : version of windows added in 'File properties'
   - Changed : demangling of borland C++ more accurate (still some problems with multi-nested template)
   - Changed : Names of section more explicit
   - Fixed : VersionInfo of Visual Basic executables not shown correctly

1.99 - not released
   - Fixed : version resource of .VXD and .386 files not shown under WinNT
   - Fixed : version resource with long string not shown
   - Fixed : some version resource entries not shown
   - Fixed : incompatibility with some executable
   - Fixed : Import Table not shown with some executable

1.93 - 07.02.2004
   - Added : 'w' key to switch WordWrapping in property or Header page
   - Fixed : crash in "Resource Dump" with most compressed EXE
   - Fixed : multi-language FileVersionInfo wasn't working on Win9x

1.92 - 03.02.2004
   - Added : Read all non standard VersionInfo entries...
   - Added : Support multi-language FileVersionInfo (like TC 6.01, ;-)
   - Added : Registry entries are now automatically make up when missing
   - Updated : Split Option/Info page
   - Fixed : Wrong FileVersionInfoSize  (Block Size)
   - Fixed : bad DLL name
   - Fixed : missing DLL or Delayed DLL
   - Fixed : Check RE and related messages are definitively removed
   - Fixed : some strange keystroke behaviour
   - Fixed : crash when recall QuickView
   - Fixed : crash with some EXE files without "Version Information"

1.91 - 24.06.2003
   - Fixed : (NT4/Win95) first branch of the tree is now expanded by default.
   - Fixed : (NT4/Win95) "File Properties" and "Image Header" tabs doesn't show scroll bar correctly
   - Fixed : crash in "Import Table Dump" and "DLL Dependency list" with some EXE

1.90 - 05.06.2003
   - Updated : additionnal information for NE executable
   - Updated : additionnal information for LE executable (VXD,...)
   - Added : links to HTML homepage and e-mail
   - Fixed : don't autosave when iconized or maximized
   - Fixed : crash in "Export Table Dump" with some compressed EXE

1.80 - 23.05.2003
   - Updated : Display compressed PE-EXE ( UPX, aspack, manolo, peload, pepack, pe-prot, 
     peshield, petite, securom, shrinker, VBOX/TimeLock, VGCRIPT, WWPack32, PE-Compact) 
     some have not been tested.
   - Updated : Format of hexadecimal numbers
   - Fixed : crash in "resource dump" with some compressed EXE
   - Fixed : crash in "Dll dependency" with some compressed PE-EXE
   - Fixed : bug with "debug info" from CodeView
   - Fixed : multiple instance started (message error related to "richedit" library)
   
1.7 - 20.05.2003
   - Added : Option to show symbol table, debug Information and line number if disponible
   - Added : Option to dump resources ( partial, may crash with compressed EXE )
   - Fixed : bug with Richedit library 

1.6 - 16.05.2003
   - Added : Display Undecorated Symbol Name for Microsoft C++
   - Added : Display Unmangled Fonction Name from Borland C++ ( partial )
(Unmangled names are shown by an arrow (->))
   - Added : Read LE and VXD Executable Header Information ( partial, in development )
   - Added : Search for compressed executables ( DOS only, in development )
   - Added : Display Dos Header Information for all files 
   - Added : Extra Dos Header Information displayed
   - Added : Get focus to RichEdit control
   - Fixed : bug with filesize of open file (in win95/98/Me)
   - Changed : Move 'File Characteristics' to beginning

1.5 - 09.04.2003
   - Merged all version (95, NT, 2000, XP)
   - Added : Read Dos Executable Header Information
   - Added : Read NE Executable Header Information
   - Added : Read LX Executable Header Information
   - Fixed : Handle now All delay-load DLL (Thanks to Matt Pietrek)
   - Changed : Dynamic reading of File Header (speed when just looking at file properties)
   - Added : option to disable checking of registry entries

1.42- 04.04.2003
   - Fixed : use now correct fontsize 
   - Added : some code to check if registry keys for TC are valid ( essential for font choosen by users )
   - autosave option fixed
   - Fixed : time and date in Win95 version
   - More compatibility with old delay-load DLL dependency 
   - some minor bugs fixed
      
1.41 - 31.03.2003
   - Corrected : Use Font and size choosen by user
   - Corrected : special build for Win95 and NT4 (ver 1.41.95)

1.4 - 30.03.2003
   - Open all PE files 
   - Create special build for Win95 and WinNT ( < NT5 ) (ver 1.4.95)
   - Change Page with "CTRL-TAB" in QuickView mode also      
   - "Select all" and "copy" managed
   - Add option to autosave windows position and size 
   - Add option to remember the last page open 
   - Use Font and size choosen by user
( You can use CTRL-Wheel to change temporarily font size)
   - More compatibility with old delayed DLL dependency 
   - Correct bug with two fileinfo open at same time
   - Correct some minor bugs

1.3 - 26.03.2003
   - New interface 
   - Correct some tabulations
   - Show delayed DLL dependency
   - Tree of Recursive DLL dependency
   - Show Image File Header 

1.2 - 22.02.2003
   - Show static DLL dependency

1.1 - 16.12.2002
   - Change some code to allow using MFC
   - Correct some tabulations
   - Convert GMT time of file to local time zone
   - Regional settings are now taken into account for the Date

1.0 - 4.12.2002
   - Initial public release

-----------------------------
Send comments to the author :
François GANNIER  ( fgannier@physio-a.univ-tours.fr )
http://physio-a.univ-tours.fr/tcplugins/