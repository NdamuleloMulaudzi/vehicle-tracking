import React, { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import VehicleList from "./components/VehicleList";
import Map from "./components/Map";
import VehicleFilter from "./helpers/VehicleFilter";
import { FaTruckMoving } from "react-icons/fa6";

import "./App.css";

 const VehicleMapConnection = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [historicalRoute, setHistoricalRoute] = useState([]);
  const [zoom, setZoom] = useState(2);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(
          "https://6731c2a97aaf2a9aff11ea28.mockapi.io/api/v1/vehicles"
        );
        const data = await response.json();
        setVehicles(data);
        setFilteredVehicles(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVehicles();
    const interval = setInterval(fetchVehicles, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) return (
    <div className="loading">
      <div className="spinner"></div>
    </div>
  );
  

  
  const handleVehicleClick = async (vehicle) => {
    setCenter({ lat: vehicle.historicalRoute[vehicle.historicalRoute.length - 1].lat, lng: vehicle.historicalRoute[vehicle.historicalRoute.length - 1].lng});
    setZoom(14);
    setSidebarOpen(false); 

    const response = await fetch(`https://6731c2a97aaf2a9aff11ea28.mockapi.io/api/v1/vehicles/${vehicle.id}`);
  const data = await response.json();
  
  // Set historical route to state
  setHistoricalRoute(data.historicalRoute);
  
  };

  

  return (
    <div className="container-fluid vh-100 d-flex position-relative">
       
      <div className="vehicle-map-container row flex-grow-1">
        <div className={`col-md-3 p-3 vehicle-list-container sidebar ${sidebarOpen ? "open" : ""}`}>
          <VehicleFilter
            vehicles={vehicles}
            setFilteredVehicles={setFilteredVehicles}
          />
          <VehicleList
            vehicles={filteredVehicles}
            setCenter={setCenter}
            setZoom={setZoom}
            onVehicleClick={handleVehicleClick}
          />
        </div>
        <div className="">
          <Map center={center} zoom={zoom} vehicles={filteredVehicles}  historicalRoute={historicalRoute} />
        </div>
      </div>
      <div className="icon-bg" onClick={() => setSidebarOpen(!sidebarOpen)}>
      <FaTruckMoving
          className="car-icon sidebar-toggle"
        size={20}/>
      </div>
    </div>
  );
};

export default VehicleMapConnection;