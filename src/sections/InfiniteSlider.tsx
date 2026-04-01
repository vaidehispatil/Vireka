import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { products, formatPrice } from '@/data/products';
import { useStore } from '@/store/useStore';

const InfiniteSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart, user } = useStore();

  // Triple the products for seamless infinite loop
  const sliderProducts = [...products, ...products, ...products];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 3;
    
    // Create the infinite animation
    animationRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 60,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });

    return () => {
      animationRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (animationRef.current) {
      if (isPaused) {
        animationRef.current.pause();
      } else if (clickedIndex === null) {
        animationRef.current.play();
      }
    }
  }, [isPaused, clickedIndex]);

  const handleProductClick = (_e: React.MouseEvent, index: number) => {
    // Don't interfere with link clicks - let the router handle navigation
    // Just pause the animation
    setClickedIndex(index);
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleWishlistClick = (e: React.MouseEvent, product: typeof products[0]) => {
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

  const handleQuickAdd = (e: React.MouseEvent, product: typeof products[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <section className="py-20 bg-[#0a0a0a] overflow-hidden">
      <div className="section-padding mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-[#D4AF37] text-sm uppercase tracking-wider mb-2 block">
              Featured Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display']">
              <span className="text-white">Our </span>
              <span className="gold-gradient">Masterpieces</span>
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
      </div>

      {/* Infinite Slider */}
      <div
        ref={sliderRef}
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setClickedIndex(null);
        }}
      >
        <div
          ref={trackRef}
          className="flex gap-6"
          style={{ width: 'max-content' }}
        >
          {sliderProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="group relative w-[300px] sm:w-[350px] flex-shrink-0"
              onClick={(e) => handleProductClick(e, index)}
            >
              <Link to={`/product/${product.id}`}>
                <div className="luxury-card overflow-hidden">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="px-3 py-1 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider">
                          New
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-wider">
                          Sale
                        </span>
                      )}
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
                      <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                            {product.category}
                          </p>
                          <h3 className="text-[#D4AF37] font-semibold text-lg line-clamp-1">
                            {product.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 bg-[#0a0a0a]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[#D4AF37] font-bold text-lg">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-white/40 text-sm line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default InfiniteSlider;
