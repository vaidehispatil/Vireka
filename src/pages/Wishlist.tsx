import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/data/products';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#1a1a1a] flex items-center justify-center">
            <Heart className="w-12 h-12 text-[#D4AF37]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 font-['Playfair_Display']">
            Your Wishlist is Empty
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Save your favorite pieces to your wishlist and come back to them anytime.
          </p>
          <Link to="/collections">
            <Button className="gold-button text-black font-semibold px-8 py-4">
              Explore Collection
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <div className="section-padding">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-['Playfair_Display'] mb-2">
              My <span className="gold-gradient">Wishlist</span>
            </h1>
            <p className="text-white/60">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <Link to="/collections">
            <Button variant="outline" className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="luxury-card overflow-hidden group">
              {/* Image */}
              <Link to={`/product/${product.id}`} className="relative aspect-square block overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.isNew && (
                    <span className="px-2 py-1 bg-[#D4AF37] text-black text-xs font-bold uppercase">
                      New
                    </span>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </Link>

              {/* Info */}
              <div className="p-5">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                  {product.category}
                </p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-[#D4AF37] font-semibold text-lg mb-2 hover:text-[#E5C048] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-[#D4AF37] font-bold text-lg">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-white/40 text-sm line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <Button
                  onClick={() => addToCart(product, 1)}
                  className="w-full gold-button text-black font-semibold"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
