import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/data/products';
import { products } from '@/data/products';

const Necklaces = () => {
  const navigate = useNavigate();
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist);
  const user = useStore((state) => state.user);
  const [necklaces, setNecklaces] = useState<Product[]>([]);

  useEffect(() => {
    // Filter products for necklaces
    const necklaceProducts = products.filter(product => 
      product.category === 'necklaces'
    );
    setNecklaces(necklaceProducts);
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (productId: string) => {
    if (!user?.id) {
      toast.error('Please log in to add items to your wishlist');
      navigate('/login');
      return;
    }
    const wasInWishlist = isInWishlist(productId);
    toggleWishlist(productId);
    toast.success(wasInWishlist ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-[#1a1a1a]/30" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Necklaces</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">Elegant necklaces for every occasion</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-16">
        {necklaces.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {necklaces.map((product: any) => (
              <Card key={product.id} className="bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#D4AF37] transition-all overflow-hidden group luxury-card">
                <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`absolute top-2 right-2 z-10 ${
                      isInWishlist(product.id) ? 'text-red-500' : 'text-white'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleWishlist(product.id);
                    }}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-[#D4AF37] font-semibold mb-2 cursor-pointer hover:text-[#E5C048]" onClick={() => navigate(`/product/${product.id}`)}>
                    {product.name}
                  </h3>
                  <p className="text-white/60 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      {product.originalPrice && (
                        <span className="text-white/40 line-through text-sm mr-2">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                      <span className="text-[#D4AF37] font-bold">₹{product.price.toLocaleString()}</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="bg-[#D4AF37] hover:bg-[#E5C048] text-black font-semibold"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">No necklaces available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Necklaces;