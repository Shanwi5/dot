import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { formatDistanceToNow } from 'date-fns';
import { BookOpen, AlertCircle } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    name: string;
  };
}

const BlogPreview: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setError(null);
        const { data, error } = await supabase
          .from('blogs')
          .select(`
            id,
            title,
            content,
            created_at,
            user_id,
            profiles (
              name
            )
          `)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setBlogs(data || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (blogId: string) => {
    navigate(`/blog?id=${blogId}`);
  };

  if (loading) {
    return (
      <section id="blog" className="py-20 sm:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Latest Updates & Announcements</span>
            </h2>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dot-cyan"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="py-20 sm:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Latest Updates & Announcements</span>
            </h2>
          </div>
          <div className="glass rounded-xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-lg text-white/70 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-dot-cyan to-dot text-white font-medium hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Latest Updates & Announcements</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Stay informed with our latest news, announcements, and insights from the D.O.T community.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="glass rounded-xl p-8 text-center max-w-2xl mx-auto">
            <BookOpen className="w-12 h-12 text-dot-cyan mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No Posts Yet</h3>
            <p className="text-white/70 mb-6">
              Be the first to share your thoughts and announcements with the D.O.T community.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-dot-cyan to-dot text-white font-medium hover:opacity-90 transition-opacity"
            >
              Create Post
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  onClick={() => handleBlogClick(blog.id)}
                  className="glass rounded-xl overflow-hidden transition-all hover:-translate-y-2 hover:shadow-lg hover:shadow-dot/20 duration-300 cursor-pointer"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-white/70 mb-4 line-clamp-3">
                      {blog.content.replace(/<[^>]*>/g, '')}
                    </p>
                    <div className="flex items-center justify-between text-sm text-white/50">
                      <span>{blog.profiles?.name || 'Anonymous'}</span>
                      <span>{formatDistanceToNow(new Date(blog.created_at), { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/blog"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-dot-cyan to-dot text-white font-medium hover:opacity-90 transition-opacity"
              >
                View All Posts
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Background element */}
      <div className="absolute bottom-0 left-0 w-full max-w-4xl h-full max-h-96 bg-gradient-to-t from-dot-cyan/20 to-dot/10 rounded-full blur-3xl opacity-30 -z-10"></div>
    </section>
  );
};

export default BlogPreview; 