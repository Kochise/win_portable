@echo off

set PATH=%PATH%;%cd%\..\miktex\texmfs\install\miktex\bin\x64;%cd%\..\Msc-generator;%cd%\..\inkscape\bin;%cd%\..\nvm\v12.17.0;%cd%\..\perl\perl\bin

start "" "texmaker.exe"
