import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  Check, 
  ChevronRight,
  Lock,
  QrCode,
  Smartphone
} from 'lucide-react';
import { formatPrice } from '@/data/products';
import { indianStates, indianCitiesByState } from '@/data/indianLocations';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, addOrder, getDefaultAddress, addresses, addAddress, clearCart } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    isDefault: false
  });

  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    getDefaultAddress()?.id || null
  );
  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = getCartTotal();
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.street && newAddress.city && newAddress.pincode) {
      addAddress(newAddress);
      setNewAddress({
        name: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        isDefault: false
      });
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const address = addresses.find(a => a.id === selectedAddress) || getDefaultAddress();
      if (!address) return;

      const orderId = addOrder({
        userId: '1',
        items: cart,
        totalAmount: total,
        status: 'pending',
        address,
        paymentMethod
      });

      setPaymentSuccess(true);
      setIsProcessing(false);
      
      // Clear cart after successful payment
      setTimeout(() => {
        clearCart();
        navigate(`/order-confirmation/${orderId}`);
      }, 2000);
    }, 2000);
  };

  const steps = [
    { number: 1, title: 'Shipping', icon: MapPin },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Review', icon: Check }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <div className="section-padding">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold font-['Playfair_Display'] mb-4">
            <span className="text-white">Secure </span>
            <span className="gold-gradient">Checkout</span>
          </h1>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex flex-col items-center ${
                currentStep >= step.number ? 'text-[#D4AF37]' : 'text-white/40'
              }`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  currentStep >= step.number
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                    : 'border-white/20'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-sm mt-2">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 md:w-24 h-px mx-2 md:mx-4 ${
                  currentStep > step.number ? 'bg-[#D4AF37]' : 'bg-white/20'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <div className="luxury-card p-6">
                <h2 className="text-xl font-bold text-white mb-6 font-['Playfair_Display']">
                  Select Shipping Address
                </h2>

                {/* Existing Addresses */}
                {addresses.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {addresses.map((address) => (
                      <label
                        key={address.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedAddress === address.id
                            ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                            : 'border-[#2a2a2a] hover:border-[#D4AF37]/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          value={address.id}
                          checked={selectedAddress === address.id}
                          onChange={() => setSelectedAddress(address.id)}
                          className="sr-only"
                        />
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-semibold">{address.name}</p>
                            <p className="text-white/60 text-sm">{address.street}</p>
                            <p className="text-white/60 text-sm">
                              {address.city}, {address.state} {address.pincode}
                            </p>
                            <p className="text-white/60 text-sm">{address.phone}</p>
                            {address.isDefault && (
                              <span className="inline-block mt-2 px-2 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs rounded">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                {/* Add New Address */}
                <div className="border-t border-[#2a2a2a] pt-6">
                  <h3 className="text-white font-semibold mb-4">Add New Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                      className="px-4 py-3 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="px-4 py-3 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                      className="md:col-span-2 px-4 py-3 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                    />
                    <select
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value, city: '' })}
                      className="px-4 py-3 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="">Select State</option>
                      {indianStates.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <select
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      disabled={!newAddress.state}
                      className="px-4 py-3 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select City</option>
                      {newAddress.state && indianCitiesByState[newAddress.state]?.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="PIN Code"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      className="px-4 py-3 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                    />
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newAddress.isDefault}
                        onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                        className="w-4 h-4 accent-[#D4AF37]"
                      />
                      <span className="text-white/60 text-sm">Set as default address</span>
                    </label>
                  </div>
                  <Button
                    onClick={handleAddAddress}
                    variant="outline"
                    className="mt-4 border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                  >
                    Add Address
                  </Button>
                </div>

                <div className="flex justify-end mt-6">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!selectedAddress}
                    className="gold-button text-black font-semibold px-8"
                  >
                    Continue to Payment
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="luxury-card p-6">
                <h2 className="text-xl font-bold text-white mb-6 font-['Playfair_Display']">
                  Select Payment Method
                </h2>

                <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                  <TabsList className="w-full bg-[#050505] border border-[#2a2a2a] p-1 grid grid-cols-3">
                    <TabsTrigger 
                      value="card" 
                      className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Card
                    </TabsTrigger>
                    <TabsTrigger 
                      value="upi"
                      className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      UPI/QR
                    </TabsTrigger>
                    <TabsTrigger 
                      value="cod"
                      className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
                    >
                      <Truck className="w-4 h-4 mr-2" />
                      COD
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="mt-6">
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full px-4 py-3 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="px-4 py-3 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="px-4 py-3 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        className="w-full px-4 py-3 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="upi" className="mt-6">
                    <div className="text-center">
                      <div className="bg-white rounded-lg p-6 inline-block">
                        <img
                          src="/images/qr-payment.jpg"
                          alt="UPI QR Code"
                          className="w-64 h-auto mx-auto"
                        />
                      </div>
                      <div className="mt-4 space-y-2">
                        <p className="text-white font-semibold">Scan to Pay</p>
                        <p className="text-white/60 text-sm">UPI ID: vaidehispatil1306@oksbi</p>
                        <p className="text-white/40 text-xs">Scan with any UPI app - GPay, PhonePe, Paytm</p>
                      </div>
                      <div className="mt-4 flex items-center justify-center gap-2 text-[#D4AF37]">
                        <Smartphone className="w-5 h-5" />
                        <span className="text-sm">Or pay using any UPI app</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="cod" className="mt-6">
                    <div className="p-4 bg-[#050505] rounded-lg border border-[#2a2a2a]">
                      <p className="text-white/60">
                        Cash on Delivery is available for orders below ₹1,00,000.
                        A convenience fee of ₹100 will be charged.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between mt-6">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    variant="outline"
                    className="border-[#2a2a2a] text-white hover:border-[#D4AF37]"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    className="gold-button text-black font-semibold px-8"
                  >
                    Review Order
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="luxury-card p-6">
                <h2 className="text-xl font-bold text-white mb-6 font-['Playfair_Display']">
                  Review Your Order
                </h2>

                {/* Payment Success Message */}
                {paymentSuccess && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Check className="w-6 h-6 text-green-400" />
                      <div>
                        <p className="text-green-400 font-semibold">Payment Successful!</p>
                        <p className="text-white/60 text-sm">Redirecting to order confirmation...</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
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

                {/* Shipping Address */}
                <div className="p-4 bg-[#050505] rounded-lg border border-[#2a2a2a] mb-6">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#D4AF37]" />
                    Shipping To
                  </h4>
                  {(() => {
                    const addr = addresses.find(a => a.id === selectedAddress);
                    return addr ? (
                      <div className="text-white/60 text-sm">
                        <p className="font-medium text-white">{addr.name}</p>
                        <p>{addr.street}</p>
                        <p>{addr.city}, {addr.state} {addr.pincode}</p>
                        <p>{addr.phone}</p>
                      </div>
                    ) : null;
                  })()}
                </div>

                {/* Payment Method */}
                <div className="p-4 bg-[#050505] rounded-lg border border-[#2a2a2a] mb-6">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                    Payment Method
                  </h4>
                  <p className="text-white/60 text-sm capitalize">
                    {paymentMethod === 'card' ? 'Credit/Debit Card' : 
                     paymentMethod === 'upi' ? 'UPI QR Payment' : 'Cash on Delivery'}
                  </p>
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    variant="outline"
                    className="border-[#2a2a2a] text-white hover:border-[#D4AF37]"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing || paymentSuccess}
                    className="gold-button text-black font-semibold px-8"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Place Order
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="luxury-card p-6">
                <h3 className="text-lg font-bold text-white mb-4 font-['Playfair_Display']">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-white/60">
                        {item.product.name} x {item.quantity}
                      </span>
                      <span className="text-white">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-[#2a2a2a] my-4" />

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                </div>

                <div className="h-px bg-[#2a2a2a] my-4" />

                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span className="text-[#D4AF37]">{formatPrice(total)}</span>
                </div>

                <div className="mt-6 flex items-center gap-2 text-white/40 text-sm">
                  <Lock className="w-4 h-4" />
                  Secure SSL Encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
