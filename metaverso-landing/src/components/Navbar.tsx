import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Detectar scroll para agregar sombra
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 transition-all duration-300 ${
      hasScrolled ? 'shadow-sm' : ''
    }`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img
              src="/imagen-removebg-preview.png"
              alt="Metaverso logo"
              className="h-12 md:h-16 lg:h-20 w-auto select-none object-contain"
              loading="lazy"
            />
            <span className="font-brand text-xl sm:text-2xl md:text-3xl font-semibold text-black tracking-wide uppercase">
              Metaverso
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('hero')}
              className="nav-link text-black font-medium transition-colors duration-300 hover:text-black"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="nav-link text-black font-medium transition-colors duration-300 hover:text-black"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('technologies')}
              className="nav-link text-black font-medium transition-colors duration-300 hover:text-black"
            >
              Tecnologías
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="nav-link text-black font-medium transition-colors duration-300 hover:text-black"
            >
              Proyectos
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 rounded-full font-medium border-2 border-black bg-black text-white transition-all duration-300 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Contacto
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black hover:text-gray-600 focus:outline-none transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-black hover:text-gray-600 transition-colors duration-300 text-left font-medium py-2"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-black hover:text-gray-600 transition-colors duration-300 text-left font-medium py-2"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection('technologies')}
                className="text-black hover:text-gray-600 transition-colors duration-300 text-left font-medium py-2"
              >
                Tecnologías
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-black hover:text-gray-600 transition-colors duration-300 text-left font-medium py-2"
              >
                Proyectos
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-4 py-2 rounded-full font-medium border-2 border-black bg-black text-white transition-all duration-300 hover:bg-white hover:text-black w-fit mt-2"
              >
                Contacto
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
