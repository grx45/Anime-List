import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'

import Home from './pages/home/Home';
import NotFound from './pages/notfound/NotFound';
import MediaPage from './pages/mediapage/MediaPage';


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mediapage/:title" element={<MediaPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
