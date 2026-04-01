import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Bridal Customer',
    text: 'Luxe Jewels made my wedding day truly special. The jewelry was absolutely stunning and received so many compliments. The craftsmanship is exceptional!'
  },
  {
    id: 2,
    name: 'Rajesh Patel',
    role: 'Regular Customer',
    text: 'I have been buying from Luxe Jewels for over 5 years. Their quality and service are unmatched. Highly recommended for anyone looking for premium jewelry.'
  },
  {
    id: 3,
    name: 'Ananya Gupta',
    role: 'First-time Buyer',
    text: 'The attention to detail in every piece is remarkable. I ordered online and was amazed by how beautiful the jewelry looked in person.'
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-content',
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-[150px]" />
      </div>

      <div className="section-padding relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] text-sm uppercase tracking-wider mb-4 block">
            Customer Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display']">
            <span className="text-white">What Our </span>
            <span className="gold-gradient">Clients Say</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="testimonial-content max-w-4xl mx-auto">
          <div className="luxury-card p-8 md:p-12 relative">
            {/* Quote Icon */}
            <Quote className="absolute top-8 left-8 w-16 h-16 text-[#D4AF37]/20" />

            {/* Content */}
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-white/90 text-lg md:text-xl text-center leading-relaxed mb-10 italic">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#AA8C2C] flex items-center justify-center">
                  <span className="text-black font-bold text-xl">
                    {testimonials[currentIndex].name[0]}
                  </span>
                </div>
                <h4 className="text-white font-semibold text-lg">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-[#D4AF37] text-sm">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-[#D4AF37]'
                        : 'bg-[#D4AF37]/30 hover:bg-[#D4AF37]/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
