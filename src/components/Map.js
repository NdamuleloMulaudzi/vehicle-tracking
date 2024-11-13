import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, Polyline } from "@react-google-maps/api";

const Map = ({ center, zoom, vehicles, historicalRoute = [] }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [directions, setDirections] = useState(null);
  
  // Function to generate route using Google Maps Directions API
  const generateRoute = async () => {
    if (historicalRoute.length < 2) return; // Ensure we have at least two waypoints to generate a route
    
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
      setDirections(result);  // Store the route in state
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  useEffect(() => {
    if (historicalRoute.length > 1) {
      generateRoute();  // Generate the route when the historical route is updated
    }
  }, [historicalRoute]);

  const handleMarkerClick = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <GoogleMap
      center={center}
      zoom={zoom}
      mapContainerStyle={{
        width: "100vw",
        height: "85%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      {vehicles.map((vehicle) => (
        <Marker
          key={vehicle.id}
          position={{ lat: vehicle.latitude, lng: vehicle.longitude }}
          onClick={() => handleMarkerClick(vehicle)}
        />
      ))}

      {selectedVehicle && (
        <InfoWindow
          position={{
            lat: selectedVehicle.latitude,
            lng: selectedVehicle.longitude,
          }}
          onCloseClick={() => setSelectedVehicle(null)}
        >
          <div>
            <h5>Vehicle {selectedVehicle.id}</h5>
            <p>Lat: {selectedVehicle.latitude}</p>
            <p>Lng: {selectedVehicle.longitude}</p>
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
