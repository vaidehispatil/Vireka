import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

const Categories = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.category-card');
      
      if (cards) {
        gsap.fromTo(cards,
          {
            opacity: 0,
            y: 60,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#050505]">
      <div className="section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] text-sm uppercase tracking-wider mb-4 block">
            Browse by Category
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] mb-4">
            <span className="text-white">Explore Our </span>
            <span className="gold-gradient">Collections</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            From timeless classics to contemporary designs, discover jewelry that speaks to your unique style.
          </p>
        </div>

        {/* Categories Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/collections?category=${category.id}`}
              className="category-card group relative overflow-hidden rounded-lg aspect-[3/4]"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                  <h3 className="text-white font-semibold text-lg md:text-xl mb-1">
                    {category.name}
                  </h3>
                  <p className="text-white/60 text-sm mb-3">
                    {category.count} Products
                  </p>
                  
                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Border Effect */}
              <div className="absolute inset-0 border border-transparent group-hover:border-[#D4AF37]/50 rounded-lg transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
