import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider } from './context/AuthContext';
import { NavbarProvider } from './context/NavbarContext';
import RequireAuth from './components/RequireAuth';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import LandingPage from './landingPage/LandingPage';
import CustomerLogin from './pages/CustomerLogin';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Order from './pages/Order';
import Orders from './pages/Orders';
import Contact from './pages/Contact';
import Settings from './pages/Settings';

export default function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <NavbarProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<CustomerLogin />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected dashboard area mounted at /home */}
              <Route
                path="/home/*"
                element={
                  <RequireAuth>
                    <Navbar />
                    <MainContent>
                      <main className="flex-1">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="services" element={<Services />} />
                          <Route path="services/:id" element={<ServiceDetails />} />
                          <Route path="order" element={<Order />} />
                          <Route path="orders" element={<Orders />} />
                          <Route path="contact" element={<Contact />} />
                          <Route path="settings" element={<Settings />} />
                        </Routes>
                      </main>
                      <Footer />
                    </MainContent>
                  </RequireAuth>
                }
              />

              {/* Alternate protected routes for direct paths (optional) */}
              <Route
                path="/services/*"
                element={
                  <RequireAuth>
                    <Navbar />
                    <MainContent>
                      <main className="flex-1">
                        <Routes>
                          <Route path="/" element={<Services />} />
                          <Route path=":id" element={<ServiceDetails />} />
                        </Routes>
                      </main>
                      <Footer />
                    </MainContent>
                  </RequireAuth>
                }
              />

              <Route
                path="/order"
                element={
                  <RequireAuth>
                    <Navbar />
                    <MainContent>
                      <main className="flex-1">
                        <Order />
                      </main>
                      <Footer />
                    </MainContent>
                  </RequireAuth>
                }
              />

              <Route
                path="/orders"
                element={
                  <RequireAuth>
                    <Navbar />
                    <MainContent>
                      <main className="flex-1">
                        <Orders />
                      </main>
                      <Footer />
                    </MainContent>
                  </RequireAuth>
                }
              />

              <Route
                path="/contact"
                element={
                  <RequireAuth>
                    <Navbar />
                    <MainContent>
                      <main className="flex-1">
                        <Contact />
                      </main>
                      <Footer />
                    </MainContent>
                  </RequireAuth>
                }
              />
            </Routes>
          </BrowserRouter>
        </NavbarProvider>
      </OrderProvider>
    </AuthProvider>
  );
}
