import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ArrowRight, 
  Truck,
  Shield,
  Gift
} from 'lucide-react';
import { formatPrice } from '@/data/products';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart, user } = useStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 50000 ? 0 : 500;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'luxury10') {
      setPromoApplied(true);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#1a1a1a] flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-[#D4AF37]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 font-['Playfair_Display']">
            Your Cart is Empty
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Discover our exquisite collection and add some luxury to your cart.
          </p>
          <Button
            onClick={() => navigate('/collections')}
            className="gold-button text-black font-semibold px-8 py-4"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <div className="section-padding">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold font-['Playfair_Display'] mb-4">
            <span className="text-white">Shopping </span>
            <span className="gold-gradient">Cart</span>
          </h1>
          <p className="text-white/60">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="luxury-card p-4 md:p-6 flex flex-col md:flex-row gap-6"
              >
                {/* Image */}
                <Link
                  to={`/product/${item.product.id}`}
                  className="w-full md:w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="text-white font-semibold text-lg hover:text-[#D4AF37] transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-white/50 text-sm mt-1 capitalize">
                      {item.product.category}
                    </p>
                    <p className="text-[#D4AF37] font-bold text-lg mt-2">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center gap-6">
                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-[#2a2a2a] text-white hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-[#2a2a2a] text-white hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Total */}
                    <div className="text-right min-w-[100px]">
                      <p className="text-white/50 text-sm">Total</p>
                      <p className="text-[#D4AF37] font-bold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-white/40 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => navigate('/collections')}
                variant="outline"
                className="border-[#2a2a2a] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Continue Shopping
              </Button>
              <Button
                onClick={clearCart}
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="luxury-card p-6">
                <h2 className="text-xl font-bold text-white mb-6 font-['Playfair_Display']">
                  Order Summary
                </h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="text-white/70 text-sm mb-2 block">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                    <Button
                      onClick={handleApplyPromo}
                      variant="outline"
                      className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                    >
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                      <Gift className="w-4 h-4" />
                      10% discount applied!
                    </p>
                  )}
                  <p className="text-white/40 text-xs mt-2">
                    Try code: LUXURY10
                  </p>
                </div>

                {/* Summary */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="h-px bg-[#2a2a2a] my-3" />
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#D4AF37]">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={() => {
                    if (!user?.id) {
                      toast.error('Please log in to proceed with checkout');
                      navigate('/login');
                      return;
                    }
                    navigate('/checkout');
                  }}
                  className="w-full py-4 gold-button text-black font-semibold text-lg rounded-lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                {/* Features */}
                <div className="mt-6 space-y-3">
                  {[
                    { icon: Truck, text: 'Free shipping on orders above ₹50,000' },
                    { icon: Shield, text: 'Secure checkout' },
                    { icon: Gift, text: 'Gift wrapping available' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-white/50 text-sm">
                      <feature.icon className="w-4 h-4 text-[#D4AF37]" />
                      {feature.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
