# Script PowerShell para iniciar los servidores de desarrollo
Write-Host "🚀 Iniciando servidores de desarrollo..." -ForegroundColor Cyan
Write-Host ""

# Iniciar backend en una nueva ventana
Write-Host "🔧 Iniciando Backend (puerto 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; npm run start:prisma"

# Esperar un poco para que el backend inicie
Start-Sleep -Seconds 3

# Iniciar frontend en una nueva ventana
Write-Host "🎨 Iniciando Frontend (puerto 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; npm run dev"

Write-Host ""
Write-Host "✅ Servidores iniciados en ventanas separadas" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔧 Backend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📊 Admin: http://localhost:5173/#/admin" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Los servidores se están ejecutando en ventanas separadas." -ForegroundColor Yellow
Write-Host "   Cierra esas ventanas para detener los servidores." -ForegroundColor Yellow
Write-Host ""
Write-Host "Presiona cualquier tecla para ejecutar el script de verificación..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Ejecutar verificación después de unos segundos
Start-Sleep -Seconds 5
node verificar-servidores.js

