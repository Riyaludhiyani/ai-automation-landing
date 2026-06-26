import React, { useRef, useEffect, useState } from 'react';
import { pricingMatrix, pricingTiers } from '../data/pricingMatrix';

export default function Pricing() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [mousePositions, setMousePositions] = useState({});
  const priceRefs = useRef({});

  // Intersection Observer for entrance animations
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

  // Mouse tracking for spotlight effect
  const handleMouseMove = (tierId, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePositions(prev => ({
      ...prev,
      [tierId]: { x, y }
    }));
  };

  const handleMouseLeave = (tierId) => {
    setMousePositions(prev => ({
      ...prev,
      [tierId]: null
    }));
  };

  // Initialize refs
  useEffect(() => {
    pricingTiers.forEach(tier => {
      if (!priceRefs.current[tier.id]) {
        priceRefs.current[tier.id] = {
          monthly: null,
          annual: null
        };
      }
    });
  }, []);

  // Animate price counting
  useEffect(() => {
    if (!isVisible) return;

    pricingTiers.forEach(tier => {
      const targetPrice = pricingMatrix.calculatePrice(tier.baseRate, currency, billingCycle);
      const duration = 1500;
      const steps = 60;
      const increment = targetPrice / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), targetPrice);
        
        const symbol = pricingMatrix.currencies[currency].symbol;
        const formattedPrice = `${symbol}${current.toLocaleString()}`;
        
        if (priceRefs.current[tier.id]?.[billingCycle]) {
          priceRefs.current[tier.id][billingCycle].textContent = formattedPrice;
        }

        if (step >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);
    });
  }, [isVisible, currency, billingCycle]);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const handleBillingChange = (cycle) => {
    setBillingCycle(cycle);
  };

  const currencies = [
    { code: 'INR', symbol: '₹', label: 'INR' },
    { code: 'USD', symbol: '$', label: 'USD' },
    { code: 'EUR', symbol: '€', label: 'EUR' }
  ];

  return (
    <section id="pricing" className="py-20 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-yellow/20 to-accent-orange/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-navy mb-4">
            <span className="text-primary-teal animate-pulse">Simple,</span> <span className="text-primary-yellow">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>

          {/* Currency Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="relative flex items-center bg-gray-100 rounded-lg p-1">
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => handleCurrencyChange(curr.code)}
                  className={`relative px-4 py-2 rounded-md font-mono text-sm font-medium transition-all duration-300 z-10 ${
                    currency === curr.code
                      ? 'text-dark-navy'
                      : 'text-gray-600 hover:text-dark-navy'
                  }`}
                >
                  {curr.symbol} {curr.label}
                </button>
              ))}
              <div 
                className="absolute h-[calc(100%-8px)] bg-primary-yellow rounded-md shadow-md transition-all duration-300"
                style={{
                  width: 'calc(33.333% - 4px)',
                  left: currency === 'INR' ? '4px' : currency === 'USD' ? 'calc(33.333% + 4px)' : 'calc(66.666% + 4px)'
                }}
              ></div>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="relative flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleBillingChange('monthly')}
                className={`relative px-4 py-2 rounded-md font-mono text-sm font-medium transition-all duration-300 z-10 ${
                  billingCycle === 'monthly' ? 'text-dark-navy' : 'text-gray-600 hover:text-dark-navy'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => handleBillingChange('annual')}
                className={`relative px-4 py-2 rounded-md font-mono text-sm font-medium transition-all duration-300 z-10 ${
                  billingCycle === 'annual' ? 'text-dark-navy' : 'text-gray-600 hover:text-dark-navy'
                }`}
              >
                Annual
                <span className="absolute -top-2 -right-2 bg-accent-orange text-white text-xs px-2 py-0.5 rounded-full font-bold animate-bounce">
                  -20%
                </span>
              </button>
              <div 
                className="absolute h-[calc(100%-8px)] bg-primary-yellow rounded-md shadow-md transition-all duration-300"
                style={{
                  width: 'calc(50% - 4px)',
                  left: billingCycle === 'monthly' ? '4px' : 'calc(50% + 4px)'
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.id}
              className={`relative bg-white rounded-2xl shadow-xl transition-all duration-500 border-2 ${
                tier.popular 
                  ? 'border-primary-yellow scale-105 shadow-2xl animate-glow' 
                  : 'border-gray-200'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ 
                transitionDelay: `${index * 0.12}s`,
                animation: isVisible ? `float ${3 + index * 0.5}s ease-in-out infinite` : 'none'
              }}
              onMouseMove={(e) => handleMouseMove(tier.id, e)}
              onMouseLeave={() => handleMouseLeave(tier.id)}
            >
              {/* Spotlight effect */}
              {mousePositions[tier.id] && (
                <div 
                  className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${mousePositions[tier.id].x}px ${mousePositions[tier.id].y}px, rgba(255, 200, 1, 0.3), transparent 50%)`
                  }}
                ></div>
              )}

              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-primary-yellow text-dark-navy px-4 py-1 rounded-full text-sm font-bold font-mono animate-pulse">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="p-8 relative z-10">
                <h3 className="font-mono text-2xl font-bold text-dark-navy mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {tier.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-gray-500 text-lg">From</span>
                    <span 
                      ref={(el) => {
                        if (el) {
                          if (!priceRefs.current[tier.id]) {
                            priceRefs.current[tier.id] = { monthly: {}, annual: {} };
                          }
                          priceRefs.current[tier.id][billingCycle] = el;
                        }
                      }}
                      className="font-mono text-5xl font-bold text-dark-navy ml-2"
                    >
                      {pricingMatrix.getFormattedPrice(tier.baseRate, currency, billingCycle)}
                    </span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-sm text-accent-orange font-medium mt-2">
                      Billed annually (20% savings)
                    </p>
                  )}
                </div>

                <button className={`group relative w-full py-3 rounded-lg font-semibold transition-all duration-300 mb-6 overflow-hidden ${
                  tier.popular
                    ? 'bg-primary-yellow text-dark-navy hover:shadow-lg'
                    : 'bg-primary-teal text-white hover:shadow-lg'
                }`}>
                  <span className="relative z-10">Start Free Trial</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>

                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      className={`flex items-start transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                      style={{ transitionDelay: `${(index * 0.12) + (idx * 0.05)}s` }}
                    >
                      <svg className="w-5 h-5 text-primary-yellow mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '0.5s' }}>
          <p className="text-gray-600 mb-4">
            Need a custom solution? <a href="#contact" className="text-primary-teal font-semibold hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  );
}