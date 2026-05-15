# DONA APP - MVP funcional 60%

Plataforma web para gestionar donaciones a orfanatos en Cochabamba.

## Tecnologías elegidas

### Frontend
- React + Vite: rápido, moderno y fácil de desplegar.
- Tailwind CSS: diseño rápido y responsive.
- React Router: navegación por páginas.
- Axios: consumo de API.

### Backend
- Node.js + Express: API REST rápida y flexible.
- SQLite: base de datos local simple para desarrollo y presentación.
- JWT: autenticación por roles.
- Multer: carga de imágenes/comprobantes.
- bcryptjs: contraseñas encriptadas.

### IA / Evaluación de ropa
- En este MVP se incluye una evaluación simulada basada en reglas.
- Está preparada para reemplazarse después por un modelo real con Python/FastAPI + YOLO/CLIP.

## Funcionalidades incluidas

- Login con roles: Administrador, Donante y Orfanato.
- Registro de usuarios.
- CRUD de orfanatos.
- Gestión de necesidades por orfanato.
- Registro de donaciones.
- Subida de imagen de prenda.
- Evaluación automática simulada de estado de ropa.
- Dashboard con estadísticas principales.
- Panel de administración básico.

## Usuarios de prueba

Al iniciar el backend se crea automáticamente:

- Admin: `admin@donaapp.com` / `123456`
- Donante: `donante@donaapp.com` / `123456`
- Orfanato: `orfanato@donaapp.com` / `123456`

## Cómo ejecutar

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

API: `http://localhost:4000`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Web: `http://localhost:5173`

## Estado del proyecto

Este paquete representa aproximadamente un 60% funcional porque ya tiene:

- Arquitectura base.
- Autenticación.
- Roles.
- CRUD principal.
- Flujo de donación.
- Dashboard.
- Evaluación inicial de prendas.

Falta para el 100%:

- Integrar IA real.
- Notificaciones por correo/WhatsApp.
- App móvil.
- Reportes PDF.
- Validación avanzada de datos.
- Deploy en producción.
