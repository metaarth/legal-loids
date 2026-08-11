import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Blog from '../components/Blog';
import IntroSection from '../components/IntroSection';
import GoToTop from '../components/GoToTop';

gsap.registerPlugin(ScrollTrigger);

const BlogPage = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[45vh] h-[50vh] sm:h-[60vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero_3.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white px-2">
          <div className="container mx-auto px-4 text-center min-w-0">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 break-words">Our Blog</h1>
            <p className="text-base sm:text-xl md:text-2xl text-gray-200">
              Insights, Updates, and Legal Perspectives
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <Blog />

      {/* Pagination */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg">1</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">2</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">3</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Next →</button>
          </div>
        </div>
      </section>

      <IntroSection />
      <GoToTop />
    </>
  );
};

export default BlogPage;
