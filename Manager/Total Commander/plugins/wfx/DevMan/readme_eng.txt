	Device Manager 1.4 - plugin for Total Commander 5.50 and newer
                       Improved Windows Device Manager.
____________________________________________________________________________

			To install plugin, proceed as follows:
 1. Unzip the archive to an empty directory
 2. Choose Configuration->Options->Operation->FS-Pugins(WFX-plugins)
 3. Click "Add"
 4. Go to the directory where you unzip the archive and choose devman.wfx
 5. Click OK. 
 6. (!) To use remove devices feature, copy devcon.exe in a \Windows\System32\ 
    folder.

 You can now access the plugin in "Network Neighborhood" as "Device Manager"
____________________________________________________________________________

 				Features:

    + Displays ABSOLUTE ALL devices installed in system;
    + Displays device properties dialogue by pressing ENTER;
    + Able to create a set of drivers for already installed devices(F5)(reserve
      copying of drivers);
    + Able to delete devices(F8);
    + Able to call Device Problem Wizard by pressing Alt+Enter;
    + Display of a brief information on the device on pressing F3.

 Tested under Windows 2000,XP. 9x/ME not supported.
 Devcon.exe - 32BIT version.
 You must have Administrator rights.
____________________________________________________________________________

 (Ñ) 2005 Ryabinin Alexey
  mailto:alexious@bk.ru

 Devcon.exe - freely distributed utility, (Ñ) Microsoft Corporation.
____________________________________________________________________________

				     F.A.Q.

 Q: Why all icons are greyish? On my color scheme (grey panels) they are looks
    horrific. Whether it is possible to make them more brightly?
 À: It is possible, but I so shall not make, since these icons do not go with 
    a plug-in, and undertake directly from system, for economy of the size of 
    a plug-in. Try another color scheme.

 Q: Whether it is possible to add support Win98? Simply not everyone use XP.
 A: Unfortunately support 98/ME is not possible. It not my whim, this is
    Specificity OS. Under 98 is possible only display the list of devices. Opening 
    dialogue of properties for the device, creation a set of drivers, etc. - 
    impossible. In Windows SDK about it is not present words, and experimentally
    I could not understand. Therefore 98 also is not supported. Probably, will appear
    version under 98/ME, but from all functions of a plug-in remain only reserve
    copying of drivers (IMHO the most important function).

 Q: What for the opportunity of creation of a set of drivers is made? I have 
    driver on a compact disc from the manufacturer, and I always install drivers 
    from him.
 A: It is necessary first for system administrators. It is possible to collect 
    all drivers in one folder,necessary to system and to not search for a disk the 
    driver(that is especially actual for Internet-Cafe,where CD ROM on each machine
    you will not plug). Besides, some device manufacturers make out drivers as 
    exe-files, where with main driver files installed also additional features, 
    not always necessary(IMHO). For example: Creative EAX Demo, Acer On-line
    manual,etc.

 Q: Why for my soundcard Creative SB LIVE! 5.1 standard Windows Device Manager
    shows files which are not present in a set of drivers?
 A: Some driver files of soundcards are delivered with Windows. For example,
    ks.sys. Especially it is appreciable for the integrated soundcards.

 Q: Why a plug-in does not work :( ?
 A: Write to me e-mail with the detailed description of a problem, and wait for a
    answer on your question.
____________________________________________________________________________

				 Version history

 1.4. (04.10.2005)
      + Able to remove devices by F8 (With use devcon.exe utility);
      + Small bugs are fixed.

 1.3.(28.09.2005)
      + The algorithm of searching drivers for devices is changed;
      + Small bugs are fixed.

 1.2.(16.09.2005)
      + Able to call Device Problem Wizard by pressing Alt+Enter;
      + Able to display brief information of the device by pressing F3;
      + Devices are marked by icons;
      + Small bugs are fixed.

 1.1.(15.09.2005)
      + Able to create a set of drivers for already installed devices added;
      + Now the tree of devices is in the root catalogue of a plug-in.

 1.0.(07.09.2005)
      The first release.