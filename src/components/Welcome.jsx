import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Welcome = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (section && image && content) {
      gsap.fromTo(
        image,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        content.children,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div ref={imageRef} className="lg:col-span-6">
            <img
              src="/images/hero_1.jpg"
              alt="Legal office"
              className="w-full h-auto rounded-lg shadow-xl transform hover:scale-[1.01] transition-transform duration-500"
            />
          </div>
          <div ref={contentRef} className="lg:col-span-6 space-y-6">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">About Us</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Premier Business Law Consulting Firm
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Legaloids Law Offices is a leading boutique consulting firm specializing in corporate law, litigation, and advisory services. As a trusted partner for businesses in India and internationally, we deliver integrated legal solutions tailored to complex commercial challenges. Our multidisciplinary team of lawyers, company secretaries, and chartered accountants combines deep industry knowledge with strategic insights to drive client success.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              At Legaloids Law Offices, we prioritize client trust and deliver robust, effective legal representation to address diverse business needs. Founded on enduring client relationships, our firm provides personalized, accessible services with meticulous attention to detail, consistently achieving favorable outcomes.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              As a full-service corporate and litigation law firm headquartered in New Delhi, with associate offices in Noida, Pune, Mumbai, and Agra, we offer timely, cost-effective solutions in contracts, transactions, and regulatory matters.
            </p>
            <div className="pt-4">
              <button
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-xs sm:text-sm uppercase tracking-wide"
                onMouseEnter={(e) => {
                  gsap.to(e.target, { scale: 1.02, x: 2, duration: 0.2 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.target, { scale: 1, x: 0, duration: 0.2 });
                }}
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
