import Link from 'next/link';
import { formatDate } from '../lib/utils';

export default function EventListItem({ event }) {
  const { id, title, description, startDate, location, tags, imageUrl } = event;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* Event Image */}
        <div className="md:w-1/3 h-48 md:h-auto relative">
          <div
            className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100"
            style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          >
            {!imageUrl && (
              <div className="flex items-center justify-center h-full text-indigo-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Event Details */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Date and Location */}
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(startDate)}</span>

            <span className="mx-2">•</span>

            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate max-w-xs">{location}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags && tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {tags && tags.length > 3 && (
                <span className="text-xs text-gray-500">+{tags.length - 3} more</span>
              )}
            </div>

            {/* View Details Button */}
            <Link
              href={`/events/${id}`}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
            >
              View Details
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}