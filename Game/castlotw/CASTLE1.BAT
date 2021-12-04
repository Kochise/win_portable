@echo off

set "CASTL_PATH=%~dp0\castl11a"
set "CASTL_PATH=%CASTL_PATH:\\=\%"
echo %CASTL_PATH%
echo;

set "OTVDM_PATH=%~dp0\otvdm"
set "OTVDM_PATH=%OTVDM_PATH:\\=\%"
echo %OTVDM_PATH%
echo;

set "PATH=%PATH%;%OTVDM_PATH%;"
set "PATH=%PATH:;;=;%"
set "PATH=%PATH: ;=;%"
set "PATH=%PATH:; =;%
echo %PATH%
echo;

start "" /d "%OTVDM_PATH%" "otvdm" "%CASTL_PATH%\%~n0.EXE"
