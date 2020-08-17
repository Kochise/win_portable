This software is provided "as is" and is without warranty of any kind. 

Ah-oh, forgive me for my english :D

'AceHelper' is file-system plugin for TotalCommander, displaying information on runned processes.


SYSTEM REQUIREMENTS
-------------------
 * 2 MB free hard drive space
 * Windows 2000/Windows XP and later
 * Total Commander v6.51 or higher


Functionalities of version 0.3.2:
----------------------------------------
 * Synchronous and asynchronous dialog modes.
 * Dynamic tracking of use by a plugin of processor time, and tuning under the set critical limit.
   (Can lead to change of set time of updating of the information on process)
 * Interactive management of adjustments of a plugin
 * On F5 - record of report on process ( + F3 for viewing the report)

* Bookmark 'General'
   - Display of almost full information on working process.
   - An opportunity change of process priority.
   - An opportunity removal from performance of the chosen process (down to compulsory system removal).

 * Bookmark 'Modules'
   - Display of information on loaded modules (used) by these process.
   - An opportunity injecting modules to the chosen process.
   - In the list on the right pressing works as the menu with an opportunity of a redirect on one of panels
     TotalCommander, or opening of standard windows-dialogue of properties of a file. (the redirect works
     only in asynchronous mode of dialogs)
 
* Bookmark 'Threads'
   - Display of information on threads started by these process.
   - An opportunity of suspend/resume/terminate of threads

 * Bookmark 'Handles'
   - Display of information about opened by this process of events/files/registry keys/drivers/etc.
   - An opportunity of sorting and display on the chosen filter.
 
* Bookmark 'Memory'
   - Display of information on memory used by this process.
   - In the list on the right pressing works as the menu with an opportunity to open the given region in separate
     bookmark for viewing dump of memory. The bookmark with dumps can be closed by choice command 'Close', in the
     drop-menu at a clique on active bookmark.

 * Bookmark 'Windows'
   - Display of information on windows created by these process and their properties.
   - Possibility of the change the styles.
 
 * Bookmark 'Graph'
   - Graphic displays of statistics of runned process (both real-time, and history modes).
   - Double click of mouse left button inwardly zoomer-control allows to change a view-mode (cycle).

 * Bookmark 'Logging'
   - Run-time logging.

 * Since XP there is bookmark 'TCP/UDP'.
   - Display of information on opened ports and the established connections.
   
 * Bookmark 'PEB'
   - Display of information on process 'PEB' structure.
   
Near future:
------------
 * Improvement (addition functionality) in a bookmark dump of memory.
 * Graphic display statistics on threads of module chosen for tracking.
 * Bookmark 'PEB'


History of versions:
--------------------

0.2.6
 * Fix: Escape in dialogs of process now works.
 * Fix: List priorities of process it is made on increase.
 + Add: Management of adjustments of a plugin through dialog of properties.
 + Add: New bookmark 'Handles'.
 + Add: Threads can be suspened/resumed.
   
0.2.7
 * Fix: Display conditions of threads in bookmark 'Threads' is corrected.
 * Fix: WaitReason in bookmark 'Threads'-> the decoded condition of the reason of expectation now is displayed.
 + Add: The opportunity to open a bookmark for viewing dump memories of the chosen region.
 - Atn: Long scanning huge (> 10000) quantities opened by process handles, because of what dialogue of properties
        process (at the start) cannot display info about this process. It has been noticed on ' MS Visual Studio '
        after three days of work without closing :)

0.2.8.
 + Add: New bookmark 'TCP/UDP'. While only with XP and later, all because of iphlpapi.dll. But, probably it will
        be possible to make and for W2k, through the interface ' \Device \TCP ', ' \Device \Udp '...

0.2.9.
 * Fix: Cosmetic changes in a code of a plugin (optimization of a code). Preparation to uploading bodies of a plugin
        on a site, in native flight of the relatives :)
 + Add: In a multi-dialogue mode the check-boxing is accessible: 'Topmost'

0.3.0
 * Fix: Has altered system of tracking process. Has excluded use of unreliable function GetProcessVersion
 
0.3.1
 * Fix: For reduction of the size of a plugin i have cleaned some excessive types of icons from resources.
 * Fix: If the display is not established in a mode 32bit - use AlphaBlend on graph-bookmark compulsorily is forbidden.
        Ini-file does not change...
 * Fix: I hope, that has won division into a zero at scaling on a bookmark of the graphic information.
 * Fix: The Ini-file is not put any more in archive of a plugin. Plugin writes it on a disk if such has not found
        at start.
 + Add: End of process on F8.
 + Add: F3/F5 - Output text information on process. The section, deduced in the given information are adjusted in
        an ini-file, or through dialogue of properties of a plugin.
        On F5 - if destination file has extension '.exe' - will be compulsorily added '.summary'.
 + Add: In bookmark, on pressed right button of mouse, available choice - 'Copy line to clipboard'.

0.3.2
 + Add: Ctrl+Tab now switches the bookmarks.
 * Fix: In a bookmark ' Graph ' - zoomer-control ' PF usage ' is replaced with display of total opened handles.
 + Add: Bookmark ' Windows' - properties of work with windows (change of position and styles, a transparency)
        are expanded.
 + Add: The logging bookmark of process is added. While a feeler, it is possible to throw wishes in comments
        on page of a plug-in www.wincmd.ru, or me by mail.
 + Add: Bookmark 'Graph' - Management of work with schedules is altered.
        There was an opportunity to operate in scale of display, to operate deduced objects.
        The screen is divided into areas of management:

                        -----------------------------------------------
                        |           |                |                |
                        |    A      |                |        Ñ       |
                        |-----------|                |----------------|
                        |           ------------------                |
                        |--------   |                |   -------------|
                        |    F  |   |       E        |   |    G       |
                        |--------   |                |   -------------|
                        |           ------------------                |
                        |-----------|                |----------------|
                        |    B      |                |        D       |
                        |           |                |                |
                        -----------------------------------------------

        A,B - Left/right cliques/keepings of the mouse at a Y-scale - increase/reduction in a scale.
        F   - Left cliques leads to automatic scaling on a minimum/maximum of a signal. Right cliques
              leads to scaling on the maximal-set values for the schedule.
        Ñ   - Left cliques - inclusion/deenergizing of an additional screen of the schedule of history.
        D   - Left cliques - inclusion/deenergizing of a conclusion of the summary-information.
        G   - Left/right cliques/keepings of the mouse in this area - increase/reduction in scale X.
        E   - Double cliques in this area - change of a mode of display (while two modes).

        In connection with introduction scaling - from the left party of schedules display of
        information on a level a signal, concerning the maximal values is added.

0.3.3
 + Add: Opening Permissions dialog for view/edit security. Work an bookmarks:
                'Modules'
                'Handles'
                'Threads'
        Choice from popup-menu an right click mouse.
 + Add: New bookmark 'PEB'. Read-only yet. I wait comments about what you want to see...
 + Add: New root-entry 'DeviceDrivers' (KERNEL modules). This is a first stage yet, I wait
        comments about what you want to see...

To install plugin, proceed as follows:
--------------------------------------
 1. Unzip the archive to an empty directory
 2. Choose Configuration->Options->Operation->FS-Pugins
 3. Click "Add"
 4. Go to the directory where you unzip the archive and choose AceHelper.wfx
 5. Click OK. You can now access the plugin in "Network Neighborhood"



Autor
-----
Alexey U. Smirnov (Ace)
mailto: botace@gmail.com