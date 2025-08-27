# Catalunya Surf Time

## Descripción del Proyecto

"Catalunya Surf Time" es una aplicación web diseñada para proporcionar información en tiempo real sobre las condiciones de surf en varias localizaciones de España, con un enfoque inicial en Cataluña. La aplicación permite a los usuarios consultar la altura de las olas, dirección del viento, temperatura y visibilidad para diferentes spots de surf.

## Características

*   **Condiciones de Surf en Tiempo Real:** Consulta datos actualizados de altura de olas, dirección y velocidad del viento, temperatura y visibilidad.
*   **Previsión Horaria:** Obtén una previsión detallada por horas para planificar tus sesiones de surf.
*   **Alertas de Surf:** Mantente informado sobre las condiciones óptimas para surfear.
*   **Interfaz Intuitiva:** Diseño limpio y fácil de usar para una experiencia de usuario óptima.

## Tecnologías Utilizadas

*   **Frontend:** React.js
*   **Build Tool:** Vite
*   **Estilos:** Tailwind CSS
*   **Componentes UI:** Shadcn/ui
*   **Iconos:** Lucide React
*   **Manejo de Estado/Datos:** React Query (mencionado en `package.json`)
*   **Formularios:** React Hook Form (mencionado en `package.json`)

## Instalación

Para configurar el proyecto localmente, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/catalunya-surf-time.git
    cd catalunya-surf-time
    ```
    (Nota: Reemplaza `https://github.com/tu-usuario/catalunya-surf-time.git` con la URL real de tu repositorio.)

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

## Uso (Ejecutar Localmente)

Para iniciar el servidor de desarrollo y ver la aplicación en tu navegador:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o un puerto similar).

## Despliegue

Este proyecto está configurado para ser desplegado fácilmente en plataformas como Vercel.

1.  **Construye la aplicación para producción:**
    ```bash
    npm run build
    ```
    Esto generará los archivos optimizados en la carpeta `dist/`.

2.  **Despliegue con Vercel CLI:**
    Si tienes la CLI de Vercel instalada y has iniciado sesión:
    ```bash
    vercel
    ```
    Sigue las instrucciones en la terminal para desplegar tu proyecto.

3.  **Despliegue Automático con Git (Vercel):**
    Si conectas tu repositorio de GitHub (o GitLab/Bitbucket) a Vercel, cada `git push` a la rama principal (ej. `main`) activará un despliegue automático.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un "issue" para discutir los cambios propuestos o envía un "pull request".

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.