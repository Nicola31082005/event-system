"use client";

import { useEffect } from "react";

export default function FeaturedError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Featured section error:", error);
  }, [error]);

  return (
    <div className="text-center p-4 border border-red-100 rounded-md bg-red-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 mx-auto text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-red-800">
        Error Loading Featured Event
      </h3>
      <p className="mt-1 text-xs text-red-700">
        {process.env.NODE_ENV === "development"
          ? error.message || "Something went wrong"
          : "Unable to display featured event at this time."}
      </p>
      <button
        onClick={reset}
        className="mt-3 text-xs px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200 rounded-md transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
