import eventService from '@/services/eventService';
import rsvpService from '@/services/rsvpService';
import { formatDate } from '../../../lib/utils';
import { auth, currentUser } from '@clerk/nextjs/server';
import RsvpButton from './RsvpButton';
import RsvpList from './RsvpList';

export default async function EventPage({ params }) {
  const { id } = params;

  // Get current user
  const user = await currentUser();
  const isAuthenticated = !!user;

  // Get event details
  const event = await eventService.getEventById(id);

  // Check if current user is the event organizer
  const isOrganizer = user?.id === event?.organizer.clerkUserId;

  // Get current user's RSVP if they have one
  let currentUserRsvp = null;
  if (isAuthenticated) {
    currentUserRsvp = await rsvpService.getUserRsvpForEvent(id);
  }

  // Get approved RSVPs count to check capacity
  const approvedRsvps = await rsvpService.getRsvpsByEventId(id, {
    status: 'APPROVED',
    paginate: false
  });

  // If we got paginated results, extract just the rsvps array
  const rsvpsList = Array.isArray(approvedRsvps) ? approvedRsvps : approvedRsvps.rsvps;
  const approvedCount = rsvpsList.length;

  // Check if the event is at capacity
  const isAtCapacity = event.capacity ? approvedCount >= event.capacity : false;

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

          <p>Organized by {event?.organizer?.name}</p>

          <div className="space-y-2">
            <div>
              <strong>When:</strong> {formatDate(event.startDate)}
            </div>

            <div>
              <strong>Where:</strong> {event.location}
            </div>

            <div>
              <strong>Capacity:</strong> {event?.capacity
                ? `${approvedCount}/${event?.capacity} attendees`
                : 'Unlimited attendees'}
            </div>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-xl font-semibold mb-2">About this event</h2>
            <p>{event.description}</p>
          </div>
        </div>

        {/* RSVP Button */}
        <div className="mt-6 pt-6 border-t">
          <RsvpButton
            eventId={id}
            currentUserRsvp={currentUserRsvp}
            isAuthenticated={isAuthenticated}
            isAtCapacity={isAtCapacity}
            isOrganizer={isOrganizer}
          />
        </div>

        {/* Attendees List */}
        <div className="mt-6 pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Who's coming?</h2>
          <RsvpList eventId={id} />
        </div>
      </div>
    </div>
  );
}
