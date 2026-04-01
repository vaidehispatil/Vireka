import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, ShoppingBag, Sparkles, Check, ArrowRight, Heart } from 'lucide-react';
import { formatPrice } from '@/data/products';
import { Button } from '@/components/ui/button';

interface HamperPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  items: string[];
  image: string;
  badge?: string;
}

const hamperPackages: HamperPackage[] = [
  {
    id: 'bridal-complete-ruby',
    name: 'Complete Bridal Set - Ruby',
    description: 'The ultimate bridal gift set featuring our finest imitation jewelry pieces',
    price: 12500,
    originalPrice: 15000,
    items: [
      'Ruby Kundan Necklace (1 pc)',
      'Matching Jhumka Earrings (1 pair)',
      'Maang Tikka with Pearl Drops (1 pc)',
      'Gold-plated Bangles Set (4 pcs)',
      'Statement Ring (1 pc)',
      'Nath (Nose Ring) (1 pc)',
      'Premium Velvet Gift Box',
      'Jewelry Care Kit'
    ],
    image: '/images/bridal-complete-1.jpg',
    badge: 'Most Popular'
  },
  {
    id: 'bridal-complete-emerald',
    name: 'Complete Bridal Set - Emerald',
    description: 'Elegant emerald-themed complete bridal jewelry set',
    price: 11500,
    originalPrice: 13500,
    items: [
      'Emerald Kundan Necklace (1 pc)',
      'Matching Drop Earrings (1 pair)',
      'Maang Tikka (1 pc)',
      'Green & Gold Bangles (6 pcs)',
      'Adjustable Ring (1 pc)',
      'Nath (Nose Ring) (1 pc)',
      'Premium Velvet Gift Box',
      'Jewelry Care Kit'
    ],
    image: '/images/imitation-1.jpg',
    badge: 'Best Value'
  },
  {
    id: 'anniversary-special',
    name: 'Anniversary Special Hamper',
    description: 'Celebrate your love with this elegant collection',
    price: 5500,
    originalPrice: 6500,
    items: [
      'Elegant Pendant Necklace (1 pc)',
      'Matching Stud Earrings (1 pair)',
      'Delicate Bracelet (1 pc)',
      'Simple Ring (1 pc)',
      'Luxury Gift Packaging',
      'Personalized Message Card'
    ],
    image: '/images/necklace-sober-1.jpg'
  },
  {
    id: 'festive-collection',
    name: 'Festive Collection Hamper',
    description: 'Perfect for Diwali, Eid, or any celebration',
    price: 4500,
    originalPrice: 5200,
    items: [
      'Traditional Necklace (1 pc)',
      'Jhumka Earrings (1 pair)',
      'Colorful Glass Bangles (6 pcs)',
      'Maang Tikka (1 pc)',
      'Festive Gift Box',
      'Sweet Treats Included'
    ],
    image: '/images/imitation-2.jpg'
  },
  {
    id: 'teen-trendy-set',
    name: 'Teen Trendy Collection',
    description: 'Stylish and trendy jewelry set for teenage girls',
    price: 2800,
    items: [
      'Trendy Pendant Necklace (1 pc)',
      'Star Drop Earrings (1 pair)',
      'Charm Bracelet (1 pc)',
      'Heart Ring (1 pc)',
      'Cute Gift Packaging'
    ],
    image: '/images/teen-set-1.jpg',
    badge: 'New'
  },
  {
    id: 'kids-fun-set',
    name: 'Kids Fun Collection',
    description: 'Colorful and safe jewelry for little ones',
    price: 1500,
    items: [
      'Colorful Flower Necklace (1 pc)',
      'Matching Earrings (1 pair)',
      'Cute Hair Accessories',
      'Fun Gift Box'
    ],
    image: '/images/kids-set-1.jpg'
  },
  {
    id: 'corporate-gifting',
    name: 'Corporate Gifting Set',
    description: 'Impress your clients and employees',
    price: 3500,
    items: [
      'Elegant Pendant Set (1 pc)',
      'Cufflinks (for men) (1 pair)',
      'Premium Packaging',
      'Company Branding Available',
      'Bulk Discounts Available'
    ],
    image: '/images/necklace-sober-2.jpg'
  },
  {
    id: 'daily-wear-combo',
    name: 'Daily Wear Combo',
    description: 'Simple and elegant pieces for everyday wear',
    price: 3200,
    originalPrice: 3800,
    items: [
      'Simple Gold Pendant (1 pc)',
      'Small Stud Earrings (1 pair)',
      'Slim Bangle (1 pc)',
      'Minimalist Ring (1 pc)',
      'Gift Pouch'
    ],
    image: '/images/bangle-set-3.jpg'
  }
];

