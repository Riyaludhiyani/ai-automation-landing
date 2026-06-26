import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-navy/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-primary-yellow rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <svg className="w-6 h-6 text-dark-navy" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="font-mono font-bold text-xl text-white">
                DataFlow<span className="text-primary-yellow">AI</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-primary-yellow transition-colors duration-200">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-primary-yellow transition-colors duration-200">Pricing</a>
            <a href="#testimonials" className="text-gray-300 hover:text-primary-yellow transition-colors duration-200">Testimonials</a>
            <a href="#contact" className="text-gray-300 hover:text-primary-yellow transition-colors duration-200">Contact</a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="px-6 py-2.5 bg-primary-yellow text-dark-navy font-semibold rounded-lg hover:bg-primary-yellow/90 transform hover:scale-105 transition-all duration-200">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-dark-navy/98 backdrop-blur-sm rounded-lg mt-2 p-4 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-300 hover:text-primary-yellow transition-colors duration-200 py-2">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-primary-yellow transition-colors duration-200 py-2">Pricing</a>
              <a href="#testimonials" className="text-gray-300 hover:text-primary-yellow transition-colors duration-200 py-2">Testimonials</a>
              <a href="#contact" className="text-gray-300 hover:text-primary-yellow transition-colors duration-200 py-2">Contact</a>
              <button className="w-full px-6 py-3 bg-primary-yellow text-dark-navy font-semibold rounded-lg hover:bg-primary-yellow/90 transition-all duration-200">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}