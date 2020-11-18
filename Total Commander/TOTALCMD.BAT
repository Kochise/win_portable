@echo off

start "" /d "%~dp0" "TOTALCMD.EXE" /I="%~dp0\WINCMD.INI" /F="%~dp0\WCX_FTP.INI"
