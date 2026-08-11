# 🏄 Catalunya Surf Time

Aplicación web (y móvil, vía Capacitor) que muestra las condiciones de surf en tiempo real para distintos spots de Cataluña y España: altura de ola, viento, temperatura, previsión horaria, mapa de spots, cámaras y alertas.

## Características

- **Condiciones en tiempo real**: altura de ola, dirección/velocidad del viento, temperatura y valoración del spot.
- **Previsión horaria** para planificar sesiones.
- **Mapa de spots** interactivo (Leaflet).
- **Cámaras de surf** por spot.
- **Favoritos** y **cuenta de usuario** (autenticación con Firebase).
- **Alertas de surf** con condiciones óptimas.
- **App instalable (PWA)** y build nativo para Android/iOS con Capacitor.

## Stack técnico

- **Frontend**: React 18 + TypeScript + Vite
- **Estilos/UI**: Tailwind CSS + shadcn/ui (Radix UI) + Lucide Icons
- **Datos remotos**: TanStack Query (React Query)
- **Formularios**: React Hook Form + Zod
- **Mapas**: Leaflet / React-Leaflet
- **Gráficas**: Recharts
- **Auth/Backend as a service**: Firebase
- **API de condiciones de mar**: Stormglass, Windy
- **Backend ligero**: Express (`server.mjs`) + endpoints serverless (`pages/api`) para Vercel
- **Apps nativas**: Capacitor (Android / iOS)

## Requisitos previos

- Node.js 18+
- npm (o Bun, ya que el repo incluye `bun.lockb`)

## Instalación

```bash
git clone <url-del-repositorio>
cd catalunya-surf-time
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz con tus propias claves (no subas este archivo al repositorio):

```bash
VITE_API_URL=
VITE_STORMGLASS_API_KEY=
VITE_WINDY_KEY=
```

Para desarrollo local con datos de Vercel KV / Redis y Stormglass en el backend, puedes usar además un `.env.development.local` con:

```bash
STORMGLASS_API_KEY=
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
REDIS_URL=
```

## Uso en desarrollo

Servidor de desarrollo de Vite (frontend):

```bash
npm run dev
```

La app estará disponible en `http://localhost:5173`.

Servidor Express con datos mock de condiciones (opcional, puerto 3001):

```bash
node server.mjs
```

## Scripts disponibles

| Script              | Descripción                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`        | Levanta el servidor de desarrollo (Vite)      |
| `npm run build`      | Compila la app para producción                |
| `npm run build:dev`  | Compila en modo desarrollo                    |
| `npm run preview`    | Sirve el build de producción localmente       |
| `npm run lint`       | Ejecuta ESLint sobre el proyecto              |

## Estructura del proyecto

```
├── android/            # Proyecto nativo Android (Capacitor)
├── pages/api/           # Endpoints serverless (Vercel) para condiciones de surf
├── public/              # Assets estáticos y manifest PWA
├── src/
│   ├── components/      # Componentes de UI (mapa, previsión, alertas, gráficas...)
│   ├── context/          # Contextos de React
│   ├── hooks/             # Hooks personalizados
│   ├── lib/                # Utilidades
│   ├── pages/              # Vistas: inicio, mapa, cámaras, favoritos, cuenta, detalle de spot...
│   ├── services/            # Llamadas a APIs externas (Stormglass, etc.)
│   └── firebase.ts           # Configuración de Firebase
├── server.mjs            # Servidor Express con datos mock
├── capacitor.config.ts   # Configuración de la app nativa
└── vercel.json            # Configuración de despliegue en Vercel
```

## Despliegue (Vercel)

```bash
npm run build
vercel
```

Conectando el repositorio a Vercel, cada `git push` a `main` dispara un despliegue automático.

## App móvil (Capacitor)

```bash
npm run build
npx cap sync android
npx cap open android
```

## Licencia

Este proyecto está bajo la licencia MIT.
