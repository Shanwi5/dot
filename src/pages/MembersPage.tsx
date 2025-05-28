import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabaseClient';
import { Github, Linkedin } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

interface MemberProfile {
  id: string;
  name: string;
  headline?: string;
  avatar_url?: string;
  github_url?: string;
  linkedin_url?: string;
}

const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<MemberProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, headline, avatar_url, github_url, linkedin_url')
        .not('name', 'is', null);
      if (!error && data) {
        setMembers(data);
      }
      setLoading(false);
    };
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ParticleBackground />
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-16 flex-grow">
        <h2 className="text-3xl font-bold text-center mb-10 text-gradient">Our Members</h2>
        {loading ? (
          <div className="text-center py-20">Loading members...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {members.map((member) => (
              <div key={member.id} className="glass rounded-xl p-6 flex flex-col items-center shadow-md">
                {member.avatar_url ? (
                  <img
                    src={member.avatar_url}
                    alt={member.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-dot-cyan shadow mb-3"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-dot-cyan/20 flex items-center justify-center text-2xl font-bold text-dot-cyan border-2 border-dot-cyan mb-3">
                    {member.name ? member.name[0].toUpperCase() : '?'}
                  </div>
                )}
                <div className="text-lg font-bold text-center mb-1">{member.name}</div>
                {member.headline && <div className="text-sm text-dot-cyan text-center mb-2">{member.headline}</div>}
                <div className="flex gap-4 mt-2">
                  {member.github_url && (
                    <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="text-dot-cyan hover:text-dot transition-colors">
                      <Github className="w-6 h-6" />
                    </a>
                  )}
                  {member.linkedin_url && (
                    <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-dot-cyan hover:text-dot transition-colors">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MembersPage; 