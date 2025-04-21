import eventService from '@/services/eventService';
import { formatDate } from '../../../lib/utils';


export default async function EventPage({ params }) {
    const { id } = await params;
    const event = await eventService.getEventById(id);

    console.log(event);

  return (
    <div className="container max-w-5xl py-8">
      <div className="space-y-6">
        {/* Event image */}
        <div className="rounded-lg overflow-hidden" style={{ maxWidth: '400px', margin: '0 auto' }}>
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-64 object-cover"
              style={{ maxHeight: '250px' }}
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          )}
        </div>

      {/* Event details */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{event.title}</h1>

        <p>Organized by {event.organizer.name}</p>

        <div className="space-y-2">
          <div>
            <strong>When:</strong> {formatDate(event.startDate)}
          </div>

          <div>
            <strong>Where:</strong> {event.location}
          </div>

          <div>
            <strong>Capacity:</strong> {event.capacity
              ? `${event.capacity} attendees`
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
