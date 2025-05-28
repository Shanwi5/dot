import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background z-10"></div>
      </div>
      
      <div className="container mx-auto text-center z-10 mt-20">
        <div className="mb-12 flex justify-center">
          <img 
            src="/dot-logo.png" 
            alt="DOT Logo" 
            className="h-48 md:h-64 lg:h-80 xl:h-96 animate-scale-up-return transform hover:scale-105 transition-transform duration-300" 
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16 animate-fade-in">
          <span className="text-gradient">Building Tomorrow's Developers, Today.</span>
        </h1>
        
        <div className="flex justify-center px-8 md:px-16 lg:px-24">
          <p className="text-lg md:text-xl lg:text-2xl max-w-6xl text-left text-foreground/80 leading-relaxed font-inter tracking-wide space-y-4">
            <span className="font-semibold">Developers Of Tomorrow (D.O.T)</span> is a student-led community of Data Science @ PESCE, Mandya 
            driven by curiosity, collaboration, and code. Whether you're just starting out or ready to 
            level up, join us for hands-on workshops, cutting-edge hackathons, and peer projects that 
            bridge the gap between academics and industry.
          </p>
        </div>
        
        <div className="mt-8 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <Link to="/auth?mode=register">
            <Button size="lg" className="text-lg px-8 py-6">Join Now</Button>
          </Link>
        </div>

        <div className="mt-16 animate-bounce">
          <a href="#team" className="inline-block">
            <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center">
              <div className="w-1.5 h-3 bg-white/70 rounded-full animate-float mt-2"></div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
