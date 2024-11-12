import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCpBt_DnZt5j-MkM_efrPOD8yKro40jPLg',
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = parseFloat(queryParams.get("lat"));
  const lng = parseFloat(queryParams.get("lng"));

  const mapCenter = {
    lat: isNaN(lat) ? 0 : lat,
    lng: isNaN(lng) ? 0 : lng,
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={mapCenter}
      zoom={8}
    >
      <Marker position={mapCenter} />
    </GoogleMap>
  );
}

export default Map;
