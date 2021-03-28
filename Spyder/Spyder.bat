@echo off

set "PYTHONPATH=%cd%\Python"
set "PATH=%PATH%;%PYTHONPATH%"

start "" "%PYTHONPATH%\python" "%cd%\Spyder.launch.pyw"
rem "%PYTHONPATH%\python" "%cd%\Spyder.launch.pyw"
