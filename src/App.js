import React from 'react'
import VehicleMapConnection from './VehicleMapConnection'
import Header from './components/Header'
import "./App.css"

export default function App() {
  return (
    <div className='App'>
        <Header />
        <VehicleMapConnection />
    </div>
  )
}
