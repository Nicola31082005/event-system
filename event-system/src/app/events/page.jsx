import Link from "next/link";

export default function EventsPage() {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Discover Events</h2>
          <Link
            href="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Event
          </Link>
        </div>

        {/* Filter & Search Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-2/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/3">
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Categories</option>
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="sports">Sports</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
              All
            </button>
            <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm">
              Today
            </button>
            <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm">
              This Week
            </button>
            <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm">
              This Month
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 p-4 rounded-lg mb-8 flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-blue-800 text-sm">
            Explore our curated events from around the world. Use the filters to find events that match your interests.
          </p>
        </div>

        {/* Main content area */}
        <div className="prose max-w-none">
          <h3>Welcome to Our Event Platform</h3>
          <p>
            Find and join exciting events in your area or create your own! Our platform connects people with similar interests
            through memorable experiences.
          </p>
          <p>
            Check out the featured and upcoming events in the sidebar, or browse through all events listed below. You can filter
            events by date, category, or search for specific keywords.
          </p>

          <h4>Why Join Events?</h4>
          <ul>
            <li>Network with like-minded individuals</li>
            <li>Learn new skills and gain knowledge</li>
            <li>Discover opportunities in your field</li>
            <li>Create lasting memories and friendships</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
