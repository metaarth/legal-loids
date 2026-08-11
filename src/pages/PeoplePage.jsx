import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Attorneys from '../components/Attorneys';
import GoToTop from '../components/GoToTop';

gsap.registerPlugin(ScrollTrigger);

const PeoplePage = () => {
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroTaglineRef = useRef(null);
  const heroDescRef = useRef(null);
  const statsRef = useRef(null);
  const statItemsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroTitleRef.current) return;
      gsap.set([heroTitleRef.current, heroTaglineRef.current, heroDescRef.current], { opacity: 0, y: 32 });
      gsap.to(heroTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2,
      });
      gsap.to(heroTaglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.5,
      });
      gsap.to(heroDescRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.75,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!statsRef.current || !statItemsRef.current.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        statItemsRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!ctaRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="hero-inner relative z-10 container mx-auto px-4 sm:px-6 text-center">
          <h1 ref={heroTitleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 px-4">People</h1>
          <p ref={heroTaglineRef} className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto px-4">
            Home to inspired performances
          </p>
          <p ref={heroDescRef} className="text-sm sm:text-base md:text-lg text-gray-300 mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
            Our team is focused on delivering commercial solutions to legal challenges. We understand the industries and sectors our clients operate in, applying years of experience to advise leading companies worldwide. Selected from the best talent, our professionals thrive in a stimulating environment to hone their skills.
          </p>
        </div>
      </section>

      {/* Attorneys Section */}
      <Attorneys />

      {/* Team Stats */}
      <section ref={statsRef} className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-center">
            {[
              { number: '25', label: 'Attorneys' },
              { number: '5', label: 'Partners' },
              { number: '15+w', label: 'Practice Areas' },
              { number: '40+', label: 'Years Experience' },
            ].map((stat, index) => (
              <div
                key={index}
                ref={(el) => (statItemsRef.current[index] = el)}
                className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-600 mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section ref={ctaRef} className="py-12 sm:py-16 md:py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">Join Our Team</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            We're always looking for talented individuals to join our growing team
          </p>
          <Link
            to="/contact"
            className="inline-block w-full max-w-xs sm:max-w-none sm:w-auto text-center px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-4 bg-white text-primary-600 text-xs sm:text-sm md:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Join Us
          </Link>
        </div>
      </section>

      <GoToTop />
    </>
  );
};

export default PeoplePage;

