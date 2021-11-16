VisualDirSize (former Directory Size) v1.2
plugin for Total Commander 5.51 and newer
========================================================================

These software are provided "as-is". No warranty provided.
You use this program at your own risk. The author will not 
response for data loss, damages, etc. while using or misusing 
this software. This plugin is freeware.

VisualDirSize provide a graphical overview of the files/folders
in a selected directory. You can view a chart by putting cursor on 
any directory and pressing 'Ctrl+Q'. Selected directory will be scanned
and files/folders size will be displayed as a bar chart in the Quick 
View panel. Such bar chart is useful for showing the relative size 
of files/folders. For instance: you can quickly locate the biggest
file/folder in directory. 
Warning: Because the way how the plugin works, it's not recommended
to use it on very big directories - delays might be pretty significant.


INSTALLATION
------------
TC 5.51

Copy visualdirsize.wlx file into your Total Commander plugins directory.
Next add the following line to [ListerPlugins] section in the wincmd.ini file:
0=C:\totalcmd\plugins\visualdirsize.wlx (Change path to your real one )

TC 6.5 and newer

This version of TC has "auto install plugin" feature. Just enter to archive
with plugin and TC ask you about plugin installing. 

If after pressing Ctrl+Q there is still the Total Commander default list displayed
for a directory entry, showing the directory info in plain text, 
move VisualDirSize higher up in the list of installed Lister plugins. 


USE
---
Put cursor on any directory then press 'Ctrl+Q'. Remark: there is no 
possible to execute plugin with F3 - plugin works ONLY with Ctrl+Q.
You can use the cursor keys and Home, End, PgUp and PgDn or SPACE
to scroll trough the bars.
You can mouse double-click a graph to drill into the corresponding subfolder 
and right double-click to go to parent folder.


LOCATION OF VisualDirSize.ini 
-----------------------------
VisualDirSize.ini will be saved in the same directory as Wincmd.ini by default.
If you don't like this location you can simply move the file to one of the following destinations:
 - In a subdirectory called "VisualDirSize" relative to the directory where Wincmd.ini is located
 - Plugin directory
 - Total Commander directory


HINT
----
Execute plugin, click right button on Total Commander's splitter and set "30/70"



Contact the author
------------------
Karol Zoladek (kzoladek@o2.pl)
Or visit official Total Commander Forum ( http://www.ghisler.ch )


HISTORY:
--------
1.0 beta  [08.08.2005] 
 - Initial public release
1.0 beta2 [08.10.2005]
 - Fixed displaying very big files/directories
 - Added possibility to use %COMMANDER_PATH% in IcoLibPath 
1.0 beta3 [08.13.2005]
 - Added option to show only directories (key 'S', show with files key 'A')
 - Added display total size of examined directory
 - Added real-time scrolling
 - Added Esc key when calculating folder size to cancel the operation
 - Added option to show percents instead file sizes (key 'Z')
 - Added option to show bars sorted by name (key 'X')
 - Some small corrections
1.0 [08.17.2005]
 - Fixed problem with alpha blended icons in WinXP
 - Fixed bug in scan code -> VisualDirSize sometimes showed wrong sizes
 - Fixed bug when using %COMMANDER_PATH% -> on close VisualDirSize overwrote
 	 the %COMMANDER_PATH% by the real path of IcoLibPath.
 - Some other small corrections
1.1 beta1  [09.01.2005]
 - Added buttonbar
 - Added pie chart
 - Added possibility to go thru catalogs
 - Added double-click a graph to drill into the corresponding subfolder
 - Added right double-click to go to parent folder
 - Added configuration dialog
 - Support for language files
 - Support for colors schemas
 - Added option to sort directories/files names like WinXp do. (works like SortUpper=3 in wincmd.ini).
   In other systems it's normal sorting.
 - Fixed Sometimes it was necessary to hold Esc key for long to stop calculating folder size
 - Other small improvements and fixes
1.1 beta2  [10.10.2005]
 - Changed plugin name to "VisualDirSize". Previous name sounds too similar to other TC plugins 
   and commercial programs
 - Added possibility to sort by number of files in directory
 - Added option to group by extension.
 - Added report generation function. There is three possible report types: HTML, plain text and graph image.
 - Added possibility to resize filename column in the bar chart. Simply click on the left bar border and
   drag the mouse to the right (to make wider) or left (to make smaller). Let up on the mouse button
   when the filename column is wide enough. Double click left bar border to resize filename column to default position.
 - Changed default location for VisualDirSize.ini. Now visualdirsize.ini will be saved in the same directory as wincmd.ini
 	 If you don't like this location you can simply move the file to one of the following destinations:
 	  * In a subdirectory called VisualDirSize relative to the directory where wincmd.ini is located
	  * Plugin directory
	  * Total Commander directory
 - Added option to watch changes in currently scanned directory. (works like WatchDirs=1 in wincmd.ini)
   It's not recommended to use this option on directories that changes regularly like firewall log directory
   or browser cache directory.
 - Fixed Plugin should works in systems older than WinXP
1.1 beta3  [10.14.2005]
 - Added Button to on/off watch changes in currently scanned directory (removed this option from configuration)
 - Added In Configuration checkbox to on/off automatically launch browser after HTML report is generated 
 - Removed visualdirsize.ini from distribution
 - Fixed Sometimes buttons on button bar were not visible
 - Some small fixes and internal improvements
1.1 beta4  [10.17.2005]
 - Some bug fixes and internal improvements
1.1 beta5  [11.01.2005]
 - Fixed problem with hiding config window
 - Fixed. Plugin should be more stable when switching folders fast
 - Some small fixes and internal improvements
1.2 beta1 [02.04.2006]
 - Added Filter option
 - Plugin currently works in Win95 WITH IE4.0 and above because of using PathMatchSpec API function. 
   MatchesMask() included in Delphi 7 contain still not corrected bug with "?". 
   See http://qc.borland.com/wc/qcmain.aspx?d=5744
 - Added possibility do change font in graphs
 - Added hint when resize filename column in the bar chart.
 - Plugin now works on [..] and show the chart for the current directory
   Note: plugin isn't loaded when put cursor on ".." in first directory on drive (like c:\directory\)
   because of TC lister plugin interface bug. Ghisler is informed about this. 
 - Fixed problem with displaying too long path 
 - Fixed problem with displaying 120 DPI fonts
 - Fixed problem with detecting "wincmd.ini" location. Now it's possible to get settings from TC Power Pack (extended edition of Total Commander)
 - Some small fixes
1.2 beta2 [03.05.2006]
 - Added button to go to parent folder. 
 - Changed default font for dialogs to Tahoma. Therefore plugin probably don't run in Win95.
 - Fixed. Sometimes plugin didn't get values from wincmd.ini after pressing "TC Searches" button.
 - Fixed. File name masks history extended to 20 entries in Scan Filtering dialog.
 - Fixed. Sometimes plugin didn't display bold font in "Show only directories" mode 
 - Fixed. Plugin now import the colors and font from the TC file panel setting not TC lister settings.
 - Fixed problem with saving pie chart.
1.2 [03.17.2006] 
 - Updated LNG files
