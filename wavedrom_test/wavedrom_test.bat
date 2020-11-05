@echo off

set PATH=%PATH%;%cd%\..\miktex\texmfs\install\miktex\bin\x64;%cd%\..\Msc-generator;%cd%\..\inkscape\bin;%cd%\..\nvm\v12.17.0

start "" cmd /c "npx wavedrom-cli -i mywave.json5 -s mywave.svg"
