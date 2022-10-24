@echo off

rem - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
echo Recompose 'miktex' caches...
start "" /d "%~dp0Document\miktex" "miktex-cleanup-fndb.bat"

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

rem - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
echo Recompose 'python' dependencies...
cd "Coding\python\3.8\Lib\site-packages\cv2"

if exist "cv2.cp38-win_amd64.pyd.001" (
rem	if not exist "cv2.cp38-win_amd64.pyd" (
		copy /y /b "cv2.cp38-win_amd64.pyd.001"+"cv2.cp38-win_amd64.pyd.002" "cv2.cp38-win_amd64.pyd"
rem	)

	del "cv2.cp38-win_amd64.pyd.001" /q 1>nul 2>nul
	del "cv2.cp38-win_amd64.pyd.002" /q 1>nul 2>nul
)

cd "..\..\..\..\..\.."

rem - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
echo Recompose 'Sourcetrail' dependencies...

cd "Coding\Sourcetrail"

if exist "Sourcetrail.exe.001" (
rem	if not exist "Sourcetrail.exe" (
		copy /y /b "Sourcetrail.exe.001"+"Sourcetrail.exe.002" "Sourcetrail.exe"
rem	)

	del "Sourcetrail.exe.001" /q 1>nul 2>nul
	del "Sourcetrail.exe.002" /q 1>nul 2>nul
)

if exist "sourcetrail_indexer.exe.001" (
rem	if not exist "sourcetrail_indexer.exe" (
		copy /y /b "sourcetrail_indexer.exe.001"+"sourcetrail_indexer.exe.002" "sourcetrail_indexer.exe"
rem	)

	del "sourcetrail_indexer.exe.001" /q 1>nul 2>nul
	del "sourcetrail_indexer.exe.002" /q 1>nul 2>nul
)

cd "..\.."

rem - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
echo Recompose 'Doxygen' dependencies...
cd "Document\Doxygen"

if exist "libclang.dll.001" (
rem	if not exist "libclang.dll" (
		copy /y /b "libclang.dll.001"+"libclang.dll.002" "libclang.dll"
rem	)

	del "libclang.dll.001" /q 1>nul 2>nul
	del "libclang.dll.002" /q 1>nul 2>nul
)

cd "..\.."

rem - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
echo Recompose 'texmaker' dependencies...
cd "Document\texmaker"

if exist "Qt5WebEngineCore.dll.001" (
rem	if not exist "Qt5WebEngineCore.dll" (
		copy /y /b "Qt5WebEngineCore.dll.001"+"Qt5WebEngineCore.dll.002" "Qt5WebEngineCore.dll"
rem	)

	del "Qt5WebEngineCore.dll.001" /q 1>nul 2>nul
	del "Qt5WebEngineCore.dll.002" /q 1>nul 2>nul
)

cd "..\.."

rem - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
echo Recompose 'MindForger' dependencies...
cd "Editor\MindForger\bin"

if exist "Qt5WebEngineCore.dll.001" (
rem	if not exist "Qt5WebEngineCore.dll" (
		copy /y /b "Qt5WebEngineCore.dll.001"+"Qt5WebEngineCore.dll.002" "Qt5WebEngineCore.dll"
rem	)

	del "Qt5WebEngineCore.dll.001" /q 1>nul 2>nul
	del "Qt5WebEngineCore.dll.002" /q 1>nul 2>nul
)

cd "..\..\.."

rem - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
echo Recompose 'Tesseract-OCR' dependencies...
cd "Image\Tesseract-OCR"

if exist "libtesseract-5.dll.001" (
rem	if not exist "libtesseract-5.dll" (
		copy /y /b "libtesseract-5.dll.001"+"libtesseract-5.dll.002"+"libtesseract-5.dll.003" "libtesseract-5.dll"
rem	)

	del "libtesseract-5.dll.001" /q 1>nul 2>nul
	del "libtesseract-5.dll.002" /q 1>nul 2>nul
	del "libtesseract-5.dll.003" /q 1>nul 2>nul
)

cd "..\.."

rem - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
echo Recompose 'Chrome' dependencies...
cd "Internet\Chrome\App\Chrome-bin\104.0.5112.102"

if exist "chrome.dll.001" (
rem	if not exist "chrome.dll" (
		copy /y /b "chrome.dll.001"+"chrome.dll.002"+"chrome.dll.003"+"chrome.dll.004" "chrome.dll"
rem	)

	del "chrome.dll.001" /q 1>nul 2>nul
	del "chrome.dll.002" /q 1>nul 2>nul
	del "chrome.dll.003" /q 1>nul 2>nul
	del "chrome.dll.004" /q 1>nul 2>nul
)

cd "..\..\..\..\.."

rem - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
echo Recompose 'Firefox' dependencies...
cd "Internet\Firefox\App\firefox64"

if exist "xul.dll.001" (
rem	if not exist "xul.dll" (
		copy /y /b "xul.dll.001"+"xul.dll.002"+"xul.dll.003" "xul.dll"
rem	)

	del "xul.dll.001" /q 1>nul 2>nul
	del "xul.dll.002" /q 1>nul 2>nul
	del "xul.dll.003" /q 1>nul 2>nul
)

cd "..\..\..\.."
cd "Internet\Firefox\Data\profile"

if exist "webappsstore.sqlite.001" (
rem	if not exist "webappsstore.sqlite" (
		copy /b "webappsstore.sqlite.001"+"webappsstore.sqlite.002" "webappsstore.sqlite"
rem	)

	del "webappsstore.sqlite.001" /q 1>nul 2>nul
	del "webappsstore.sqlite.002" /q 1>nul 2>nul
)

cd "storage"

if exist "ls-archive.sqlite.001" (
rem	if not exist "ls-archive.sqlite" (
		copy /b "ls-archive.sqlite.001"+"ls-archive.sqlite.002" "ls-archive.sqlite"
rem	)

	del "ls-archive.sqlite.001" /q 1>nul 2>nul
	del "ls-archive.sqlite.002" /q 1>nul 2>nul
)

cd "..\..\..\..\.."

rem - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
echo Recompose 'TeamViewer' dependencies...
cd "Internet\TeamViewer"

if exist "TeamViewer.exe.001" (
rem	if not exist "TeamViewer.exe" (
		copy /y /b "TeamViewer.exe.001"+"TeamViewer.exe.002" "TeamViewer.exe"
rem	)

	del "TeamViewer.exe.001" /q 1>nul 2>nul
	del "TeamViewer.exe.002" /q 1>nul 2>nul
)

cd "..\.."

rem - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
echo Recompose 'OBS-Studio' dependencies...
cd "Video\OBS-Studio\obs-plugins\64bit"

if exist "libcef.dll.001" (
rem	if not exist "libcef.dll" (
		copy /y /b "libcef.dll.001"+"libcef.dll.002"+"libcef.dll.003"+"libcef.dll.004" "libcef.dll"
rem	)

	del "libcef.dll.001" /q 1>nul 2>nul
	del "libcef.dll.002" /q 1>nul 2>nul
	del "libcef.dll.003" /q 1>nul 2>nul
	del "libcef.dll.004" /q 1>nul 2>nul
)

cd "..\..\..\.."
