import React, { useState } from "react";

const VehicleFilter = ({ vehicles, setFilteredVehicles }) => {
  const [searchVehicle, setSearchVehilce] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchVehilce(term);
    setFilteredVehicles(
      vehicles.filter((vehicle) => vehicle.id.includes(term))
    );
  };

  return (
    <div className="vehicle-filter mb-3">
      <input
        type="text"
        placeholder="Filter by Vehicle ID"
        value={searchVehicle}
        onChange={handleSearch}
      />
    </div>
  );
};

export default VehicleFilter;
