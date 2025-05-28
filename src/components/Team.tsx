import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image?: string;
  skills: {
    name: string;
    level: number;
  }[];
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}


// Club Heads data
const clubHeads: TeamMember[] = [
  {
    id: 1,
    name: 'Shivam Kumar Verma',
    role: 'President',
    bio: 'Leading the vision and direction of D.O.T.',
    image: '/shivam-kumar-verma.jpg',
    skills: [
      { name: 'Leadership', level: 95 },
      { name: 'Strategy', level: 90 },
      { name: 'Communication', level: 92 },
    ],
    social: {
      linkedin: 'https://www.linkedin.com/in/shivam-verma-98b910283',
      github: '#',
    },
  },
  {
    id: 2,
    name: 'Alok Singh',
    role: 'Vice President',
    bio: 'Supporting club initiatives and managing operations.',
    image: '/alok.jpg',
    skills: [
      { name: 'Management', level: 90 },
      { name: 'Team Building', level: 88 },
      { name: 'Project Planning', level: 85 },
    ],
    social: {
      linkedin: 'https://www.linkedin.com/in/alok-singh-261149295',
      github: '#',
    },
  },
  {
    id: 3,
    name: 'Raghav R',
    role: 'Secretary',
    bio: 'Coordinating activities and maintaining club records.',
    image: '/raghav.jpg',
    skills: [
      { name: 'Organization', level: 92 },
      { name: 'Documentation', level: 88 },
      { name: 'Communication', level: 90 },
    ],
    social: {
      linkedin: 'http://www.linkedin.com/in/07raghavan',
      github: 'https://github.com/07raghavan',
    },
  },
  {
    id: 9,
    name: 'Sanitha BM',
    role: 'Teasurer',
    bio: 'Leading and managing team operations.',
    image: '/shanitha.jpg',
    skills: [
      { name: 'Leadership', level: 92 },
      { name: 'Team Management', level: 90 },
      { name: 'Strategic Planning', level: 88 }
    ],
    social: {
      linkedin: 'https://www.linkedin.com/in/sanitha-b-m-5658b130a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  
];


// Club Leads data
const clubLeads: TeamMember[] = [
  {
    id: 4,
    name: 'Nehashree',
    role: 'Organizer Team Lead',
    bio: 'Coordinating and executing club events and activities.',
    image: '/neha.jpg',
    skills: [
      { name: 'Event Planning', level: 90 },
      { name: 'Team Coordination', level: 85 },
      { name: 'Time Management', level: 88 }
    ],
    social: {
      linkedin: 'https://www.linkedin.com/in/neha-shree-207a4330a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 5,
    name: 'Raj Singh',
    role: 'Graphics & Design Team Lead',
    bio: 'Leading the visual identity and creative direction.',
    image: '/raj-singh.jpg',
    skills: [
      { name: 'UI/UX Design', level: 92 },
      { name: 'Graphic Design', level: 90 },
      { name: 'Creative Direction', level: 88 }
    ],
    social: {
      linkedin: 'https://www.linkedin.com/in/raj-singh-b376a4299?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 6,
    name: 'Shanwi BM',
    role: 'Technical Team Lead',
    bio: 'Driving technical projects and development initiatives.',
    image: '/shanwi.jpeg',
    skills: [
      { name: 'Development', level: 95 },
      { name: 'Architecture', level: 88 },
      { name: 'Problem Solving', level: 90 }
    ],
    social: {
      linkedin: 'https://www.linkedin.com/in/shanwi-bm-b52a4530a'
    }
  },
  {
    id: 7,
    name: 'Disha Shetty',
    role: 'Outreach Team Lead',
    bio: 'Managing external relations and partnerships.',
    image: '/disha.jpeg',
    skills: [
      { name: 'Networking', level: 90 },
      { name: 'Communication', level: 92 },
      { name: 'Partnership Building', level: 88 }
    ],
    social: {
      linkedin: 'https://www.linkedin.com/in/disha-shetty-23234530b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 8,
    name: 'Mohammed Ayaan',
    role: 'Social Media & Marketing Lead',
    bio: 'Managing club presence and engagement strategies.',
    image: '/ayaan.jpg',
    skills: [
      { name: 'Social Media', level: 92 },
      { name: 'Content Strategy', level: 88 },
      { name: 'Analytics', level: 85 }
    ],
    social: {
      linkedin: 'https://www.linkedin.com/in/mohammed-ayaan-066a2426a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
    }
  }
];

const TeamCard: React.FC<{ member: TeamMember; teamId?: string }> = ({ member, teamId }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className="w-full md:w-72 h-96 perspective-1000 group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={cn(
        "w-full h-full transition-transform duration-500 transform-style-preserve-3d relative",
        isFlipped ? "rotate-y-180" : ""
      )}>
        {/* Front */}
        <div className="absolute inset-0 backface-hidden glass rounded-xl overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="h-3/5 bg-gradient-to-br from-dot-cyan/20 to-dot/20 flex items-center justify-center">
              {member.image ? (
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl text-white/50">Coming Soon</span>
              )}
            </div>
            <div className="flex flex-col justify-center items-center p-4 h-2/5 bg-black/30">
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="text-sm text-white/70">{member.role}</p>
            </div>
          </div>
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 glass rounded-xl overflow-hidden p-6 flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
            <p className="text-sm text-white/80 mb-4">{member.bio}</p>
            
            {/* Skills */}
            <div className="space-y-3">
              {member.skills.map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/80">{skill.name}</span>
                    <span className="text-white/60">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-dot-cyan to-dot"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Social Links and View Team Button */}
          <div className="mt-6 space-y-4">
            {teamId && (
              <Link 
                to={`/teams/${teamId}`}
                className="block w-full py-2 px-4 text-center text-sm font-medium text-white bg-gradient-to-r from-dot-cyan to-dot rounded-lg hover:opacity-90 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                View Team Members
              </Link>
            )}
            <div className="flex justify-center space-x-4">
              {member.social.github && (
                <a 
                  href={member.social.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="sr-only">GitHub</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              )}
              {member.social.linkedin && (
                <a 
                  href={member.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  return (
    <section id="team" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Meet Our Team</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            The passionate individuals driving D.O.T forward, from leadership to specialized teams.
          </p>
        </div>

        {/* Club Heads Section */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-10">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
              Club Heads
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center max-w-5xl mx-auto">
            {clubHeads.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Club Leads Section */}
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-10">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
              Team Leads
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 justify-items-center">
            {clubLeads.map((member) => (
              <TeamCard 
                key={member.id} 
                member={member} 
                teamId={member.role === 'Treasurer' ? undefined : member.role === 'Outreach Team Lead' ? 'outreach-team-lead' : member.role.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-96 bg-gradient-to-b from-dot/20 to-dot-cyan/10 rounded-full blur-3xl opacity-30 -z-10"></div>
    </section>
  );
};

export default Team;
