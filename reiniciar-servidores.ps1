# Script para reiniciar los servidores de desarrollo
Write-Host "🛑 Deteniendo servidores existentes..." -ForegroundColor Red

# Función para matar procesos en un puerto
function Stop-Port {
    param([int]$Port)
    $processes = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($pid in $processes) {
        if ($pid) {
            Write-Host "   Deteniendo proceso $pid en puerto $Port..." -ForegroundColor Yellow
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        }
    }
}

# Detener procesos en los puertos
Stop-Port -Port 3000
Stop-Port -Port 5173

# Esperar un momento
Start-Sleep -Seconds 2

Write-Host "✅ Procesos detenidos" -ForegroundColor Green
Write-Host ""

# Verificar que los puertos estén libres
Write-Host "🔍 Verificando puertos..." -ForegroundColor Cyan
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
$port5173 = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue

if ($port3000) {
    Write-Host "⚠️  Puerto 3000 aún en uso" -ForegroundColor Yellow
} else {
    Write-Host "✅ Puerto 3000 libre" -ForegroundColor Green
}

if ($port5173) {
    Write-Host "⚠️  Puerto 5173 aún en uso" -ForegroundColor Yellow
} else {
    Write-Host "✅ Puerto 5173 libre" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Iniciando servidores..." -ForegroundColor Cyan
Write-Host ""

$projectPath = "C:\Users\cerdi\OneDrive\Desktop\NAO 1.0"

# Iniciar backend
Write-Host "🔧 Iniciando Backend (puerto 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectPath\backend'; Write-Host '🔧 Backend iniciando...' -ForegroundColor Cyan; npm run start:dev"

# Esperar un poco para que el backend inicie
Start-Sleep -Seconds 5

# Iniciar frontend
Write-Host "🎨 Iniciando Frontend (puerto 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectPath\frontend'; Write-Host '🎨 Frontend iniciando...' -ForegroundColor Cyan; npm run dev"

Write-Host ""
Write-Host "✅ Servidores iniciados en ventanas separadas" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔧 Backend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📊 Admin: http://localhost:5173/#/admin" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏳ Espera 10-15 segundos para que los servidores inicien completamente..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Para verificar el estado, ejecuta: node verificar-servidores.js" -ForegroundColor Gray

