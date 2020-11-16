@echo off

rem Recompose 'nvm' dependencies
cd "nvm\v12.17.0\node_modules\@mermaid-js\mermaid-cli\node_modules\puppeteer\.local-chromium\win64-809590\chrome-win"

if exist "chrome.dll.001" (
	if not exist "chrome.dll" (
		copy /b "chrome.dll.001"+"chrome.dll.002"+"chrome.dll.003" "chrome.dll" 1>nul 2>nul
	)

	del "chrome.dll.001" /q 1>nul 2>nul
	del "chrome.dll.002" /q 1>nul 2>nul
	del "chrome.dll.003" /q 1>nul 2>nul
)

if exist "interactive_ui_tests.exe.001" (
	if not exist "interactive_ui_tests.exe" (
		copy /b "interactive_ui_tests.exe.001"+"interactive_ui_tests.exe.002"+"interactive_ui_tests.exe.003" "interactive_ui_tests.exe" 1>nul 2>nul
	)

	del "interactive_ui_tests.exe.001" /q 1>nul 2>nul
	del "interactive_ui_tests.exe.002" /q 1>nul 2>nul
	del "interactive_ui_tests.exe.003" /q 1>nul 2>nul
)

cd "..\..\..\..\..\..\..\..\..\.."

rem Recompose 'python' dependencies
cd "python\3.8\Lib\site-packages\cv2"

if exist "cv2.cp38-win_amd64.pyd.001" (
	if not exist "cv2.cp38-win_amd64.pyd" (
		copy /b "cv2.cp38-win_amd64.pyd.001"+"cv2.cp38-win_amd64.pyd.002" "cv2.cp38-win_amd64.pyd" 1>nul 2>nul
	)

	del "cv2.cp38-win_amd64.pyd.001" /q 1>nul 2>nul
	del "cv2.cp38-win_amd64.pyd.002" /q 1>nul 2>nul
)

cd "..\..\..\..\.."

rem Recompose 'Firefox' dependencies
cd "Firefox\App\firefox64"

if exist "xul.dll.001" (
	if not exist "xul.dll" (
		copy /b "xul.dll.001"+"xul.dll.002"+"xul.dll.003" "xul.dll" 1>nul 2>nul
	)

	del "xul.dll.001" /q 1>nul 2>nul
	del "xul.dll.002" /q 1>nul 2>nul
	del "xul.dll.003" /q 1>nul 2>nul
)

cd "..\..\.."
cd "Firefox\Data\profile"

if exist "webappsstore.sqlite.001" (
	if not exist "webappsstore.sqlite" (
		copy /b "webappsstore.sqlite.001"+"webappsstore.sqlite.002" "webappsstore.sqlite" 1>nul 2>nul
	)

	del "webappsstore.sqlite.001" /q 1>nul 2>nul
	del "webappsstore.sqlite.002" /q 1>nul 2>nul
)

cd "..\..\.."
