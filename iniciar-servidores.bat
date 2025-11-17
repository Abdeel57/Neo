@echo off
echo Iniciando servidores de desarrollo...
echo.

echo Iniciando Backend en nueva ventana...
start "Backend - Puerto 3000" cmd /k "cd /d %~dp0backend && npm run start:dev"

timeout /t 3 /nobreak >nul

echo Iniciando Frontend en nueva ventana...
start "Frontend - Puerto 5173" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Servidores iniciados en ventanas separadas
echo.
echo Frontend: http://localhost:5173
echo Backend: http://localhost:3000
echo Admin: http://localhost:5173/#/admin
echo.
echo Espera unos segundos para que los servidores inicien completamente
echo.
pause

