
import React from "react";
import "../styles/VehicleList.css"


const VehicleList = ({ vehicles, setCenter, setZoom, onVehicleClick }) => (
  <div className="vehicle-list">
    {vehicles.map((vehicle) => (
      <div
        key={vehicle.id}
        className="card"
          
        onClick={() => {
          const lastPosition = vehicle.historicalRoute[vehicle.historicalRoute.length - 1]
          setCenter({ lat:lastPosition.lat, lng: lastPosition.lng});
          setZoom(14);
          onVehicleClick(vehicle)
        }}
      >
        <h3>Vehicle {vehicle.id}</h3>
        <p>Lat: {vehicle.historicalRoute[vehicle.historicalRoute.length-1]?.lat}</p>
        <p>Lng: {vehicle.historicalRoute[vehicle.historicalRoute.length - 1]?.lng}</p>
        <p>Last Updated: {new Date().toLocaleString()}</p>
      </div>
    ))}
  </div>
);

export default VehicleList;
