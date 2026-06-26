import React, { useRef, useEffect, useState } from 'react';
import AnimatedStats from './AnimatedStats';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CTO at TechCorp',
    image: 'SJ',
    content: 'DataFlow AI transformed our data operations. We reduced processing time by 75% and improved accuracy significantly. The automation capabilities are incredible.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'VP of Engineering at StartupXYZ',
    image: 'MC',
    content: 'The real-time analytics and predictive insights have given us a competitive edge. We can now make data-driven decisions in minutes, not days.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Data Lead at Enterprise Inc',
    image: 'ER',
    content: 'Implementation was seamless and the support team is outstanding. DataFlow AI scaled perfectly with our growing needs. Highly recommended!',
    rating: 5
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Founder at AI Ventures',
    image: 'DK',
    content: 'The ROI we\'ve seen in just 3 months is remarkable. DataFlow AI paid for itself within the first month. The automation is truly intelligent.',
    rating: 5
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Operations Director at GlobalTech',
    image: 'LT',
    content: 'We evaluated 12 different platforms. DataFlow AI stood out for its ease of use and powerful features. Our team was productive from day one.',
    rating: 5
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'CIO at FinanceHub',
    image: 'JW',
    content: 'Security and compliance were our top concerns. DataFlow AI exceeded our expectations with enterprise-grade security and SOC 2 compliance.',
    rating: 5
  }
];

const logos = [
  'TechCorp', 'StartupXYZ', 'Enterprise Inc', 'AI Ventures', 
  'GlobalTech', 'FinanceHub', 'DataDriven', 'CloudFirst'
];

