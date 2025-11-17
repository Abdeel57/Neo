@echo off
echo ========================================
echo   REINICIANDO SERVIDORES DE DESARROLLO
echo ========================================
echo.

echo Deteniendo procesos en puertos 3000 y 5173...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    echo   Deteniendo proceso %%a en puerto 3000...
    taskkill /F /PID %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173" ^| findstr "LISTENING"') do (
    echo   Deteniendo proceso %%a en puerto 5173...
    taskkill /F /PID %%a >nul 2>&1
)

timeout /t 2 /nobreak >nul

echo.
echo Iniciando Backend en nueva ventana...
start "Backend - Puerto 3000" cmd /k "cd /d %~dp0backend && echo Iniciando Backend... && npm run start:dev"

timeout /t 5 /nobreak >nul

echo Iniciando Frontend en nueva ventana...
start "Frontend - Puerto 5173" cmd /k "cd /d %~dp0frontend && echo Iniciando Frontend... && npm run dev"

echo.
echo ========================================
echo   SERVIDORES INICIADOS
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:3000
echo Admin:    http://localhost:5173/#/admin
echo.
echo Espera 10-15 segundos para que los servidores inicien completamente
echo.
echo Presiona cualquier tecla para verificar el estado...
pause >nul

cd /d %~dp0
node verificar-servidores.js

