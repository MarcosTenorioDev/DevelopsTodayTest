import React from 'react';
import CountryList from './pages/CountryList';
import CountryDetail from './pages/CountryDetail';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound';
import notFoundImage from '@/assets/notFoundImage.jpg';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <NotFound message="Oops... The page you are looking doesn't exists" image={notFoundImage} />
            }
          />
          <Route path="/" element={<CountryList />} />
          <Route path="/countries" element={<CountryList />} />
          <Route path="/countries/:countryCode" element={<CountryDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
