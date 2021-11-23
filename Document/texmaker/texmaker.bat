@echo off

set "PATH=%PATH%;%cd%\..\miktex\texmfs\install\miktex\bin\x64;%cd%\..\Msc-generator;%cd%\..\..\Image\inkscape\bin;%cd%\..\..\Coding\nvm\v16.13.0;%cd%\..\..\Coding\perl\perl\bin;"
set "PATH=%PATH:;;=;%"
set "PATH=%PATH: ;=;%"
set "PATH=%PATH:; =;%"

start "" /d "%cd%" "texmaker.exe"
