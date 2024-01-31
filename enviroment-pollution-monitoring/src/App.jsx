import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import DataInfo from './components/DataInfo.jsx';
import Alert from './components/Alert.jsx';
import StopAlert from './components/StopAlert.jsx';
import AirSearch from './components/AirSearch.jsx';
import WaterSearch from './components/WaterSearch.jsx';
import SoilSearch from './components/SoilSearch.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-explained" element={<DataInfo />} />
        <Route path="/alert" element={<Alert />} />
        <Route path="/alert-stop" element={<StopAlert />} />
        <Route path="/search-air" element={<AirSearch/>} />
        <Route path="/search-water" element={<WaterSearch />} />
        <Route path="/search-soil" element={<SoilSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
