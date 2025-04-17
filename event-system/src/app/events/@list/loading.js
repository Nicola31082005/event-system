export default function ListLoading() {
  return (
    <div className="space-y-6">
      {/* Skeleton loading UI for multiple event cards */}
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
        >
          <div className="flex flex-col md:flex-row">
            {/* Skeleton image */}
            <div className="md:w-1/3 h-48 md:h-auto bg-gray-200"></div>

            {/* Skeleton content */}
            <div className="p-6 flex-1 flex flex-col">
              {/* Date and location */}
              <div className="flex items-center mb-2">
                <div className="h-4 w-36 bg-gray-200 rounded mr-4"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>

              {/* Title */}
              <div className="h-6 w-full bg-gray-200 rounded mb-4"></div>

              {/* Description */}
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                  <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-5 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Skeleton pagination */}
      <div className="flex justify-center mt-8">
        <div className="inline-flex shadow-sm">
          <div className="h-10 w-20 bg-gray-200 rounded-l-md"></div>
          <div className="h-10 w-10 bg-gray-300 ml-px"></div>
          <div className="h-10 w-10 bg-gray-200 ml-px"></div>
          <div className="h-10 w-20 bg-gray-200 ml-px rounded-r-md"></div>
        </div>
      </div>
    </div>
  );
}
