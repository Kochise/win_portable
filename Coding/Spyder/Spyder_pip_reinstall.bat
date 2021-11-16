@echo off
echo Starting...
echo.

rem === Remove fake links for Windows Store
del "%LOCALAPPDATA%\Microsoft\WindowsApps\Python*.exe"

rem === Copy SDL2 (for Payton)
set "PYSDL2_DLL_PATH=%cd%\lib"
copy /y "%cd%\SDL2.dll" "%PYSDL2_DLL_PATH%" >nul

set "PIP_PATH="
rem set "PIP_PATH=-t ^"%cd%\pkgs^""
set "PIP_OPTS="
set "PIP_OPTS=--no-cache-dir"
rem --no-cache-dir
rem --use-deprecated=legacy-resolver

set "PY_HOME=%cd%\Python"
set "PYTHONPATH=%PY_HOME%;%PY_HOME%\Lib;%PY_HOME%\Scripts"

set "PATH=%PATH%;%PYTHONPATH%;"
set "PATH=%PATH:;;=;%"
set "PATH=%PATH: ;=;%"
set "PATH=%PATH:; =;%"
rem echo %PATH%

rem === Update Setuptools dependencies
copy /y "%cd%\distribute_setup.py" "%PY_HOME%\Lib" >nul

rem === Install and update pip
rem curl https://bootstrap.pypa.io/get-pip.py >get-pip.py
"%PY_HOME%\python" get-pip.py
call :pip_install pip
rem pip cache dir
rem pip cache purge

rem === VENV and stuff (doesn't quite work as expected though)
call :pip_install virtualenv
call :pip_install virtualenvwrapper-win
rem cd %USERPROFILE%\Envs
rem cd %WORKON_HOME%

rem === Update Spyder and stuff (doesn't quite work as expected though)
call :pip_install pretty_errors
call :pip_install bcrypt
rem call :pip_install spyder-terminal

rem === OpenGL framework (actually pretty cool one)
rem call :pip_install pyrsistent
rem call :pip_install python-slugify
call :pip_install payton

rem === CAN stuff (low level and not async)
call :pip_install python-can
call :pip_install python-ics
call :pip_install python_can_viewer

rem === Signal stuff
call :pip_install filelock
call :pip_install similaritymeasures
rem call :pip_install construct

rem === Gui related (Dear PyGui, but don't 0.8+, it's even worse)
call :pip_install "dearpygui<0.7"

rem === Gui related (Enaml, declarative and functional oriented)
call :pip_install rtree
call :pip_install intervaltree
call :pip_install traits
call :pip_install vtk
call :pip_install enaml

rem === Gui related (Enamlx, maybe outdated a bit)
rem call :pip_install pythonocc-core
call :pip_install pyqtgraph
rem call :pip_install "QScintilla==2.11.0"
rem call :pip_install "QScintilla<2.12.1"
call :pip_install enamlx

rem === Graphic related
call :pip_install bokeh
rem call :pip_install pygame
rem call :pip_install flexx

rem === Tui related
call :pip_install beautifultable

goto :eof

:pip_install
	echo.
	echo Installing %~1...
	echo.
	"%PY_HOME%\python" -m pip install %PIP_PATH% %PIP_OPTS% --upgrade %~1
goto :eof
