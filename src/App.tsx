import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Hampers from '@/pages/Hampers';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import OrderTracking from '@/pages/OrderTracking';
import Wishlist from '@/pages/Wishlist';
import Profile from '@/pages/Profile';
import AdminDashboard from '@/pages/AdminDashboard';
import Careers from '@/pages/Careers';
import Press from '@/pages/Press';
import FAQs from '@/pages/FAQs';
import Shipping from '@/pages/Shipping';
import Returns from '@/pages/Returns';
import SizeGuide from '@/pages/SizeGuide';
import CareGuide from '@/pages/CareGuide';
import Necklaces from '@/pages/Necklaces';
import Earrings from '@/pages/Earrings';
import Rings from '@/pages/Rings';
import Bracelets from '@/pages/Bracelets';
import BridalSets from '@/pages/BridalSets';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/hampers" element={<Hampers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
          <Route path="/track-order/:orderId" element={<OrderTracking />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Company Pages */}
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<Press />} />
          {/* Support Pages */}
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/care-guide" element={<CareGuide />} />
          {/* Category Pages */}
          <Route path="/necklaces" element={<Necklaces />} />
          <Route path="/earrings" element={<Earrings />} />
          <Route path="/rings" element={<Rings />} />
          <Route path="/bracelets" element={<Bracelets />} />
          <Route path="/bridal-sets" element={<BridalSets />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
