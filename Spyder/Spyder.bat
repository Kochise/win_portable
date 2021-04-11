@echo off

set "PYTHONPATH=%cd%\Python"
set "PYSDL2_DLL_PATH=%cd%\lib"
set "PATH=%PATH%;%PYTHONPATH%;%PYTHONPATH%\Scripts"

start "" "%PYTHONPATH%\python" "%cd%\Spyder.launch.pyw"

rem curl https://bootstrap.pypa.io/get-pip.py >get-pip.py
rem python get-pip.py
rem pip install --upgrade pip
rem pip install --upgrade pretty_errors
rem pip install --upgrade spyder-terminal
