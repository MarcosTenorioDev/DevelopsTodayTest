import React from 'react';
import CountryList from './pages/CountryList';
import CountryDetail from './pages/CountryDetail';
import {Routes, Route, BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/countries" element={<CountryList />} />
          <Route path="/countries/:countryCode" element={<CountryDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
