"use client";

import { useEffect } from "react";

export default function UpcomingError({ error, reset }) {
  useEffect(() => {
    console.error("Upcoming section error:", error);
  }, [error]);

  return (
    <div className="text-center p-4 border border-indigo-100 rounded-md bg-indigo-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 mx-auto text-indigo-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="mt-2 text-xs text-indigo-700">
        Unable to load upcoming event
      </p>
      <button
        onClick={reset}
        className="mt-2 text-xs px-2 py-1 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded transition-colors"
      >
        Retry
      </button>
    </div>
  );
}
