import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';

function App() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <SocialProof />
      <Footer />
    </main>
  );
}

export default App;