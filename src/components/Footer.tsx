import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="relative pt-16 pb-6 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <a href="#" className="inline-block mb-4">
              <span className="text-3xl font-bold font-rajdhani text-gradient">DOT</span>
            </a>
            <p className="text-foreground/70 max-w-md mb-6">
              Developers Of Tomorrow is a community of passionate technology enthusiasts shaping the future of software development through innovation, education, and collaboration.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-foreground/70 hover:text-foreground transition-colors">Home</a>
              </li>
              <li>
                <a href="#team" className="text-foreground/70 hover:text-foreground transition-colors">Team</a>
              </li>
              <li>
                <a href="#events" className="text-foreground/70 hover:text-foreground transition-colors">Events</a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/70 hover:text-foreground transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-foreground/70 mb-4">
              Stay updated with the latest news and events.
            </p>
            <form className="space-y-2">
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-background text-foreground border-border focus:border-dot-cyan focus:ring-1 focus:ring-dot-cyan rounded-r-none"
                  required
                />
                <Button type="submit" className="rounded-l-none bg-gradient-to-r from-dot-cyan to-dot">
                  <ArrowRight size={16} />
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border pt-6">
          <p className="text-center text-foreground/60 text-sm">
            © {year} Developers Of Tomorrow. All rights reserved.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="text-center text-foreground/60 text-sm">
          <p>Crafted and developed by <a href="https://bloomin.site" target="_blank" rel="noopener noreferrer" className="text-gradient hover:opacity-80 transition-opacity">Bloomin Networks</a> with ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
