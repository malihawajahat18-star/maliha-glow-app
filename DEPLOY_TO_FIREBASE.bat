@echo off
title Deploy Glow With Maleeha to Firebase
set "PATH=%LOCALAPPDATA%\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.19.0-win-x64;%PATH%"

echo ========================================================
echo      GLOW WITH MALEEHA - LIVE FIREBASE DEPLOYMENT
echo ========================================================
echo.
echo [1/3] Authorizing Firebase with your Google Account...
echo       A browser tab will open. Please select your
echo       Google account and click "Allow".
echo.
call firebase.cmd login
echo.
echo [2/3] Building production assets...
call node.exe "node_modules\vite\bin\vite.js" build
echo.
echo [3/3] Deploying live to Firebase project: glow-with-maleeha...
call firebase.cmd deploy --project glow-with-maleeha
echo.
echo ========================================================
echo   CONGRATULATIONS! YOUR WEBSITE IS NOW LIVE!
echo ========================================================
echo.
pause
