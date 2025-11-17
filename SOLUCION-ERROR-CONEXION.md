# 🔧 Solución: ERR_CONNECTION_REFUSED

## Problema
El frontend no puede conectarse al backend porque el backend no está corriendo.

Error: `Failed to load resource: net::ERR_CONNECTION_REFUSED` en `:3000/api/...`

## Solución Rápida

### Paso 1: Iniciar el Backend

Abre una terminal y ejecuta:

```bash
cd "C:\Users\cerdi\OneDrive\Desktop\NAO 1.0\backend"
npm run start:dev
```

**O usa el script:**
- Haz doble clic en `iniciar-backend.bat`

### Paso 2: Verificar que el Backend está corriendo

Deberías ver algo como:
```
🚀 Lucky Snap Backend starting...
📡 Environment: development
🌐 Port: 3000
🔗 API Base: http://localhost:3000/api
```

### Paso 3: Verificar en el navegador

Abre: http://localhost:3000/api/health

Deberías ver:
```json
{
  "status": "ok",
  "timestamp": "...",
  "uptime": ...
}
```

### Paso 4: Recargar el Frontend

Si el frontend ya está corriendo, simplemente recarga la página (F5).

Si el frontend NO está corriendo, inícialo en otra terminal:

```bash
cd "C:\Users\cerdi\OneDrive\Desktop\NAO 1.0\frontend"
npm run dev
```

## Verificación Completa

Ejecuta el script de verificación:

```bash
cd "C:\Users\cerdi\OneDrive\Desktop\NAO 1.0"
node verificar-servidores.js
```

Ambos servidores deben mostrar: ✅ CORRIENDO

## Problemas Comunes

### 1. El backend no inicia

**Posibles causas:**
- Archivo `.env` faltante o incorrecto
- Base de datos no accesible
- Prisma no generado
- Puerto 3000 ocupado

**Solución:**
```bash
cd backend
# Verificar .env
type .env

# Generar Prisma
npx prisma generate

# Verificar puerto
netstat -ano | findstr ":3000"
```

### 2. El backend inicia pero se cierra inmediatamente

**Revisa los errores en la terminal del backend:**
- Error de conexión a base de datos → Verifica `DATABASE_URL` en `.env`
- Error de Prisma → Ejecuta `npx prisma generate`
- Error de dependencias → Ejecuta `npm install`

### 3. El frontend no se conecta aunque el backend está corriendo

**Verifica:**
- CORS está configurado correctamente
- El frontend está en `http://localhost:5173`
- El backend está en `http://localhost:3000`

## Comandos Útiles

### Detener procesos en puertos:
```powershell
# Backend (puerto 3000)
Get-NetTCPConnection -LocalPort 3000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }

# Frontend (puerto 5173)
Get-NetTCPConnection -LocalPort 5173 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

### Ver qué está usando un puerto:
```bash
netstat -ano | findstr ":3000"
netstat -ano | findstr ":5173"
```

## Inicio Rápido (Todo en uno)

Si quieres iniciar todo de una vez, usa:

```bash
# Terminal 1
cd backend
npm run start:dev

# Terminal 2 (nueva ventana)
cd frontend
npm run dev
```

O ejecuta: `iniciar-completo.bat`

