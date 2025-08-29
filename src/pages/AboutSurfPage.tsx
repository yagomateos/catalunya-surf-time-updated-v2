import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSurfPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 pb-20 pt-12 sm:pt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link to="/cuenta" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Mi Cuenta
            </Link>
          </div>

          <article className="prose prose-invert lg:prose-xl bg-card/50 p-8 rounded-lg shadow-lg">
            <h1 className="text-primary">Sobre Catalunya Surf Time</h1>
            
            <h2>Descripción del Proyecto</h2>
            <p>
              "Catalunya Surf Time" es una aplicación web diseñada para proporcionar información en tiempo real sobre las condiciones de surf en varias localizaciones de España, con un enfoque inicial en Cataluña. La aplicación permite a los usuarios consultar la altura de las olas, dirección del viento, temperatura y visibilidad para diferentes spots de surf.
            </p>

            <h2>Características</h2>
            <ul>
              <li><strong>Condiciones de Surf en Tiempo Real:</strong> Consulta datos actualizados de altura de olas, dirección y velocidad del viento, temperatura y visibilidad.</li>
              <li><strong>Previsión Horaria:</strong> Obtén una previsión detallada por horas para planificar tus sesiones de surf.</li>
              <li><strong>Alertas de Surf:</strong> Mantente informado sobre las condiciones óptimas para surfear.</li>
              <li><strong>Interfaz Intuitiva:</strong> Diseño limpio y fácil de usar para una experiencia de usuario óptima.</li>
            </ul>

            <h2>Tecnologías Utilizadas</h2>
            <ul>
              <li><strong>Frontend:</strong> React.js</li>
              <li><strong>Build Tool:</strong> Vite</li>
              <li><strong>Estilos:</strong> Tailwind CSS</li>
              <li><strong>Componentes UI:</strong> Shadcn/ui</li>
              <li><strong>Iconos:</strong> Lucide React</li>
              <li><strong>Manejo de Estado/Datos:</strong> React Query</li>
              <li><strong>Formularios:</strong> React Hook Form</li>
            </ul>

            <h2>Instalación y Uso</h2>
            <p>Para configurar y ejecutar este proyecto localmente, puedes seguir las instrucciones detalladas en el archivo README del repositorio.</p>
            
          </article>
        </div>
      </div>
    </div>
  );
};

export default AboutSurfPage;
