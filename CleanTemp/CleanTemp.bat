@echo off

rem rd %temp% /s /q
rem md %temp%

rem cleanmgr.exe /sageset:1
start "" "cleanmgr.exe" "/sagerun:1"
