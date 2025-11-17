# 🚀 Solución Rápida: Probar Página Sin Backend Local

## Opción 1: Usar Backend en Producción (Recomendado)

### Paso 1: Crear archivo `.env.local`

En la carpeta `frontend/`, crea un archivo llamado `.env.local` con:

```env
VITE_API_URL=https://lucksnap-backend.onrender.com/api
```

**Nota:** Si tu backend está en otra URL, reemplaza `lucksnap-backend.onrender.com` con tu URL real.

### Paso 2: Reiniciar el frontend

```bash
cd frontend
npm run dev
```

Ahora el frontend usará el backend en producción.

---

## Opción 2: Modificar vite.config.ts Temporalmente

Si no puedes crear el archivo `.env.local`, modifica `frontend/vite.config.ts`:

Busca esta línea (línea 24):
```typescript
'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'http://localhost:3000/api')
```

Cámbiala por:
```typescript
'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'https://lucksnap-backend.onrender.com/api')
```

Luego reinicia el frontend.

---

## Opción 3: Usar Solo Datos Locales (Sin Backend)

El frontend tiene un sistema de fallback que funciona sin backend:

1. **Inicia solo el frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

2. **El frontend automáticamente:**
   - Intentará conectarse al backend
   - Si falla, usará datos locales
   - Verás mensajes en la consola del navegador

**Limitaciones con datos locales:**
- ⚠️ No podrás guardar configuraciones del admin
- ⚠️ No podrás crear/editar rifas
- ✅ Pero podrás ver la interfaz y navegar

---

## Encontrar la URL de tu Backend

### Si está en Render:
1. Ve a: https://dashboard.render.com
2. Busca tu servicio backend
3. Copia la URL (ejemplo: `https://lucksnap-backend.onrender.com`)
4. Agrega `/api` al final: `https://lucksnap-backend.onrender.com/api`

### Si está en Railway u otro:
- Revisa tu panel de control del servicio
- Busca la URL pública del backend

---

## Verificar que Funciona

1. Abre la consola del navegador (F12)
2. Deberías ver:
   - ✅ `Backend settings loaded successfully` (si conectó al backend)
   - 🔄 `Using local data for settings` (si usa datos locales)

3. Prueba el admin:
   - Ve a: http://localhost:5173/#/admin
   - Intenta cargar configuraciones
   - Si funciona, verás los datos

---

## Recomendación

**Para desarrollo:** Usa el backend en producción (Opción 1) si no puedes correr el backend localmente.

**Para producción:** Asegúrate de tener la variable `VITE_API_URL` configurada correctamente.

---

## Troubleshooting

### El frontend sigue intentando localhost:3000
- Verifica que creaste `.env.local` correctamente
- Reinicia el servidor de desarrollo
- Verifica que el archivo esté en `frontend/.env.local` (no en la raíz)

### CORS errors
- El backend en producción debe tener configurado CORS para permitir `localhost:5173`
- Verifica la configuración de CORS en Render

### El backend no responde
- Verifica que el backend esté desplegado y activo
- Prueba la URL directamente: `https://tu-backend.onrender.com/api/health`
- Si no responde, el backend puede estar dormido (Render duerme servicios inactivos)

