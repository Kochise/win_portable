@echo off

set "PYSDL2_DLL_PATH=%cd%\lib"

set "PYTHONHOME=%cd%\Python"
set "PYTHONPATH=%PYTHONHOME%;%PYTHONHOME%\Lib;%PYTHONHOME%\Scripts"

set "PATH=%PATH%;%PYTHONPATH%;"
set "PATH=%PATH:;;=;%"

start "" /d "%PYTHONHOME%" "cmd" ""

rem call set "path=%path:%_OLD_VIRTUAL_PYTHONPATH%=%
rem set "PYTHONHOME=%cd%\Scripts"
rem set "PYTHONPATH=%PYTHONHOME%;%cd%\Lib"
rem set "path=%path%;%PYTHONPATH%;"
rem set "PATH=%PATH:;;=;%"
rem set "PATH=%PATH:;;=;%"

rem pip install virtualenvwrapper-win
rem mkvirtualenv venv
rem workon venv
rem deactivate
rem rmvirtualenv venv
