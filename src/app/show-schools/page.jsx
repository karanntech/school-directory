"use client";

import React, { useEffect, useState } from "react";
import SchoolCard from "@/components/SchoolCard";

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("/api/get-schools");
        const data = await res.json();

        if (Array.isArray(data)) {
          setSchools(data);
        } else {
          console.error("API returned non-array data:", data);
          setSchools([]);
        }
      } catch (err) {
        console.error("Failed to fetch schools:", err);
        setSchools([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      {loading ? (
        <p className="text-center text-gray-600 mt-10">Loading schools...</p>
      ) : schools.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">No schools found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {schools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowSchools;