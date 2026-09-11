import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Landing
import Navbar          from './components/Navbar'
import HeroSection     from './components/HeroSection'
import TickerBanner    from './components/TickerBanner'
import TopEvents       from './components/TopEvents'
import FeaturedArtists from './components/FeaturedArtists'
import UpcomingEvents  from './components/UpcomingEvents'
import PromoSection    from './components/PromoSection'
import HowItWorks      from './components/HowItWorks'
import Footer          from './components/Footer'

// User pages
import LoginPage        from './pages/LoginPage'
import RegisterPage     from './pages/RegisterPage'
import TicketDetailPage from './pages/TicketDetailPage'
import PaymentPage      from './pages/PaymentPage'

// Admin pages
import AdminLoginPage  from './pages/admin/AdminLoginPage'
import DashboardPage   from './pages/admin/DashboardPage'
import EventsAdminPage from './pages/admin/EventsAdminPage'
import OrdersAdminPage from './pages/admin/OrdersAdminPage'
import UsersAdminPage  from './pages/admin/UsersAdminPage'

// Guard — admin only
function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('kk_user') || '{}')
  if (user.role !== 'admin') return <Navigate to="/admin" replace />
  return children
}

function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      <Navbar />
      <HeroSection />
      <TickerBanner />
      <TopEvents />
      <FeaturedArtists />
      <UpcomingEvents />
      <PromoSection />
      <HowItWorks />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"          element={<LandingPage />} />
        <Route path="/login"     element={<LoginPage />} />
        <Route path="/register"  element={<RegisterPage />} />
        <Route path="/event/:id" element={<TicketDetailPage />} />
        <Route path="/payment"   element={<PaymentPage />} />

        {/* Admin */}
        <Route path="/admin"             element={<AdminLoginPage />} />
        <Route path="/admin/dashboard"   element={<AdminRoute><DashboardPage /></AdminRoute>} />
        <Route path="/admin/events"      element={<AdminRoute><EventsAdminPage /></AdminRoute>} />
        <Route path="/admin/orders"      element={<AdminRoute><OrdersAdminPage /></AdminRoute>} />
        <Route path="/admin/users"       element={<AdminRoute><UsersAdminPage /></AdminRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
