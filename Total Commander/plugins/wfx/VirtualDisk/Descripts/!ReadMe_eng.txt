Virtual Disk, Version 1.3.3 Final
  FS-plugin for Total Commander that allows to mount disk images as additional virtual
  drives in system.

Author of the plugin: Konstantin Vlasov, 2012
Homepage: http://flint-inc.ru/
E-mail:   support@flint_inc.ru

The driver is based on the open-source project FileDisk by Bo Branten, 2009
Homepage: http://www.acc.umu.se/~bosse/
E-mail:   bosse@acc.umu.se

Source code of the modified driver and command-line tool is available at
http://flint-inc.ru/eng/info/virtualdisk.html


Description
-----------

This plugin allows to mount disk images as additional drives. It works only under WinNT
systems starting with Windows 2000 (32- and 64-bit).
When an image is mounted, there is a new drive appears in the system. Its letter is
specified earlier, and the new drive contains all the content of the image file.

The following three modes are available:
  1. HDD - emulation of local hard disk drive. In this mode one can mount images of single
     partitions of hard drives formatted in FAT or NTFS system, and also images of floppy
     diskettes and flash-drives with the FAT file system.
  2. FDD - emulation of floppy drive. This mode allows to mount all the same images as
     in HDD mode, except for the NTFS partitions (Windows does not allow to use NTFS on
     floppies).
  3. CD/DVD - CD-drive emulation (from the point of view of the system, there is no
     difference between CD and DVD). This mode is used for mounting CD- and DVD-disk
     images. One can use ISO format and sometimes - BIN- and NRG-images. (Unfortunately,
     the exact information, when BIN- and NRG-images can be mounted, is absent.)

Also for the HDD and FDD modes there is the "Read only" modifier that allows to disable
modifying of the image mounted. CD-drive emulation is always performed in Read-Only mode.


Installing
----------

For installing the plugin, just open its archive in TC panel, and TC will suggest to
install the plugin automatically. If you have auto-installation function turned off,
please, refer to TC documentation on manual plugin installation.

After that, it is necessary to install the driver which is needed for the plugin to work.
Call the context menu for the file vd_filedisk.inf in the VD_Driver subdirectory located
in the plugin installation directory and select the "Install" command. The system will
then install the driver vd_filedisk.sys and ask to reboot the computer. Note that
rebooting is necessary for the driver (and hence the plugin) to work!

  If you don't have the "Install" command in the context menu of the INF-file, you can
  use the old methode of installing the driver: copy the vd_filedisk.sys file in the
  \Windows\system32\drivers\ folder, then import the file vd_filedisk.reg into the
  registry by double-clicking it, and restart the computer.

IMPORTANT!!!
In 64-bit Windows versions all the operations described above on installing the driver
must be performed only from Windows Explorer or 64-bit Total Commander! If one performs
them from 32-bit TC, the driver will not be installed, because 32-bit applications in
64-bit Windows work in the 32-bit environment emulation mode, and the driver will be
installed into SysWOW64\drivers instead of system32\drivers, so the system will be unable
to load it.


Work with plugin
----------------

After installing a new folder appears in Total Commander's Network Neighbourhood -
"Virtual Disks". In this folder a list of image files is present. At first this list is
empty. To add images just copy image file in plugin's folder. The image is not copied
itself, plugin just remembers a link on it. To exclude the image from the list, simply
delete it by usual way - original file will not be corrupted or deleted.

For customizing the image parameters, press Enter or Alt+Enter, or just select
"Properties" from right-click context menu. The Properties dialog will appear. In this
dialog you can see full path to the image file, its current status (mounted/unmounted),
and also you can select drive letter and mounting mode (HDD/FDD/CD).
To mount image press Mount button. If the image is mounted, the Unmount button is shown
instead.

On rebooting the computer all mounted images become unmounted. There is an option "Mount
on reboot" that allows to remount the necessary images back: if the image was mounted just
before the reboot it is mounted again, else it remains unmounted.
If some errors occur during this auto-remount process, they are written into log file
VirtualDisk.log that is present in the plugin's folder.


