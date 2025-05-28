import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">🌐 About DOT – Developers of Tomorrow</span>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-xl p-8 mb-8 transform transition-all animate-fade-in">
            <p className="text-lg mb-6 text-foreground">
              DOT (Developers of Tomorrow) is the official technical club of the Department of CSDS Engineering, created by students, for students. Our existence stems from a shared belief: that innovation thrives where curiosity meets collaboration.
              <br /><br />
              We are a growing community of thinkers, builders, and problem-solvers who are passionate about technology and its power to shape the future. DOT is more than just a club — it's a launchpad for ideas, a space to experiment, learn, and lead beyond the classroom.
              <br /><br />
              Through hands-on projects, peer-led sessions, workshops, and tech-driven initiatives, we aim to bridge the gap between academic learning and industry relevance. Whether you're into AI, software development, data science, or just starting out — DOT welcomes you to explore, create, and grow together.
              <br /><br />
              At our core, we exist to inspire action, foster innovation, and empower the next generation of developers — the true Developers of Tomorrow.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="glass p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gradient">Hands-On Workshops</h3>
                <p className="text-foreground/70">
                  Dive deep into Python, R, TensorFlow, SQL and more with guided, project-based sessions.
                </p>
              </div>
              
              <div className="glass p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gradient">Tech Talks & Panels</h3>
                <p className="text-foreground/70">
                  Hear from industry leaders and researchers on the latest trends in AI, big data, MLOps, and cloud computing.
                </p>
              </div>

              <div className="glass p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gradient">Peer Study & Project Groups</h3>
                <p className="text-foreground/70">
                  Join small cohorts to tackle coursework challenges or build passion-projects together—structured but flexible.
                </p>
              </div>

              <div className="glass p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gradient">Research Collaboration</h3>
                <p className="text-foreground/70">
                  Team up with faculty and grad-students on cutting-edge data-driven research—co-author papers or contribute code to open-source labs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background element */}
      <div className="absolute bottom-0 left-0 w-full max-w-4xl h-full max-h-96 bg-gradient-to-t from-dot-cyan/20 to-dot/10 rounded-full blur-3xl opacity-30 -z-10"></div>
    </section>
  );
};

export default About;
