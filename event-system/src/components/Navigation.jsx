"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden sm:flex sm:items-center sm:justify-center flex-1 mx-8">
      <div className="flex items-center space-x-8">
        <Link
          href="/"
          className={`${pathname === '/' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
        >
          Home
        </Link>
        <Link
          href="/events"
          className={`${pathname === '/events' || pathname.startsWith('/events/') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
        >
          Events
        </Link>
        <Link
          href="/create"
          className={`${pathname === '/create' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
        >
          Create Event
        </Link>
      </div>
    </nav>
  );
}