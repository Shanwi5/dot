import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { PlusCircle, X } from 'lucide-react';

interface AddEventProps {
  onEventAdded: () => void;
}

const AddEvent: React.FC<AddEventProps> = ({ onEventAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: '',
    images: [] as string[],
    is_upcoming: true
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'test@test') {
      setShowPasswordModal(false);
      setShowForm(true);
      setError(null);
    } else {
      setError('Invalid password');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('events')
        .insert([{
          ...formData,
          images: formData.images.filter(img => img.trim() !== '')
        }])
        .select()
        .single();

      if (error) throw error;

      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        image: '',
        images: [],
        is_upcoming: true
      });
      setShowForm(false);
      onEventAdded();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.value.split(',').map(img => img.trim());
    setFormData(prev => ({ ...prev, images }));
  };

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setShowPasswordModal(true)}
        className="fixed bottom-8 right-8 bg-dot-cyan text-white p-4 rounded-full shadow-lg hover:bg-dot transition-colors z-50"
      >
        <PlusCircle size={24} />
      </button>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Enter Password</h3>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none mb-4"
                placeholder="Enter password"
                required
              />
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPassword('');
                    setError(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-dot-cyan/30 hover:border-dot-cyan transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-dot-cyan text-white py-2 px-4 rounded-lg hover:bg-dot transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Add New Event</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-foreground/70 hover:text-foreground"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Time</label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="e.g., 9:00 AM - 4:30 PM"
                    className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Main Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Additional Image URLs (comma-separated)</label>
                <input
                  type="text"
                  value={formData.images.join(',')}
                  onChange={handleImagesChange}
                  className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Event Status</label>
                <select
                  name="is_upcoming"
                  value={formData.is_upcoming.toString()}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-background border border-dot-cyan/30 focus:border-dot-cyan focus:outline-none"
                >
                  <option value="true">Upcoming</option>
                  <option value="false">Past</option>
                </select>
              </div>

              {error && <p className="text-red-500">{error}</p>}

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg border border-dot-cyan/30 hover:border-dot-cyan transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-dot-cyan text-white py-2 px-4 rounded-lg hover:bg-dot transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEvent; 