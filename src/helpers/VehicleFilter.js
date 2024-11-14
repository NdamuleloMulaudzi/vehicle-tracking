import React, { useState } from "react";
import "../styles/VehicleList.css"

const VehicleFilter = ({ vehicles, setFilteredVehicles }) => {
  const [searchVehicle, setSearchVehilce] = useState("");

  const handleSearch = (e) => {
    const id = e.target.value;
    setSearchVehilce(id);
    setFilteredVehicles(
      vehicles.filter((vehicle) => vehicle.id.includes(id))
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
