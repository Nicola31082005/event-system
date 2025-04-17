import Link from 'next/link';
import { formatRelativeDate, formatTime } from '@/lib/utils';

// This would normally come from a database - get nearest upcoming event
const UPCOMING_EVENT = {
  id: "2",
  title: "Startup Networking Mixer",
  description: "Connect with founders, investors, and tech enthusiasts in this casual networking event.",
  startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
  location: "Innovation Hub, Boston",
  tags: ["Networking", "Business", "Startup"],
  imageUrl: null,
};

export default async function UpcomingEventPage() {
  // In a real app, you'd fetch the next upcoming event from an API or database
  const event = UPCOMING_EVENT;

  if (!event) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">No upcoming events</p>
      </div>
    );
  }

  const daysLeft = formatRelativeDate(event.startDate);
  const startTime = formatTime(event.startDate);
  const endTime = formatTime(event.endDate);

  return (
    <div className="relative">
      {/* Badge showing how soon the event is */}
      <div className="absolute right-0 top-0 bg-indigo-600 text-white text-xs uppercase font-bold py-1 px-2 rounded-full transform translate-x-2 -translate-y-2">
        {daysLeft}
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg text-indigo-900 line-clamp-2">
          {event.title}
        </h3>

        <div className="flex items-center text-sm text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{startTime} - {endTime}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{event.location}</span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3">
          {event.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {event.tags.slice(0, 2).map(tag => (
              <span key={tag} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={`/events/${event.id}`}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}