import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import ParticleBackground from '@/components/ParticleBackground';
import { PlusCircle } from 'lucide-react';

const DEFAULT_AVATAR = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMyMDIwMjAiLz48cGF0aCBkPSJNMjAgMTkuNWM0LjE0MiAwIDcuNS0zLjM1OCA3LjUtNy41UzI0LjE0MiA0LjUgMjAgNC41cy03LjUgMy4zNTgtNy41IDcuNSAzLjM1OCA3LjUgNy41IDcuNXptMCAzLjVjLTUuNTIzIDAtMTYgMi43NzctMTYgOC4zMzNWMzUuNWgzMnYtMy42NjdjMC01LjU1Ni0xMC40NzctOC4zMzMtMTYtOC4zMzN6IiBmaWxsPSIjMzAzMDMwIi8+PC9zdmc+';

interface Blog {
  id: string;
  title: string;
  content: string;
  image_links: string[];
  social_links: string[];
  user_id: string;
  created_at: string;
  profiles?: {
    name: string;
    avatar_url: string;
  };
}

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [socialLinks, setSocialLinks] = useState<string[]>([]);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          profiles!inner (
            name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });
      if (!error && data) {
        setBlogs(data);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newBlog = {
      title: title.trim(),
      content: content.trim(),
      image_links: imageLinks.filter(link => link.trim() !== ''),
      social_links: socialLinks.filter(link => link.trim() !== ''),
      user_id: user.id
    };

    try {
      if (editingBlog) {
        const { error } = await supabase
          .from('blogs')
          .update(newBlog)
          .eq('id', editingBlog.id);
        
        if (error) throw error;
        
        const { data: updatedBlog } = await supabase
          .from('blogs')
          .select(`
            *,
            profiles!inner (
              name,
              avatar_url
            )
          `)
          .eq('id', editingBlog.id)
          .single();

        if (updatedBlog) {
          setBlogs(blogs.map(blog => blog.id === editingBlog.id ? updatedBlog : blog));
        }
      } else {
        const { data, error } = await supabase
          .from('blogs')
          .insert([newBlog])
          .select(`
            *,
            profiles!inner (
              name,
              avatar_url
            )
          `)
          .single();

        if (error) throw error;
        if (data) {
          setBlogs([data, ...blogs]);
        }
      }

      setTitle('');
      setContent('');
      setImageLinks([]);
      setSocialLinks([]);
      setShowForm(false);
      setEditingBlog(null);
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog. Please try again.');
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setImageLinks(blog.image_links);
    setSocialLinks(blog.social_links);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ParticleBackground />
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-16 flex-grow">
        <h2 className="text-3xl font-bold text-center mb-10 text-gradient">Blogs & Announcements</h2>
        
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="fixed bottom-8 right-8 bg-dot-cyan text-white p-4 rounded-full shadow-lg hover:bg-dot transition-colors z-50"
          >
            <PlusCircle size={24} />
          </button>
        )}

        {showForm && user && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-4">{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Content</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none"
                    rows={10}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Image Links (comma-separated)</label>
                  <input
                    type="text"
                    value={imageLinks.join(',')}
                    onChange={(e) => setImageLinks(e.target.value.split(',').map(link => link.trim()))}
                    className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Social Media Links (comma-separated)</label>
                  <input
                    type="text"
                    value={socialLinks.join(',')}
                    onChange={(e) => setSocialLinks(e.target.value.split(',').map(link => link.trim()))}
                    className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingBlog(null);
                      setTitle('');
                      setContent('');
                      setImageLinks([]);
                      setSocialLinks([]);
                    }}
                    className="px-4 py-2 rounded-lg border border-dot-cyan/30 hover:border-dot-cyan transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-dot-cyan text-white py-2 px-4 rounded-lg hover:bg-dot transition-colors"
                  >
                    {editingBlog ? 'Update Blog' : 'Post Blog'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">Loading blogs...</div>
        ) : (
          <div className="space-y-8">
            {blogs.map((blog) => (
              <div key={blog.id} className="glass rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={blog.profiles?.avatar_url || DEFAULT_AVATAR}
                    alt={blog.profiles?.name || 'User'}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = DEFAULT_AVATAR;
                    }}
                  />
                  <div>
                    <h3 className="text-xl font-bold">{blog.title}</h3>
                    <p className="text-sm text-gray-500">
                      Posted by {blog.profiles?.name || 'Anonymous'} on{' '}
                      {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="prose prose-invert max-w-none mb-4">
                  {blog.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {blog.image_links.length > 0 && (
                  <div className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {blog.image_links.map((link, index) => (
                        <img
                          key={index}
                          src={link}
                          alt={`Blog image ${index + 1}`}
                          className="rounded-lg w-full h-48 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = DEFAULT_AVATAR;
                            target.classList.add('opacity-50');
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {blog.social_links.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {blog.social_links.map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dot-cyan hover:text-dot transition-colors"
                      >
                        Link {index + 1}
                      </a>
                    ))}
                  </div>
                )}
                {user && user.id === blog.user_id && (
                  <button
                    onClick={() => handleEdit(blog)}
                    className="mt-4 text-dot-cyan hover:text-dot transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage; 