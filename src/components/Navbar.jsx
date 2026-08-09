import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const menuItemsRef = useRef([]);
  const toggleButtonRef = useRef(null);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Expertise', path: '/expertise' },
    { label: 'People', path: '/people' },
    { label: 'News & Events', path: '/news-events' },
    { label: 'Legacy', path: '/legacy' },
    { label: 'Practice Areas', path: '/practice' },
    { label: 'Compliance Desk', path: '/compliance-desk' },
    // {
    //   label: 'Blog',
    //   path: '/blog',
    //   hasDropdown: true,
    //   dropdownItems: [
    //     { label: 'All Posts', path: '/blog' },
    //     { label: 'Legal Updates', path: '/blog?category=legal-updates' },
    //     { label: 'Case Studies', path: '/blog?category=case-studies' },
    //     { label: 'Podcast', path: '/blog?category=podcast' },
    //   ],
    // },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(
        menuRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
      
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      );

      gsap.fromTo(
        menuItemsRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2,
          ease: 'power2.out',
        }
      );

      gsap.to(toggleButtonRef.current, {
        rotation: 90,
        duration: 0.3,
        ease: 'power2.out',
      });

      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(menuRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
      });

      gsap.to(toggleButtonRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out',
      });

      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Fixed Header with Logo and Menu Toggle */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-3 lg:py-3.5">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center p-1.5 border-2 border-primary-800 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2"
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) gsap.to(img, { scale: 1.03, duration: 0.25, ease: 'power2.out' });
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) gsap.to(img, { scale: 1, duration: 0.25, ease: 'power2.out' });
              }}
            >
              <img
                src="/Logo/Logo.png"
                alt="Legaloids Law Offices"
                className="h-11 sm:h-12 lg:h-14 w-auto object-contain select-none"
              />
            </Link>

            <div className="flex items-center">
              {/* Menu Toggle Button - red to match sidebar/logo */}
              <button
                ref={toggleButtonRef}
                onClick={toggleMenu}
                className={`relative z-50 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg transition-all duration-200 border-2 ${
                  isMenuOpen
                    ? 'bg-primary-800 border-primary-800 text-white'
                    : 'bg-primary-800 border-primary-800 text-white hover:bg-primary-700 hover:border-primary-700'
                }`}
                aria-label="Toggle menu"
              >
                <div className="w-5 h-5 relative">
                  <span
                    className={`absolute left-0 w-full h-0.5 rounded-full bg-current transition-all duration-300 ${
                      isMenuOpen ? 'rotate-45 top-[9px]' : 'top-0'
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[9px] w-full h-0.5 rounded-full bg-current transition-all duration-300 ${
                      isMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`absolute left-0 w-full h-0.5 rounded-full bg-current transition-all duration-300 ${
                      isMenuOpen ? '-rotate-45 top-[9px]' : 'top-[17px]'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/50 z-40 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onClick={closeMenu}
      ></div>

      {/* Right Side Navigation Panel */}
      <nav
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-96 max-w-[90vw] bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 shadow-2xl z-[60] overflow-y-auto ${
          isMenuOpen ? '' : 'pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full px-5 py-6 pt-24 sm:p-10 sm:pt-28">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li
                key={index}
                ref={(el) => (menuItemsRef.current[index] = el)}
                className="relative"
              >
                {item.hasDropdown ? (
                  <div className="group">
                    <Link
                      to={item.path}
                      onClick={closeMenu}
                      className={`block px-6 py-3.5 text-white text-base font-medium rounded-md transition-all duration-300 hover:bg-primary-700/50 hover:translate-x-1 hover:shadow-md ${
                        isActive(item.path) ? 'bg-primary-700/60 shadow-md' : ''
                      }`}
                      onMouseEnter={(e) => {
                        gsap.to(e.target, {
                          x: 5,
                          scale: 1.02,
                          duration: 0.2,
                          ease: 'power2.out',
                        });
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.target, {
                          x: 0,
                          scale: 1,
                          duration: 0.2,
                          ease: 'power2.out',
                        });
                      }}
                    >
                      {item.label}
                      <span className="ml-2 inline-block">→</span>
                    </Link>
                    <ul className="ml-4 mt-2 space-y-1 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-96 transition-all duration-300">
                      {item.dropdownItems.map((dropdownItem, dIndex) => (
                        <li key={dIndex}>
                          <Link
                            to={dropdownItem.path}
                            onClick={closeMenu}
                            className="block px-4 py-2 text-primary-200 text-sm rounded-md hover:bg-primary-700 hover:text-white transition-all duration-200"
                          >
                            {dropdownItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={closeMenu}
                    className={`block px-6 py-3.5 text-white text-base font-medium rounded-md transition-all duration-300 hover:bg-primary-700/50 hover:translate-x-1 hover:shadow-md relative ${
                      isActive(item.path) ? 'bg-primary-700/60 shadow-md' : ''
                    }`}
                    onMouseEnter={(e) => {
                      gsap.to(e.target, {
                        x: 5,
                        scale: 1.02,
                        duration: 0.2,
                        ease: 'power2.out',
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.target, {
                        x: 0,
                        scale: 1,
                        duration: 0.2,
                        ease: 'power2.out',
                      });
                    }}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></span>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Contact Info Section */}
          <div className="mt-auto pt-10 border-t border-primary-700/50">
            <div className="space-y-5 text-primary-200">
              <div>
                <p className="text-sm font-semibold text-white mb-3 tracking-wide uppercase">Contact Us</p>
                <p className="text-sm leading-relaxed">Unit 410 – Tower - A, Enkay Towers</p>
                <p className="text-sm leading-relaxed">Phase V, Sector 19, Udyog Vihar, Gurugram</p>
              </div>
              <div>
                <a
                  href="tel:+918881668058"
                  className="text-sm hover:text-white transition-colors duration-200 block mb-1"
                >
                  088816 68058
                </a>
                <a
                  href="mailto:admin@legaloids.com"
                  className="text-sm hover:text-white transition-colors duration-200 block"
                >
                  admin@legaloids.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
