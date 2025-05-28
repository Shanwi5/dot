import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  skills: string[];
  image?: string;
  social: {
    github?: string;
    linkedin?: string;
  };
}

// Sample team members data - you should replace this with your actual data
const teamMembers: Record<string, TeamMember[]> = {
  'organizer-team-lead': [
    { 
      id: 1, 
      name: 'Chinmayi P', 
      role: 'Organizer ', 
      skills: ['Leadership', 'Event Planning', 'Team Management'],
      image: '/chinmya.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/chinmayi-p-9624a6292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 2, 
      name: 'Keerthana R', 
      role: 'Organizer', 
      skills: ['Event Coordination', 'Communication'],
      image: '/keerthanar.jpeg',
      social: {
        linkedin: 'https://www.linkedin.com/in/keerthana-r-7b030130b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 3, 
      name: 'Lipika BV', 
      role: 'Organizer', 
      skills: ['Event Management', 'Team Coordination'],
      image: '/lipika.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/lipika-b-v-92230230b'
      }
    },
    { 
      id: 4, 
      name: 'Poorna Prajay', 
      role: 'Organizer', 
      skills: ['Event Planning', 'Logistics'],
      image: '/poorna.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/poorna-prajay-s-a7630430b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 5, 
      name: 'Sudhindra Shenoy', 
      role: 'Organizer', 
      skills: ['Event Coordination', 'Team Management'],
      image: '/sudhibdra.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/b-sudhindra-shenoy-697023295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 6, 
      name: 'Sameeksha M.R', 
      role: 'Organizer', 
      skills: ['Event Planning', 'Communication'],
      image: '/sameeksha.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/sameeksha-mr-20105b340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 7, 
      name: 'Chinmayi Uppunda', 
      role: 'Organizer', 
      skills: ['Event Planning', 'Team Management'],
      image: '/chinmayiu.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/chinmayi-uppunda-a6004933a'
      }
    }
  ],
  'graphics-design-team-lead': [
    { 
      id: 1, 
      name: 'Kushi J Ramu', 
      role: 'Graphics Designer', 
      skills: ['Graphic Design', 'Visual Communication', 'Branding'],
      image: '/kushi.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/kushi-j-ramu-1bb759297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'

      }
    },
    { 
      id: 2, 
      name: 'Sanjana R', 
      role: 'Graphics Designer', 
      skills: ['Digital Design', 'Illustration'],
      image: '/sanjana.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/sanjana-r-015963305?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 3, 
      name: 'Keerthana K', 
      role: 'Graphics Designer', 
      skills: ['UI/UX Design', 'Visual Design'],
      image: '/keerthana.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/keerthana-k-934213301?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 4, 
      name: 'Shreya M S', 
      role: 'Graphics Designer', 
      skills: ['Graphic Design', 'Digital Art'],
      image: '/shreya.jpeg',
      social: {
        linkedin: 'https://www.linkedin.com/in/shreya-ms-22b65632a'
      }
    },
    { 
      id: 5, 
      name: 'Shashank', 
      role: 'Graphics Designer', 
      skills: ['Visual Design', 'Branding'],
      image: '/shashank.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/shashank-shetty-94730430b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 6, 
      name: 'Yashaa K N', 
      role: 'Graphics Designer', 
      skills: ['Digital Design', 'Illustration'],
      image: '/yashas.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/yashas-k-n-643031366?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    }
  ],
  'technical-team-lead': [
    { 
      id: 1, 
      name: 'Harsha G', 
      role: 'Technical Developer', 
      skills: ['Software Development', 'Team Leadership', 'Architecture'],
      image: '/harsha.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/harsha-g-0015262a3'
      }
    },
    { 
      id: 2, 
      name: 'Saurabh kumar', 
      role: 'Technical Developer', 
      skills: ['Web Development', 'Backend Development'],
      image: '/saurabh.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/saurabh-kumar-454a6a329'
      }
    },
    { 
      id: 4, 
      name: 'mohith K K', 
      role: 'Technical Developer', 
      skills: ['Software Development', 'Database Management'],
      image: '/mohith.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/mohith95?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'

      }
    },
    {
      id: 5,
      name: 'Jiya Kavadiya',
      role: 'Technical Developer',
      skills: ['Development', 'Technical Leadership', 'Problem Solving'],
      image: '/Jiya.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/jiya-kumari-n-931974331'
      }
    },
    { 
      id: 6, 
      name: 'Shruti Kumari', 
      role: 'Technical Developer', 
      skills: ['Web Development', 'UI/UX'],
      image: '/shruthi.jpeg',
      social: {
        linkedin: 'https://www.linkedin.com/in/shruti-kumari-73ab82318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    }
  ],
  'outreach-team-lead': [
    { 
      id: 1, 
      name: 'Rashmi Singh', 
      role: 'Outreach Coordinator', 
      skills: ['Community Engagement', 'Partnership Development'],
      image: '/rashmi.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/rashmi-c-567085340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 2, 
      name: 'Anusha CM', 
      role: 'Outreach Coordinator', 
      skills: ['Community Relations', 'Event Planning'],
      image: '/anusha.jpeg',
      social: {
        linkedin: 'https://www.linkedin.com/in/anusha-gowda-79a086340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 3, 
      name: 'Arbaz khan', 
      role: 'Outreach Coordinator', 
      skills: ['Partnership Development', 'Communication'],
      image: '/arbaz.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/arbaz-khan-b5181a331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 4, 
      name: 'Maytri nagashree N', 
      role: 'Outreach Coordinator', 
      skills: ['Community Engagement', 'Event Coordination'],
      image: '/mythri.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/mythri-nagashree-5277b432a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 5, 
      name: 'Bhavana M', 
      role: 'Outreach Coordinator', 
      skills: ['Community Relations', 'Partnership Building'],
      image: '/bhavana.jpeg',
      social: {
        linkedin: 'https://www.linkedin.com/in/bhavana-m-4038b330a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 6, 
      name: 'Yashashwini K M', 
      role: 'Outreach Coordinator', 
      skills: ['Community Engagement', 'Event Planning'],
      image: '/yashaswini.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/yashaswini-k-m-7876462a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    }
  ],
  'social-media-marketing-lead': [
    { 
      id: 1, 
      name: 'Spandana N', 
      role: 'Social Media Manager', 
      skills: ['Social Media Strategy', 'Content Creation', 'Digital Marketing'],
      image: '/spandana.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/spandana-n-spandana-n-979a4230a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 2, 
      name: 'Hithaishi M', 
      role: 'Social Media Manager', 
      skills: ['Content Strategy', 'Social Media Management'],
      image: '/Hithaishi.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/hithaishi-m-68a721329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 3, 
      name: 'Apoorva C', 
      role: 'Social Media Manager', 
      skills: ['Digital Marketing', 'Content Creation'],
      image: '/apoorva.jpeg',
      social: {
        linkedin: 'https://www.linkedin.com/in/apoorva-c'
      }
    },
    { 
      id: 4, 
      name: 'Vaibhav Ghogale', 
      role: 'Social Media Manager', 
      skills: ['Social Media Strategy', 'Analytics'],
      image: '/vaibhav.jpeg',
      social: {
        linkedin: 'https://www.linkedin.com/in/vaibhav-vilasrao-ghogale-59348b313?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 5, 
      name: 'Prakruthi Gowda BA', 
      role: 'Social Media Manager', 
      skills: ['Content Creation', 'Community Management'],
      image: '/prakruthi.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/prakruthi-gowda-798663295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    },
    { 
      id: 6, 
      name: 'Chanchal H Choudhary', 
      role: 'Social Media Manager', 
      skills: ['Social Media Marketing', 'Content Strategy'],
      image: '/Chanchal.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/chanchal-choudhary-427292334?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    }
  ]
};

const TeamDetailsPage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const members = teamId ? teamMembers[teamId] : [];

  const teamName = teamId
    ?.split('-')
    .filter(word => word !== 'lead')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const displayTeamName = teamName && teamName.trim().endsWith('Team') ? teamName : `${teamName} Team`;

  if (!teamId || !members) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 text-center">
          <h2 className="text-3xl font-bold mb-8">Team not found</h2>
          <Link 
            to="/" 
            className="text-dot-cyan hover:text-dot transition-colors"
          >
            Return to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      <Navbar />
      <div className="container mx-auto px-4 pt-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text font-extrabold drop-shadow-md">
              {displayTeamName}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div 
              key={member.id}
              className="bg-gradient-to-br from-black/50 to-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-dot-cyan/20 to-dot/20 flex items-center justify-center">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl text-foreground/50">
                      {member.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                  <p className="text-foreground/70">{member.role}</p>
                </div>
              </div>

              <div className="flex space-x-4">
                {member.social.github && (
                  <a 
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 hover:text-foreground transition-colors"
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
                    className="text-foreground/70 hover:text-foreground transition-colors"
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
          ))}
        </div>

        <div className="text-center mt-16 mb-8">
  <Link 
    to="/team" 
    className="inline-block text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-purple-500 text-transparent bg-clip-text drop-shadow-md hover:from-blue-500 hover:via-purple-500 hover:to-purple-400 transition-all duration-300 hover:brightness-125"
  >
    ← Back to Teams
  </Link>
</div>

      </div>
      <Footer />
    </div>
  );
};

export default TeamDetailsPage; 