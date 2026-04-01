import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Check, Package, Truck, Calendar, Download, Share2, Home, MapPin, Clock } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatPrice } from '@/data/products';
import { Button } from '@/components/ui/button';

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById } = useStore();
  const order = getOrderById(id || '');
  const [currentStatus, setCurrentStatus] = useState(0);

  useEffect(() => {
    // Celebration animation
    const ctx = gsap.context(() => {
      gsap.fromTo('.check-icon',
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' }
      );
      gsap.fromTo('.order-details',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  // Simulate real-time tracking updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus((prev) => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 5000); // Update every 5 seconds for demo

    return () => clearInterval(interval);
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Order Not Found</h2>
          <Link to="/orders">
            <Button className="gold-button text-black">View My Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  const trackingSteps = [
    { icon: Check, label: 'Order Placed', date: new Date(order.orderDate).toLocaleDateString(), completed: true },
    { icon: Package, label: 'Processing', date: 'In Progress', completed: currentStatus >= 1 },
    { icon: Truck, label: 'Shipped', date: currentStatus >= 2 ? 'Today' : 'Pending', completed: currentStatus >= 2 },
    { icon: Calendar, label: 'Delivered', date: estimatedDelivery.toLocaleDateString(), completed: currentStatus >= 3 }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <div className="section-padding max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="check-icon w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
            <Check className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Playfair_Display']">
            Order Confirmed!
          </h1>
          <p className="text-white/60 text-lg">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>

        {/* Order Details */}
        <div className="order-details luxury-card p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-8 border-b border-[#2a2a2a]">
            <div>
              <p className="text-white/50 text-sm mb-1">Order Number</p>
              <p className="text-2xl font-bold text-[#D4AF37]">{order.id}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-[#2a2a2a] text-white hover:border-[#D4AF37]">
                <Download className="w-4 h-4 mr-2" />
                Invoice
              </Button>
              <Button variant="outline" className="border-[#2a2a2a] text-white hover:border-[#D4AF37]">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Real-time Tracking */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#D4AF37]" />
                Real-time Tracking
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm">Live</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trackingSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`text-center p-4 rounded-lg border transition-all ${
                    step.completed 
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10' 
                      : 'border-[#2a2a2a] text-white/40'
                  }`}
                >
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-[#D4AF37]' : 'bg-[#1a1a1a]'
                  }`}>
                    <step.icon className={`w-5 h-5 ${step.completed ? 'text-black' : ''}`} />
                  </div>
                  <p className={`font-medium text-sm ${step.completed ? 'text-white' : ''}`}>{step.label}</p>
                  <p className="text-xs opacity-70">{step.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="p-4 bg-[#050505] rounded-lg border border-[#2a2a2a] mb-6">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              Delivery Address
            </h4>
            <div className="text-white/60 text-sm">
              <p className="font-medium text-white">{order.address.name}</p>
              <p>{order.address.street}</p>
              <p>{order.address.city}, {order.address.state} {order.address.pincode}</p>
              <p>{order.address.phone}</p>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="p-4 bg-[#050505] rounded-lg border border-[#2a2a2a] mb-6">
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              Estimated Delivery
            </h4>
            <p className="text-white/60 text-sm">
              {estimatedDelivery.toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 bg-[#050505] rounded-lg">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{item.product.name}</h4>
                    <p className="text-white/50 text-sm">Qty: {item.quantity}</p>
                    <p className="text-[#D4AF37] font-semibold">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="pt-8 border-t border-[#2a2a2a]">
            <div className="flex justify-between items-center">
              <span className="text-white/60">Order Total</span>
              <span className="text-2xl font-bold text-[#D4AF37]">
                {formatPrice(order.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/collections">
            <Button className="gold-button text-black font-semibold px-8 py-4">
              Continue Shopping
            </Button>
          </Link>
          <Link to="/orders">
            <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-8 py-4">
              <Package className="w-5 h-5 mr-2" />
              Track Order
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="border-[#2a2a2a] text-white hover:border-[#D4AF37]">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Support */}
        <div className="mt-12 text-center">
          <p className="text-white/60">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@luxejewels.com" className="text-[#D4AF37] hover:underline">
              support@luxejewels.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
