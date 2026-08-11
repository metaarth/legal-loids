import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const slidesRef = useRef([]);

  // Different hero backgrounds – professional legal/corporate imagery (replace with your own /images/ paths if preferred)
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1589829545856-d10d97cf92de?auto=format&fit=crop&w=1920&q=80',
      title: 'Premier Business Law Consulting Firm',
      subtitle: 'Delivering integrated legal solutions tailored to complex commercial challenges',
      buttonText: 'Schedule Consultation',
    },
    {
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
      title: 'Trusted Legal Partners',
      subtitle: 'Multidisciplinary team combining deep industry knowledge with strategic insights',
      buttonText: 'Our Expertise',
    },
    {
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=80',
      title: 'Your Success, Our Commitment',
      subtitle: 'Corporate law, litigation, and advisory services for businesses in India and internationally',
      buttonText: 'Contact Us',
    },
  ];

  useEffect(() => {
    // Animate hero text on mount
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, []);

  useEffect(() => {
    // Animate slide transitions
    slidesRef.current.forEach((slide, index) => {
      if (index === currentSlide) {
        gsap.fromTo(
          slide,
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
        );
      } else {
        gsap.to(slide, { opacity: 0, duration: 0.5 });
      }
    });

    // Animate text for current slide
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      );
    }
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] h-screen w-full max-w-[100vw] overflow-hidden"
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => (slidesRef.current[index] = el)}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center text-white min-w-0">
            <div ref={textRef} className="space-y-4 sm:space-y-8">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight px-1 break-words">
                {slides[currentSlide].title}
              </h1>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 font-light max-w-3xl mx-auto leading-relaxed px-2">
                {slides[currentSlide].subtitle}
              </h2>
              <div className="pt-4 sm:pt-6">
                <button
                  type="button"
                  className="block w-full max-w-xs sm:max-w-none sm:inline-block sm:w-auto mx-auto px-6 sm:px-10 py-3 sm:py-4 bg-primary-600 hover:bg-primary-700 text-white text-sm sm:text-base font-semibold rounded-md shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 tracking-wide uppercase text-center"
                  onMouseEnter={(e) => {
                    gsap.to(e.target, { scale: 1.02, duration: 0.2 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.target, { scale: 1, duration: 0.2 });
                  }}
                >
                  {slides[currentSlide].buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex flex-wrap justify-center gap-2 sm:space-x-3 sm:gap-0 max-w-[95vw] px-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-12'
                : 'bg-white/40 hover:bg-white/60 w-3'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
