import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { getNewArrivals, formatPrice } from '@/data/products';
import { useStore } from '@/store/useStore';

gsap.registerPlugin(ScrollTrigger);

const NewArrivals = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const newProducts = getNewArrivals();
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart, user } = useStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = productsRef.current?.querySelectorAll('.product-card');
      
      if (cards) {
        gsap.fromTo(cards,
          {
            opacity: 0,
            y: 80,
            rotateY: -15
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 1,
            stagger: 0.2,
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

  const handleWishlistClick = (e: React.MouseEvent, product: typeof newProducts[0]) => {
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

  const handleQuickAdd = (e: React.MouseEvent, product: typeof newProducts[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-[#0a0a0a]">
      <div className="section-padding">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm uppercase tracking-wider">
                Just Arrived
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display']">
              <span className="text-white">New </span>
              <span className="gold-gradient">Arrivals</span>
            </h2>
          </div>
          <Link
            to="/collections?sort=newest"
            className="text-[#D4AF37] hover:text-white transition-colors flex items-center gap-2 group"
          >
            View All New Arrivals
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Products Grid */}
        <div
          ref={productsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {newProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-card group"
            >
              <div className="luxury-card overflow-hidden">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                  
                  {/* New Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      New
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
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-[#D4AF37] font-semibold text-lg mb-2 line-clamp-1 group-hover:text-[#E5C048] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[#D4AF37] font-bold text-lg">
                      {formatPrice(product.price)}
                    </span>
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

export default NewArrivals;
