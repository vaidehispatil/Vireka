import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { 
  Filter, 
  Grid3X3, 
  LayoutList, 
  ChevronDown, 
  Heart, 
  ShoppingBag,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { products, categories, formatPrice } from '@/data/products';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

gsap.registerPlugin(ScrollTrigger);

const Shop = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart, user } = useStore();

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category')!] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);

  // Age groups and jewelry types for filtering

  const ageGroups = ['kids', 'teenage', 'women'];
  const jewelryTypes = ['imitation', 'real'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Age group filter
    if (selectedAgeGroup.length > 0) {
      result = result.filter(p => selectedAgeGroup.includes(p.ageGroup || ''));
    }

    // Jewelry type filter
    if (selectedType.length > 0) {
      result = result.filter(p => selectedType.includes(p.jewelryType || ''));
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - no specific sort
        break;
    }

    return result;
  }, [selectedCategories, selectedAgeGroup, selectedType, priceRange, sortBy]);

  useEffect(() => {
    // Animate products on mount
    gsap.fromTo('.product-item',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.products-grid',
          start: 'top 80%'
        }
      }
    );
  }, [filteredProducts]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleAgeGroup = (age: string) => {
    setSelectedAgeGroup(prev =>
      prev.includes(age)
        ? prev.filter(a => a !== age)
        : [...prev, age]
    );
  };

  const toggleType = (type: string) => {
    setSelectedType(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedAgeGroup([]);
    setSelectedType([]);
    setPriceRange([0, 150000]);
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Price Range */}
      <div>
        <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          max={150000}
          step={1000}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-white/60">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Categories</h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
                className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37]"
              />
              <span className="text-white/70 group-hover:text-[#D4AF37] transition-colors text-sm">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Age Group */}
      <div>
        <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Age Group</h4>
        <div className="space-y-3">
          {ageGroups.map((age) => (
            <label key={age} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={selectedAgeGroup.includes(age)}
                onCheckedChange={() => toggleAgeGroup(age)}
                className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37]"
              />
              <span className="text-white/70 group-hover:text-[#D4AF37] transition-colors text-sm capitalize">
                {age}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Jewelry Type */}
      <div>
        <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Jewelry Type</h4>
        <div className="space-y-3">
          {jewelryTypes.map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={selectedType.includes(type)}
                onCheckedChange={() => toggleType(type)}
                className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37]"
              />
              <span className="text-white/70 group-hover:text-[#D4AF37] transition-colors text-sm capitalize">
                {type === 'real' ? 'Real Gold/Diamond' : 'Imitation'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        onClick={clearFilters}
        variant="outline"
        className="w-full border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <div className="section-padding">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] mb-4">
            <span className="text-white">Our </span>
            <span className="gold-gradient">Collections</span>
          </h1>
          <p className="text-white/60 max-w-2xl">
            Explore our wide range of imitation and real jewelry. From affordable daily wear to exquisite bridal sets.
          </p>
        </div>

        {/* Price Range Info */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="px-4 py-2 bg-[#050505] border border-[#1a1a1a] rounded-lg">
            <span className="text-white/60 text-sm">Imitation: </span>
            <span className="text-[#D4AF37] text-sm">₹1,000 - ₹40,000</span>
          </div>
          <div className="px-4 py-2 bg-[#050505] border border-[#1a1a1a] rounded-lg">
            <span className="text-white/60 text-sm">Real Jewelry: </span>
            <span className="text-[#D4AF37] text-sm">₹60,000 - ₹1,50,000</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-[#050505] rounded-lg border border-[#1a1a1a]">
          <div className="flex items-center gap-4">
            {/* Mobile Filter */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="lg:hidden border-[#D4AF37]/50 text-[#D4AF37]"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#0a0a0a] border-r border-[#1a1a1a] w-80">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Filters</h3>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <X className="w-5 h-5 text-white/60" />
                  </button>
                </div>
                <FilterContent />
              </SheetContent>
            </Sheet>

            {/* Results Count */}
            <span className="text-white/60 text-sm">
              Showing {filteredProducts.length} products
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#1a1a1a] text-white px-4 py-2 pr-10 rounded-lg border border-[#2a2a2a] focus:outline-none focus:border-[#D4AF37] text-sm"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
            </div>

            {/* View Mode */}
            <div className="hidden sm:flex items-center gap-1 bg-[#1a1a1a] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#D4AF37] text-black' : 'text-white/60 hover:text-white'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#D4AF37] text-black' : 'text-white/60 hover:text-white'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-lg font-semibold text-white">Filters</h3>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/60 text-lg">No products found matching your criteria.</p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="mt-4 border-[#D4AF37]/50 text-[#D4AF37]"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={`products-grid ${
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'flex flex-col gap-4'
              }`}>
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className={`product-item group ${
                      viewMode === 'list' ? 'flex gap-6 p-4' : ''
                    } luxury-card overflow-hidden`}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square'
                    }`}>
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
                        {product.jewelryType === 'real' && (
                          <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold uppercase">
                            Real Gold
                          </span>
                        )}
                        {product.originalPrice && (
                          <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold uppercase">
                            Sale
                          </span>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
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
                          }}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                            isInWishlist(product.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white/10 backdrop-blur-sm text-white hover:bg-[#D4AF37] hover:text-black'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product, 1);
                          }}
                          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-center' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white/50 text-xs uppercase tracking-wider">
                          {product.category}
                        </p>
                        {product.ageGroup && (
                          <span className="px-2 py-0.5 bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] uppercase rounded">
                            {product.ageGroup}
                          </span>
                        )}
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      {viewMode === 'list' && (
                        <p className="text-white/60 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <div className={`flex items-center ${viewMode === 'list' ? 'justify-between gap-4' : 'justify-between'}`}>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[#D4AF37] font-bold">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-white/40 text-sm line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        {viewMode === 'list' && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(product, 1);
                            }}
                            className="px-6 py-2 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#E5C048] transition-all flex items-center gap-2 whitespace-nowrap"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
