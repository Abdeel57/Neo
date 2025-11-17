# Script para iniciar los servidores
$projectPath = "C:\Users\cerdi\OneDrive\Desktop\NAO 1.0"

Write-Host "🚀 Iniciando servidores de desarrollo..." -ForegroundColor Cyan
Write-Host ""

# Iniciar backend
Write-Host "🔧 Iniciando Backend (puerto 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectPath\backend'; npm run start:dev"

# Esperar un poco
Start-Sleep -Seconds 3

# Iniciar frontend
Write-Host "🎨 Iniciando Frontend (puerto 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectPath\frontend'; npm run dev"

Write-Host ""
Write-Host "✅ Servidores iniciados en ventanas separadas" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔧 Backend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📊 Admin: http://localhost:5173/#/admin" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Espera unos segundos y luego ejecuta: node verificar-servidores.js" -ForegroundColor Yellow

