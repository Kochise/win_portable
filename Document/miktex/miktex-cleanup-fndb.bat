@echo off

rem Fix filename database (because absolute paths)

del ".\texmfs\config\miktex\data\le\*.fndb-5"
del ".\texmfs\config\miktex\data\le\*.fndb-5.log"
del ".\texmfs\data\miktex\data\le\*.fndb-5"
del ".\texmfs\data\miktex\data\le\*.fndb-5.log"
del ".\texmfs\install\miktex\data\le\*.fndb-5"
del ".\texmfs\install\miktex\data\le\*.fndb-5.log"

".\texmfs\install\miktex\bin\x64\initexmf.exe" -u
rem ".\texmfs\install\miktex\bin\x64\initexmf.exe" --admin -u

".\texmfs\install\miktex\bin\x64\initexmf.exe" --mkmaps
