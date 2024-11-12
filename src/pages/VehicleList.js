import React, { useEffect, useState } from 'react';
import "../styles/VehicleList.css"

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("https://6731c2a97aaf2a9aff11ea28.mockapi.io/api/v1/vehicles");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Vehicle List</h1>
      <div className='vehicle-list'>
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className='vehicle-container'>
            <h2>{vehicle.vehicleId}</h2>
            <p>Longitude: {vehicle.longitude}</p>
            <p>Latitude: {vehicle.latitude}</p>
            <p>Time Stamp: {vehicle.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VehicleList;
