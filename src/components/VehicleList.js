
import React from "react";
import "../styles/VehicleList.css"

const VehicleList = ({ vehicles, setCenter, setZoom, onVehicleClick }) => (
  <div className="vehicle-list">
    {vehicles.map((vehicle) => (
      <div
        key={vehicle.id}
        className="card mb-2 text-black "
          
        onClick={() => {
          setCenter({ lat: vehicle.latitude, lng: vehicle.longitude });
          setZoom(14);
          onVehicleClick(vehicle)
        }}
      >
        <h3>Vehicle {vehicle.id}</h3>
        <p>Lat: {vehicle.latitude}</p>
        <p>Lng: {vehicle.longitude}</p>
        <p>Last Updated: {new Date().toLocaleString()}</p>
      </div>
    ))}
  </div>
);

export default VehicleList;
