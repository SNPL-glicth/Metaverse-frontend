import React from 'react';
import { SiUnity, SiUnrealengine, SiBlockchaindotcom, SiGooglecloud, SiTableau } from 'react-icons/si';
import { FaRobot, FaShieldAlt } from 'react-icons/fa';
import { MdWeb } from 'react-icons/md';
import TechOrbitBackground from './TechOrbitBackground';

const TechnologiesSection: React.FC = () => {
  const technologies = [
    {
      icon: SiUnity,
      name: 'Unity 3D',
      description:
        'Motor de desarrollo líder para experiencias XR inmersivas de alta calidad.',
      category: 'Desarrollo',
    },
    {
      icon: MdWeb,
      name: 'WebXR',
      description:
        'Estándares web para realidad virtual y aumentada accesible desde cualquier navegador.',
      category: 'Web',
    },
    {
      icon: SiUnrealengine,
      name: 'Unreal Engine',
      description:
        'Tecnología de vanguardia para visualizaciones fotorrealistas y experiencias AAA.',
      category: 'Desarrollo',
    },
    {
      icon: SiBlockchaindotcom,
      name: 'Blockchain',
      description:
        'Infraestructura descentralizada para NFTs, activos digitales y economías virtuales.',
      category: 'Blockchain',
    },
    {
      icon: FaRobot,
      name: 'AI & ML',
      description:
        'Inteligencia artificial para experiencias adaptativas y comportamientos inteligentes.',
      category: 'Inteligencia',
    },
    {
      icon: SiGooglecloud,
      name: 'Cloud Computing',
      description:
        'Infraestructura en la nube para experiencias escalables y colaborativas.',
      category: 'Infraestructura',
    },
    {
      icon: SiTableau,
      name: 'Analytics XR',
      description:
        'Métricas avanzadas para optimizar la experiencia del usuario en entornos virtuales.',
      category: 'Datos',
    },
    {
      icon: FaShieldAlt,
      name: 'Seguridad',
      description:
        'Protocolos de seguridad robustos para proteger datos y experiencias virtuales.',
      category: 'Seguridad',
    },
  ];

  const categories = [
    'Todos',
    'Desarrollo',
    'Web',
    'Blockchain',
    'Inteligencia',
    'Infraestructura',
    'Datos',
    'Seguridad',
  ];
  const [selectedCategory, setSelectedCategory] = React.useState('Todos');

  const filteredTechnologies =
    selectedCategory === 'Todos'
      ? technologies
      : technologies.filter((tech) => tech.category === selectedCategory);

  return (
    <section id="technologies" className="py-20 bg-white relative overflow-hidden">
      {/* Fondo animado propio para Tecnologías (diferente al Hero) */}
      <TechOrbitBackground />
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Tecnologías Avanzadas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Utilizamos las herramientas más modernas y potentes para crear
            experiencias inmersivas de clase mundial.
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

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTechnologies.map((tech, index) => (
            <div
              key={index}
              className="tile group bg-gray-200 aspect-[4/3] text-center animate-slideUp"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="tile__media">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"></div>
              </div>
              {/* Overlay claro para mantener texto oscuro legible */}
              <div className="absolute inset-0 bg-white/50 group-hover:bg-white/60 transition-colors duration-300"></div>

              <div className="tile__content h-full w-full p-6 flex flex-col items-center justify-center">
                <tech.icon className="w-10 h-10 text-black opacity-80 mb-3" />
                <h3 className="text-lg font-bold text-black mb-2 tracking-wide">
                  {tech.name}
                </h3>
                <div className="px-3 py-1 bg-black text-white rounded-full text-xs font-medium mb-3">
                  {tech.category}
                </div>
                {/* Lista con líneas, aparece suavemente como en Servicios, con slideUp como el Hero */}
                <ul className="list-lines text-gray-800 text-xs max-w-xs text-left opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 group-hover:animate-slideUp">
                  <li className="truncate">{tech.description}</li>
                  <li className="uppercase tracking-wider">{tech.category}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-black mb-2">50+</div>
            <div className="text-gray-600">Proyectos Completados</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-black mb-2">15+</div>
            <div className="text-gray-600">Tecnologías Dominadas</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-black mb-2">100+</div>
            <div className="text-gray-600">Experiencias Creadas</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-black mb-2">24/7</div>
            <div className="text-gray-600">Soporte Técnico</div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default TechnologiesSection;