const stats = [
  { value: 10, suffix: 'K+', label: 'Active Users' },
  { value: 500, suffix: '+', label: 'Enterprise Clients' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA' },
  { value: 4.9, suffix: '/5', label: 'Customer Rating' }
];

const faqItems = [
  {
    question: 'How fast can we launch our first automation?',
    answer: 'Most teams connect their first workflow in under an hour using templates, guided mapping, and live validation.'
  },
  {
    question: 'Can DataFlow AI work with our existing tools?',
    answer: 'Yes. DataFlow AI is built around API, webhook, and warehouse connections so your current stack can stay in place.'
  },
  {
    question: 'Is the trial limited?',
    answer: 'The free trial includes core automation, analytics, and collaboration features so your team can test a real workflow.'
  },
  {
    question: 'How is sensitive data protected?',
    answer: 'Data is protected with encryption, access controls, audit logs, and enterprise-grade compliance workflows.'
  }
];

export default function SocialProof() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({});
  const [mousePositions, setMousePositions] = useState({});
  const [activeFaq, setActiveFaq] = useState(0);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate stats counting
  useEffect(() => {
    if (!isVisible) return;

    stats.forEach((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(parseFloat((increment * step).toFixed(1)), stat.value);
        
        setAnimatedStats(prev => ({
          ...prev,
          [index]: current
        }));

        if (step >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);
    });
  }, [isVisible]);

  const handleMouseMove = (index, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4; // Max ±4 degrees
    const rotateY = ((x - centerX) / centerX) * 4;  // Max ±4 degrees
    
    setMousePositions(prev => ({
      ...prev,
      [index]: { x, y, rotateX, rotateY }
    }));
  };

  const handleMouseLeave = (index) => {
    setMousePositions(prev => ({
      ...prev,
      [index]: null
    }));
  };

  return (
    <section id="testimonials" className="py-20 bg-bg-light relative overflow-hidden" ref={sectionRef}>
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-yellow/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent-orange/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
          <h2 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-navy mb-4">
            Trusted by <span className="text-primary-teal">Industry Leaders</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join thousands of companies that trust DataFlow AI to power their data automation
          </p>
        </div>

        {/* Logo Cloud - Horizontal Scroller */}
        <div className="mb-16 overflow-hidden">
          <div className="relative">
            {/* Scrolling container */}
            <div className="flex gap-8 animate-scroll-left">
              {/* First set */}
              {logos.map((logo, index) => (
                <div 
                  key={index} 
                  className={`relative flex-shrink-0 w-48 h-20 rounded-lg shadow-md px-6 py-3 cursor-pointer transition-all duration-500 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 0.1}s`,
                    background: `linear-gradient(135deg, ${index % 2 === 0 ? '#FFC801' : '#114C5A'} 0%, ${index % 2 === 0 ? '#FF9932' : '#172B36'} 100%)`
                  }}
                  onMouseMove={(e) => handleMouseMove(index, e)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  {/* Spotlight effect */}
                  {mousePositions[index] && (
                    <div 
                      className="absolute inset-0 rounded-lg opacity-40 pointer-events-none transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at ${mousePositions[index].x}px ${mousePositions[index].y}px, rgba(255, 255, 255, 0.4), transparent 50%)`
                      }}
                    ></div>
                  )}
                  <span className="font-mono font-bold text-white text-lg relative z-10 flex items-center justify-center h-full">{logo}</span>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {logos.map((logo, index) => (
                <div 
                  key={`dup-${index}`} 
                  className={`relative flex-shrink-0 w-48 h-20 rounded-lg shadow-md px-6 py-3 cursor-pointer transition-all duration-500 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${(index + logos.length) * 0.1}s`,
                    background: `linear-gradient(135deg, ${index % 2 === 0 ? '#FFC801' : '#114C5A'} 0%, ${index % 2 === 0 ? '#FF9932' : '#172B36'} 100%)`
                  }}
                >
                  <span className="font-mono font-bold text-white text-lg relative z-10 flex items-center justify-center h-full">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Stats with Graphs */}
        <AnimatedStats />

        {/* Testimonials Grid - Cinematic Assembly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const getEntryAnimation = (index) => {
              const animations = [
                { x: '-100px', y: 0, rotate: -3 },    // Top Left: from left
                { x: 0, y: '-80px', rotate: 0 },      // Top Middle: from top
                { x: '100px', y: 0, rotate: 3 },      // Top Right: from right
                { x: '-60px', y: '60px', rotate: -2 }, // Bottom Left: diagonal
                { x: 0, y: '60px', rotate: 0 },       // Bottom Middle: scale from center
                { x: '60px', y: '60px', rotate: 2 }   // Bottom Right: diagonal
              ];
              return animations[index] || { x: 0, y: 0, rotate: 0 };
            };

            const entryAnim = getEntryAnimation(index);
            return (
              <div
                key={testimonial.id}
                className={`testimonial-card testimonial-card-surface group relative rounded-2xl p-6 shadow-lg transition-all duration-500 border-2 border-primary-teal ${
                  isVisible ? 'card-visible' : 'card-hidden'
                }`}
                style={{ 
                  transitionDelay: `${0.3 + (index * 0.08)}s`,
                  '--entry-x': entryAnim.x,
                  '--entry-y': entryAnim.y,
                  '--entry-rotate': `${entryAnim.rotate}deg`,
                  '--float-x': `${(index % 2 === 0 ? -1 : 1) * (2 + (index % 3))}px`,
                  '--float-y': `${(index % 2 === 0 ? -1 : 1) * (3 + (index % 2))}px`,
                  '--float-duration': `${5 + (index % 4)}s`
                }}
                onMouseMove={(e) => handleMouseMove(`testimonial-${testimonial.id}`, e)}
                onMouseLeave={() => handleMouseLeave(`testimonial-${testimonial.id}`)}
              >
              {/* Spotlight effect */}
              {mousePositions[`testimonial-${testimonial.id}`] && (
                <div 
                  className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${mousePositions[`testimonial-${testimonial.id}`].x}px ${mousePositions[`testimonial-${testimonial.id}`].y}px, #FFC801, transparent 50%)`
                  }}
                ></div>
              )}

              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-primary-yellow" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-bg-light mb-6 italic relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-yellow to-accent-orange rounded-full flex items-center justify-center text-dark-navy font-bold font-mono mr-4">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-primary-yellow">{testimonial.name}</div>
                  <div className="text-sm text-accent-mint">{testimonial.role}</div>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`} style={{ transitionDelay: '0.8s' }}>
          <div className="cta-flip-shell mx-auto max-w-5xl" tabIndex={0} aria-label="Start your DataFlow AI trial">
            <div className="cta-flip-card">
              <div className="cta-flip-face cta-flip-front bg-gradient-to-r from-primary-teal to-dark-navy rounded-2xl p-8 sm:p-12 text-bg-light relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-primary-yellow/50 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent-orange/50 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <h3 className="font-mono text-2xl sm:text-3xl font-bold mb-4 relative z-10">
                  Ready to Transform Your Data?
                </h3>
                <p className="text-lg text-bg-light mb-6 max-w-2xl mx-auto relative z-10">
                  Join 10,000+ companies already using DataFlow AI. Start your free trial today.
                </p>
                <button className="px-8 py-4 bg-primary-yellow text-dark-navy font-semibold rounded-lg hover:bg-primary-yellow/90 transform hover:scale-105 transition-all duration-200 shadow-lg relative z-10">
                  Get Started Free
                </button>
              </div>

              <div className="cta-flip-face cta-flip-back bg-gradient-to-r from-dark-navy to-primary-teal rounded-2xl p-8 sm:p-12 text-bg-light relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-6 right-10 w-32 h-32 bg-primary-yellow/50 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute bottom-4 left-10 w-32 h-32 bg-accent-orange/50 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <p className="font-mono text-primary-yellow text-sm font-bold uppercase tracking-normal mb-4 relative z-10">
                  No credit card required
                </p>
                <h3 className="font-mono text-2xl sm:text-3xl font-bold mb-4 relative z-10">
                  Build your first workflow before lunch.
                </h3>
                <p className="text-lg text-bg-light mb-6 max-w-2xl mx-auto relative z-10">
                  Templates, analytics, and guided setup are included so your team can prove value immediately.
                </p>
                <button className="px-8 py-4 bg-primary-yellow text-dark-navy font-semibold rounded-lg hover:bg-primary-yellow/90 transform hover:scale-105 transition-all duration-200 shadow-lg relative z-10">
                  Launch Trial
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className={`mt-16 max-w-5xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`} style={{ transitionDelay: '0.95s' }} aria-labelledby="faq-heading">
          <div className="text-center mb-8">
            <h3 id="faq-heading" className="font-mono text-2xl sm:text-3xl font-bold text-dark-navy mb-3">
              Frequently Asked Questions
            </h3>
            <p className="text-primary-teal">
              Quick answers before your team starts automating.
            </p>
          </div>

          <div className="grid gap-4">
            {faqItems.map((item, index) => {
              const isOpen = activeFaq === index;

              return (
                <article key={item.question} className="faq-card rounded-2xl border-2 border-primary-teal overflow-hidden">
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                    onClick={() => setActiveFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-mono font-bold text-bg-light">{item.question}</span>
                    <span className={`faq-toggle text-primary-yellow ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                      +
                    </span>
                  </button>
                  <div className={`faq-panel ${isOpen ? 'is-open' : ''}`}>
                    <p className="px-6 pb-5 text-accent-mint">
                      {item.answer}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
