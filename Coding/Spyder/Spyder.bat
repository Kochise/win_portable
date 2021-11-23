@echo off

set "PYSDL2_DLL_PATH=%cd%\lib"

set "PYTHONHOME=%cd%\Python"
set "PYTHONPATH=%PYTHONHOME%;%PYTHONHOME%\Lib;%PYTHONHOME%\Scripts"

set "PATH=%PATH%;%PYTHONPATH%;"
set "PATH=%PATH:;;=;%"
set "PATH=%PATH: ;=;%"
set "PATH=%PATH:; =;%

start "" "%PYTHONHOME%\python" "%cd%\Spyder.launch.pyw"
