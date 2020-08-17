***************************************************************************
***                            Registry timelines                       ***
***************************************************************************
To extract registry timelines for forensic purposes you can use the
Registry plugin for Total Commander 5.51 and newer from Vitaly Knyazev.

****************************************************************************
************* Export Registry Timelines from local system ******************
****************************************************************************
1.) Change the properties of registry plugin to:
    NO  - Export using UNICODE
    YES	- Export with timestamp 
    NO  - Export/view binary values as binary file
    NO	- Show add value
    YES - Use special symbols conversation
    NO  - Export Multiple Keys at once
2.) Open registry with the plugin
3.) Copy selected Hives
    e.g. \\\Registry\HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\Java Runtime Environment\
    from the Registry to a file (e.g. JavaRuntimeEnvironment.reg_ts) with timestamps.
4.) You can edit or sort the file with your favorite tool.

You don't need UNICODE files for English or German installations.
Maybe with other localisations, you should use the UNICODE Export functions.
Only if you need; switch on "export UNICODE".
An UNICODE editor of your choice can be used to edit and sort the files.
You can also try to convert the UNICODE files to ASCII - you will loose some
information, but ASCII is easier to handle.
1.) Load UNICODE file in Notepad
2.) Save file with ANSI format.

***************************************************************************
************* Import Registry Files from a target system ******************
***************************************************************************
The procedure can be used also to transform registry files from other systems.
1.) Copy registry files form target system to your PC. 
    Win XP: c:\windows\system32\config\
    SAM, SECURITY, software, default, userdiff, system
    - Offline you can use KNOPPIX
    - Online you can use the NTFS-plugin for Total Commander
      (http://fssuite.diskinternals.com/tc/download/ntfs4tc.zip)
2.) Open regedit/regedt32 on your PC (you should be administrator)
3.) Choose HKEY_USERS (or HKEY_LOCAL_MACHINE)
4.) File --> Load Hive   (e.g. load registry file "software")
5.) Choose unique Hive name (e.g. software_target)
6.) Some HIVES are ACL protected. You have to change the permissions (SAM and SECURITY)
    (some timestamps of these imported HIVES will be overridden)
7.) Open Total-Commander Registry Plugin
8.) Go to HKEY_USERS, you should find your loaded registry Hive (e.g. software_target)
9.) Copy "software_target" to your forensic folder.

***************************************************************************
************* Sort Timelines files with Unix-Tools*************************
***************************************************************************
1.) connect all registry files
       cat *.reg_ts > reg_ts.all_blocks
2.) cut only lines with timestamp at the beginning
       grep "^[0-9]\{4\}.*" reg_ts.all_blocks > reg_ts.all_lines
3.) sort the lines
       sort reg_ts.all_lines > reg_ts.all_lines_sorted

***************************************************************************
************* Sort Timelines files with Ultraedit *************************
***************************************************************************
The generated Regedit4 files can be sorted with Ultraedit in two ways,
a) Use only the HIVES with timestamps, and delete the Registry KEYs blocks
(windows don't store a timestamp for single registry keys, only for hives)
===========================================================================
1.) Load file in Ultraedit
2.) Run Makro "block_cuts"
3.) Sort
4.) Save sorted Registry timeline file!

b) Transform files to one line per timestamp, sort and transform back
===========================================================================
1.) Load file in Ultraedit
2.) Run Makro "blocks2lines"
3.) Sort
4.) review file and delete broken lines.
5.) Run Makro "lines2blocks"
6.) Save sorted Registry timeline file!

***************************************************************************
*************  Ultraedit Macros  ******************************************
***************************************************************************
Macro: blocks2lines
delete Regedit4, "\n\n" and transform \n\t to placeholder abcde_1234_wvxyz
===========================================================================
InsertMode
ColumnModeOff
HexOff
UnixReOff
Find RegExp "%REGEDIT4^p^p"
Replace All ""
Find "^p^t"
Replace All "^tabcde_1234_wvxyz^t"
Find "^p^p"
Replace All "^p"

Macro: lines2blocks
insert "\n\n" and transform placeholder "abcde_1234_wvxyz" to "\n\t"
===========================================================================
InsertMode
ColumnModeOff
HexOff
UnixReOff
Find "^p"
Replace All "^p^p"
Find "^tabcde_1234_wvxyz^t"
Replace All "^p^t"

Macro: block_cuts
delete Regedit4, "\n\n" and all lines with regkeys
===========================================================================
InsertMode
ColumnModeOff
HexOff
UnixReOff
Find RegExp "%REGEDIT4^p^p"
Replace All ""
Find RegExp "%^t*$"
Replace All ""
Find RegExp "%^t*$"
Replace All ""
Find RegExp "^p^p"
Replace All "^p"
Find RegExp "^p^p"
Replace All "^p"
Find RegExp "^p^p"
Replace All "^p"
Find RegExp "^p^p"
Replace All "^p"

version: 1.0 (c) uwe danz - 15th of January 2005
Please send your comments to "tcreg(at)hinterfeld(dot)de".

