import React from 'react';
import CountryList from './pages/CountryList';
import {Routes, Route, BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CountryList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
