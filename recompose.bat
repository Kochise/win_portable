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
