# Profesor Ox Panel

Panel Administrativo para PokeTrainer PWA desarrollado con Angular 20.

## 🚀 Características

- **Autenticación con 2FA**: Login con verificación de código OTP
- **Dashboard**: Resumen del sistema con métricas
- **Gestión de Entrenadores**: Lista, filtros y acciones administrativas
- **Historial de Capturas**: Visualización y exportación de datos
- **QR Manager**: Generación de códigos QR para Pokémon
- **Configuración**: Ajustes del sistema y tema oscuro

## 🛠️ Tecnologías

- Angular 20 (Standalone Components)
- Angular Material
- Tailwind CSS
- TypeScript
- RxJS

## 📦 Instalación

### Requisitos
- Node.js 20+
- npm

### Comandos

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Construir para producción
npm run build
```

## 🔐 Autenticación Demo

### Login
- **Email**: Cualquier correo que termine en `@utt.edu.mx`
- **Contraseña**: Mínimo 4 caracteres

### 2FA
- **Código**: `123456`

## 🎨 Tema

El panel incluye soporte para tema claro y oscuro. Puedes cambiar el tema desde la página de Ajustes.

## 📱 Responsive

La aplicación es completamente responsive y se adapta a diferentes tamaños de pantalla.

## 🔧 Estructura del Proyecto

```
src/
├── app/
│   ├── core/           # Servicios, guards, interceptores
│   ├── layout/         # Layouts de autenticación y admin
│   ├── pages/          # Páginas principales
│   ├── shared/         # Componentes compartidos
│   └── app.routes.ts   # Configuración de rutas
├── styles.css          # Estilos globales con Tailwind
└── main.ts            # Punto de entrada
```

## 🚦 Rutas

- `/auth/login` - Página de login
- `/auth/2fa` - Verificación 2FA
- `/dashboard` - Dashboard principal
- `/trainers` - Gestión de entrenadores
- `/captures` - Historial de capturas
- `/qr-manager` - Generador de QR
- `/settings` - Configuración

## 📊 Datos Mock

La aplicación utiliza datos mock almacenados en memoria para demostrar la funcionalidad:

- **Entrenadores**: Lista de entrenadores de ejemplo
- **Capturas**: Historial de capturas simulado
- **Métricas**: Estadísticas del dashboard

## 🔒 Seguridad

- Guards de autenticación y autorización
- Interceptor para tokens de autorización
- Almacenamiento seguro en localStorage
- Validación de formularios

## 🎯 Próximas Características

- Integración con backend real
- Notificaciones push
- Reportes avanzados
- Gestión de usuarios
- API de Pokémon real

## 📝 Notas de Desarrollo

- Todos los componentes son standalone
- Uso de lazy loading para optimización
- Implementación de Material Design
- Soporte completo para PWA