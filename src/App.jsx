import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './landingPage/LandingPage';
import Login from './pages/Login';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Order from './pages/Order';
import Orders from './pages/Orders';
import Contact from './pages/Contact';

export default function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing Page - First route (public) */}
            <Route path="/" element={<LandingPage />} />

            {/* Login Page (public) */}
            <Route path="/login" element={<Login />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <div className="full-bleed min-h-screen flex flex-col bg-gray-50">
                    <Navbar />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/services/:id" element={<ServiceDetails />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/contact" element={<Contact />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                </RequireAuth>
              }
            />
            <Route
              path="/services/*"
              element={
                <RequireAuth>
                  <div className="full-bleed min-h-screen flex flex-col bg-gray-50">
                    <Navbar />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<Services />} />
                        <Route path="/:id" element={<ServiceDetails />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                </RequireAuth>
              }
            />
            <Route
              path="/order"
              element={
                <RequireAuth>
                  <div className="full-bleed min-h-screen flex flex-col bg-gray-50">
                    <Navbar />
                    <main className="flex-1">
                      <Order />
                    </main>
                    <Footer />
                  </div>
                </RequireAuth>
              }
            />
            <Route
              path="/orders"
              element={
                <RequireAuth>
                  <div className="full-bleed min-h-screen flex flex-col bg-gray-50">
                    <Navbar />
                    <main className="flex-1">
                      <Orders />
                    </main>
                    <Footer />
                  </div>
                </RequireAuth>
              }
            />
            <Route
              path="/contact"
              element={
                <RequireAuth>
                  <div className="full-bleed min-h-screen flex flex-col bg-gray-50">
                    <Navbar />
                    <main className="flex-1">
                      <Contact />
                    </main>
                    <Footer />
                  </div>
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </OrderProvider>
    </AuthProvider>
  );
}
