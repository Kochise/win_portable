@echo off

set "PYSDL2_DLL_PATH=%cd%\lib"

set "PY_HOME=%cd%\Python"
set "PYTHONPATH=%PY_HOME%;%PY_HOME%\Lib;%PY_HOME%\Scripts"

set "PATH=%PATH%;%PYTHONPATH%;"
set "PATH=%PATH:;;=;%"
set "PATH=%PATH: ;=;%"
set "PATH=%PATH:; =;%

start "" "%PY_HOME%\python" "%cd%\Spyder.launch.pyw"
