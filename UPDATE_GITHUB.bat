@echo off
title Push Updates to GitHub - Glow With Maleeha
set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"

echo ========================================================
echo        GLOW WITH MALEEHA - PUSH UPDATES TO GITHUB
echo ========================================================
echo.

set /p message="Enter commit description (or press Enter for 'Update website'): "
if "%message%"=="" set message=Update website

echo.
echo [1/3] Staging modified files...
git add .

echo [2/3] Committing changes...
git commit -m "%message%"

echo [3/3] Pushing updates to GitHub...
git push

echo.
echo ========================================================
echo   UPDATES SUCCESSFULLY PUSHED TO GITHUB!
echo ========================================================
echo.
pause
