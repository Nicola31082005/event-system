import eventService from "@/services/eventService";
import Link from "next/link";

export default async function Home() {
  const latestEvents = await eventService.getLastestEvents(3);

  return (
    <div className="flex flex-col gap-12 px-4 py-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Manage Events with Ease</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          Create, discover, and participate in events that matter to you.
          Our platform simplifies event management from start to finish.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/events/create" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">
            Create Event
          </Link>
          <Link href="/events" className="bg-white border border-gray-300 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition">
            Browse Events
          </Link>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* This would normally be populated from your database */}
          {latestEvents.map((event) => (
            <div key={event.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="bg-gray-200 h-48 w-full"></div>
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">Event Title {event.title}</h3>
                <p className="text-sm text-gray-600 mb-2">Date • Location</p>
                <p className="mb-4">Brief description of the event that gives attendees an idea of what to expect.</p>
                <Link href={`/events/${event.id}`} className="text-blue-600 font-semibold hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/events" className="text-blue-600 font-semibold hover:underline">
            View All Events →
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 bg-gray-50 -mx-4 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-4">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Easy Scheduling</h3>
              <p>Create events in minutes with our intuitive event creation tools.</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Attendee Management</h3>
              <p>Keep track of registrations, send updates, and manage attendees effortlessly.</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Secure Payments</h3>
              <p>Process ticket sales and collect payments with our secure payment gateway.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Host Your Next Event?</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Join thousands of event organizers who trust our platform for their events.
          Get started today and experience seamless event management.
        </p>
        <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">
          Get Started for Free
        </Link>
      </section>
    </div>
  );
}
