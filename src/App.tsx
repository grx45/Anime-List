import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'

import Home from './pages/home/Home';
import NotFound from './pages/notfound/NotFound';
import MediaPage from './pages/mediapage/MediaPage';
import Navbar from './components/navbar/Navbar'


function App() {


  return (
    <>
      <Navbar />
      <div className="container">

        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mediapage/:title" element={<MediaPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
