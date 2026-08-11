# Catalunya Surf Time 🌊

Aplicación web (PWA) y móvil para consultar las condiciones de surf en tiempo real en distintos spots de Cataluña y España: altura de olas, viento, temperatura, mareas y previsión horaria.

## Características

- **Condiciones en tiempo real**: altura de olas, dirección/velocidad del viento, temperatura y valoración del spot (rating).
- **Previsión horaria**: gráfica de evolución de las condiciones a lo largo del día.
- **Mapa de spots**: localización de los picos de surf sobre un mapa interactivo (Leaflet).
- **Favoritos**: guarda tus spots preferidos para acceder rápido a ellos.
- **Alertas de surf**: avisos cuando las condiciones de un spot son buenas.
- **Webcams**: acceso a cámaras en directo de los spots disponibles.
- **PWA instalable**: funciona offline (service worker) y se puede instalar en el escritorio o el móvil.
- **App móvil nativa**: empaquetada con Capacitor para Android e iOS.

## Tecnologías utilizadas

- **Frontend**: React 18 + TypeScript + Vite
- **Estilos/UI**: Tailwind CSS, shadcn/ui (Radix UI), Lucide React
- **Datos/Estado**: TanStack React Query, React Hook Form + Zod
- **Mapas**: Leaflet / React Leaflet
- **Gráficas**: Recharts
- **Backend/API**: Express (`server.mjs`), funciones API en `pages/api` (Vercel)
- **Datos de surf**: [Stormglass API](https://stormglass.io/)
- **Autenticación/Backend as a Service**: Firebase
- **Apps móviles**: Capacitor (Android / iOS)

## Estructura del proyecto

```
├── src/
│   ├── components/     # Componentes UI (mapa, gráficas, alertas, etc.)
│   ├── pages/           # Páginas de la app (Inicio, Mapa, Favoritos, Cams, Cuenta...)
│   ├── services/        # Llamadas a servicios externos (surfService.ts)
│   ├── hooks/            # Hooks personalizados (useSurfConditions, usePWA...)
│   ├── context/          # Contextos de React (favoritos)
│   └── assets/           # Imágenes y recursos estáticos
├── pages/api/            # Endpoints serverless (get-conditions, update-conditions)
├── android/              # Proyecto nativo Android (Capacitor)
├── public/                # Manifest PWA, iconos y service worker
├── server.mjs             # Servidor Express para servir la API y el build
└── capacitor.config.ts    # Configuración de la app móvil
```

## Requisitos previos

- Node.js 18+
- npm (o bun, ya que el repo incluye `bun.lockb`)

## Instalación

```bash
git clone https://github.com/yagomateos/catalunya-surf-time-updated-v2.git
cd catalunya-surf-time-updated-v2
npm install
```

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con:

```
VITE_API_URL=<url-base-de-la-api>
VITE_STORMGLASS_API_KEY=<tu-api-key-de-stormglass>
```

## Uso (desarrollo)

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

Si necesitas levantar también el servidor de API local (Express):

```bash
node server.mjs
```

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo de Vite |
| `npm run build` | Genera el build de producción en `dist/` |
| `npm run build:dev` | Genera un build en modo desarrollo |
| `npm run preview` | Sirve localmente el build de producción |
| `npm run lint` | Ejecuta ESLint sobre el proyecto |

## App móvil (Capacitor)

```bash
npm run build
npx cap sync android
npx cap open android
```

Esto sincroniza el build web con el proyecto nativo de Android en `android/` y lo abre en Android Studio.

## Despliegue

El proyecto está preparado para desplegarse en [Vercel](https://vercel.com/):

```bash
npm run build
vercel
```

Conectando el repositorio a Vercel, cada `git push` a la rama principal activa un despliegue automático, incluyendo las funciones serverless de `pages/api`.

## Contribuciones

Las contribuciones son bienvenidas. Abre un issue para discutir cambios propuestos o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT.
