New secure ftp plugin version 2.70 (32 bit+64 bit)
Copyright (C) 2008-2020 Christian Ghisler, all rights reserved

Installation instructions:
==========================

This plugin is for Windows Vista, 7, 8, 8.1 and 10. It does
not need any additional DLLs because it uses the built-in
Windows SSL library sChannel (Secur32.dll) instead of OpenSSL.

If you use Windows XP or older, please get the other release
of this plugin with libssh2.dll linked to OpenSSL.


You can use the plugin in the Network Neighborhood.

Supported functions:
====================
- connect with username/password
- connect with client certificate
- connect via Pageant from Putty
- connect over a HTTP proxy supporting the CONNECT command
- upload, download, rename, delete, create directory
- resume upload and download
- change Unix attributes (chmod)
- synchronize dirs with correct timestamps(!)
- properties of file (STAT command) via Alt+Enter
- command line support for any shell commands
- new: support for SCP only servers (no SFTP)
- new: keep alive
- new: transfer files >2GB via SCP

Authentication using pageant (client cert in Putty format):
===========================================================
You can now store the key in Putty's pageant.exe tool.
Pageant can be launched when needed by putting a link
in the plugin directory named pageant.lnk pointing to
c:\PathToPutty\pageant.exe cert_file_name
with the name of the client certificate file as a parameter.

Authentication using a client certificate in OpenSSH format:
============================================================
The keys must be in OpenSSH format. Follow these steps to
convert a Putty (*.ppk) key to OpenSSH format:
1. Start puttygen.exe (part of putty installation)
2. Load your Putty key into it
3. Do NOT click on "Save public key", it creates an
   incompatible key! Instead, select the text in the
   section "Public key for pasting into OpenSSH...
   and press Ctrl+C (=Copy to clipboard)
4. Create a new file with extension .pub (Shift+F4 in
   Total Commander) and press Ctrl+V (=Paste)
5. Choose "Export SSH key" from the "Conversions" menu
   to save the *.pem file.

