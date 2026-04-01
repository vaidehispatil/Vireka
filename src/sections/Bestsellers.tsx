import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Heart, ShoppingBag, TrendingUp } from 'lucide-react';
import { products, formatPrice } from '@/data/products';
import { useStore } from '@/store/useStore';

gsap.registerPlugin(ScrollTrigger);

const Bestsellers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // Get first 3 products as bestsellers
  const bestsellers = products.slice(0, 3);
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart, user } = useStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = productsRef.current?.querySelectorAll('.bestseller-card');
      
      if (cards) {
        gsap.fromTo(cards,
          {
            opacity: 0,
            x: -60
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleWishlistClick = (e: React.MouseEvent, product: typeof bestsellers[0]) => {
    e.preventDefault();
    e.stopPropagation();
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
  };

  const handleQuickAdd = (e: React.MouseEvent, product: typeof bestsellers[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-[#050505]">
      <div className="section-padding">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm uppercase tracking-wider">
                Most Popular
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display']">
              <span className="text-white">Best</span>
              <span className="gold-gradient">sellers</span>
            </h2>
          </div>
          <Link
            to="/collections"
            className="text-[#D4AF37] hover:text-white transition-colors flex items-center gap-2 group"
          >
            View All Products
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Products Grid - Featured Layout */}
        <div ref={productsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Product (First) */}
          {bestsellers[0] && (
            <Link
              to={`/product/${bestsellers[0].id}`}
              className="bestseller-card group lg:row-span-2"
            >
              <div className="luxury-card overflow-hidden h-full">
                <div className="relative h-full min-h-[500px] overflow-hidden">
                  <img
                    src={bestsellers[0].images[0]}
                    alt={bestsellers[0].name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="px-4 py-2 bg-[#D4AF37] text-black text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Popular
                    </span>
                    {bestsellers[0].originalPrice && (
                      <span className="px-4 py-2 bg-red-500 text-white text-sm font-bold uppercase tracking-wider">
                        Sale
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => handleWishlistClick(e, bestsellers[0])}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isInWishlist(bestsellers[0].id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/10 backdrop-blur-sm text-white hover:bg-[#D4AF37] hover:text-black'
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${isInWishlist(bestsellers[0].id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => handleQuickAdd(e, bestsellers[0])}
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all"
                    >
                      <ShoppingBag className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-white/50 text-sm uppercase tracking-wider mb-2">
                      {bestsellers[0].category}
                    </p>
                    <h3 className="text-white font-bold text-2xl md:text-3xl mb-4 group-hover:text-[#D4AF37] transition-colors">
                      {bestsellers[0].name}
                    </h3>
                    <div className="flex items-baseline gap-3">
                      <span className="text-[#D4AF37] font-bold text-2xl">
                        {formatPrice(bestsellers[0].price)}
                      </span>
                      {bestsellers[0].originalPrice && (
                        <span className="text-white/40 text-lg line-through">
                          {formatPrice(bestsellers[0].originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Other Bestsellers */}
          {bestsellers.slice(1, 3).map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bestseller-card group"
            >
              <div className="luxury-card overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-70" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Popular
                    </span>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => handleWishlistClick(e, product)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isInWishlist(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/10 backdrop-blur-sm text-white hover:bg-[#D4AF37] hover:text-black'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-[#D4AF37] font-semibold text-lg mb-2 group-hover:text-[#E5C048] transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[#D4AF37] font-bold">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
