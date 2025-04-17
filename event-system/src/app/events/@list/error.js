"use client";

import { useEffect } from "react";

export default function ListError({ error, reset }) {
  useEffect(() => {
    console.error("Event list error:", error);
  }, [error]);

  return (
    <div className="text-center py-12 border border-gray-200 rounded-lg bg-gray-50 my-4">
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
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        Error Loading Events
      </h3>
      <p className="mt-2 text-sm text-gray-600 max-w-md mx-auto">
        We encountered a problem while trying to load the events. This might be
        a temporary issue.
      </p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
