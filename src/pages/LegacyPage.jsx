import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Counter from '../components/Counter';
import GoToTop from '../components/GoToTop';

gsap.registerPlugin(ScrollTrigger);

const LegacyPage = () => {
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const milestonesRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, []);

  const milestones = [
    { year: '1985', title: 'Foundation', description: 'Legaloids Law Firm was founded with a vision to provide exceptional legal services.' },
    { year: '1995', title: 'Expansion', description: 'Expanded operations to serve clients across multiple states.' },
    { year: '2005', title: 'Growth', description: 'Strengthened corporate and litigation practice with a growing team.' },
    { year: '2015', title: 'Digital Era', description: 'Embraced technology and digital transformation in legal services.' },
    { year: '2026', title: 'Today', description: 'Decades of legal excellence, trusted by hundreds of clients nationwide.' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center text-white"
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 px-4">Legacy</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto px-4">
            Shaping India's legal past, present and future
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
            Our pillars of success are grounded in our heritage since 1985. Our goodwill and motto to provide pragmatic commercial solutions, and exceptional service, to our clients continually drive us to create meaningful and long-term impact.
          </p>
        </div>
      </section>

      {/* Counter Section */}
      <Counter />

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-10 sm:mb-12 md:mb-16 text-center px-4">Our Journey</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200 hidden md:block"></div>
            
            <div className="space-y-6 sm:space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  ref={(el) => (milestonesRef.current[index] = el)}
                  className={`flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="w-full md:w-5/12">
                    <div className="bg-white border-2 border-primary-200 rounded-xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                      <div className="text-primary-600 font-bold text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">{milestone.year}</div>
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{milestone.title}</h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-2/12 flex-shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-primary-600 rounded-full border-4 border-white shadow-lg mx-auto"></div>
                  </div>
                  <div className="w-full md:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-10 sm:mb-12 md:mb-16 text-center px-4">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {[
              { title: 'Excellence', description: 'Commitment to the highest standards in all we do' },
              { title: 'Integrity', description: 'Unwavering ethical standards and transparency' },
              { title: 'Innovation', description: 'Embracing new approaches and technologies' },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
              >
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary-600 mb-2 sm:mb-3 md:mb-4">{value.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoToTop />
    </>
  );
};

export default LegacyPage;

