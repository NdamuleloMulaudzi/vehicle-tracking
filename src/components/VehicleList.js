
import React from "react";

const VehicleList = ({ vehicles, setCenter, setZoom }) => (
  <div className="vehicle-list">
    {vehicles.map((vehicle, index) => (
      <div
        key={vehicle.id}
        className={`card mb-3 text-white ${
          index % 2 === 0 ? "bg-primary" : "bg-secondary"
        }`}
        onClick={() => {
          setCenter({ lat: vehicle.latitude, lng: vehicle.longitude });
          setZoom(14);
        }}
      >
        <h3>Vehicle {vehicle.id}</h3>
        <p>Lat: {vehicle.latitude}</p>
        <p>Lng: {vehicle.longitude}</p>
        <p>Last Updated: {new Date(vehicle.timestamp).toLocaleString()}</p>
      </div>
    ))}
  </div>
);

export default VehicleList;