Revision log:
=============
20200519 Release, version 2.70 final
20200519 Fixed: Downloading files could sometimes result in an INVALID_MAC error when an incomplete packet was received
20200501 Release, version 2.60 final
20200501 Added: Two new hmac algorithms (authenticity verification): hmac-sha2-256-etm@openssh.com and hmac-sha2-512-etm@openssh.com
20190617 Release, version 2.50 final
20190617 Added: Also load private keys with encryption "none" in ssh format
20190617 Added: Support for curve ed25519, both for host certificate and client certificate, using library from https://github.com/orlp/ed25519
20190606 Release, version 2.40 final
20190606 Fixed: Some servers report to support "keyboard interactive", but return error PUBLICKEY_UNRECOGNIZED when using it. Retry login with "password" method and don't show error.
20190603 Release, version 2.30 final
20190603 Fixed: Connection fails on Windows 10 1903 (Spring 2019) due to a bug in BCryptImportKeyPair for RSA: Only supports public exponents up to 4 bytes length -> use libtommath mp_exptmod() instead
20190603 Fixed: Prefer "keyboard interactive" if the server supports it and also user/password, because only "keyboard interactive" supports 2 factor authentication
20180924 Release, version 2.20 final
20180829 Added: Transfer files >2GB vis SCP by user "CoolWater"
20180627 Release, version 2.10 final
20180627 Added: Keep alive option by forum user "CoolWater"
20171117 Release, version 2.0 final
20171117 Added: Option to open Web browser for downloading OpenSLL DLLs (XP version only)
20171117 Added: Separate version for Windows XP and older. Warn if newer version is installed
20170323 Release, version 1.4.3 beta 3
20170323 Added: More error logging, especially for SCP transfers
20170306 Release, version 1.4.3 beta 2
20170303 Added: Support for ECDSA (elliptic curve) authentication
20170303 Added: Include OpenSSH dll not depending on OpenSSL, needs Windows Vista or newer. OpenSSH+OpenSSL still supported for older systems.
20161111 Release, version 1.4.3 beta 1
20161111 Added: Set mode how to send command: sftpplug.ini [connectionname] sendcommandmode=0 : 0: send normal, get reply, close channel; 1: like 0, do not close; 2: just send, do not wait for reply
20161111 Added: Send command line before connecting to SFTP channel: sftpplug.ini [connectionname] sendcommand=some unix command
20150906 Release, version 1.4.2 (unchanged)
20150713 Release, version 1.4.2 beta 1
20150713 Added: Support for SCP only connections, for servers not supporting the SFTP subsystem
20130304 Release, version 1.4.1
20130304 Fixed: Password change via libssh2_userauth_password_ex would cause a crash (buffer deallocation)
20130222 Release, version 1.4
20130222 Added: Handle keyboard interactive with password change where the callback function is called multiple times
20130222 Added: Call libssh2_userauth_password_ex instead of libssh2_userauth_password, would support password change (if the server would actually support it)
20130222 Added: Support for new dlls from libcurl where zlibwapi.dll was renamed to zlib1.dll
20120524 Release, version 1.3
20120524 Added: 64-bit: Load dlls from subdir '64' under dll dir or program dir, same as where TC x64 expects the 64-bit SSL dlls
20120108 Release, version 1.2
20120108 Fixed: Also try to load zlibwapi.dll, the 64-bit libssh2.dll depends on it and doesn't load otherwise
20120108 Added: 64-bit: Load dlls from subdir 'x64' under dll dir or program dir
20110629 Release, version 1.1
20110523 Added: Allow to store proxy password in password manager
20110522 Added: Support for multiple firewalls/proxies
20100629 Release, version 1.0 final
20100519 Release, version 0.98 beta
20100519 Added: On Alt+Enter (Properties), use "ls -la filename" if "stat filename" fails
20100519 Fixed: Do not quote names with spaces via SCP if the SSH library is version 1.1 or newer
20100519 Fixed: Applied patches from user "Sob" to handle WSAAddressToStringA on Windows 2000, fix for non-blocking connect() and empty password support
20100324 Release, version 0.97 beta
20100324 Added: Support for asynchronous SCP downloads, which is working now in newer SSH DLL versions
20100324 Added: User can put file pageant.lnk in plugin directory to auto-launch pageant if needed (use key name as parameter)
20100324 Added: Support for Putty Agent (Pageant) authentication (code supplied partially by a forum user, thanks!)
20100127 Release, version 0.96 beta
20100127 Fixed: Some operations were considerably slower in 0.95 due to a small change to reduce CPU load
20100120 Release, version 0.95 beta
20091201 Added: Support for transfers in background (separate thread) for TC 7.51
20090619 Fixed: ENTER on "_F7 new connection.txt" no longer showed instructions
20090619 Fixed: HTTP CONNECT: "Host:" header now sends name of final destination, not name of proxy
20090531 Fixed: Do not allow the user to create a connection named "_F7=new connection.txt", because it cannot be deleted later
20090518 Fixed: Plugin hangs when sending a command with many returned lines, e.g. zip command
20090518 Fixed: Reduce high CPU load because of busy waiting during dir listing, uploads and downloads
20090514 Release, version 0.94 beta
20090513 Added: Support different code pages, e.g. Latin1, Cyrillic, Chinese etc. (no auto-detect yet)
20090513 Fixed: Saving connection with empty password but option "Protect with master password" made password unchangeable
20090505 Release, version 0.93 beta
20090505 Fixed: Crash on file transfer when length of "autmoatic" file types (detect as text) exceeded 259 characters
20090505 Fixed: Disconnect was hanging with server Core FTP mini-sftp-server
20090101 Fixed: Incorrect handling of SOCKS5 proxy returing a host name instead of an IP address
20090101 Release, version 0.92 beta
20090101 Added: Use async sockets also during connect and proxy negotiations, so the user can abort a hanging connection at any time
20081231 Added: CR <-> CRLF conversion for transfers from/to Unix servers. Do not convert files containing 0 bytes (binaries, utf-16), do not convert CRLF to CRCRLF
20081231 Added: SOCKS4 support and numeric IP in SOCKS5
20081231 Fixed: Corrected SOCKS5 code (incorrect server response handling)
20081231 Added: Merged code from forum-user "Sob" for SOCKS4A+SOCKS5 proxies
20081121 Release, version 0.91 beta
20081121 Fixed: SCP didn't work with spaces in names, they must be put in double quotes "" to work
20081121 Fixed: IPv6 IP addresses without [] were not supported
20081121 Fixed: Die to a bug in the SFTP dll, uploads via SCP fail in non-blocking mode -> switch to blocking mode just for the upload
20081120 Release, version 0.9 beta
20081120 Added: Option to SCP commands to upload+download files. This is usually much faster than SFTP because the file is transferred as a single stream
20081119 Fixed: SFTP read directory may hang in infinite loop when server wasn't reachable/connection lost
20081119 Added: Third party code to connect to numeric IPv6 addresses
20081119 Added: Preparation for master password support (TC 7.5)
20081119 Fixed: If user clears one of the chmod fields, set the value to the default (644 for files, 755 for directories) instead of 0
20081111 Release, version 0.8a beta
20081111 Fixed: Set attribute of directory again after creating it, because some servers seem to ignore the attribute option of libssh2_sftp_mkdir
20080902 Release, version 0.8 beta
20080902 Fixed: Could not store passwords with accents or special chars like ?
20080901 Fixed: Could not open directories with UTF-8 names
20080901 Fixed: Set permissions of uploaded file to user-defined permissions ONLY when not overwriting an already existing file
20080901 Added: Show server list as links instead of folders! Advantage: Allows to start in a subdir of the server
20080829 Added: Reconnect to the server if a connection failed and the user tries to access the server again
20080829 Fixed: Open new SFTP channel for directories, uploads and downloads if an operation was aborted while it was hanging
20080828 Fixed: Resume upload only seems to work when clearing the "stat" command parameter before getting the file attributes
20080828 Fixed: Downloads could hang when network connection was cut just during the download
20080828 Release, version 0.7 beta
20080828 Added: Read contents of HOME environment variable when double clicking on pseudo link "~" in root or home dir
20080827 Added: Allow user to break out of plugin root (e.g. servername.com/home/username) when following a link
20080827 Fixed: English properties dialog had default locale (which is Swiss German on my system)
20080827 Fixed: Socket was not closed after shutting down SFTP connection
20080827 Release, version 0.6 beta
20080827 Added: Try to auto-detect servers with UTF-8 encoding by checking variables $LC_ALL $LC_CTYPE $LANG, and sending the command 'locale'
20080827 Fixed: Uploads: When overwriting a file and the new file is smaller, rests of the old file will remain appended (the file size didn't change)
20080826 Added: Remote copy of files (by sending "cp" command) with Shift+F5, or F5 with same server in both panels
20080826 Added: French translation by forum users Clo and Vansumsen
20080820 Release, version 0.5 beta
20080820 Fixed: Properties (Alt+Enter) didn't handle UTF-8 encoding properly
20080820 Added: Show lock icons for connections, show them in green when connected
20080820 Fixed: Plugin stopped working on systems without ipv6 support (pre-XP)
20080820 Fixed: Quick connection stopped working
20080818 Release, version 0.4 beta
20080818 Added: View properties of file/directory under cursor with Alt+Enter
20080818 Added: Support shell commands directly via command line, e.g. chmod, chown etc.
20080817 Added: If a template file sftpplug.tpl exists in the plugin dir, copy it to the ini file if no ini file exists yet
20080817 Added: IPv6 support, code from forum user "Sob", but changed to dynamic loading of ws2_32.dll
20080817 Fixed: Only show FTP toolbar when connected to avoid problems with disconnect button when connection fails
20080817 Added: Show connect progress in separate dialog
20080817 Added: Show and allow to follow symbolic links to directories
20080817 Added: In the public/private key path, %USER% (all uppercase!) will be replaced by the user name
20080817 Added: The public/private key path may now contain environment variables like %commander_path%
20080817 Added: Ask for user name during connect if none was specified in the configuration
20080815 Release, version 0.3 beta
20080815 Added: Support UTF-8 encoding of file names (option in connect dialog)
20080815 Added: Let user define default permissions of uploaded files and new directories
20080815 Added: Use list of supported methods from server to determine connection method
20080815 Added: Show user@server in all password dialogs
20080815 Added: Do not show configuration dialog to enter password, show separate password dialog
20080815 Added: keyboard-interactive login method
20080814 Release, version 0.2 beta
20080814 Added: Load libssh2.dll also from the Total Commander directory and the %PATH% if not found in plugin dir
20080814 Added: Ask for proxy password in separate dialog if none was stored, and proxy user name was set
20080814 Added: Show what authentication methods are supported by the server
20080814 Fixed: Minor fixes to asynchronous socket mode
20080814 Fixed: "Quick connect" vanished when no connections were defined and user pressed F2
20080814 Fixed: Couldn't connect if no proxy type was chosen
20080813 Initial release, version 0.1 beta
