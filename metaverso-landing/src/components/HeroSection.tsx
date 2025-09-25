import React from 'react';
import InteractiveParticles from './InteractiveParticles';

const HeroSection: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden"
    >
      {/* Interactive Particles Background - Full Coverage */}
      <InteractiveParticles />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Content Section */}
          <div className="text-center lg:text-left animate-slideUp">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="text-black">Explora el</span>
              <br />
              <span className="text-black">Metaverso</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Descubre nuevas realidades y experimenta el futuro de la interacción
              digital. Creamos experiencias inmersivas que conectan mundos
              virtuales con la realidad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button
                onClick={() => scrollToSection('services')}
                className="btn-primary text-lg px-10 py-4 relative z-20"
              >
                Empezar Ahora
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-secondary text-lg px-10 py-4 relative z-20"
              >
                Ver Proyectos
              </button>
            </div>
          </div>

          {/* Right side - Just spacing */}
          <div className="hidden lg:block">
            {/* Empty space for layout balance */}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
