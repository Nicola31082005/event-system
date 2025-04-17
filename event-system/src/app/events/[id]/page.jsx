import eventService from '@/services/eventService';
import { notFound } from 'next/navigation';



// async function getEvent(id) {
//   // In a real app, fetch from database
//   // For demo purposes, return mock data
//   return {
//     id,
//     title: 'Summer Coding Bootcamp',
//     description: 'Join us for an intensive coding bootcamp where you will learn the latest technologies and frameworks.',
//     date: new Date('2023-08-15T10:00:00'),
//     location: 'Tech Hub, 123 Innovation Street, San Francisco, CA',
//     imageUrl: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052',
//     capacity: 50,
//     attendeeCount: 42,
//     organizer: {
//       name: 'Tech Learning Collective',
//       imageUrl: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052',
//     }
//   };
// }

// Helper function to format date
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default async function EventPage({ params }) {
    const { id } = await params;
  const event = await eventService.getEventById(id);
  if (!event) return notFound();

  return (
    <div className="container max-w-5xl py-8">
      <div className="space-y-6">
        {/* Event image */}
        <div className="rounded-lg overflow-hidden" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-64 object-cover"
            style={{ maxHeight: '250px' }}
          />
        </div>

        {/* Event details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{event.title}</h1>

          <p>Organized by {event.organizer.name}</p>

          <div className="space-y-2">
            <div>
              <strong>When:</strong> {formatDate(event.date)}
            </div>

            <div>
              <strong>Where:</strong> {event.location}
            </div>

            <div>
              <strong>Capacity:</strong> {event.capacity
                ? `${event.attendeeCount}/${event.capacity} attendees`
                : 'Unlimited attendees'}
            </div>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-xl font-semibold mb-2">About this event</h2>
            <p>{event.description}</p>
          </div>
        </div>

        {/* RSVP Button Placeholder */}
        <div className="mt-6 pt-6 border-t">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md font-medium w-full">
            RSVP to this event
          </button>
          <p className="text-sm text-gray-500 mt-2 text-center">
            RSVP functionality will be implemented later
          </p>
        </div>
      </div>
    </div>
  );
}
