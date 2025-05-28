import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { User, GraduationCap, Briefcase, Award, BookOpen, Info, Linkedin, Github } from 'lucide-react';

interface ProfileData {
  name: string;
  headline?: string;
  bio?: string;
  experience?: string;
  education?: string;
  projects?: string;
  achievements?: string;
  linkedin_url?: string;
  github_url?: string;
  avatar_url?: string;
}

const emptyProfile: ProfileData = {
  name: '',
  headline: '',
  bio: '',
  experience: '',
  education: '',
  projects: '',
  achievements: '',
  linkedin_url: '',
  github_url: '',
  avatar_url: '',
};

const ProfilePage: React.FC = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<ProfileData>(emptyProfile);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      navigate('/auth');
    } else {
      const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        setSuccessMsg(null);
        const { data, error } = await supabase
          .from('profiles')
          .select('name, headline, bio, experience, education, projects, achievements, linkedin_url, github_url, avatar_url')
          .eq('id', user.id)
          .maybeSingle();
        if (error) {
          setError(error.message);
          setProfileData(null);
        } else if (data) {
          setProfileData(data);
          setForm(data);
        } else {
          setProfileData(null);
          setForm(emptyProfile);
        }
        setLoading(false);
      };
      fetchProfile();
    }
    // eslint-disable-next-line
  }, [session, navigate, user]);

  // After fetching profileData, auto-update avatar_url from Google if needed
  useEffect(() => {
    if (
      user &&
      user.user_metadata?.avatar_url &&
      profileData &&
      profileData.avatar_url !== user.user_metadata.avatar_url
    ) {
      supabase
        .from('profiles')
        .update({ avatar_url: user.user_metadata.avatar_url })
        .eq('id', user.id);
      setProfileData({ ...profileData, avatar_url: user.user_metadata.avatar_url });
    }
  }, [user, profileData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMsg(null);
    let result;
    if (profileData) {
      // Update
      result = await supabase
        .from('profiles')
        .update({ ...form })
        .eq('id', user.id);
    } else {
      // Insert
      result = await supabase
        .from('profiles')
        .insert([{ id: user.id, ...form }]);
    }
    if (result.error) {
      setError(result.error.message);
    } else {
      setSuccessMsg('Profile saved successfully!');
      setEditMode(false);
      // Refetch profile
      const { data } = await supabase
        .from('profiles')
        .select('name, headline, bio, experience, education, projects, achievements, linkedin_url, github_url, avatar_url')
        .eq('id', user.id)
        .single();
      setProfileData(data);
      setForm(data);
    }
    setSaving(false);
  };

  if (!session) return null;
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-32 flex-grow text-center">
          <p>Loading profile data...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ParticleBackground />
      <Navbar />
      <div className="container mx-auto px-2 md:px-8 pt-32 pb-16 flex-grow flex justify-center items-start">
        <div className="glass rounded-2xl shadow-2xl bg-gradient-to-br from-background via-dot-cyan/10 to-background/80 p-8 w-full max-w-5xl space-y-8">
          <h2 className="text-4xl font-extrabold text-center mb-8 tracking-tight flex items-center justify-center gap-3">
            <User className="inline-block text-dot-cyan w-10 h-10" />
            <span className="text-gradient">My Profile</span>
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMsg && <p className="text-green-500 text-center">{successMsg}</p>}

          {/* Show form if no profile or in edit mode */}
          {editMode || !profileData ? (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Personal Info Section */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><User className="w-5 h-5 text-dot-cyan" /> Personal Info</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-semibold mb-1">Name</label>
                        <input name="name" value={form.name} onChange={handleChange} className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none" required placeholder="Your full name" />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Headline</label>
                        <input name="headline" value={form.headline} onChange={handleChange} className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none" placeholder="e.g. Aspiring Data Scientist" />
                      </div>
                    </div>
                  </div>
                  {/* About Section */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><Info className="w-5 h-5 text-dot-cyan" /> About</h3>
                    <textarea name="bio" value={form.bio} onChange={handleChange} className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none" rows={4} placeholder="Tell us about yourself..." />
                  </div>
                  {/* Profile Image Section */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2">Profile Image</h3>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {profileData?.avatar_url ? (
                        <img
                          src={profileData.avatar_url}
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover border-2 border-dot-cyan shadow"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-dot-cyan/20 flex items-center justify-center text-3xl font-bold text-dot-cyan border-2 border-dot-cyan">
                          {form.name ? form.name[0].toUpperCase() : '?'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Right Column */}
                <div className="space-y-8">
                  {/* Experience & Education Section */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><Briefcase className="w-5 h-5 text-dot-cyan" /> Experience / Position</h3>
                    <textarea name="experience" value={form.experience} onChange={handleChange} className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none" rows={2} placeholder="e.g. Intern at XYZ, Club Lead..." />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><GraduationCap className="w-5 h-5 text-dot-cyan" /> Education / Certifications</h3>
                    <textarea name="education" value={form.education} onChange={handleChange} className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none" rows={2} placeholder="e.g. B.Tech in Data Science, Coursera ML Cert..." />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><BookOpen className="w-5 h-5 text-dot-cyan" /> Projects</h3>
                    <textarea name="projects" value={form.projects} onChange={handleChange} className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none" rows={2} placeholder="e.g. Portfolio Website, Hackathon Winner..." />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><Award className="w-5 h-5 text-dot-cyan" /> Achievements</h3>
                    <textarea name="achievements" value={form.achievements} onChange={handleChange} className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none" rows={2} placeholder="e.g. GDSC Lead, CodeChef 4-star..." />
                  </div>
                  {/* Social Links Section */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><Linkedin className="w-5 h-5 text-dot-cyan" /> Social Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold mb-1">LinkedIn URL</label>
                        <input name="linkedin_url" value={form.linkedin_url} onChange={handleChange} className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none" placeholder="https://linkedin.com/in/yourprofile" />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">GitHub URL</label>
                        <input name="github_url" value={form.github_url} onChange={handleChange} className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none" placeholder="https://github.com/yourusername" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full mt-4" disabled={saving}>{saving ? 'Saving...' : (profileData ? 'Save Changes' : 'Create Profile')}</Button>
              {profileData && <Button type="button" variant="outline" className="w-full mt-2" onClick={() => { setEditMode(false); setForm(profileData); }}>Cancel</Button>}
            </form>
          ) : (
            <>
              <div className="flex flex-col items-center gap-2 mb-8">
                {profileData.avatar_url ? (
                  <img
                    src={profileData.avatar_url}
                    alt="Profile"
                    className="w-36 h-36 rounded-2xl object-cover border-2 border-dot-cyan shadow"
                  />
                ) : (
                  <div className="w-36 h-36 rounded-2xl bg-dot-cyan/20 flex items-center justify-center text-4xl font-bold text-dot-cyan border-2 border-dot-cyan">
                    {profileData.name ? profileData.name[0].toUpperCase() : '?'}
                  </div>
                )}
                {profileData.name && <div className="text-2xl font-bold mt-2">{profileData.name}</div>}
                {profileData.headline && <div className="text-lg text-dot-cyan font-medium">{profileData.headline}</div>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><User className="w-5 h-5 text-dot-cyan" /> Personal Information</h3>
                    <p><span className="font-semibold">Email:</span> {user.email}</p>
                    {profileData.name && <p><span className="font-semibold">Name:</span> {profileData.name}</p>}
                    {profileData.headline && <p><span className="font-semibold">Headline:</span> {profileData.headline}</p>}
                  </div>
                  {profileData.bio && (
                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><Info className="w-5 h-5 text-dot-cyan" /> About</h3>
                      <p>{profileData.bio}</p>
                    </div>
                  )}
                </div>
                {/* Right Column */}
                <div className="space-y-8">
                  {profileData.experience && (
                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><Briefcase className="w-5 h-5 text-dot-cyan" /> Experience / Position</h3>
                      <p>{profileData.experience}</p>
                    </div>
                  )}
                  {profileData.education && (
                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><GraduationCap className="w-5 h-5 text-dot-cyan" /> Education / Certifications</h3>
                      <p>{profileData.education}</p>
                    </div>
                  )}
                  {profileData.projects && (
                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><BookOpen className="w-5 h-5 text-dot-cyan" /> Projects</h3>
                      <p>{profileData.projects}</p>
                    </div>
                  )}
                  {profileData.achievements && (
                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><Award className="w-5 h-5 text-dot-cyan" /> Achievements</h3>
                      <p>{profileData.achievements}</p>
                    </div>
                  )}
                  {(profileData.linkedin_url || profileData.github_url) && (
                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2"><Linkedin className="w-5 h-5 text-dot-cyan" /> Social Links</h3>
                      <div className="flex space-x-4 mt-2">
                        {profileData.linkedin_url && (
                          <a
                            href={profileData.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-dot-cyan hover:text-dot transition-colors text-2xl"
                          >
                            <Linkedin className="inline-block w-7 h-7" />
                          </a>
                        )}
                        {profileData.github_url && (
                          <a
                            href={profileData.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-dot-cyan hover:text-dot transition-colors text-2xl"
                          >
                            <Github className="inline-block w-7 h-7" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Button className="w-full mt-6" onClick={() => setEditMode(true)}>
                Edit Profile
              </Button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage; 