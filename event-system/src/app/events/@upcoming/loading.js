export default function UpcomingLoading() {
  return (
    <div className="relative animate-pulse">
      {/* Badge placeholder */}
      <div className="absolute right-0 top-0 bg-indigo-200 w-16 h-6 rounded-full transform translate-x-2 -translate-y-2"></div>

      <div className="space-y-4">
        {/* Title placeholder */}
        <div className="h-6 bg-indigo-100 rounded w-full"></div>

        {/* Time placeholder */}
        <div className="flex items-center">
          <div className="w-4 h-4 mr-1 bg-indigo-100 rounded-full"></div>
          <div className="h-4 bg-indigo-100 rounded w-32"></div>
        </div>

        {/* Location placeholder */}
        <div className="flex items-center">
          <div className="w-4 h-4 mr-1 bg-indigo-100 rounded-full"></div>
          <div className="h-4 bg-indigo-100 rounded w-24"></div>
        </div>

        {/* Description placeholder */}
        <div className="space-y-2">
          <div className="h-4 bg-indigo-100 rounded w-full"></div>
          <div className="h-4 bg-indigo-100 rounded w-5/6"></div>
          <div className="h-4 bg-indigo-100 rounded w-4/6"></div>
        </div>

        {/* Tags and button placeholder */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            <div className="h-5 w-16 bg-indigo-100 rounded-full"></div>
            <div className="h-5 w-16 bg-indigo-100 rounded-full"></div>
          </div>

          <div className="w-16 h-5 bg-indigo-100 rounded"></div>
        </div>
      </div>
    </div>
  );
}
