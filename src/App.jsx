import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from "./pages/AboutPage";
import FAQ from "./pages/FAQ";
import Pricing from "./pages/Pricing";
import ContactPage from "./pages/ContactPage";
import Services from "./pages/Services";
import AdminDashboard from './components/AdminDashboard';



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-darkBg text-white font-sans selection:bg-brandBlue selection:text-white">
        
        {/* Navbar sits outside Routes so it appears on every single page */}
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio/:id" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/pricing" element={<Pricing/>} />
          <Route path="/contact-page" element={<ContactPage/>} />
          <Route path="/services" element={<Services />} />
          <Route path="/admin" element={<AdminDashboard />} />
       
        </Routes>

      </div>
    </Router>
  );
}

export default App;
