export default function EventLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Image skeleton */}
      <div className="rounded-lg overflow-hidden" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="w-full h-64 bg-gray-200" style={{ maxHeight: '250px' }}></div>
      </div>

      {/* Title skeleton */}
      <div className="h-10 bg-gray-200 rounded w-3/4"></div>

      {/* Organizer skeleton */}
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>

      {/* Event details skeleton */}
      <div className="space-y-2">
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      </div>

      {/* Description skeleton */}
      <div className="pt-4 border-t space-y-2">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>

      {/* Button skeleton */}
      <div className="mt-6 pt-6 border-t">
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
}