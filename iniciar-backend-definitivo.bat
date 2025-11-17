@echo off
title Backend Lucky Snap - Puerto 3000
color 0A
cls
echo ========================================
echo   BACKEND LUCKY SNAP
echo   Puerto: 3000
echo ========================================
echo.
cd /d %~dp0backend
echo Directorio actual: %CD%
echo.
echo Iniciando backend...
echo Espera 10-15 segundos para que inicie completamente.
echo.
echo ========================================
echo.

call npm run start:dev

echo.
echo ========================================
echo Backend detenido.
pause

