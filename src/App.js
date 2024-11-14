import React from 'react'
import VehicleMapConnection from './VehicleMapConnection'
import Header from './components/Header'
import "./App.css"
// import lee from 'dotenv'


export default function App() {
  return (
    <div className='app'>
        <Header />
        <VehicleMapConnection />
    </div>
  )
}
