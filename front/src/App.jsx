import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import PanierDetail from './pages/PanierDetail.jsx';
import Login from './pages/Login.jsx';
import Distributions from './pages/Distributions.jsx';
import About from './pages/About.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paniers/:id" element={<PanierDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/distributions" element={<Distributions />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <footer className="footer">
        <span><strong>Panions</strong> · association loi 1901 · récoltes en circuit court</span>
        <span>contact@panions.fr · 06 12 34 56 78</span>
      </footer>
    </BrowserRouter>
  );
}
