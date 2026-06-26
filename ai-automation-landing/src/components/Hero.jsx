import React from 'react';
import CSS3DScene from './CSS3DScene';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-navy via-primary-teal to-dark-navy">
      {/* 3D Background */}
      <CSS3DScene />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-yellow/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-accent-orange/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-accent-mint/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-block px-4 py-2 bg-primary-yellow/10 border border-primary-yellow/20 rounded-full mb-8">
              <span className="text-primary-yellow font-mono text-sm font-medium">
                🚀 AI-Powered Data Automation
              </span>
            </div>
            
            <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your Data Into
              <span className="text-primary-yellow block mt-2">Intelligent Action</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              DataFlow AI automates your data workflows with cutting-edge machine learning. 
              Reduce manual work by 80% and make real-time decisions with predictive analytics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-primary-yellow text-dark-navy font-semibold rounded-lg hover:bg-primary-yellow/90 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-primary-yellow/20">
                Start Free Trial
              </button>
              <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all duration-200">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-bold text-primary-yellow">10K+</div>
                <div className="text-gray-400 text-sm mt-1">Active Users</div>
              </div>
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-bold text-primary-yellow">99.9%</div>
                <div className="text-gray-400 text-sm mt-1">Uptime</div>
              </div>
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-bold text-primary-yellow">50M+</div>
                <div className="text-gray-400 text-sm mt-1">Tasks Automated</div>
              </div>
            </div>
          </div>

          {/* Right column - Visual/Illustration */}
          <div className="relative animate-scale-in">
            <div className="relative bg-gradient-to-br from-primary-yellow/20 to-accent-orange/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              {/* Dashboard mockup */}
              <div className="bg-dark-navy/80 rounded-xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-400 text-xs font-mono">dashboard.exe</div>
                </div>
                
                <div className="space-y-4">
                  {/* Chart visualization */}
                  <div className="bg-primary-teal/30 rounded-lg p-4">
                    <div className="text-white text-sm font-mono mb-2">Real-time Analytics</div>
                    <div className="flex items-end space-x-2 h-24">
                      <div className="flex-1 bg-primary-yellow/60 rounded-t" style={{ height: '40%' }}></div>
                      <div className="flex-1 bg-primary-yellow/60 rounded-t" style={{ height: '60%' }}></div>
                      <div className="flex-1 bg-primary-yellow/60 rounded-t" style={{ height: '45%' }}></div>
                      <div className="flex-1 bg-primary-yellow/60 rounded-t" style={{ height: '80%' }}></div>
                      <div className="flex-1 bg-primary-yellow/60 rounded-t" style={{ height: '65%' }}></div>
                      <div className="flex-1 bg-primary-yellow/60 rounded-t" style={{ height: '90%' }}></div>
                      <div className="flex-1 bg-accent-orange rounded-t" style={{ height: '100%' }}></div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-accent-mint/20 rounded-lg p-3">
                      <div className="text-gray-400 text-xs">Automation Rate</div>
                      <div className="text-white font-mono font-bold text-lg">87.5%</div>
                    </div>
                    <div className="bg-accent-mint/20 rounded-lg p-3">
                      <div className="text-gray-400 text-xs">Time Saved</div>
                      <div className="text-white font-mono font-bold text-lg">142h</div>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">All systems operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}