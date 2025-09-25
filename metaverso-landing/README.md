# 🌐 Metaverso Landing Page

Una moderna landing page enfocada en tecnologías del metaverso, realidad virtual (VR), realidad aumentada (AR) y experiencias XR inmersivas. Construida con React, TypeScript, Vite y TailwindCSS.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y profesional con gradientes y animaciones suaves
- **Responsive**: Completamente adaptado para desktop y móvil
- **Tecnologías Avanzadas**: Desarrollado con las mejores prácticas modernas
- **Rendimiento**: Optimizado con Vite para carga rápida
- **Tipado**: TypeScript para desarrollo seguro y mantenible
- **Estilos**: TailwindCSS con configuración personalizada para el tema metaverso

## 🛠️ Stack Tecnológico

- **React 18**: Framework de JavaScript para interfaces de usuario
- **TypeScript**: Superset de JavaScript con tipado estático
- **Vite**: Bundler moderno y rápido
- **TailwindCSS**: Framework de CSS utilitario
- **PostCSS**: Herramienta para transformar CSS
- **ESLint + Prettier**: Linting y formateo de código

## 📋 Secciones de la Landing Page

1. **Hero Section**: Encabezado impactante con call-to-action
2. **Services**: Servicios de VR, AR, espacios corporativos, gamificación, etc.
3. **Technologies**: Tecnologías utilizadas (Unity, WebXR, Blockchain, AI, etc.)
4. **Projects**: Galería de casos de éxito y proyectos realizados
5. **Contact**: Formulario de contacto funcional
6. **Footer**: Enlaces organizados e información de contacto

## 🚀 Cómo levantar el proyecto

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repositorio-url>
   cd metaverso-landing
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

### Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta ESLint para revisar el código
- `npm run format` - Formatea el código con Prettier

## 🎨 Personalización

### Colores del tema

Los colores están configurados en `tailwind.config.cjs`:

```javascript
colors: {
  'metaverso': {
    primary: '#6366F1',    // Azul principal
    secondary: '#8B5CF6',  // Violeta
    accent: '#EC4899',     // Rosa
    dark: '#0F0F23',       // Fondo principal
    'dark-secondary': '#1A1A2E',
    'dark-tertiary': '#16213E',
  }
}
```

### Fuentes

Se utiliza la fuente Inter de Google Fonts, configurada en `src/index.css`.

## 📁 Estructura del proyecto

```
src/
├── components/          # Componentes React
│   ├── Navbar.tsx      # Barra de navegación
│   ├── HeroSection.tsx # Sección principal
│   ├── ServicesSection.tsx
│   ├── TechnologiesSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── App.tsx             # Componente principal
├── main.tsx            # Punto de entrada
└── index.css           # Estilos globales
```

## 🔧 Configuración

- **Vite**: Configurado en `vite.config.ts`
- **TypeScript**: Configurado en `tsconfig.json`
- **TailwindCSS**: Configurado en `tailwind.config.cjs`
- **PostCSS**: Configurado en `postcss.config.js`
- **ESLint**: Configurado en `eslint.config.js`
- **Prettier**: Configurado en `.prettierrc`

## 🌟 Características técnicas

### Animaciones
- Animaciones suaves con TailwindCSS utilities
- Efectos hover y transiciones personalizados
- Scroll suave entre secciones
- Animaciones flotantes y de aparición

### Responsividad
- Mobile-first design
- Breakpoints optimizados para tablet y desktop
- Navegación móvil con hamburger menu
- Grids responsivos con TailwindCSS

### Rendimiento
- Lazy loading de imágenes
- Optimización de bundle con Vite
- CSS purging automático con TailwindCSS
- TypeScript para mejor desarrollo y debugging

## 🤝 Contribuciones

Este proyecto está listo para recibir contribuciones. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Para más información sobre el proyecto o colaboraciones:

- Email: hello@metaverso.com
- Website: [En desarrollo]

---

**Desarrollado con ❤️ para el futuro del Metaverso**
