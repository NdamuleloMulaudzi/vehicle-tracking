

# **Vehicle Tracking Dashboar**

A web application for visualizing vehicle locations on a map, with real-time updates and historical route tracking. The app uses Google Maps to display vehicle markers and routes and periodically fetches vehicle data to maintain up-to-date information.

## **Features**
- **Display vehicle markers** on a Google Map.
- **View historical routes** of selected vehicles.
- **Auto-refresh data** every 30 seconds.
- **Sidebar** with a searchable list of vehicles.
- **Mobile-responsive** layout.

## **Getting Started**

### **Prerequisites**
- **Node.js**: Ensure Node.js (version 14 or above) is installed.
- **Google Maps API Key**: Obtain a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/).

### **Installation**
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/VehicleMapConnection.git
   cd VehicleMapConnection
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your environment variables:**
   - Create a `.env` file in the project root and add your Google Maps API key:
     ```plaintext
     REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
     ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Access the app** in your browser at `http://localhost:3000`.

## **Configuration**

### **Google Maps API Key**
Ensure the API key in `.env` has access to **Maps JavaScript API** and **Directions API** for map and route rendering.

### **Auto-Refresh**
- Vehicle data refreshes every **30 seconds** to show the latest locations.
- The auto-refresh is configured within the `fetchVehicles` function in `VehicleMapConnection.js`:
  ```javascript
  useEffect(() => {
    const interval = setInterval(fetchVehicles, 30000);
    return () => clearInterval(interval);
  }, []);
  ```

### **Error Handling**
Error handling is implemented for network requests:
- **Vehicle Data Fetching**: A `try...catch` block is used in `fetchVehicles` to log errors when fetching vehicle data fails. Update it to display an error message if needed:
  ```javascript
  const fetchVehicles = async () => {
    try {
      const response = await fetch("https://mockapi.io/vehicles");
      const data = await response.json();
      setVehicles(data);
      setFilteredVehicles(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch vehicle data. Please try again later.");
    }
  };
  ```
- **Google Maps Directions**: In `Map.js`, a `try...catch` block captures errors when fetching route directions:
  ```javascript
  try {
    const result = await directionsService.route(request);
    setDirections(result);
  } catch (error) {
    console.error("Error fetching directions:", error);
  }
  ```

## **Usage**

- **Click on a vehicle marker** to view its information and historical route.
- **Use the sidebar** to search for specific vehicles or filter by location.
- **On mobile screens**, use the toggle button to open and close the sidebar.

---

### **Additional Notes**
- **Custom Refresh Intervals**: Modify the interval duration in `fetchVehicles`.
- **Map Display Adjustments**: Edit settings in `Map.js` to fit your screen and UX needs.
- **API Key Security**: For production, secure the API key with restrictions and tailor error messages for end-users.

---

This README provides setup and configuration guidance with insights into key aspects of the app, including the refresh mechanism and error handling. 

