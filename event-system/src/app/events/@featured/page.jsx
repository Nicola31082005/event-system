import Link from 'next/link';
import { formatDate } from '@/lib/utils';

// This would normally come from a database - get featured event
const FEATURED_EVENT = {
  id: "3",
  title: "AI and Machine Learning Workshop",
  description: "Hands-on workshop on artificial intelligence and machine learning. Build your own ML models!",
  startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  location: "Data Science Academy, Online",
  tags: ["AI", "Machine Learning", "Technology", "Workshop"],
  imageUrl: null,
};

export default async function FeaturedEventPage() {
  // To test error handling - uncomment this line:
  // throw new Error("Testing featured event error boundary");

  // To test loading state - uncomment these lines:
  //   await new Promise(resolve => setTimeout(resolve, 5000));

  // In a real app, you'd fetch the featured event from an API or database
  const event = FEATURED_EVENT;

  if (!event) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">No featured events</p>
      </div>
    );
  }

  return (
    <div>
      {/* Event Image/Placeholder */}
      <div className="w-full h-40 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-md mb-4 overflow-hidden">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          Featured
        </span>

        <h3 className="font-bold text-lg line-clamp-2">
          {event.title}
        </h3>

        <div className="flex items-center text-sm text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(event.startDate)}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{event.location}</span>
        </div>

        <Link
          href={`/events/${event.id}`}
          className="block mt-4 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors w-full"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}