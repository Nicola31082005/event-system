import Image from 'next/image';

export default function RsvpList({ rsvps }) {
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
              <AttendeeCard key={rsvp.id} rsvp={rsvp} />
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
              <AttendeeCard key={rsvp.id} rsvp={rsvp} />
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
              <AttendeeCard key={rsvp.id} rsvp={rsvp} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AttendeeCard({ rsvp }) {
  const statusColors = {
    APPROVED: 'bg-green-100 text-green-800',
    WAITLIST: 'bg-blue-100 text-blue-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    DENIED: 'bg-red-100 text-red-800',
  };

  return (
    <div className="flex items-center space-x-3 p-3 border rounded-lg">
      <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={rsvp.user.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(rsvp.user.name)}&background=random`}
          alt={rsvp.user.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">{rsvp.user.name}</p>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[rsvp.status]}`}>
          {rsvp.status}
        </span>
      </div>
    </div>
  );
}