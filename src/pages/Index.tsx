import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Team from '@/components/Team';
import Mentors from '@/components/Mentors';
import Events from '@/components/Events';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LearningOfTheDay from '@/components/LearningOfTheDay';
import BlogPreview from '@/components/BlogPreview';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const Index = () => {
  useDocumentTitle('Developers Of Tomorrow');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Mentors />
        <div className="container mx-auto px-4 py-8">
          <LearningOfTheDay />
        </div>
        <Team />
        <Events />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
