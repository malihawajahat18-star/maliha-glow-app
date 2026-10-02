@echo off
title Glow With Maleeha - Local Server
set "PATH=%LOCALAPPDATA%\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.19.0-win-x64;%PATH%"

echo ========================================================
echo      GLOW WITH MALEEHA - LOCAL DEVELOPMENT SERVER
echo ========================================================
echo.
echo Launching server at http://localhost:3000 ...
echo.

start "" "http://localhost:3000"
call node "node_modules\vite\bin\vite.js" --port=3000 --host=::

pause