IMPORTANT NOTES for work with plugin:
-------------------------------------

1. In Windows 2000 the driver allows users to mount images without checking NTFS
   permissions. In WinXP and later this problem is not present.
2. When working in multiuser environments, it is impossible to mount images of the same
   type from different user accounts. Besides, you cannot mount an image if there is an
   image present mounted using the vd_filedisk.exe tool, you'll have to unmount them
   first. These two problems will be fixed in future versions of the plugin. If they are
   vital for your work, please use the vd_filedisk.exe tool only.
3. It is not recommended to mount/unmount images from different Total Commander instances.
   There can be a situation when one copy of TC says the image is mounted, and another one
   says, that it is unmounted. In most cases such conflicts should be resolved
   automatically but this aspect is not tested thoroughly enough. If you meet such a
   problem, there is an additional button on Settings dialog named "Toggle state". This
   button just toggles the software flag of mounting and does not perform any real actions
   with the images.
4. CD-images can be mounted only in CD-mode, FAT-images in HDD and FDD modes, and
   NTFS-images only in HDD mode. Otherwise the image will be mounted, the virtual disk
   will appear, but on trying to access it you will get the error that the drive is not
   formatted.
5. The new drive is not visible for programs that get drives list from list of system
   devices. This is so, because this new drive is not a system device but just a logical
   drive. In future versions I'll try to add creation of the appropriate system device.
6. In Windows 2000 formatting mounted images into FAT does not work. This is a known
   problem of the driver, the fix is not planned.
7. Applications started with elevation will not see the virtual drives mounted with normal
   privileges. Therefore, trying to launch e.g. an installer from the virtual disk will
   fail. The cause of this problem is that virtual drives are created for the current
   user, and installer works from the Administrator account. To install the application
   from the disk image, you need to unmount the image, launch TC as Administrator, then
   mount the image and start the installer from the virtual drive.


FAQ (Frequently Asked Questions)
--------------------------------

Q. I've installed the plugin, try to mount an image and get the error:
     Error while creating the virtual drive!
     The driver is probably not installed.
A. For the plugin to work it is necessary to install the driver; it should be installed
   manually, automatic installation of the plugin in TC does not install the driver! How
   to install the driver you may read above, in the section "Installing".

Q. On trying to mount the image I get the following error:
     Error while creating the virtual drive!
     There are too many drives of this type mounted already.
A. By default, the driver allows to mount only 4 devices of each type (i.e. 4 virtual
   FDDs, 4 CDs and 4 HDDs). If you need more, you may change this value in the system
   registry:
     [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\VD_FileDisk\Parameters]
     NumberOfDevices=dword:00000004
   After that you'll need to reboot the computer.

Q. When mounting the image the new drive is created, but I cannot access it: an error is
   shown.
A. This means that the format of the image is not supported by the plugin (more exactly -
   by the driver). Make sure that you haven't accidentally mounted CD/DVD-image as HDD or
   vice versa. Also note that the set of supported formats is currently very limited (see
   the section "Description" for details).

Q. In my Windows x64 the plugin does not mount images. What's wrong?
A. Maybe, you have installed the driver incorrectly. In 64-bit Windows systems the driver
   should be installed only from Windows Explorer, not from Total Commander, because TC is
   a 32-bit application; for such applications Windows x64 substitutes the system folders
   and registry keys. As the result, the installing of the driver is performed into a
   wrong folder.


Just in case, I write here this WARNING:
----------------------------------------

My plugin works with low-level Windows functions, and this is not safe. I cannot guarantee
that the program works absolutely correctly (especially because I haven't work much with
programming of drivers). So, I distribute this plugin "as is", without any guarantees and
promises. Use it on your own risk.
I just want to add, that as much as I can I will try to correct all bugs found. After all,
I use this plugin myself, and I'm interested in its safe and correct work...
