@echo off
title Backend - Lucky Snap
color 0A
echo ========================================
echo   INICIANDO BACKEND
echo ========================================
echo.
cd /d %~dp0backend
echo Directorio: %CD%
echo.
echo Ejecutando: npm run start:dev
echo.
echo Espera unos segundos para que el backend inicie...
echo Si ves errores, revisa la configuracion.
echo.
echo ========================================
echo.

npm run start:dev

pause

