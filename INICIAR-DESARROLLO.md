# 🚀 Guía para Ver el Proyecto en Tiempo Real

## Opción 1: Iniciar Todo Automáticamente (Recomendado)

Desde la raíz del proyecto, ejecuta:

```bash
npm run dev
```

Esto iniciará tanto el frontend como el backend automáticamente.

## Opción 2: Iniciar Servidores por Separado

### Terminal 1 - Backend:
```bash
cd backend
npm run start:dev
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

## URLs de Acceso

Una vez que los servidores estén corriendo:

- **Frontend (Aplicación Principal)**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Panel de Administración**: http://localhost:5173/#/admin
- **Health Check Backend**: http://localhost:3000/api/health

## Verificar Estado de los Servidores

Para verificar si los servidores están corriendo, ejecuta:

```bash
node verificar-servidores.js
```

## Características del Modo Desarrollo

- ✅ **Hot Module Replacement (HMR)**: Los cambios se reflejan automáticamente sin recargar la página
- ✅ **Recarga Automática**: Vite detecta cambios y recarga el navegador
- ✅ **Source Maps**: Para debugging en el navegador
- ✅ **Logs en Tiempo Real**: Ver errores y logs en la consola

## Solución de Problemas

### Si los puertos están ocupados:

**Windows:**
```powershell
# Ver qué proceso usa el puerto 5173
netstat -ano | findstr :5173

# Ver qué proceso usa el puerto 3000
netstat -ano | findstr :3000

# Matar un proceso (reemplaza PID con el número del proceso)
taskkill /PID <PID> /F
```

### Si hay errores de dependencias:

```bash
# Reinstalar todas las dependencias
npm run install:all
```

### Si el backend no inicia:

1. Verifica que la base de datos esté configurada
2. Verifica el archivo `.env` en la carpeta `backend`
3. Ejecuta las migraciones: `cd backend && npm run migrate:deploy`

