
import React from "react";
import "../styles/VehicleList.css"

const VehicleList = ({ vehicles, setCenter, setZoom }) => (
  <div className="vehicle-list">
    {vehicles.map((vehicle, index) => (
      <div
        key={vehicle.id}
        className="card mb-2 text-black "
          
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
