import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import LegalPage from './pages/LegalPage';
import EcommercePortfolio from './pages/EcommercePortfolio';
import BookingPortfolio from './pages/BookingPortfolio';
import DeliveryPortfolio from './pages/DeliveryPortfolio';
import WarehousePortfolio from './pages/WarehousePortfolio';
import CompanyProfilePortfolio from './pages/CompanyProfilePortfolio';
import FinancialPortfolio from './pages/FinancialPortfolio';
import { Language } from './translations';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ID');
  const location = useLocation();

  // Reset scroll on path change
  useEffect(() => {
    // Handle initial load / refresh
    if (window.performance && window.performance.navigation.type === 1) {
      window.scrollTo(0, 0);
      if (location.hash) {
        // Clear hash on refresh if on home page to avoid jumping
        if (location.pathname === '/') {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    }

    if (!location.hash) {
      window.scrollTo(0, 0);
    } else {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly to ensure content is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-blue-600/30 selection:text-white">
      <Navbar lang={lang} setLang={setLang} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/services" element={<ServicesPage lang={lang} />} />
          <Route path="/portfolio/ecommerce" element={<EcommercePortfolio lang={lang} />} />
          <Route path="/portfolio/booking" element={<BookingPortfolio lang={lang} />} />
          <Route path="/portfolio/delivery" element={<DeliveryPortfolio lang={lang} />} />
          <Route path="/portfolio/warehouse" element={<WarehousePortfolio lang={lang} />} />
          <Route path="/portfolio/company-profile" element={<CompanyProfilePortfolio lang={lang} />} />
          <Route path="/portfolio/financial" element={<FinancialPortfolio lang={lang} />} />
          <Route path="/privacy" element={<LegalPage type="privacy" lang={lang} />} />
          <Route path="/terms" element={<LegalPage type="terms" lang={lang} />} />
        </Routes>
      </main>

      <Footer lang={lang} setLang={setLang} />
      <Analytics />
    </div>
  );
};

export default App;