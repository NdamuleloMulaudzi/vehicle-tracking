/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, Polyline } from "@react-google-maps/api";
import "../App.css"

const Map = ({ center, zoom, vehicles, historicalRoute = [] }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [directions, setDirections] = useState(null);

  // Function to generate history route 
  const generateRoute = async () => {
    if (historicalRoute.length < 2) return; 

    const directionsService = new window.google.maps.DirectionsService();
    const waypoints = historicalRoute.slice(1, historicalRoute.length - 1).map(location => ({
      location: new window.google.maps.LatLng(location.lat, location.lng),
      stopover: false,
    }));

    const request = {
      origin: new window.google.maps.LatLng(historicalRoute[0].lat, historicalRoute[0].lng),
      destination: new window.google.maps.LatLng(historicalRoute[historicalRoute.length - 1].lat, historicalRoute[historicalRoute.length - 1].lng),
      waypoints: waypoints,
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.METRIC,
    };

    try {
      const result = await directionsService.route(request);
      setDirections(result);
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  useEffect(() => {
    if (historicalRoute.length > 1) {
      generateRoute(); 
    }
  }, [historicalRoute]);

  // Handler for when a marker is clicked
  const handleMarkerClick = (vehicle) => {
    setSelectedVehicle(vehicle);
  };
  
  return (
    <GoogleMap
      center={center}
      zoom={zoom}
      mapContainerStyle={{
        width: "100vw",
        height: "86%",
        position: "absolute",
        background:'red',
        top: 0,
        left: 0,
      }}
    >
      {vehicles.map((vehicle) => (
        <Marker
          key={vehicle.id}
          position={{ 
            lat: vehicle.historicalRoute[vehicle.historicalRoute.length - 1].lat, 
            lng: vehicle.historicalRoute[vehicle.historicalRoute.length - 1].lng 
          }}
          onClick={() => handleMarkerClick(vehicle)} // Set vehicle on marker click
        />
      ))}

      {/* Render InfoWindow for the selected vehicle on marker click */}
      {selectedVehicle && (
        <InfoWindow
          position={{
            lat: selectedVehicle.historicalRoute[selectedVehicle.historicalRoute.length - 1].lat,
            lng: selectedVehicle.historicalRoute[selectedVehicle.historicalRoute.length - 1].lng,
          }}
          onCloseClick={() => setSelectedVehicle(null)}
        >
          <div>
            <h5>Vehicle {selectedVehicle.id}</h5>
            <p>Lat: {selectedVehicle.historicalRoute[selectedVehicle.historicalRoute.length - 1].lat}</p>
            <p>Lng: {selectedVehicle.historicalRoute[selectedVehicle.historicalRoute.length - 1].lng}</p>
            <p>
              Last Updated: {new Date().toLocaleString()}
            </p>
          </div>
        </InfoWindow>
      )}

      {/* Render the historical route if directions are available */}
      {directions && (
        <Polyline
          path={directions.routes[0].overview_path}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 4,
            geodesic: true,
          }}
        />
      )}
    </GoogleMap>
  );
};

export default Map;
