import React, { useState } from "react";

const VehicleFilter = ({ vehicles, setFilteredVehicles }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredVehicles(
      vehicles.filter((vehicle) => vehicle.id.includes(term))
    );
  };

  return (
    <div className="vehicle-filter">
      <input
        type="text"
        placeholder="Filter by Vehicle ID"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default VehicleFilter;
