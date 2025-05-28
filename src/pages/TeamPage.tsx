import React from 'react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Team from '@/components/Team';
import ParticleBackground from '@/components/ParticleBackground';

const TeamPage = () => {
  useDocumentTitle('Team | Developers Of Tomorrow');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <div className="pt-24">
        <Team />
      </div>
      <Footer />
    </div>
  );
};

export default TeamPage;
