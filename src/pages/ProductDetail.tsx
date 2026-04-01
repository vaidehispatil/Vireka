import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { gsap } from 'gsap';
import { 
  Heart, 
  ShoppingBag, 
  Share2, 
  Truck, 
  Shield, 
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Check
} from 'lucide-react';
import { getProductById, products, formatPrice } from '@/data/products';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, user } = useStore();
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!product) return;

    // Reset scroll and quantity
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQuantity(1);
    setSelectedImage(0);

    // GSAP animations
    const ctx = gsap.context(() => {
      gsap.fromTo('.product-image-container',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo('.product-info',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/collections')} className="gold-button">
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20" ref={contentRef}>
      <div className="section-padding">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-[#D4AF37] transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/collections?category=${product.category}`} className="hover:text-[#D4AF37] transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="product-image-container">
            {/* Main Image */}
            <div
              ref={imageRef}
              className="relative aspect-square rounded-lg overflow-hidden bg-[#050505] border border-[#1a1a1a] mb-4 cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                style={isZoomed ? {
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                } : {}}
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 bg-[#D4AF37] text-black text-sm font-bold uppercase">
                    New
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold uppercase">
                    Sale
                  </span>
                )}
              </div>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(prev => (prev + 1) % product.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-[#D4AF37]'
                        : 'border-transparent hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="mb-6">
              <p className="text-[#D4AF37] text-sm uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white font-['Playfair_Display'] mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-[#D4AF37]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-white/40 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-sm rounded">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-white/70 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-white text-sm uppercase tracking-wider mb-3 block">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-[#2a2a2a] text-white hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-white text-lg font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-lg border border-[#2a2a2a] text-white hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-white/50 text-sm ml-4">
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-6 gold-button text-black font-semibold text-lg rounded-lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={() => {
                  if (isInWishlist(product.id)) {
                    removeFromWishlist(product.id);
                    toast.success('Removed from wishlist');
                  } else {
                    if (!user?.id) {
                      toast.error('Please log in to add items to your wishlist');
                      navigate('/login');
                      return;
                    }
                    if (addToWishlist(product)) {
                      toast.success('Added to wishlist!');
                    }
                  }
                }}
                variant="outline"
                className={`py-6 px-8 border-2 font-semibold text-lg rounded-lg transition-all ${
                  isInWishlist(product.id)
                    ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                    : 'border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'
                }`}
              >
                <Heart className={`w-5 h-5 mr-2 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
              </Button>
              <Button
                variant="outline"
                className="py-6 px-4 border-[#2a2a2a] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: Truck, text: 'Free Shipping' },
                { icon: Shield, text: '2 Year Warranty' },
                { icon: RefreshCw, text: '30 Day Returns' }
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4 bg-[#050505] rounded-lg border border-[#1a1a1a]">
                  <feature.icon className="w-6 h-6 text-[#D4AF37] mb-2" />
                  <span className="text-white/70 text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="w-full bg-[#050505] border border-[#1a1a1a] p-1">
                <TabsTrigger 
                  value="specifications" 
                  className="flex-1 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger 
                  value="shipping"
                  className="flex-1 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
                >
                  Shipping
                </TabsTrigger>
                <TabsTrigger 
                  value="returns"
                  className="flex-1 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
                >
                  Returns
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="specifications" className="mt-4">
                <div className="bg-[#050505] rounded-lg border border-[#1a1a1a] p-6">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key} className="border-b border-[#1a1a1a] last:border-0">
                          <td className="py-3 text-white/60 text-sm">{key}</td>
                          <td className="py-3 text-white text-sm text-right">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="mt-4">
                <div className="bg-[#050505] rounded-lg border border-[#1a1a1a] p-6">
                  <ul className="space-y-3">
                    {[
                      'Free express shipping on orders above ₹50,000',
                      'Orders typically ship within 2-3 business days',
                      'Fully insured shipping with tracking',
                      'Signature required upon delivery'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/70">
                        <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="returns" className="mt-4">
                <div className="bg-[#050505] rounded-lg border border-[#1a1a1a] p-6">
                  <ul className="space-y-3">
                    {[
                      '30-day return policy for unused items',
                      'Items must be in original packaging',
                      'Free return shipping on defective items',
                      'Refunds processed within 5-7 business days'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/70">
                        <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white font-['Playfair_Display'] mb-8">
              You May Also <span className="gold-gradient">Like</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  to={`/product/${related.id}`}
                  className="group luxury-card overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={related.images[0]}
                      alt={related.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[#D4AF37] font-medium mb-2 line-clamp-1 group-hover:text-[#E5C048] transition-colors">
                      {related.name}
                    </h3>
                    <span className="text-[#D4AF37] font-semibold">
                      {formatPrice(related.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
