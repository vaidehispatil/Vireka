import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Gem, Clock, Crown, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Clock, value: '39+', label: 'Years of Excellence' },
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: Gem, value: '100K+', label: 'Pieces Crafted' },
    { icon: Award, value: '25+', label: 'Awards Won' }
  ];

  const values = [
    {
      icon: Gem,
      title: 'Quality Craftsmanship',
      description: 'Every piece is handcrafted by master artisans with decades of experience in traditional jewelry making.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We believe in building lasting relationships with our customers through exceptional service and quality.'
    },
    {
      icon: Crown,
      title: 'Heritage & Tradition',
      description: 'Our designs blend centuries-old techniques with contemporary aesthetics for timeless elegance.'
    },
    {
      icon: Award,
      title: 'Certified Authenticity',
      description: 'All our jewelry comes with certified authenticity and quality assurance from renowned gemological institutes.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20" ref={sectionRef}>
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/jewelry-5.jpg"
            alt="About Luxe Jewels"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/60 to-[#0a0a0a]" />
        </div>
        <div className="relative z-10 text-center section-padding">
          <span className="text-[#D4AF37] text-sm uppercase tracking-wider mb-4 block">
            Our Story
          </span>
          <h1 className="text-5xl md:text-6xl font-bold font-['Playfair_Display'] mb-6">
            <span className="text-white">Crafting </span>
            <span className="gold-gradient">Excellence</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Since 1985, we have been creating timeless pieces that celebrate life's most precious moments.
          </p>
        </div>
      </div>

      <div className="section-padding">
        {/* Story Section */}
        <div className="about-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Playfair_Display']">
              A Legacy of <span className="gold-gradient">Luxury</span>
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Founded in 1985 by master jeweler Rajesh Kumar, Luxe Jewels began as a small workshop in the heart of Mumbai's jewelry district. What started as a passion for creating exquisite pieces has grown into one of India's most respected luxury jewelry brands.
              </p>
              <p>
                For nearly four decades, we have remained committed to the art of fine jewelry making. Our master artisans combine traditional techniques passed down through generations with modern design sensibilities to create pieces that are both timeless and contemporary.
              </p>
              <p>
                Every piece that bears the Luxe Jewels name undergoes rigorous quality checks and is crafted using only the finest materials - from ethically sourced gemstones to pure gold and platinum.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/jewelry-7.jpg"
              alt="Our Craftsmanship"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-[#D4AF37] rounded-lg" />
          </div>
        </div>

        {/* Stats */}
        <div className="about-content grid grid-cols-2 md:grid-cols-4 gap-6 py-16 border-y border-[#1a1a1a]">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-8 h-8 text-[#D4AF37] mx-auto mb-4" />
              <div className="text-3xl md:text-4xl font-bold gold-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="about-content py-20">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-sm uppercase tracking-wider mb-4 block">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-['Playfair_Display']">
              Our <span className="gold-gradient">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="luxury-card p-6 text-center group hover:border-[#D4AF37] transition-colors">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                  <value.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{value.title}</h3>
                <p className="text-white/60 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="about-content py-16 border-t border-[#1a1a1a]">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-['Playfair_Display']">
              Certified <span className="gold-gradient">Excellence</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {['GIA Certified', 'IGI Certified', 'BIS Hallmarked', 'ISO 9001:2015'].map((cert, index) => (
              <div key={index} className="flex items-center gap-3 px-6 py-3 bg-[#050505] rounded-lg border border-[#1a1a1a]">
                <Award className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-white/80 text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
