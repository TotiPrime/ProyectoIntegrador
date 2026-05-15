# Alcance implementado hasta el 60%

## Módulos terminados

### 1. Autenticación
- Login.
- Registro.
- Roles: admin, donante y orfanato.
- Token JWT.

### 2. Gestión de orfanatos
- Listado público.
- Creación por administrador.
- Eliminación por administrador.
- Datos: nombre, dirección, teléfono, responsable, descripción y capacidad.

### 3. Gestión de necesidades
- Publicación de necesidades.
- Clasificación por tipo, edad, talla, cantidad y prioridad.
- Cambio de estado a cubierta.

### 4. Donaciones
- Registro de donaciones por donante.
- Selección de orfanato destino.
- Subida de imagen.
- Estado inicial de donación.
- Aprobación o rechazo por admin/orfanato.

### 5. Evaluación de prendas
- Evaluación simulada con puntaje de calidad.
- Clasificación: Excelente, Aceptable o Requiere revisión.
- Recomendación automática.

### 6. Dashboard
- Total de usuarios.
- Total de orfanatos.
- Necesidades pendientes.
- Donaciones registradas.
- Donaciones pendientes.
- Tabla de donaciones recientes.

## Recomendación técnica para continuar al 100%

1. Cambiar SQLite a PostgreSQL o MySQL para producción.
2. Agregar módulo de notificaciones por correo o WhatsApp.
3. Crear app móvil con React Native o Flutter.
4. Integrar IA real con Python + FastAPI.
5. Agregar reportes PDF con métricas de impacto.
6. Implementar mapa de orfanatos.
7. Agregar historial completo de trazabilidad.
8. Desplegar backend en Render/Railway y frontend en Vercel.
