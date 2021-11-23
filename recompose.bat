@echo off

rem - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
echo Recompose 'miktex' caches...
start "" /d "%~dp0Document\miktex\" "miktex-cleanup-fndb.bat"

rem - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
echo Recompose 'nvm' dependencies...
cd "Coding\nvm\v16.13.0"

if exist "node.exe.001" (
rem	if not exist "node.exe" (
		copy /y /b "node.exe.001"+"node.exe.002" "node.exe"
rem	)

	del "node.exe.001" /q 1>nul 2>nul
	del "node.exe.002" /q 1>nul 2>nul
)

cd "..\..\.."

cd "Coding\nvm\v16.13.0\node_modules\@mermaid-js\mermaid-cli\node_modules\puppeteer\.local-chromium\win64-901912\chrome-win"

if exist "chrome.dll.001" (
rem	if not exist "chrome.dll" (
		copy /y /b "chrome.dll.001"+"chrome.dll.002"+"chrome.dll.003"+"chrome.dll.004" "chrome.dll"
rem	)

	del "chrome.dll.001" /q 1>nul 2>nul
	del "chrome.dll.002" /q 1>nul 2>nul
	del "chrome.dll.003" /q 1>nul 2>nul
	del "chrome.dll.004" /q 1>nul 2>nul
)

if exist "interactive_ui_tests.exe.001" (
rem	if not exist "interactive_ui_tests.exe" (
		copy /y /b "interactive_ui_tests.exe.001"+"interactive_ui_tests.exe.002"+"interactive_ui_tests.exe.003"+"interactive_ui_tests.exe.004" "interactive_ui_tests.exe"
rem	)

	del "interactive_ui_tests.exe.001" /q 1>nul 2>nul
	del "interactive_ui_tests.exe.002" /q 1>nul 2>nul
	del "interactive_ui_tests.exe.003" /q 1>nul 2>nul
	del "interactive_ui_tests.exe.004" /q 1>nul 2>nul
)

cd "..\..\..\..\..\..\..\..\..\..\.."

cd "Coding\nvm\v16.13.0\node_modules\diagrams\node_modules\electron\dist"

if exist "electron.exe.001" (
rem	if not exist "electron.exe" (
		copy /y /b "electron.exe.001"+"electron.exe.002" "electron.exe"
rem	)

	del "electron.exe.001" /q 1>nul 2>nul
	del "electron.exe.002" /q 1>nul 2>nul
)

cd "..\..\..\..\..\..\..\.."

rem Recompose 'python' dependencies
cd "Coding\python\3.8\Lib\site-packages\cv2"

if exist "cv2.cp38-win_amd64.pyd.001" (
rem	if not exist "cv2.cp38-win_amd64.pyd" (
		copy /y /b "cv2.cp38-win_amd64.pyd.001"+"cv2.cp38-win_amd64.pyd.002" "cv2.cp38-win_amd64.pyd" 1>nul 2>nul
rem	)

	del "cv2.cp38-win_amd64.pyd.001" /q 1>nul 2>nul
	del "cv2.cp38-win_amd64.pyd.002" /q 1>nul 2>nul
)

cd "..\..\..\..\..\.."

rem Recompose 'Firefox' dependencies
cd "Internet\Firefox\App\firefox64"

if exist "xul.dll.001" (
rem	if not exist "xul.dll" (
		copy /y /b "xul.dll.001"+"xul.dll.002"+"xul.dll.003" "xul.dll" 1>nul 2>nul
rem	)

	del "xul.dll.001" /q 1>nul 2>nul
	del "xul.dll.002" /q 1>nul 2>nul
	del "xul.dll.003" /q 1>nul 2>nul
)

cd "..\..\..\.."
cd "Internet\Firefox\Data\profile"

if exist "webappsstore.sqlite.001" (
rem	if not exist "webappsstore.sqlite" (
		copy /b "webappsstore.sqlite.001"+"webappsstore.sqlite.002" "webappsstore.sqlite" 1>nul 2>nul
rem	)

	del "webappsstore.sqlite.001" /q 1>nul 2>nul
	del "webappsstore.sqlite.002" /q 1>nul 2>nul
)

cd "storage"

if exist "ls-archive.sqlite.001" (
rem	if not exist "ls-archive.sqlite" (
		copy /b "ls-archive.sqlite.001"+"ls-archive.sqlite.002" "ls-archive.sqlite" 1>nul 2>nul
rem	)

	del "ls-archive.sqlite.001" /q 1>nul 2>nul
	del "ls-archive.sqlite.002" /q 1>nul 2>nul
)

cd "..\..\..\..\.."

rem Recompose 'Chrome' dependencies
cd "Internet\Chrome\App\Chrome-bin\95.0.4638.69"

if exist "chrome.dll.001" (
rem	if not exist "chrome.dll" (
		copy /y /b "chrome.dll.001"+"chrome.dll.002"+"chrome.dll.003" "chrome.dll" 1>nul 2>nul
rem	)

	del "chrome.dll.001" /q 1>nul 2>nul
	del "chrome.dll.002" /q 1>nul 2>nul
	del "chrome.dll.003" /q 1>nul 2>nul
)

cd "..\..\..\..\.."

rem Recompose 'OBS-Studio' dependencies
cd "Video\OBS-Studio\obs-plugins\64bit"

if exist "libcef.dll.001" (
rem	if not exist "libcef.dll" (
		copy /y /b "libcef.dll.001"+"libcef.dll.002"+"libcef.dll.003" "libcef.dll" 1>nul 2>nul
rem	)

	del "libcef.dll.001" /q 1>nul 2>nul
	del "libcef.dll.002" /q 1>nul 2>nul
	del "libcef.dll.003" /q 1>nul 2>nul
)

cd "..\..\..\.."
