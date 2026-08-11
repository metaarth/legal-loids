import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Disclaimer = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Always show disclaimer on page load/reload
    setShowDisclaimer(true);
  }, []);

  useEffect(() => {
    if (showDisclaimer && modalRef.current) {
      // Animate modal entrance
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      );

      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }
      );

      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.2,
          ease: 'power3.out',
        }
      );
    }
  }, [showDisclaimer]);

  const handleAccept = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        y: -50,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setShowDisclaimer(false);
        },
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
      });
    }
  };

  if (!showDisclaimer) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4 pointer-events-auto">
      {/* Overlay - non-clickable */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={(e) => e.stopPropagation()}
      ></div>

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative z-10 bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl w-full min-w-0 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden"
      >
        <div ref={contentRef} className="p-4 sm:p-6 md:p-8 lg:p-12">
          {/* Header */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Disclaimer
            </h2>
            <div className="w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-primary-600 rounded-full"></div>
          </div>

          {/* Content */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-gray-700 leading-relaxed">
            <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
              The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner.
            </p>

            <p className="text-xs sm:text-sm md:text-base">
              By accessing this website, <strong>www.legaloids.com</strong>, you acknowledge and confirm that you are seeking information relating to Legaloids Law Firm of your own accord and that there has been no form of solicitation, advertisement or inducement by Legaloids Law Firm or its members.
            </p>

            <p className="text-xs sm:text-sm md:text-base">
              The content of this website is for <strong>informational purposes only</strong> and should not be interpreted as soliciting or advertisement. No material/information provided on this website should be construed as legal advice.
            </p>

            <p className="text-xs sm:text-sm md:text-base">
              <strong>Legaloids Law Firm shall not be liable</strong> for consequences of any action taken by relying on the material/information provided on this website.
            </p>

            <p className="text-xs sm:text-sm md:text-base">
              The contents of this website are the <strong>intellectual property of Legaloids Law Firm</strong>.
            </p>

            <div className="bg-primary-50 border-l-4 border-primary-600 p-3 sm:p-4 rounded-r-lg mt-4 sm:mt-5 md:mt-6">
              <p className="text-primary-900 font-semibold text-xs sm:text-sm md:text-base">
                I accept the above.
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center mt-6 sm:mt-7 md:mt-8">
            <button
              onClick={handleAccept}
              className="px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-4 bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm font-semibold rounded-md shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 uppercase tracking-wide w-full sm:w-auto"
              onMouseEnter={(e) => {
                gsap.to(e.target, { scale: 1.02, duration: 0.2 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.target, { scale: 1, duration: 0.2 });
              }}
            >
              I Accept
            </button>
          </div>

          <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 text-center mt-4 sm:mt-5 md:mt-6">
            You must accept the disclaimer to continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;

