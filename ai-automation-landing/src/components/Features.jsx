import React, { useState, useEffect, useRef } from 'react';
import { features } from '../data/features';
import { getIcon } from './icons/Icon';

const featureThemes = [
  {
    front: 'feature-card-surface feature-card-surface-1 border-primary-teal',
    icon: 'bg-primary-yellow text-primary-teal',
    title: 'text-primary-yellow',
    body: 'text-bg-light',
    back: 'feature-card-back feature-card-back-1 border-primary-teal text-bg-light',
    backTitle: 'text-primary-yellow',
    backRule: 'border-primary-yellow',
    arrow: 'text-primary-yellow',
  },
  {
    front: 'feature-card-surface feature-card-surface-2 border-primary-teal',
    icon: 'bg-accent-mint text-primary-teal',
    title: 'text-primary-yellow',
    body: 'text-bg-light',
    back: 'feature-card-back feature-card-back-2 border-primary-teal text-bg-light',
    backTitle: 'text-primary-yellow',
    backRule: 'border-primary-yellow',
    arrow: 'text-primary-yellow',
  },
  {
    front: 'feature-card-surface feature-card-surface-3 border-primary-teal',
    icon: 'bg-primary-yellow text-dark-navy',
    title: 'text-primary-yellow',
    body: 'text-bg-light',
    back: 'feature-card-back feature-card-back-3 border-primary-teal text-bg-light',
    backTitle: 'text-primary-yellow',
    backRule: 'border-primary-yellow',
    arrow: 'text-primary-yellow',
  },
  {
    front: 'feature-card-surface feature-card-surface-4 border-primary-teal',
    icon: 'bg-accent-orange text-dark-navy',
    title: 'text-primary-yellow',
    body: 'text-bg-light',
    back: 'feature-card-back feature-card-back-4 border-primary-teal text-bg-light',
    backTitle: 'text-primary-yellow',
    backRule: 'border-primary-yellow',
    arrow: 'text-primary-yellow',
  },
  {
    front: 'feature-card-surface feature-card-surface-5 border-primary-teal',
    icon: 'bg-primary-yellow text-primary-teal',
    title: 'text-primary-yellow',
    body: 'text-bg-light',
    back: 'feature-card-back feature-card-back-5 border-primary-teal text-bg-light',
    backTitle: 'text-primary-yellow',
    backRule: 'border-primary-yellow',
    arrow: 'text-primary-yellow',
  },
  {
    front: 'feature-card-surface feature-card-surface-6 border-primary-teal',
    icon: 'bg-accent-mint text-primary-teal',
    title: 'text-primary-yellow',
    body: 'text-bg-light',
    back: 'feature-card-back feature-card-back-6 border-primary-teal text-bg-light',
    backTitle: 'text-primary-yellow',
    backRule: 'border-primary-yellow',
    arrow: 'text-primary-yellow',
  },
];

export default function Features() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);
  const previousIsMobileRef = useRef(false);

  // Detect viewport changes and preserve the active feature across layouts.
  useEffect(() => {
    const syncViewport = () => {
      const nextIsMobile = window.innerWidth < 768;
      setIsMobile(nextIsMobile);

      if (!previousIsMobileRef.current && nextIsMobile && hoveredIndex !== null) {
        setActiveIndex(hoveredIndex);
      }

      previousIsMobileRef.current = nextIsMobile;
    };
    
    syncViewport();
    window.addEventListener('resize', syncViewport);
    return () => window.removeEventListener('resize', syncViewport);
  }, [hoveredIndex]);

  const handleBentoHover = (index) => {
    if (!isMobile) {
      setHoveredIndex(index);
    }
  };

  const handleBentoLeave = () => {
    if (!isMobile) {
      setHoveredIndex(null);
    }
  };

  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section id="features" className="py-20 bg-bg-light" ref={containerRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-navy mb-4">
            <span className="text-primary-teal animate-pulse">Powerful Features</span> for <span className="text-primary-yellow">Modern Teams</span>
          </h2>
          <p className="text-lg text-dark-navy max-w-3xl mx-auto">
            Everything you need to automate, analyze, and accelerate your data workflows
          </p>
        </div>

        {/* Desktop: Bento Grid */}
        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = getIcon(feature.icon);
              const isHovered = hoveredIndex === index;
              const isLarge = index === 0 || index === 3;
              const theme = featureThemes[index % featureThemes.length];
              
              return (
                <div
                  key={feature.id}
                  className={`group feature-flip-shell animate-card-entrance stagger-${index + 1} ${
                    isHovered ? 'is-active' : ''
                  } ${isLarge ? 'md:col-span-2 lg:col-span-1' : ''}`}
                  onMouseEnter={() => handleBentoHover(index)}
                  onMouseLeave={handleBentoLeave}
                  onFocus={() => handleBentoHover(index)}
                  onBlur={handleBentoLeave}
                  tabIndex={0}
                  aria-label={`${feature.title}: ${feature.details}`}
                >
                  <article className="feature-flip-card">
                    <div className={`feature-flip-face feature-flip-front rounded-2xl border-2 p-8 shadow-lg ${theme.front}`}>
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-200 ease-out animate-icon-float ${theme.icon}`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      
                      <h3 className={`font-mono text-xl font-bold mb-3 ${theme.title}`}>
                        {feature.title}
                      </h3>
                      
                      <p className={`${theme.body}`}>
                        {feature.description}
                      </p>
                    </div>

                    <div className={`feature-flip-face feature-flip-back rounded-2xl border-2 p-8 shadow-2xl ${theme.back}`}>
                      <div className="flex h-full flex-col justify-between">
                        <div>
                          <p className={`font-mono text-sm font-bold uppercase tracking-normal mb-4 ${theme.backTitle}`}>
                            Feature depth
                          </p>
                          <h3 className={`font-mono text-2xl font-bold mb-5 ${theme.backTitle}`}>
                            {feature.title}
                          </h3>
                          <p className={`text-sm leading-6 pt-5 border-t ${theme.backRule}`}>
                            {feature.details}
                          </p>
                        </div>

                        <div className={`mt-8 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 ${theme.backRule} ${theme.arrow}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile: Accordion */}
        {isMobile && (
          <div className="space-y-4">
            {features.map((feature, index) => {
              const IconComponent = getIcon(feature.icon);
              const isActive = activeIndex === index;
              const theme = featureThemes[index % featureThemes.length];
              
              return (
                <div
                  key={feature.id}
                  className={`rounded-xl border-2 shadow-md overflow-hidden transition-all duration-300 ${theme.front}`}
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left transition-transform duration-200 ease-out active:scale-[0.99]"
                    onClick={() => handleAccordionClick(index)}
                    aria-expanded={isActive}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-200 ease-out ${
                        isActive ? 'scale-105' : ''
                      } ${theme.icon}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className={`font-mono text-lg font-bold ${theme.title}`}>
                        {feature.title}
                      </h3>
                    </div>
                    
                    <div className={`transform transition-transform duration-300 ${
                      isActive ? 'rotate-180' : ''
                    } ${theme.title}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-5 pt-2">
                      <p className={`${theme.body} mb-3`}>
                        {feature.description}
                      </p>
                      <p className={`text-sm ${theme.body}`}>
                        {feature.details}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
