import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, Truck, MapPin, Clock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { supabaseService } from '@/lib/supabaseService';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/data/products';

interface TrackingEvent {
  timestamp: string;
  status: 'pending' | 'processing' | 'shipped' | 'in-transit' | 'out-for-delivery' | 'delivered' | 'cancelled';
  location: string;
  description: string;
}

const OrderTracking = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { getOrderById, user } = useStore();
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([]);
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>('');
  const [currentStatus, setCurrentStatus] = useState<TrackingEvent['status']>('pending');

  const order = orderId ? getOrderById(orderId) : null;

  useEffect(() => {
    if (order && user?.id) {
      // Fetch tracking events from Supabase
      fetchTrackingEvents();
    }
  }, [order, user?.id]);

  const fetchTrackingEvents = async () => {
    if (!orderId || !user?.id) return;
    
    try {
      const data = await supabaseService.getTrackingEvents(orderId);

      if (data && data.length > 0) {
        const events: TrackingEvent[] = data.map((event: any) => ({
          timestamp: event.timestamp,
          status: event.status,
          location: event.location,
          description: event.description,
        }));
        
        setTrackingEvents(events);
        const latestEvent = events[events.length - 1];
        setCurrentStatus(latestEvent.status);

        // Calculate estimated delivery (5-7 business days from order date)
        const orderDate = new Date(order!.orderDate);
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(deliveryDate.getDate() + 6);
        setEstimatedDelivery(deliveryDate.toLocaleDateString('en-IN'));
      } else {
        // Initialize with default pending event
        const defaultEvent: TrackingEvent = {
          timestamp: order!.orderDate,
          status: 'pending',
          location: 'Warehouse',
          description: 'Order confirmed. Preparing for shipment.',
        };
        setTrackingEvents([defaultEvent]);
        setCurrentStatus('pending');
      }
    } catch (error) {
      console.error('Error fetching tracking events:', error);
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
        <div className="section-padding">
          <div className="text-center py-20">
            <AlertCircle className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Order Not Found</h2>
            <p className="text-white/60 mb-8">We couldn't find the order you're looking for.</p>
            <Button onClick={() => navigate('/profile')} className="gold-button text-black font-semibold">
              Back to Orders
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const statusSteps = [
    { status: 'pending' as const, label: 'Order Placed', icon: Package },
    { status: 'processing' as const, label: 'Processing', icon: Clock },
    { status: 'shipped' as const, label: 'Shipped', icon: Truck },
    { status: 'out-for-delivery' as const, label: 'Out for Delivery', icon: MapPin },
    { status: 'delivered' as const, label: 'Delivered', icon: CheckCircle },
  ];

  const getStatusIndex = () => {
    const index = statusSteps.findIndex(s => s.status === currentStatus);
    return index === -1 ? 0 : index;
  };

  const progressPercentage = (getStatusIndex() / (statusSteps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <div className="section-padding">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button onClick={() => navigate('/profile')} className="text-[#D4AF37] hover:text-[#E5C048]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-['Playfair_Display']">
              Order <span className="gold-gradient">Tracking</span>
            </h1>
            <p className="text-white/60 mt-1">Order ID: {orderId}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Tracking Content */}
          <div className="lg:col-span-2">
            {/* Order Status Progress */}
            <div className="luxury-card p-8 mb-8">
              <h2 className="text-xl font-bold text-white mb-6 font-['Playfair_Display']">Delivery Status</h2>
              
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="relative h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Status Steps */}
              <div className="grid grid-cols-5 gap-2 mb-8">
                {statusSteps.map((step, index) => {
                  const isActive = index <= getStatusIndex();
                  const Icon = step.icon;
                  
                  return (
                    <div key={step.status} className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                          isActive
                            ? 'bg-[#D4AF37] text-black'
                            : 'bg-[#1a1a1a] text-white/40'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <p className={`text-xs text-center font-medium ${
                        isActive ? 'text-[#D4AF37]' : 'text-white/40'
                      }`}>
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Current Status */}
              <div className="bg-[#050505] border border-[#1a1a1a] rounded-lg p-4">
                <p className="text-white/60 text-sm mb-1">Current Status</p>
                <h3 className="text-[#D4AF37] text-lg font-semibold capitalize">
                  {currentStatus.replace('-', ' ')}
                </h3>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="luxury-card p-8">
              <h2 className="text-xl font-bold text-white mb-6 font-['Playfair_Display']">Tracking Timeline</h2>
              
              <div className="space-y-6">
                {trackingEvents.map((event, index) => {
                  const isLatest = index === trackingEvents.length - 1;
                  
                  return (
                    <div key={index} className="flex gap-4">
                      {/* Timeline dot and line */}
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          isLatest ? 'bg-[#D4AF37]' : 'bg-[#1a1a1a]'
                        }`} />
                        {!isLatest && (
                          <div className="w-1 h-16 bg-[#1a1a1a] mt-2" />
                        )}
                      </div>
                      
                      {/* Event content */}
                      <div className="pb-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-[#D4AF37] font-semibold capitalize">
                              {event.status.replace('-', ' ')}
                            </h4>
                            <p className="text-white/60 text-sm">{event.location}</p>
                          </div>
                          <span className="text-white/40 text-sm">
                            {new Date(event.timestamp).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm">{event.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Estimated Delivery */}
              <div className="luxury-card p-6 mb-6">
                <h3 className="text-lg font-bold text-white mb-4 font-['Playfair_Display']">
                  Estimated Delivery
                </h3>
                <div className="bg-[#050505] rounded-lg p-4 border border-[#1a1a1a]">
                  <p className="text-white/60 text-sm mb-1">Expected Date</p>
                  <p className="text-[#D4AF37] text-lg font-bold">{estimatedDelivery}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="luxury-card p-6 mb-6">
                <h3 className="text-lg font-bold text-white mb-4 font-['Playfair_Display']">
                  Items ({order.items.length})
                </h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-white/50 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-[#D4AF37] font-semibold text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="luxury-card p-6">
                <h3 className="text-lg font-bold text-white mb-4 font-['Playfair_Display']">
                  Shipping Address
                </h3>
                <div className="text-white/70 text-sm space-y-1">
                  <p className="font-medium text-white">{order.address.name}</p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city}, {order.address.state} {order.address.pincode}</p>
                  <p className="text-white/50">{order.address.phone}</p>
                </div>
              </div>

              {/* Order Total */}
              <div className="luxury-card p-6 mt-6">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#1a1a1a]">
                  <span className="text-white/60">Order Total</span>
                  <span className="text-[#D4AF37] font-bold text-lg">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Status</span>
                  <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase rounded">
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
