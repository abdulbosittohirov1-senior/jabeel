@echo off
setlocal EnableExtensions EnableDelayedExpansion

cd /d "%~dp0"

set BOT_TOKEN_VALUE=
if exist ".env" (
  for /f "usebackq tokens=1,* delims==" %%A in (".env") do (
    if "%%A"=="BOT_TOKEN" set BOT_TOKEN_VALUE=%%B
  )
)

if "%BOT_TOKEN_VALUE%"=="" (
  echo BOT_TOKEN is empty in .env
  echo Open .env and put your BotFather token first.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Install Node.js first.
  echo.
  pause
  exit /b 1
)

echo Starting JABEEL website with Telegram contact form...
echo Keep the new black terminal window open. If you close it, localhost:8080 will stop.
echo.

start "JABEEL Website Server" cmd /k "cd /d ""%~dp0"" && npm install && npm start"

timeout /t 5 /nobreak >nul
start http://localhost:8080

echo If the browser still says ERR_CONNECTION_REFUSED, wait 10-20 seconds and press Ctrl+F5.
echo If it still does not open, check the black terminal window for the red error text.
echo.
pause
