import EventListItem from "@/components/EventListItem";
import eventService from "@/services/eventService";

export default async function EventListPage() {

  const events = await eventService.getAllEvents();

  return (
    <div className="space-y-6">
      {events.length === 0 ? (
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No events found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      ) : (
        events.map((event) => <EventListItem key={event.id} event={event} />)
      )}

      <div className="flex justify-center mt-8">
        <nav className="inline-flex shadow-sm">
          <a
            href="#"
            className="px-3 py-2 bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 rounded-l-md"
          >
            Previous
          </a>
          <a
            href="#"
            className="px-3 py-2 bg-blue-50 border border-blue-500 text-blue-600 hover:bg-blue-100 border-l-0"
          >
            1
          </a>
          <a
            href="#"
            className="px-3 py-2 bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 border-l-0"
          >
            2
          </a>
          <a
            href="#"
            className="px-3 py-2 bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 border-l-0 rounded-r-md"
          >
            Next
          </a>
        </nav>
      </div>
    </div>
  );
}