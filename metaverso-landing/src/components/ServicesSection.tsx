import React from 'react';
import { Headphones, Smartphone, Building2, Gamepad2, ShoppingBag, Palette } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Headphones,
      title: 'Realidad Virtual',
      description:
        'Experiencias inmersivas completas que transportan a los usuarios a mundos completamente digitales.',
      features: [
        'Espacios VR personalizados',
        'Simulaciones 3D avanzadas',
        'Interacción multiusuario',
      ],
    },
    {
      icon: Smartphone,
      title: 'Realidad Aumentada',
      description:
        'Fusionamos el mundo digital con el físico para crear experiencias híbridas innovadoras.',
      features: [
        'Apps AR móviles',
        'Filtros personalizados',
        'Reconocimiento de objetos',
      ],
    },
    {
      icon: Building2,
      title: 'Espacios Corporativos',
      description:
        'Oficinas virtuales y espacios de colaboración empresarial en el metaverso.',
      features: [
        'Reuniones virtuales',
        'Eventos corporativos',
        'Training inmersivo',
      ],
    },
    {
      icon: Gamepad2,
      title: 'Experiencias Gamificadas',
      description:
        'Convertimos conceptos complejos en experiencias interactivas y entretenidas.',
      features: [
        'Juegos educativos',
        'Simuladores de entrenamiento',
        'Narrativas interactivas',
      ],
    },
    {
      icon: ShoppingBag,
      title: 'Comercio Virtual',
      description:
        'Tiendas y showrooms virtuales que revolucionan la experiencia de compra.',
      features: [
        'Showrooms 3D',
        'Try-before-buy virtual',
        'E-commerce inmersivo',
      ],
    },
    {
      icon: Palette,
      title: 'Arte Digital',
      description:
        'Galerías virtuales y experiencias artísticas inmersivas únicas.',
      features: ['Galerías NFT', 'Arte interactivo', 'Instalaciones digitales'],
    },
  ];

  return (
    <section
      id="services"
      className="py-20 bg-white relative"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos soluciones completas para llevar tu negocio al siguiente
            nivel a través de tecnologías inmersivas y experiencias del
            metaverso.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="tile group bg-gray-200 aspect-[4/3] animate-slideUp"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              {/* Simulated media background (replace with real images/renders when available) */}
              <div className="tile__media">
                <div className={`absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-300`}></div>
              </div>
              {/* Overlay claro para texto oscuro, coherente con fondo del Hero */}
              <div className="absolute inset-0 bg-white/50 group-hover:bg-white/60 transition-colors duration-300"></div>

              {/* Content */}
              <div className="tile__content h-full w-full p-6 flex flex-col justify-end items-center text-center">
                <service.icon className="w-10 h-10 text-black opacity-80 mb-3" />
                <h3 className="text-2xl font-bold text-black mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-800 text-sm mb-4 line-clamp-3 hidden md:block">
                  {service.description}
                </p>

                {/* Features List (shows on hover) */}
                <ul className="hidden md:block text-gray-800 text-sm space-y-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 group-hover:animate-slideUp">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-center">
                      <span className="w-3 h-px bg-black mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            ¿Listo para transformar tu visión en realidad virtual?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary text-lg px-10 py-4"
          >
            Consulta Gratuita
          </button>
        </div>
      </div>

    </section>
  );
};

export default ServicesSection;
