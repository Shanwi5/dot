import React from 'react';

interface Mentor {
  id: number;
  name: string;
  role: string;
  image?: string;
}

const mentors: Mentor[] = [
  {
    id: 1,
    name: "Dr. Anitha ML",
    role: "Club Mentor",
    image: '/hod.jpeg'
  },
  {
    id: 2,
    name: "Dr. Mahesh Kaluti",
    role: "Club Mentor",
    image: '/mahesh.jpg'
  }
]

const MentorCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => {
  return (
    <div className="glass rounded-xl overflow-hidden transition-all hover:-translate-y-2 hover:shadow-lg hover:shadow-dot/20 duration-300">
      <div className="h-64 bg-gradient-to-br from-dot-cyan/20 to-dot/20 flex items-center justify-center">
        {mentor.image ? (
          <img src={mentor.image} alt={mentor.name} className="w-full h-full object-contain bg-white/10 p-4 rounded-xl" />
        ) : (
          <span className="text-4xl text-white/50">Coming Soon</span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold">{mentor.name}</h3>
        <p className="text-white/70">{mentor.role}</p>
      </div>
    </div>
  );
};

const Mentors: React.FC = () => {
  return (
    <section id="mentors" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Guides from Industry & Academia</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            We're proud to introduce our mentors who volunteer their time to speak, 
            review projects, and constantly supporting our cause. Their real-world insights 
            accelerate your learning and help you avoid common pitfalls.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {mentors.map(mentor => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
      
      {/* Background element */}
      <div className="absolute bottom-0 left-0 w-full max-w-4xl h-full max-h-96 bg-gradient-to-t from-dot-cyan/20 to-dot/10 rounded-full blur-3xl opacity-30 -z-10"></div>
    </section>
  );
};

export default Mentors;
