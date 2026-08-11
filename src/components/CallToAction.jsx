import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (section && content) {
      gsap.fromTo(
        content.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
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
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-24 bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
      style={{ backgroundImage: 'url(/images/hero_2.jpg)' }}
    >
      <div className="absolute inset-0 bg-primary-900/85"></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white min-w-0">
          <div ref={contentRef} className="space-y-5 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight px-2 break-words">
              Ready to Discuss Your Legal Needs?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed px-2">
              Our experienced legal team is here to provide strategic counsel and comprehensive solutions tailored to your specific requirements. Schedule a consultation today.
            </p>
            <div className="pt-4 sm:pt-6">
              <button
                className="w-full max-w-sm sm:max-w-none sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white text-primary-600 hover:bg-gray-50 text-sm sm:text-base font-semibold rounded-md shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 uppercase tracking-wide"
                onMouseEnter={(e) => {
                  gsap.to(e.target, {
                    scale: 1.02,
                    y: -2,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    duration: 0.3,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.target, {
                    scale: 1,
                    y: 0,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                    duration: 0.3,
                  });
                }}
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
