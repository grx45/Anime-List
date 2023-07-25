import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'

import Home from './pages/home/Home';
import NotFound from './pages/notfound/NotFound';
import InfoPage from './pages/infopage/InfoPage';
import Navbar from './components/navbar/Navbar'


function App() {


  return (
    <>
      <Navbar />
      <div className="container">

        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/info/:title" element={<InfoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
