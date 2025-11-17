# 🌐 Usar Backend en Producción para Desarrollo Local

Si no puedes iniciar el backend localmente, puedes configurar el frontend para que use el backend desplegado en producción.

## Opción 1: Configurar Variable de Entorno (Recomendado)

### Paso 1: Crear archivo `.env.local` en `frontend/`

Crea un archivo `.env.local` en la carpeta `frontend/` con:

```env
VITE_API_URL=https://tu-backend-url.com/api
```

**Reemplaza `tu-backend-url.com` con la URL real de tu backend desplegado.**

### Paso 2: Reiniciar el servidor de desarrollo

Si el frontend ya está corriendo, deténlo (Ctrl+C) y reinícialo:

```bash
cd frontend
npm run dev
```

## Opción 2: Modificar vite.config.ts Temporalmente

Si prefieres no usar archivos .env, puedes modificar `frontend/vite.config.ts`:

```typescript
'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'https://tu-backend-url.com/api')
```

## Opción 3: Usar Solo Datos Locales (Sin Backend)

El frontend tiene un sistema de fallback que usa datos locales cuando el backend no está disponible. Puedes:

1. Iniciar solo el frontend:
   ```bash
   cd frontend
   npm run dev
   ```

2. El frontend intentará conectarse al backend, y si falla, usará datos locales automáticamente.

**Nota:** Con datos locales, algunas funciones del admin pueden no funcionar completamente (como guardar configuraciones), pero podrás ver la interfaz.

## Encontrar la URL de tu Backend

### Si está en Render:
- Ve a tu dashboard de Render: https://dashboard.render.com
- Busca tu servicio de backend
- Copia la URL (algo como: `https://luckysnap-backend.onrender.com`)

### Si está en Railway:
- Ve a tu dashboard de Railway: https://railway.app
- Busca tu servicio
- Copia la URL pública

### Si está en otro servicio:
- Revisa la documentación de deployment o tu panel de control

## Verificar que Funciona

1. Inicia el frontend:
   ```bash
   cd frontend
   npm run dev
   ```

2. Abre la consola del navegador (F12)
3. Deberías ver mensajes como:
   - ✅ `Backend settings loaded successfully` (si el backend está disponible)
   - 🔄 `Using local data for settings` (si el backend no está disponible)

## Ventajas de Usar Backend en Producción

✅ No necesitas correr el backend localmente
✅ Puedes probar con datos reales
✅ Funciona igual que en producción

## Desventajas

⚠️ Los cambios que hagas se guardarán en producción
⚠️ Puede ser más lento que local
⚠️ Necesitas conexión a internet

## Recomendación

Para desarrollo local, es mejor tener el backend corriendo localmente. Pero si no puedes, usar el backend en producción es una buena alternativa temporal.

