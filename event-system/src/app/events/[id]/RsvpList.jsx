'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RsvpList({ eventId, isOrganizer, initialRsvps }) {
  const [rsvps, setRsvps] = useState(initialRsvps);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  //TODO check why this is not working not changing the status
  // Handle RSVP status update
  const handleUpdateStatus = async (rsvpId, newStatus) => {
    if (!isOrganizer) return;

    setIsUpdating(true);

    try {
      const response = await fetch(`/api/events/${eventId}/rsvp/${rsvpId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update RSVP');
      }

      // Update the local state to reflect the change
      setRsvps(rsvps.map(rsvp =>
        rsvp.id === rsvpId ? { ...rsvp, status: newStatus } : rsvp
      ));

      // Refresh the page data
      router.refresh();
    } catch (error) {
      console.error('Error updating RSVP:', error);
      alert(error.message || 'Failed to update RSVP status');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!rsvps || rsvps.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No one has RSVP'd to this event yet.
      </div>
    );
  }

  // Filter and sort RSVPs
  const approvedRsvps = rsvps.filter(rsvp => rsvp.status === 'APPROVED');
  const waitlistRsvps = rsvps.filter(rsvp => rsvp.status === 'WAITLIST');
  const pendingRsvps = rsvps.filter(rsvp => rsvp.status === 'PENDING');

  return (
    <div className="space-y-6">
      {/* Approved attendees */}
      {approvedRsvps.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Attending ({approvedRsvps.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {approvedRsvps.map(rsvp => (
              <AttendeeCard
                key={rsvp.id}
                rsvp={rsvp}
                isOrganizer={isOrganizer}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        </div>
      )}

      {/* Waitlist */}
      {waitlistRsvps.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Waitlist ({waitlistRsvps.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {waitlistRsvps.map(rsvp => (
              <AttendeeCard
                key={rsvp.id}
                rsvp={rsvp}
                isOrganizer={isOrganizer}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        </div>
      )}

      {/* Pending */}
      {pendingRsvps.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Pending ({pendingRsvps.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pendingRsvps.map(rsvp => (
              <AttendeeCard
                key={rsvp.id}
                rsvp={rsvp}
                isOrganizer={isOrganizer}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AttendeeCard({ rsvp, isOrganizer, onUpdateStatus }) {
  const statusColors = {
    APPROVED: 'bg-green-100 text-green-800',
    WAITLIST: 'bg-blue-100 text-blue-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    DENIED: 'bg-red-100 text-red-800',
  };

  // Use the user's profile data from Clerk
  const user = rsvp.user;
  const defaultImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=random`;

  return (
    <div className="flex items-center p-3 border rounded-lg">
      <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0 mr-3">
        <img
          src={user.imageUrl || defaultImage}
          alt={user.name || 'User'}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">{user.name || 'Anonymous User'}</p>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[rsvp.status]}`}>
          {rsvp.status}
        </span>
      </div>

      {/* Organizer Controls */}
      {isOrganizer && rsvp.status === 'PENDING' && (
        <div className="ml-2 flex space-x-2">
          <button
            onClick={() => onUpdateStatus(rsvp.id, 'APPROVED')}
            className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
          >
            Approve
          </button>
          <button
            onClick={() => onUpdateStatus(rsvp.id, 'DENIED')}
            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
          >
            Deny
          </button>
        </div>
      )}

      {/* Option to move from waitlist to approved */}
      {isOrganizer && rsvp.status === 'WAITLIST' && (
        <div className="ml-2">
          <button
            onClick={() => onUpdateStatus(rsvp.id, 'APPROVED')}
            className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
          >
            Approve
          </button>
        </div>
      )}
    </div>
  );
}