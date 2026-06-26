import React from 'react';

export default function CSS3DScene() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-60">
      {/* Floating 3D Shapes with CSS transforms */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-yellow to-accent-orange rounded-full blur-xl animate-float-1"></div>
      <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-br from-primary-teal to-dark-navy rounded-2xl blur-xl animate-float-2"></div>
      <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-gradient-to-br from-accent-mint to-primary-yellow rounded-full blur-xl animate-float-3"></div>
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-accent-orange to-primary-teal rounded-xl blur-xl animate-float-4"></div>
      
      {/* 3D Rotating Cube */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-48 h-48 relative animate-rotate-3d">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-yellow/30 to-accent-orange/30 rounded-2xl backdrop-blur-sm border border-white/10" 
               style={{ transform: 'translateZ(50px)' }}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/30 to-dark-navy/30 rounded-2xl backdrop-blur-sm border border-white/10" 
               style={{ transform: 'translateZ(-50px)' }}></div>
        </div>
      </div>

      {/* Particle Grid */}
      <div className="absolute inset-0 grid grid-cols-8 gap-4 opacity-30">
        {[...Array(32)].map((_, i) => (
          <div 
            key={i} 
            className="w-2 h-2 bg-primary-yellow rounded-full animate-pulse"
            style={{ 
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${2 + (i % 3)}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}