# Fallecidos Web

Aplicación web para buscar y consultar información sobre personas fallecidas en Chile.

## Descripción

**Fallecidos Web** es una plataforma construida con Next.js 15 que permite a los usuarios buscar información sobre personas fallecidas mediante diversos criterios como nombre, RUT, año de fallecimiento, región, comuna, cementerio y causa de muerte.

## Tecnologías

- **Framework**: Next.js 15.2.4
- **React**: 19
- **TypeScript**: 5
- **Estilos**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI
- **Validación**: Zod 3.25.67
- **Formularios**: React Hook Form 7.60.0
- **Fuente**: Geist Sans y Geist Mono
- **Analytics**: Vercel Analytics

## Estructura del Proyecto

```
fallecidos-web/
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.ts       # API endpoint para búsquedas
│   ├── layout.tsx             # Layout principal con metadata
│   ├── page.tsx               # Página principal
│   └── loading.tsx            # Estado de carga
├── components/
│   ├── navbar.tsx             # Barra de navegación
│   ├── hero.tsx               # Sección hero de la landing
│   ├── search-section.tsx     # Formulario de búsqueda con filtros
│   ├── results-table.tsx      # Tabla de resultados paginada
│   └── ui/                    # Componentes UI reutilizables
├── hooks/                     # Custom hooks
├── lib/
│   └── utils.ts               # Utilidades y helpers
├── public/                    # Archivos estáticos
└── styles/                    # Estilos globales
```

## Funcionalidades

### 1. Búsqueda Avanzada
La aplicación permite buscar personas fallecidas mediante:
- **Nombre completo o RUT**: Búsqueda por texto en el campo principal
- **Año de fallecimiento**: Filtro por año específico (2020-2024)
- **Región/Comuna**: Filtros geográficos
- **Cementerio**: Filtro por lugar de entierro
- **Causa de muerte**: Natural, accidente u otro

### 2. Resultados
Los resultados se muestran en una tabla que incluye:
- Nombre completo
- Fechas (nacimiento - fallecimiento)
- Lugar de entierro
- Epitafio

### 3. Paginación
Sistema de paginación con:
- 10 resultados por página (configurable)
- Navegación entre páginas
- Contador de resultados totales

## API

### Endpoint de Búsqueda

**GET** `/api/search`

#### Query Parameters:
- `q` (string, opcional): Nombre o RUT de la persona
- `year` (string, opcional): Año de fallecimiento
- `region` (string, opcional): Región de Chile
- `comuna` (string, opcional): Comuna
- `cemetery` (string, opcional): Slug del cementerio
- `cause` (string, opcional): Causa de muerte (natural, accidente, otro)
- `page` (number, default: 1): Número de página
- `pageSize` (number, default: 10, max: 100): Resultados por página

#### Respuesta:
```json
{
  "items": [
    {
      "name": "Isabella Rossi",
      "dates": "1935 - 2023",
      "location": "Cementerio Metropolitano",
      "epitaph": "Siempre en nuestros corazones"
    }
  ],
  "page": 1,
  "pageSize": 10,
  "total": 7
}
```

## Integración con Backend

Esta aplicación frontend se conecta a un backend NestJS que proporciona la API REST.

### Configuración de Backend

El frontend usa una API Route (`/app/api/search/route.ts`) que actúa como **proxy** al backend NestJS:

```typescript
// El API Route hace fetch al backend
fetch('http://localhost:3002/fallecidos?...')
```


### Ventajas del Proxy Pattern

- ✅ Evita problemas de CORS
- ✅ Oculta la URL del backend al cliente
- ✅ Permite transformar datos sin modificar componentes
- ✅ Facilita migración entre backends

### Backend API

El backend expone la siguiente API:

**Endpoint**: `GET http://localhost:3002/fallecidos`

**Parámetros**:
- `q`, `year`, `region`, `comuna`, `cemetery`, `cause`
- `page`, `pageSize`

**Respuesta del Backend**:
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "Juan Pérez",
      "rut": "12.345.678-9",
      "birthYear": 1950,
      "deathYear": 2023,
      "region": "metropolitana",
      "comuna": "santiago",
      "location": "Cementerio General",
      "cemeterySlug": "general",
      "cause": "natural",
      "epitaph": "Siempre en nuestros corazones",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "total": 7,
  "page": 1,
  "pageSize": 10
}
```

El API Route transforma esto al formato esperado por los componentes.

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/AngeloAste/fallecidos-web.git
cd fallecidos-web

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local si necesitas cambiar la URL del backend

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

### Variables de Entorno

Crea un archivo `.env.local` con:

```env
BACKEND_API_URL=http://localhost:3002
```

**Nota**: Cambia el puerto si tu backend corre en uno diferente.

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo en http://localhost:3001
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter de Next.js

**Nota**: El puerto 3001 se usa porque el 3000 puede estar ocupado. El backend corre en el puerto 3002.

## Componentes Principales

### SearchSection
Componente de formulario que maneja:
- Estado de los campos de búsqueda
- Validación de entrada
- Limpieza de filtros
- Búsqueda al presionar Enter

### ResultsTable
Componente de tabla que:
- Muestra resultados paginados
- Maneja estados de carga y vacío
- Controla la navegación entre páginas

### API Route Handler
El endpoint `/api/search/route.ts` actúa como **proxy al backend**:
- Valida parámetros con Zod
- Hace fetch al backend NestJS (`http://localhost:3002/fallecidos`)
- Transforma la respuesta al formato esperado por los componentes
- Maneja errores de conexión
- Evita problemas de CORS

## Características de UI

- **Diseño Responsivo**: Optimizado para desktop y móvil
- **Tema**: Paleta de colores slate con acentos azules
- **Tipografía**: Fuente Geist Sans para mejor legibilidad
- **Accesibilidad**: Componentes de Radix UI con soporte ARIA
- **UX**: Estados de carga, mensajes informativos y paginación intuitiva

## Metadata SEO

- **Título**: "Eternal Rest - Encuentra a tus seres queridos"
- **Descripción**: "Busca en nuestra base de datos para encontrar información sobre personas fallecidas"
- **Idioma**: Español (es)

## Configuración

### next.config.mjs
Configuración básica de Next.js sin customizaciones adicionales.

### tsconfig.json
TypeScript configurado con:
- Paths aliases (`@/*`)
- Strict mode
- Módulos ESNext

### tailwind.config
Tailwind CSS 4 con:
- Animaciones custom
- Componentes de Radix UI
- Variables CSS personalizadas

## Desarrollo

El proyecto utiliza:
- **Client Components**: Marcados con `"use client"` para interactividad
- **Server Components**: Por defecto en Next.js 15
- **API Routes**: En formato App Router
- **TypeScript**: Para type safety
- **Hooks de React**: useState, useCallback para gestión de estado

## Estado Actual

✅ **Completado:**
- Conectado a backend NestJS con PostgreSQL
- Búsqueda avanzada con múltiples filtros
- Paginación funcional
- UI responsiva con Tailwind CSS
- Validación de datos con Zod
- Proxy API Route para evitar CORS

## Próximas Mejoras

- Implementar autenticación JWT
- React Query para mejor manejo de datos
- Debouncing en búsqueda de texto
- Sistema de favoritos
- Exportación de resultados (CSV, PDF)
- Búsqueda avanzada con operadores lógicos
- Mapas de cementerios con geolocalización
- Galería de imágenes/documentos
- Tests E2E con Playwright

## Licencia

Proyecto privado

## Autor

Desarrollado para Angelo
