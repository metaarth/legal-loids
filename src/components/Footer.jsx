import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const sectionsRef = useRef([]);
  const currentYear = 2026;

  useEffect(() => {
    const footer = footerRef.current;
    const sections = sectionsRef.current;

    if (footer && sections) {
      // Set initial visibility to ensure content is always visible
      sections.forEach((section) => {
        if (section) {
          gsap.set(section, { opacity: 1, y: 0 });
        }
      });

      // Only animate if footer is not already in view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                sections,
                { y: 30, opacity: 0.8 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  stagger: 0.1,
                  ease: 'power3.out',
                }
              );
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (footer) {
        observer.observe(footer);
      }

      return () => {
        if (footer) {
          observer.unobserve(footer);
        }
      };
    }
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-primary-900 text-primary-100 py-12 sm:py-16 md:py-20 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16 mb-10 sm:mb-12 md:mb-16">
          <div ref={(el) => (sectionsRef.current[0] = el)} className="opacity-100">
            <Link to="/" className="inline-block mb-4 sm:mb-6">
              <img src="/Logo/Logo.png" alt="Legaloids Law Firm" className="h-12 sm:h-12 md:h-14 w-auto object-contain" />
            </Link>
            <p className="text-primary-200 leading-relaxed text-xs sm:text-sm">
              A premier law firm committed to delivering exceptional legal services with integrity, expertise, and strategic thinking. We protect your interests and guide you toward success.
            </p>
          </div>

          <div ref={(el) => (sectionsRef.current[1] = el)} className="opacity-100">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/" className="text-primary-200 text-xs sm:text-sm hover:text-white transition-colors duration-200 block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-primary-200 text-xs sm:text-sm hover:text-white transition-colors duration-200 block">
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link to="/expertise" className="text-primary-200 text-xs sm:text-sm hover:text-white transition-colors duration-200 block">
                  Expertise
                </Link>
              </li>
              <li>
                <Link to="/people" className="text-primary-200 text-xs sm:text-sm hover:text-white transition-colors duration-200 block">
                  People
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-primary-200 text-xs sm:text-sm hover:text-white transition-colors duration-200 block">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-200 text-xs sm:text-sm hover:text-white transition-colors duration-200 block">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div ref={(el) => (sectionsRef.current[2] = el)} className="opacity-100">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 uppercase tracking-wider">Contact Information</h4>
            <ul className="space-y-2 sm:space-y-3 text-primary-200 text-xs sm:text-sm">
              <li className="leading-relaxed">
                <strong className="text-white">Head Office:</strong><br />
                Unit 410 – Tower - A, Enkay Towers,<br />
                Phase V, Sector 19, Udyog Vihar, Gurugram
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Noida Office:</strong><br />
                617, Wave Silver Tower,<br />
                Sector – 18, Noida, 201301
              </li>
              <li className="leading-relaxed mt-1 sm:mt-2">
                <strong className="text-white">Chandigarh Office:</strong><br />
                Unit No. 228, Advocates Society,<br />
                Sector 49A, Chandigarh - 160047
              </li>
              <li>
                <a href="tel:+918881668058" className="text-primary-200 hover:text-white transition-colors duration-200 block">
                  088816 68058
                </a>
              </li>
              <li>
                <a href="mailto:admin@legaloids.com" className="text-primary-200 hover:text-white transition-colors duration-200 block break-all">
                  admin@legaloids.com
                </a>
              </li>
            </ul>
          </div>

          <div ref={(el) => (sectionsRef.current[3] = el)} className="opacity-100">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 uppercase tracking-wider">Office Hours</h4>
            <ul className="space-y-2 sm:space-y-3 text-primary-200 text-xs sm:text-sm">
              <li>Monday - Thursday: 9:00 AM - 9:00 PM</li>
              <li>Friday: 8:00 AM - 9:00 PM</li>
              <li>Saturday: 9:30 AM - 3:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 pt-6 sm:pt-8 md:pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-200 text-xs sm:text-sm text-center md:text-left">
              Copyright &copy; {currentYear} Legaloids Law Firm. All rights reserved.
            </p>
            <div className="flex space-x-2 sm:space-x-3">
              <a
                href="https://www.linkedin.com/company/legaloids-law-offices/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 bg-primary-800 hover:bg-white rounded-md flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                aria-label="LinkedIn"
              >
                <span className="text-primary-200 hover:text-primary-600 transition-colors text-[10px] sm:text-xs font-semibold">in</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
