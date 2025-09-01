import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          Welcome to School Directory
        </h1>
        <p className="text-gray-700 mb-8 max-w-xl">
          Easily add and view schools with their details and images.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/add-school"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add School
          </Link>
          <Link
            href="/show-schools"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            View Schools
          </Link>
        </div>
      </div>
    </div>
  );
}
