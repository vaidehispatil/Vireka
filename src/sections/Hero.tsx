import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 50
      });
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 1.1
      });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out'
      })
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=1')
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.7')
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6');

      // Sparkles animation
      const sparkles = sparklesRef.current?.querySelectorAll('.sparkle');
      if (sparkles) {
        sparkles.forEach((sparkle, index) => {
          gsap.to(sparkle, {
            opacity: gsap.utils.random(0.3, 1),
            scale: gsap.utils.random(0.5, 1.5),
            duration: gsap.utils.random(1, 2),
            repeat: -1,
            yoyo: true,
            delay: index * 0.2,
            ease: 'sine.inOut'
          });
        });
      }

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
      >
        <img
          src="/images/hero-bg.jpg"
          alt="Luxury Jewelry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/80" />
      </div>

      {/* Sparkles */}
      <div ref={sparklesRef} className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Sparkles
            key={i}
            className="sparkle absolute text-[#D4AF37]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 16 + 8}px`,
              height: `${Math.random() * 16 + 8}px`,
              opacity: 0
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 section-padding text-center max-w-5xl mx-auto pt-20">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Est. 2020
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 font-['Playfair_Display'] leading-tight"
        >
          <span className="text-white">Welcome to</span>
          <br />
          <span className="gold-gradient">VIREKA</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Discover our exquisite collection of imitation jewelry. From affordable daily wear to stunning bridal sets, find the perfect piece for every occasion.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/collections"
            className="group flex items-center gap-3 px-8 py-4 gold-button text-black font-semibold rounded-lg"
          >
            Explore Collection
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/hampers"
            className="flex items-center gap-3 px-8 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-lg transition-all font-semibold"
          >
            <Sparkles className="w-5 h-5" />
            Gift Hampers
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-[#D4AF37]/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-[#D4AF37] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
