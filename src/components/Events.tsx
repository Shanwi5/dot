import React, { useState } from 'react';
import { Calendar, Clock, MapPin, X } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  images?: string[]; // Optional array of additional images
  description: string;
}

const Events: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Sample data - replace with actual data from your backend
  const upcomingEvents: Event[] = [];

  const pastEvents: Event[] = [
    {
      id: 3,
      title: "Tech Day 2024",
      date: "December 16, 2023",
      time: "9:00 AM - 4:30 PM",
      location: "MBA Smart Room",
      image: "/tech1.jpeg",
      images: [
        "/tech4.jpeg",
        "/tech2.jpeg",
        "/tech3.jpeg"
      ],
      description: "Tech Day featured dynamic sessions on idea pitching and logo design, fostering creativity and innovation among participants."
    },
  ];

  const EventCard: React.FC<{ event: Event }> = ({ event }) => (
    <div className="glass rounded-xl overflow-hidden animate-fade-in">
      <div className="relative h-48 cursor-pointer" onClick={() => setSelectedImage(event.image)}>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      {event.images && event.images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 p-2 bg-black/20">
          {event.images.map((img, index) => (
            <div 
              key={index} 
              className="relative h-24 cursor-pointer" 
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt={`${event.title} - Image ${index + 2}`}
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <p className="text-white/70 mb-4">{event.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-white/80">
            <Calendar className="w-4 h-4 mr-2 text-dot-cyan" />
            {event.date}
          </div>
          <div className="flex items-center text-sm text-white/80">
            <Clock className="w-4 h-4 mr-2 text-dot-cyan" />
            {event.time}
          </div>
          <div className="flex items-center text-sm text-white/80">
            <MapPin className="w-4 h-4 mr-2 text-dot-cyan" />
            {event.location}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="events" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Upcoming Events */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Upcoming Events</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Coming Soon Card */}
        <div className="mb-24">
          <div className="w-full max-w-4xl mx-auto">
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-3xl shadow-2xl p-20 flex justify-center items-center h-64">
              <h2 className="text-4xl sm:text-5xl font-semibold text-gray-800">
                Coming Soon
              </h2>
            </div>
          </div>
        </div>

        {/* Past Events */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Past Events</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Relive the memories of our successful past events
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-dot-cyan transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Selected event image" 
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}

      {/* Background element */}
      <div className="absolute bottom-0 left-0 w-full max-w-4xl h-full max-h-96 bg-gradient-to-t from-dot/20 to-dot-cyan/10 rounded-full blur-3xl opacity-30 -z-10"></div>
    </section>
  );
};

export default Events;