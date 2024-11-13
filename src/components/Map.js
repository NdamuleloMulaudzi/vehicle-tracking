
import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

const Map = ({ center, zoom, vehicles }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleMarkerClick = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <GoogleMap
      center={center}
      zoom={zoom}
      mapContainerStyle={{
        width: "100%",
        height: "100vh",
        position: "absolute", 
        top: 0,
        left: 0,
        zIndex: 1,
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
              Last Updated:{" "}
              {new Date(selectedVehicle.timestamp).toLocaleString()}
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;
