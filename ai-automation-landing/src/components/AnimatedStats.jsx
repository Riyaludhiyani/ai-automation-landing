import React, { useRef, useEffect, useState } from 'react';

const stats = [
  { 
    value: 10000, 
    suffix: '+', 
    label: 'Active Users',
    type: 'bar',
    data: [40, 65, 45, 80, 60, 90, 75, 95]
  },
  { 
    value: 500, 
    suffix: '+', 
    label: 'Enterprise Clients',
    type: 'line',
    data: [20, 35, 45, 55, 70, 85, 95, 100]
  },
  { 
    value: 99.9, 
    suffix: '%', 
    label: 'Uptime SLA',
    type: 'circular',
    data: 99.9
  },
  { 
    value: 4.9, 
    suffix: '/5', 
    label: 'Customer Rating',
    type: 'stars',
    data: 4.9
  }
];

export default function AnimatedStats() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedData, setAnimatedData] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate charts
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    stats.forEach((stat, statIndex) => {
      let step = 0;
      
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        if (stat.type === 'bar' || stat.type === 'line') {
          const animatedValues = stat.data.map(val => val * progress);
          setAnimatedData(prev => ({
            ...prev,
            [statIndex]: animatedValues
          }));
        } else if (stat.type === 'circular') {
          setAnimatedData(prev => ({
            ...prev,
            [statIndex]: stat.data * progress
          }));
        } else if (stat.type === 'stars') {
          setAnimatedData(prev => ({
            ...prev,
            [statIndex]: stat.data * progress
          }));
        }

        if (step >= steps) {
          clearInterval(timer);
        }
      }, interval);
    });
  }, [isVisible]);

  const renderChart = (stat, index) => {
    const data = animatedData[index];

    switch (stat.type) {
      case 'bar':
        return (
          <div className="flex items-end justify-center gap-1 h-16 mb-3">
            {(Array.isArray(data) ? data : stat.data).map((value, i) => (
              <div
                key={i}
                className="w-2 bg-gradient-to-t from-primary-yellow to-accent-orange rounded-t transition-all duration-300"
                style={{ 
                  height: `${value}%`,
                  animationDelay: `${i * 0.05}s`
                }}
              ></div>
            ))}
          </div>
        );

      case 'line':
        const lineData = Array.isArray(data) ? data : stat.data;
        const maxVal = Math.max(...lineData);
        const points = lineData.map((val, i) => {
          const x = (i / (lineData.length - 1)) * 100;
          const y = 100 - (val / maxVal) * 100;
          return `${x},${y}`;
        }).join(' ');
        
        return (
          <svg className="w-full h-16 mb-3" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="url(#gradient-${index})"
              strokeWidth="3"
              points={points}
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFC801" />
                <stop offset="100%" stopColor="#FF9932" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'circular':
        const percentage = (typeof data === 'number' ? data : stat.data) / 100;
        const circumference = 2 * Math.PI * 40;
        const offset = circumference - (percentage * circumference);
        const displayValue = typeof data === 'number' ? data : stat.data;
        
        return (
          <div className="relative w-20 h-20 mb-3">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="#F1F6F4"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="url(#circular-gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="circular-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFC801" />
                  <stop offset="100%" stopColor="#FF9932" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-sm font-bold text-dark-navy">
                {displayValue.toFixed(1)}%
              </span>
            </div>
          </div>
        );

      case 'stars':
        const ratingValue = stat.data;
        const rating = typeof ratingValue === 'number' ? ratingValue : 0;
        const fullStars = Math.floor(rating);
        
        return (
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="relative">
                <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {i < fullStars && (
                  <svg className="w-6 h-6 text-primary-yellow absolute top-0 left-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
              </div>
            ))}
            <span className="ml-2 font-mono text-lg font-bold text-primary-yellow">
              {rating.toFixed(1)}
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16" ref={sectionRef}>
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: `${index * 0.15}s` }}
        >
          {renderChart(stat, index)}
          <div className="font-mono text-2xl sm:text-3xl font-bold text-primary-yellow mb-2">
            {stat.value.toLocaleString()}{stat.suffix}
          </div>
          <div className="text-gray-600 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}