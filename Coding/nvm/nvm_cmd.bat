@echo off

set "PATH=%PATH%;%cd%\..\..\Document\miktex\texmfs\install\miktex\bin\x64;%cd%\..\..\Document\Msc-generator;%cd%\..\..\Image\inkscape\bin;%cd%\..\nvm;%cd%\..\nvm\v16.13.0;%cd%\..\..\Coding\perl\perl\bin;"
set "PATH=%PATH:;;=;%"
set "PATH=%PATH: ;=;%"
set "PATH=%PATH:; =;%"

start "" /d "%cd%" "cmd"
