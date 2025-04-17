'use client';

import { useState } from 'react';

export default function RsvpButton({
  eventId,
  currentUserRsvp,
  isAuthenticated,
  isAtCapacity,
  isOrganizer
}) {
  const [isLoading, setIsLoading] = useState(false);

  // Current RSVP status
  const status = currentUserRsvp?.status || null;
  const hasRsvp = !!currentUserRsvp;

  // Function to handle RSVP actions
  const handleRsvp = async (action) => {
    if (!isAuthenticated) {
      // Redirect to sign in
      window.location.href = '/api/auth/signin';
      return;
    }

    setIsLoading(true);
    try {
      let response;

      if (action === 'create') {
        // Create new RSVP
        response = await fetch(`/api/events/${eventId}/rsvp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: isAtCapacity ? 'WAITLIST' : 'PENDING'
          }),
        });
      } else if (action === 'cancel') {
        // Cancel existing RSVP
        response = await fetch(`/api/events/${eventId}/rsvp`, {
          method: 'DELETE',
        });
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update RSVP');
      }

      // Refresh the page to update the UI
      window.location.reload();

    } catch (error) {
      console.error('RSVP error:', error);
      alert(error.message || "Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // If user is the organizer, they don't need to RSVP
  if (isOrganizer) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center text-sm">
        You're the organizer of this event
      </div>
    );
  }

  // Determine button text and status based on current state
  let buttonText = "RSVP";
  let buttonAction = "create";
  let buttonClass = "bg-blue-500 text-white";
  let statusText = "";

  if (hasRsvp) {
    buttonText = "Cancel RSVP";
    buttonAction = "cancel";
    buttonClass = "bg-gray-200 text-gray-800";

    switch (status) {
      case 'APPROVED':
        statusText = "You're attending this event";
        break;
      case 'PENDING':
        statusText = "Your RSVP is pending approval";
        break;
      case 'WAITLIST':
        statusText = "You're on the waitlist";
        break;
      case 'DENIED':
        statusText = "Your RSVP was denied";
        buttonClass = "bg-red-200 text-red-800";
        break;
    }
  } else if (isAtCapacity) {
    buttonText = "Join Waitlist";
  }

  return (
    <div className="space-y-3">
      {statusText && (
        <div className="text-sm text-center font-medium">{statusText}</div>
      )}

      <button
        className={`${buttonClass} w-full py-2 px-4 rounded-md font-medium`}
        disabled={isLoading}
        onClick={() => {
          if (hasRsvp && buttonAction === 'cancel') {
            if (confirm("Are you sure you want to cancel your RSVP?")) {
              handleRsvp(buttonAction);
            }
          } else {
            handleRsvp(buttonAction);
          }
        }}
      >
        {isLoading ? "Processing..." : buttonText}
      </button>
    </div>
  );
}