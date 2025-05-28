import React, { useEffect, useState } from 'react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import ParticleBackground from '@/components/ParticleBackground';
import AddEvent from '@/components/AddEvent';
import { Calendar, Clock, MapPin, Image as ImageIcon } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  images: string[];
  is_upcoming: boolean;
  created_at: string;
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <div className="pt-24">
        <main className="container mx-auto px-4 py-16 pt-24">
          <h1 className="text-4xl font-bold text-center mb-12">Events</h1>

          {loading ? (
            <div className="text-center">Loading events...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="space-y-8">
              {events.length === 0 ? (
                <div className="text-center text-foreground/70">No events found</div>
              ) : (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-background/50 backdrop-blur-sm border border-dot-cyan/30 rounded-xl overflow-hidden hover:border-dot-cyan transition-colors"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                      <div className="md:col-span-1">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-48 object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://placehold.co/600x400/1a1a1a/ffffff?text=No+Image';
                          }}
                        />
                        {event.images && event.images.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <ImageIcon size={16} />
                              Additional Images
                            </h4>
                            <div className="grid grid-cols-3 gap-2">
                              {event.images.map((img, index) => (
                                <img
                                  key={index}
                                  src={img}
                                  alt={`${event.title} - Image ${index + 1}`}
                                  className="w-full h-20 object-cover rounded-lg"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://placehold.co/200x200/1a1a1a/ffffff?text=No+Image';
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                        <p className="text-foreground/70 mb-4">{event.description}</p>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-dot-cyan" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-dot-cyan" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-dot-cyan" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                            event.is_upcoming
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-gray-500/20 text-gray-500'
                          }`}>
                            {event.is_upcoming ? 'Upcoming' : 'Past Event'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>

        {user && <AddEvent onEventAdded={fetchEvents} />}
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;
