@echo off
set PellesCDir=C:\Program Files\PellesC
rem
echo Setting 32-bit environment for Pelles C...
rem
set PATH=%PellesCDir%\Bin;%PATH%
set INCLUDE=%PellesCDir%\Include;%PellesCDir%\Include\Win;%INCLUDE%
set LIB=%PellesCDir%\Lib;%PellesCDir%\Lib\Win;%LIB%
