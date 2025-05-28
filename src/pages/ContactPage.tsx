import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import ParticleBackground from '@/components/ParticleBackground';

const ContactPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Contact Us | Developers Of Tomorrow';
  }, []);
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <div className="pt-24">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