const Hampers = () => {
  const [selectedHamper, setSelectedHamper] = useState<string | null>(null);

  const handleAddToCart = (hamper: HamperPackage) => {
    setSelectedHamper(hamper.id);
    setTimeout(() => setSelectedHamper(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      {/* Hero */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden mb-16">
        <div className="absolute inset-0">
          <img
            src="/images/bridal-complete-1.jpg"
            alt="Gift Hampers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/60 to-[#0a0a0a]" />
        </div>
        <div className="relative z-10 text-center section-padding">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm uppercase tracking-wider mb-6">
            <Gift className="w-4 h-4" />
            Premium Gifting
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-['Playfair_Display'] mb-6">
            <span className="text-white">Gift </span>
            <span className="gold-gradient">Hampers</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Curated collections of our finest jewelry, beautifully packaged for your loved ones.
          </p>
        </div>
      </div>

      <div className="section-padding">
        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Gift, title: 'Premium Packaging', desc: 'Luxury gift boxes' },
            { icon: Sparkles, title: 'Customizable', desc: 'Add personal touches' },
            { icon: Check, title: 'Complete Sets', desc: 'All pieces included' },
            { icon: Heart, title: 'Perfect Gift', desc: 'For any occasion' }
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 bg-[#050505] rounded-lg border border-[#1a1a1a]">
              <feature.icon className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="text-white font-medium mb-1">{feature.title}</h4>
              <p className="text-white/50 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Hamper Packages */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-['Playfair_Display']">
              Curated <span className="gold-gradient">Collections</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hamperPackages.map((hamper) => (
              <div key={hamper.id} className="luxury-card overflow-hidden group">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={hamper.image}
                    alt={hamper.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  
                  {hamper.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#D4AF37] text-black text-sm font-bold uppercase">
                        {hamper.badge}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl mb-1">{hamper.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <p className="text-[#D4AF37] font-semibold text-lg">
                        {formatPrice(hamper.price)}
                      </p>
                      {hamper.originalPrice && (
                        <p className="text-white/50 text-sm line-through">
                          {formatPrice(hamper.originalPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-white/60 mb-4">{hamper.description}</p>
                  
                  <h4 className="text-white font-semibold mb-3">Package Includes:</h4>
                  <ul className="space-y-2 mb-6">
                    {hamper.items.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-white/70 text-sm">
                        <Check className="w-4 h-4 text-[#D4AF37]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleAddToCart(hamper)}
                      className="flex-1 gold-button text-black font-semibold"
                    >
                      {selectedHamper === hamper.id ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Added!
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                    <Link to="/contact">
                      <Button
                        variant="outline"
                        className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                      >
                        Customize
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Hamper CTA */}
        <div className="luxury-card p-8 md:p-12 text-center relative overflow-hidden mb-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37] rounded-full blur-[100px]" />
          </div>
          
          <div className="relative z-10">
            <Sparkles className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Playfair_Display']">
              Create Your <span className="gold-gradient">Custom Hamper</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8">
              Can't find what you're looking for? Work with our experts to create a bespoke gift hamper tailored to your preferences and budget.
            </p>
            <Link to="/contact">
              <Button className="gold-button text-black font-semibold px-8 py-4">
                Get in Touch
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Corporate Gifting */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4 font-['Playfair_Display']">
              Corporate <span className="gold-gradient">Gifting</span>
            </h2>
            <p className="text-white/60 mb-6">
              Make a lasting impression with our corporate gifting solutions. From employee recognition to client appreciation, we offer:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Bulk order discounts',
                'Custom branding options',
                'Dedicated account manager',
                'Express delivery available',
                'Flexible payment terms'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-white/70">
                  <Check className="w-5 h-5 text-[#D4AF37]" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/contact">
              <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                Request Corporate Quote
              </Button>
            </Link>
          </div>
          <div className="relative">
            <img
              src="/images/bangle-set-1.jpg"
              alt="Corporate Gifting"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[#D4AF37] rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hampers;
