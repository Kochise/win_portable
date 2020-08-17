Readme.txt

hpg_ed.wlx - Total Commander's Lister Plugin

What it is:
===========
hpg_ed is a simple Total Commander's Lister plugin that can be used
to view AND EDIT(!) files. 

( If you do not know Total Commander (previous called Windows Commander)
you should take a look at the total commander website ;-)

hpg_ed supports (like many other lister plugins ;) systax highlighting
and can be configured with the included configuration dialog to support
other extensions.
Unlike other plugins hpg_ed is also an Editor (that why _ed ;). Just 
change to edit mode (Ctrl-E) and edit the current file.
The editor is part of the great RALib Delphi component package and is
exactly like the editor included with the borland delphi and c++ builder
IDE.

The following syntax highlighters are supported:
    PASCAL
    C++/C
    SQL
    Python
    Java
    VB/Basic
    HTML/XML
    Perl
    Ini-Files

You can use hpg_ed also with no syntax highlighter for plain text files.

Requirements:
=============
You will need Total Commander 5.5 or better

Version History:
================
see History.txt

Custom Keywords:
================
Since version 0.5.8:
You can use a list of custom keywords, classes, structs, variable names for
a file, folder, project or globally by using this feature.
Just include a comment (dependent on type of source) in the first 20 KB of a
file which is pointing to a file name (without path)
Example:
//...................... start of test.cpp
/*
	$res=myclasses.txt
*/
void xxx()
{
....
}
....

//...................... end of test.cpp

If hpg_ed opens the file it just looks at the first ~20KB of the file for a
"$res" term. If it found it it tries to load the file in a given folder order.
1. current directory of the loaded file
2. if it is not found it look into the direct parent folder
3. this continues up to the root folder

The syntax of the myclasses.txt (in this example, the name can be changed)
is very easy. Just place a single line for each class!

hpg_ed displayes a matching class (works with the current highlighter syntax)
using the reserved word color.

Because of the asynchronious load of the file you should use hpg_ed as fast as
in older versions and should not feel any difference in startup time. Probably
a little more cpu usage may be detected.



Credits:
========
Special thanks goes to:

R&A Lib - for the great Editor component
FirstZerg (Albert) for his great support, who helped me with samples 
of its iniview plugin :-)

Last but not least: Christian Ghisler for the great superb Total
Commander I used now for about 3 years.

Installation:
=============

New since hpg_ed 0.5.6:
The hpg_ed comes with its own configuration DLL hpg_ed_cfg.dll.
Just copy the DLL toghether with the plugin into any folder.
If nevertheless the hpg_ed display a message like 'Could not find ...dll'
copy the hpg_ed_cfg.dll to the Total Commander installation folder or
to your system32 (or system folder in win98/Me).


Total Commander 5.5:
--------------------
Locate you totalcommander ini file 'wincmd.ini'. Usually this file is either
located in your windows directory or in the installation folder of total 
commander. 
Open the ini in your editor.
Locate the section ListerPlugins. 
   If not already there add the section like:
      [ListerPlugins]
Add an entry i.e. 
   1=c:\program files\hpg_ed.wlx

(assuming hpg_ed.wlx is located in c:\program files)
    
Done.

If you now display an associated file type i.e. .cpp file in total commander
press F3 and the hpg_ed plugin will be used.
You may also use the quick view feature by pressing Ctrl-Q.


Total Commander 5.51:
---------------------
Goto settings/viewer/Configure internal viewer
Select add and locate the hpg_ed.wlx file.
Press ok.
Done


If you now display an associated file type i.e. .cpp file in total commander
press F3 and the hpg_ed plugin will be used.
You may also use the quick view feature by presing Ctrl-Q.


Comments, suggestions, remarks etc.
===================================

Please use subject 'hpg_ed ...' so I can find the emails in the number of
spam mails I received every day :-(

   mailto:hpg666@hotmail.com

You may also send me donation by using the following link:

   https://www.paypal.com/xclick/business=hpg666%40hotmail.com&item_name=donate+hpg_ed+%3A-%29&item_number=general+donation&amount=2.00&no_note=1&tax=0&currency_code=EUR

---


