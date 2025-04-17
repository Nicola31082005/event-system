export default function EventNotFound() {
  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
      <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
      <a
        href="/events"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Browse All Events
      </a>
    </div>
  );
}