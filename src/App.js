import './App.css';
import Map from './components/Map';
import VehicleList from './pages/VehicleList';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

function App() {
  return (
    <div className="App">
    <Router>
    <Routes>
     <Route path="" element={<VehicleList />} />
      <Route path="/map" element={<Map />} />
    </Routes>
   </Router>
    </div>
  );
}

export default App;
