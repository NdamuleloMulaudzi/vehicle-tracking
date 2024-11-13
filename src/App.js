// App.js
import React, { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import VehicleList from "./components/VehicleList";
import Map from "./components/Map";
import VehicleFilter from "./helpers/VehicleFilter";
import "./App.css";
import Header from "./components/Header";

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
  });

  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(2);

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

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="container-fluid vh-100 d-flex position-relative">
      <Header />
      <div className="row flex-grow-1">
        <div className="col-md-3 p-3 vehicle-list-container">
          <VehicleFilter
            vehicles={vehicles}
            setFilteredVehicles={setFilteredVehicles}
          />
          <VehicleList
            vehicles={filteredVehicles}
            setCenter={setCenter}
            setZoom={setZoom}
          />
        </div>
        <div className="col-md-9 p-0">
          <Map center={center} zoom={zoom} vehicles={filteredVehicles} />
        </div>
      </div>
    </div>
  );
};

export default App;
