import "../styles/globals.css";
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "School Directory",
  description: "Add and view schools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-blue-600 text-white shadow-md">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center p-4">
            <Link href="/">
            <h1 className="text-xl font-bold mb-2 md:mb-0">School Directory</h1>
            </Link>
            <nav className="space-x-4">
              <Link href="/add-school" className="hover:underline">
                Add School
              </Link>
              <Link href="/show-schools" className="hover:underline">
                View Schools
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow py-6">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-100 text-gray-600 text-center py-4 mt-auto">
          &copy; {new Date().getFullYear()} School Directory. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
