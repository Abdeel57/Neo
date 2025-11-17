@echo off
chcp 65001 >nul
echo ========================================
echo   INICIANDO BACKEND
echo ========================================
echo.

cd /d %~dp0backend

echo Verificando archivo .env...
if not exist ".env" (
    echo ⚠ Archivo .env no encontrado!
    echo Creando archivo .env...
    if exist "create-env.js" (
        node create-env.js
    ) else (
        echo ❌ No se puede crear .env automáticamente
        echo Por favor crea el archivo .env manualmente
        pause
        exit /b 1
    )
)

echo Verificando Prisma...
if exist "prisma\schema.prisma" (
    echo Generando cliente de Prisma...
    call npx prisma generate >nul 2>&1
)

echo.
echo Iniciando Backend en modo desarrollo...
echo Puerto: 3000
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

npm run start:dev

