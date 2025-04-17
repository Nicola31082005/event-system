'use client';

import { usePathname } from 'next/navigation';

export default function EventsLayout({ children, list, upcoming, featured }) {
  // Get the current path and check if we're on a details page
  const pathname = usePathname();
  const isEventDetailsPage = pathname.match(/^\/events\/[^\/]+$/);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {isEventDetailsPage ? 'Event Details' : 'Events'}
      </h1>

      {isEventDetailsPage ? (
        // If we're on an event details page, only show the children (event details)
        <div>{children}</div>
      ) : (
        // If we're on the main events page, show the grid with parallel routes
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content area */}
            <div className="lg:col-span-2">
              {children}
            </div>

            {/* Sidebar with parallel routes */}
            <div className="space-y-8">
              {/* Upcoming Event Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 text-indigo-800">Coming Up Next</h2>
                {upcoming}
              </div>

              {/* Featured Event Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Featured Event</h2>
                {featured}
              </div>
            </div>
          </div>

          {/* List of all events - full width */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">All Events</h2>
            {list}
          </div>
        </>
      )}
    </div>
  );
}