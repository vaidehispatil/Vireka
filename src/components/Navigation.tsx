import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Heart, User, Crown, ChevronDown } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, wishlist, isAuthenticated, user, logout, login, loadUserData } = useStore();
  const { user: authUser } = useAuth();
  const shopDropdownRef = useRef<HTMLDivElement>(null);
  const supportDropdownRef = useRef<HTMLDivElement>(null);
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Sync AuthContext user to Zustand store
  useEffect(() => {
    if (authUser && !isAuthenticated) {
      const userData = {
        id: authUser.id,
        name: authUser.email?.split('@')[0] || 'User',
        email: authUser.email || '',
        mobile: '',
        role: (authUser.email?.includes('admin') ? 'admin' : 'user') as 'user' | 'admin'
      };
      login(userData);
      
      // Load user data from Supabase
      loadUserData(authUser.id);
    }
  }, [authUser, isAuthenticated, login, loadUserData]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(event.target as Node)) {
        setIsShopDropdownOpen(false);
      }
      if (supportDropdownRef.current && !supportDropdownRef.current.contains(event.target as Node)) {
        setIsSupportDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const shopCategories = [
    { name: 'Necklaces', path: '/necklaces' },
    { name: 'Earrings', path: '/earrings' },
    { name: 'Rings', path: '/rings' },
    { name: 'Bracelets', path: '/bracelets' },
    { name: 'Bridal Sets', path: '/bridal-sets' },
  ];

  const supportLinks = [
    { name: 'FAQs', path: '/faqs' },
    { name: 'Shipping', path: '/shipping' },
    { name: 'Returns', path: '/returns' },
    { name: 'Size Guide', path: '/size-guide' },
    { name: 'Care Guide', path: '/care-guide' },
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'Shop', hasDropdown: true, categories: shopCategories },
    { name: 'Hampers', path: '/hampers' },
    { name: 'Support', hasDropdown: true, categories: supportLinks },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#1a1a1a]'
          : 'bg-transparent'
      }`}
    >
      <div className="section-padding">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Crown className="w-8 h-8 text-[#D4AF37] transition-transform duration-300 group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider gold-gradient font-['Playfair_Display']">
                VIREKA
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#D4AF37]/70 uppercase">
                Imitation Jewelry
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div
                  key={link.name}
                  className="relative"
                  ref={link.name === 'Shop' ? shopDropdownRef : supportDropdownRef}
                  onMouseEnter={() => link.name === 'Shop' ? setIsShopDropdownOpen(true) : setIsSupportDropdownOpen(true)}
                  onMouseLeave={() => link.name === 'Shop' ? setIsShopDropdownOpen(false) : setIsSupportDropdownOpen(false)}
                >
                  <button className={`nav-link text-sm uppercase tracking-wider flex items-center gap-1 ${
                    (link.name === 'Shop' && isShopDropdownOpen) || (link.name === 'Support' && isSupportDropdownOpen) ? 'text-[#D4AF37]' : ''
                  }`}>
                    {link.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className={`absolute top-full left-0 mt-2 w-48 bg-[#0a0a0a]/98 backdrop-blur-xl border border-[#1a1a1a] rounded-lg shadow-xl transition-all duration-200 ${
                    (link.name === 'Shop' && isShopDropdownOpen) || (link.name === 'Support' && isSupportDropdownOpen) ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}>
                    {link.categories?.map((category) => (
                      <Link
                        key={category.path}
                        to={category.path || '/'}
                        className={`block px-4 py-3 text-sm text-white/80 hover:bg-[#1a1a1a] hover:text-[#D4AF37] transition-colors ${
                          isActive(category.path || '/') ? 'text-[#D4AF37]' : ''
                        }`}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path || '/'}
                  className={`nav-link text-sm uppercase tracking-wider ${
                    isActive(link.path || '/') ? 'text-[#D4AF37]' : ''
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <button
              onClick={() => navigate('/wishlist')}
              className="relative p-2 text-white/70 hover:text-[#D4AF37] transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-black text-xs font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 text-white/70 hover:text-[#D4AF37] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-black text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            {isAuthenticated ? (
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 text-white/70 hover:text-[#D4AF37] transition-colors">
                    <User className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#0a0a0a] border-l border-[#1a1a1a] w-80">
                  <div className="flex flex-col h-full pt-8">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#AA8C2C] flex items-center justify-center">
                        <User className="w-10 h-10 text-black" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{user?.name}</h3>
                      <p className="text-sm text-white/60">{user?.email}</p>
                    </div>
                    <nav className="flex flex-col gap-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-[#1a1a1a] hover:text-[#D4AF37] rounded-lg transition-colors"
                      >
                        <User className="w-5 h-5" />
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-[#1a1a1a] hover:text-[#D4AF37] rounded-lg transition-colors"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-[#1a1a1a] hover:text-[#D4AF37] rounded-lg transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        Wishlist
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-[#1a1a1a] hover:text-[#D4AF37] rounded-lg transition-colors"
                        >
                          <Crown className="w-5 h-5" />
                          Admin Dashboard
                        </Link>
                      )}
                    </nav>
                    <div className="mt-auto pb-8">
                      <button
                        onClick={async () => {
                          await logout();
                          navigate('/');
                        }}
                        className="w-full py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded-lg transition-all"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded-lg transition-all text-sm"
              >
                <User className="w-4 h-4" />
                Login
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-[#D4AF37] transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-20 bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-[#1a1a1a] transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            link.hasDropdown ? (
              <div key={link.name}>
                <div className="text-lg py-2 text-[#D4AF37] font-semibold mb-2">{link.name}</div>
                <div className="pl-4 space-y-2">
                  {link.categories?.map((category) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-2 text-sm ${
                        isActive(category.path) ? 'text-[#D4AF37]' : 'text-white/80'
                      }`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path || '/'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg py-2 border-b border-[#1a1a1a] ${
                  isActive(link.path || '/') ? 'text-[#D4AF37]' : 'text-white/80'
                }`}
              >
                {link.name}
              </Link>
            )
          ))}
          {!isAuthenticated && (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 py-3 bg-[#D4AF37] text-black text-center font-semibold rounded-lg"
            >
              Login / Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
