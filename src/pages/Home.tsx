import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/sections/Hero';
import InfiniteSlider from '@/sections/InfiniteSlider';
import Categories from '@/sections/Categories';
import NewArrivals from '@/sections/NewArrivals';
import Bestsellers from '@/sections/Bestsellers';
import Testimonials from '@/sections/Testimonials';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    // Smooth scroll setup
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse'
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Hero />
      <InfiniteSlider />
      <Categories />
      <NewArrivals />
      <Bestsellers />
      <Testimonials />
    </main>
  );
};

export default Home;
