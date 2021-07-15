@echo off
echo Starting pip installation process...
echo.

set "PIP_PATH="
rem set "PIP_PATH=-t ^"%cd%\pkgs^""
set "PIP_OPTS="
rem set "PIP_OPTS=--no-cache-dir"
rem --no-cache-dir
rem --use-deprecated=legacy-resolver

set "PY_HOME=%cd%\Python"
set "PYTHONPATH=%PY_HOME%;%PY_HOME%\Lib;%PY_HOME%\Scripts"

set "PATH=%PATH%;%PYTHONPATH%;"
set "PATH=%PATH:;;=;%"
set "PATH=%PATH: ;=;%"
set "PATH=%PATH:; =;%"
rem echo %PATH%

rem curl https://bootstrap.pypa.io/get-pip.py >get-pip.py
"%PY_HOME%\python" get-pip.py
call :pip_install pip
rem pip cache dir
rem pip cache purge

call :pip_install pretty_errors
rem call :pip_install spyder-terminal

rem call :pip_install pyrsistent
rem call :pip_install python-slugify
rem call :pip_install bcrypt
call :pip_install payton

call :pip_install python-can
call :pip_install python-ics
call :pip_install python_can_viewer

call :pip_install filelock
call :pip_install similaritymeasures

call :pip_install dearpygui

call :pip_install rtree
call :pip_install intervaltree
call :pip_install enaml

rem call :pip_install pythonocc-core
call :pip_install pyqtgraph
rem call :pip_install "QScintilla==2.11.3"
call :pip_install enamlx

rem call :pip_install construct

goto :eof

:pip_install
	echo.
	echo Installing %~1...
	echo.
	"%PY_HOME%\python" -m pip install %PIP_PATH% %PIP_OPTS% --upgrade %~1
goto :eof
