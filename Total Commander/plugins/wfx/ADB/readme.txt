Android ADB

The ultimate Android Total Commander file system plugin with extra features:

- Apps management (Install, Uninstall and Backup your apps, Add shortcut to launcher)
- APK icons and metadata with custom columns (does not download APK files to PC)
- Backup and Restore on ICS
- LogCat/BugReport/Dmesg (Copy file from folder), Shell
- Reboot menu with (Reboot, Hot Boot, Recovery, Download and Power Off)
- Screenshots (Copy file from .screenshot folder)
- Clipboard (set and get your device's clipboard)
- Multiple devices with device rename functionality (friendly name)
- Bookmarks and WiFi auto-connect
- Rooted, semi-rooted and non-rooted devices
- Full unicode support
- x32 and x64 support
- TC command line integration
- Background copy/move
- Owner and Group custom columns
- Full file system management (download/upload recursive directories, copy, delete, rename, move, edit, view, overwrite confirmation and more, chmod and chown preserveration)
- Copy/Move between 2 devices
- Set/Get file attributes/permissions - Change Attributes action in Total Commander
- ADB USB and wireless ADB (no need to install Android SDK)
- Auto mount support
- Debug logs
- Rich settings

Please, leave your comments, suggestions and bug reports in the plugin discussion page.

Requirements:

- Enabled "Android debugging" on your device
- Device connected to USB with proper drivers (an ADB device must be listed in Windows Devices)
- WiFi ADB (a rooted device with the "WiFi ADB" app downloaded from Google Play)

What's New:
6.6
- Update: cp/mv calls check the result string for errors

6.5
- New: Option Preserve mode and owner of updated file

6.4
- New: Option for ls -a added, if used on older Android versions no file list will be returned (the parameter is missing on older versions)
- Update: ADBHelper stores temporary files in sdcard/tmp/ (new ADBHelper version)

6.3:
- New: Add shortcut to launcher for newly installed APK - new option and feature added
- Update: ADBHelper upgrade procedure - checks for version and installs new if required
- Update: ADBHelper - support for launcher shortcut icons added

6.2:
- Update: dmesg support via "su -c" if permissions problem

6.1:
- Update: ADB Helper - support for Android 4.2 added
- Update: Backup progress dialog proper parent handle supplied (dialog will be lost behind the TC window), Backup/Restore data counter updated in 128kB chunks

6.0:
- New: ADB Helper added (special app installed to Android device to provide clipboard and other features, first launch and installation might take a bit longer)
- New: Clipboard support (via ADB Helper)
- New: APK information provided via ADB Helper (APK does not need to be downloaded to PC to get the information and icon!)
- Update: Non busybox ls cannot use "ls -la" because older versions of Android do not support the param, we have to use "ls -l" which does not display hidden files - no way to work around this
- Update: ADB binaries updated

5.8:
- Update: App listing in special non-rooted case (pm command used)

5.7:
- Update: Shell path escaping added for all path operations, added escaping for "\$

5.6:
- Fix: Power menu - reboot to bootloader fixed

5.5:
- Update: Shell command also uses auto mount and "su -c" if commands fails (integration with TC command line)

5.4
- New: 2 new options added, Threshold to use the SDCard directly for large file transfers and retry failed transfers with busybox, mount and sdcard if transfer fails (file will be transfered 3 times...)
- Update: New way of timeout implemented for "mv" and "install", the timeout considers the file size being transferred and does not interrupt ongoing shell commands

5.3
- Fix: Transfer of files larger than 2GB fixed

5.2
- Fix: Multiple apks with dash handling updated
- Update: symlinks in root with failed busybox get displayed as directories

5.1
- Fix: Put file vs. date before 1980 problem fixed

5.0
- New: APK install error handling - a proper error is displayed explaining why app could not be installed
- Update: Some small tweaks

4.9
- New: SD Card detection mechanism added, detects SD card for each device ID and caches it, solves problem with using SD card as temp dir in some cases

4.8
- Fix: Put file uses 2nd mode param, fixes a problem with putting files containing "," in their names

4.7
- Update: Busybox ls uses the "-e" parameter to return full time. Parser update. Fixes an issue with TC Synchronize Dirs... (fully working now)

4.6
- Update: Plugin release vs. forms free vs. handle solved once for all
- Update: Find files enhanced - special mechanism added to detect if user browses folders or TC itself (determines if dialog should be opened or skipped (Backup, Shell, Power))

4.5
- New: Backup and Restore support (ICS only)

4.1
- Update: ReadData timeout param implemented, pm install (Install apps) extended timeout to 1 minute (large apks sometimes take long)

4.0
- New: Auto connect for WiFI ADB support, works well with bookmarks - you create a new bookmark and then simply open the folder, it will automatically attempt to connect to that device (without Connect To Device) if not already connected
- New: Bookmarks support added (for WiFI ADB only) - Use F7 to create a new device bookmark (name it and then specify the connect to device value), in order to remove the bookmark do not use F8 (it will delete all your files in the device), rename to "." instead - that will clear renamed devices and also remove bookmarks
- Fix: Clear renamed device (rename to ".") fixed, data is saved

3.5
- Update: Install/Uninstall - result properly checked - in case of error TC displays an error
- New: File Copy - Overwrite handling added - TC displays an Overwrite dialog automatically

3.4
- Update: Screenshot functions - supported 16bit, 24bit and 32bit depth

3.3
- New: Screenshot function uses internal functions and java is not used anymore (uses native ICS "screenshot" command or adb framebuffer:) (faster screenshots and file transfer progress)
- Update: Install and Uninstall in .apps folder does not use adb binary, push and pm command is used (allows you to see the file transfer progress)
- Update: In special cases native linux command used when "Permission denied" response detected

3.2
- Update: .apps folder with no apps but some files still displays the content
- Update: In special cases native linux command used when "Permission denied" response detected

3.1
- Update: Options dialog - Links clickable, added Official Web and Forum links
- Update: File time preserved for pulled and pushed files (Note: on some ROMs time cannot be set via ADB when file pushed and defaults to current time)

3.0
- Update: .reboot renamed to .power, Hot Reboot label used, Download and Bootloader actions added
- Fix: File List - new SIV_DelimTrim method introduced, does not trim spaces in the value of filename (fixes issues with filenames containing multiple spaces after each other)

2.9
- New: File listing - Symlinks get displayed in the Info column
- Update: FTP connection toolbar - logs not truncated anymore, full text length supported

2.8
- New: Reboot action contains a new popup menu with these options: Reboot, Hot Boot, Recovery, Download, Power Off (some of them require a rooted device)
- Update: Connect To Device causes a refresh of file listing

2.7
- Fix: Device name with spaces fixed, support for device name with spaces added for screenshots and others
- New: New Windows Job Objects option (turn off if you use your own adb in system PATH)

2.6
- New: .apps listing - if permissions denied to /data/app/ then "pm list packages" is used instead (works on emulator and non rooted phones - you can still uninstall and install apps)
- Update: Rename device - Checks device name collisions better
- Update: File listing - Filter still opens a blank folder

2.5
- New: Rename your device via F2 (you can name your device to a friendly name, to clear the name back rename to "_")
- New: Custom column Info, displays app (apk) Name and Version if columns and APK info enabled
- New: Custom columns Owner and Group, new option to disable custom columns, file item cache
- New: .dmesg special folder added, delete file in .dmesg directory clears the log ("dmesg -c")
- New: Job Objects used for executed applications so when TotalCommander stops all its executed childs (adb, aapt and java) will be stopped too (helps with plugin updates and others)
- New: Total Commander FTP connection toolbar support added - for executed commands in command line and for new option "Debug logging to FTP connection toolbar"
- Update: APK file properties dialog (Alt+Enter) displays also app permissions
- Update: Delete file in .logcat directory calls "logcat -c" to clear the log

2.2
- New: File transfer abort support added
- New: Symlink indicated by "SysFile" attribute - the only possible indication that TC handles (displayed as "!" icon overlay)
- New: File attributes - SUid/GUid/Sticky-Bit support added
- Update: Symlink - busybox ls uses the -p param to idenfity a dir or file, native ls assumes all symlinks are files except for root in such case it will directories (no other effective way to detect file or directory :( )
- Update: busybox vs. native ls format detection updated
- Fix: /dev/ file listing fixed

2.1
- New: .bugreport special folder added
- Update: Options - Debug tab jumps to end
- Update: .logcat folder (Copy file from .logcat folder)
- Update: File listing - file size not shown for non-file / items
- Update: Special folder files (screenshot, logcat, bugreport) have new filename template

2.0
- Update: .apps dir can always be entered
- New: File version information resource added

1.9.1
- Update: Options dialog contains a new OK button
- New: Options item in the root of the plugin

1.9
- Fixed dialog modality and parent window
- New: Background copy/move support added

1.8
- Fix: Move (F6) from or to device deletes file properly
- Fix: Date long in the past problem fixed
- Update: Pull file workaround for /system /data files when ADB Pull fails because of semi-rooted device and permission denied - file copied to sdcard and then copied automatically

1.7
- Binaries moved to bin dir, aapt added
- APK Icon and metadata support added, new fsplugin.ini variable to disable APK download and icon extraction
- APK properties (Alt+Enter) support added - displays the Name, Package and Version information
- Options dialog added (Alt+Enter at the plugin) - all options can be set here, readme.txt displayed and debug.log viewed

1.6
- Debug log support added - enable in fsplugin.ini
- LocalTZLS new ini variable added (fsplugin.ini) controls if ls returns time in local or UTC format
- ls - detection of ANSI escaping and removing for non busybox ls

1.5
- Set/Get file attributes/permissions - Change Attributes action in Total Commander
- adb binary - also added AdbWinUsbApi.dll
- ls syntax detection improved
- Auto mount working for semi-rooted devices
- Push file workaround to /system files when ADB Push fails because of semi-rooted device and permission denied (mount does not help here) - file copied to sdcard and then moved to /system automatically

1.4
- adb binary included (works only with the connect feature) - no need to install Android SDK
- "busybox ls" not used because utf8 is not supported (https://dev.openwrt.org/ticket/7993), ls syntax detection improved, new option to switch back to busybox ls in fsplugin.ini
- Execution operations full unicode
- An error is displayed if Java could not be run
- Copy/Move between 2 ADB devices support added

1.3
- Proper way to detect PluginDir
- x64 support
- TC command line integration

1.2
- Auto mount rw for rooted devices when required
- Better detection of the plugin dir used
- Settings stored in fsplugin.ini, support for ADBPath and JavaPath variables
- About window with name and version added

1.1
- Special device folders - Apps, Screenshot, Shell, LogCat, Reboot
- Full unicode support
- Remembers the last connected device IP:Port

1.0
- Initial release


Links:
http://ghisler.ch/board/viewtopic.php?p=252125
http://www.totalcmd.net/plugring/android_adb.html
