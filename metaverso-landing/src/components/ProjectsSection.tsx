import React, { useState } from 'react';

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: 'Virtual Office Suite',
      category: 'Corporativo',
      description:
        'Espacio de trabajo virtual completo para empresa multinacional con 500+ empleados.',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      technologies: ['Unity 3D', 'WebXR', 'Cloud Computing'],
      results: [
        '300% aumento en colaboración',
        '50% reducción de costos',
        '95% satisfacción del usuario',
      ],
    },
    {
      id: 2,
      title: 'AR Shopping Experience',
      category: 'Retail',
      description:
        'Aplicación de realidad aumentada para probarse ropa virtualmente antes de comprar.',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      technologies: ['ARKit', 'Machine Learning', 'Computer Vision'],
      results: [
        '400% más conversiones',
        '80% menos devoluciones',
        '4.8/5 rating de usuarios',
      ],
    },
    {
      id: 3,
      title: 'Medical VR Training',
      category: 'Educación',
      description:
        'Simulador VR para entrenamiento médico en cirugías complejas.',
      image:
        '/medical-vr.svg',
      technologies: ['Unreal Engine', 'Haptic Feedback', 'AI Analytics'],
      results: [
        '70% mejora en precisión',
        '60% reducción en tiempo de entrenamiento',
        'Adoptado por 15 hospitales',
      ],
    },
    {
      id: 4,
      title: 'Virtual Art Gallery',
      category: 'Arte',
      description: 'Galería de arte NFT inmersiva con subastas en tiempo real.',
      image:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      technologies: ['WebXR', 'Blockchain', 'Smart Contracts'],
      results: [
        '$2M en ventas NFT',
        '10K visitantes únicos',
        'Partnership con 50+ artistas',
      ],
    },
    {
      id: 5,
      title: 'Industrial Metaverse',
      category: 'Industrial',
      description:
        'Gemelo digital de fábrica para optimización de procesos y mantenimiento predictivo.',
      image:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      technologies: ['Digital Twin', 'IoT Integration', 'Predictive Analytics'],
      results: [
        '25% reducción de costos',
        '40% mejora en eficiencia',
        '90% precisión predictiva',
      ],
    },
    {
      id: 6,
      title: 'Social VR Platform',
      category: 'Social',
      description:
        'Plataforma social VR para eventos y reuniones con hasta 1000 usuarios simultáneos.',
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      technologies: ['Unity Netcode', 'Voice Chat', 'Avatar System'],
      results: [
        '100K usuarios activos',
        '50+ eventos por día',
        '4.7/5 rating de satisfacción',
      ],
    },
  ];

  const categories = [
    'Todos',
    'Corporativo',
    'Retail',
    'Educación',
    'Arte',
    'Industrial',
    'Social',
  ];
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredProjects =
    selectedCategory === 'Todos'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section
      id="projects"
      className="py-20 bg-gray-50 relative"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Casos de Éxito
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre cómo hemos transformado visiones en realidades virtuales
            exitosas para empresas de diferentes industrias.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white group cursor-pointer"
              onClick={() => setSelectedProject(project.id)}
            >
              {/* Project Image as protagonist */}
              <div className="relative h-56 overflow-hidden bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = '/project-placeholder.svg';
                    e.currentTarget.className = 'w-full h-full object-contain bg-black';
                  }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-100 group-hover:bg-black/40 transition-colors duration-500"></div>
                <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded-full text-white text-xs font-medium">
                  {project.category}
                </div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="text-lg md:text-xl font-bold tracking-wide">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            ¿Tienes un proyecto en mente? Hagámoslo realidad juntos.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary text-lg px-10 py-4"
          >
            Iniciar Proyecto
          </button>
        </div>
      </div>

      {/* Project Modal (Simple overlay for now) */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white border border-gray-300 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const project = projects.find((p) => p.id === selectedProject);
              if (!project) return null;

              return (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-black">
                      {project.title}
                    </h3>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-gray-600 hover:text-black text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />

                  <p className="text-gray-600 mb-6">{project.description}</p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-black mb-3">
                      Tecnologías Utilizadas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-black mb-3">
                      Resultados Obtenidos
                    </h4>
                    <ul className="space-y-2">
                      {project.results.map((result, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-600"
                        >
                          <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
