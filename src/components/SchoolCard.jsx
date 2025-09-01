import React from "react";

const SchoolCard = ({ school }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300">
      {/* Image */}
      <div className="w-full h-52 overflow-hidden">
        <img
          src={school.image || "/schoolImages/default.jpg"}
          alt={school.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{school.name}</h2>
        <p className="text-gray-600 mb-1">{school.address}</p>
        <p className="text-gray-500 text-sm">{school.city}</p>
      </div>
    </div>
  );
};

export default SchoolCard;
