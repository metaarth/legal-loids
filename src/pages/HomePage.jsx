import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoToTop from '../components/GoToTop';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const [activeSection, setActiveSection] = useState(0);
  const [previousSection, setPreviousSection] = useState(0);
  const scrollDirectionRef = useRef('down'); // Track scroll direction
  const lastSectionChangeRef = useRef(0);   // Cooldown: one section per scroll gesture
  const scrollLockRef = useRef(false);      // Block second event in same gesture

  const sections = [
    {
      id: 'hero',
      label: 'Home',
      image: '/images/hero_1.jpg',
      title: 'Premier Business Law Consulting Firm',
      subtitle: 'Delivering integrated legal solutions tailored to complex commercial challenges',
      description:
        'Legaloids Law Offices is a leading boutique consulting firm specializing in corporate law, litigation, and advisory services. As a trusted partner for businesses in India and internationally.',
      buttonText: 'Schedule Consultation',
      buttonLink: '/contact',
    },
    {
      id: 'about',
      label: 'About',
      image: '/images/hero_2.jpg',
      title: 'Excellence in Legal Practice',
      subtitle: 'Multidisciplinary team combining deep industry knowledge with strategic insights',
      description:
        'Our team of lawyers, company secretaries, and chartered accountants combines deep industry knowledge with strategic insights to drive client success.',
      buttonText: 'Learn More About Us',
      buttonLink: '/about',
    },
    {
      id: 'services',
      label: 'Services',
      image: '/images/hero_3.jpg',
      title: 'Comprehensive Legal Services',
      subtitle: 'Supporting businesses at every stage with expert legal consulting',
      description:
        'Our expertise spans corporate governance, dispute resolution, regulatory compliance, and specialized sector advisory. We provide end-to-end legal solutions tailored to your business needs.',
      buttonText: 'View Our Services',
      buttonLink: '/expertise',
    },
    {
      id: 'team',
      label: 'Team',
      image: '/images/blog-4.jpg',
      title: 'Experienced Legal Professionals',
      subtitle: 'Selected from the best talent, our professionals thrive in a stimulating environment',
      description:
        'Our team is focused on delivering commercial solutions to legal challenges. We understand the industries and sectors our clients operate in, applying years of experience to advise leading companies worldwide.',
      buttonText: 'Meet Our Team',
      buttonLink: '/people',
    },
    {
      id: 'contact',
      label: 'Contact',
      image: '/images/hero_1.jpg',
      title: 'Ready to Discuss Your Legal Needs?',
      subtitle: 'Our experienced legal team is here to provide strategic counsel',
      description:
        'Schedule a consultation today and discover how we can help protect your interests and guide you toward success with comprehensive legal solutions.',
      buttonText: 'Contact Us',
      buttonLink: '/contact',
    },
  ];

  // Initialize all slides on mount
  useEffect(() => {
    // Check if device is mobile
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                           ('ontouchstart' in window) || 
                           (navigator.maxTouchPoints > 0);
    
    slidesRef.current.forEach((slide, index) => {
      if (slide) {
        if (isMobileDevice) {
          // On mobile: all slides should be visible
          gsap.set(slide, { opacity: 1, y: 0 });
        } else {
          // On desktop: only first slide visible
          if (index === 0) {
            gsap.set(slide, { opacity: 1, y: 0 });
          } else {
            gsap.set(slide, { opacity: 0, y: 0 });
          }
        }
      }
    });
  }, []);

  // Change slide on each scroll (wheel) step - desktop only
  useEffect(() => {
    // Check if device is mobile/touch device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);

    // On mobile, allow normal scrolling - don't add wheel handler
    if (isMobile) {
      return;
    }

    const COOLDOWN_MS = 800; // One section per scroll — wait for gesture to finish

    const handleWheel = (event) => {
      event.preventDefault();

      if (scrollLockRef.current) return;

      const now = Date.now();
      if (now - lastSectionChangeRef.current < COOLDOWN_MS) return;

      const delta = event.deltaY;
      if (Math.abs(delta) < 15) return; // Ignore tiny jitters

      scrollLockRef.current = true;
      lastSectionChangeRef.current = now;
      setTimeout(() => { scrollLockRef.current = false; }, COOLDOWN_MS);

      if (delta > 0) {
        scrollDirectionRef.current = 'down';
        setActiveSection((prev) =>
          prev < sections.length - 1 ? prev + 1 : prev
        );
      } else {
        scrollDirectionRef.current = 'up';
        setActiveSection((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [sections.length]);

  useEffect(() => {
    // Store the previous active section before it changes
    const prevSection = previousSection;
    
    // Check if device is mobile
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                           ('ontouchstart' in window) || 
                           (navigator.maxTouchPoints > 0);
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      const currentSlide = slidesRef.current[activeSection];
      const previousSlide = slidesRef.current[prevSection];
      
      if (!currentSlide) return;

      // On mobile: skip image animations, only animate content
      if (isMobileDevice) {
        // Ensure all slides are visible on mobile (no opacity 0)
        slidesRef.current.forEach((slide) => {
          if (slide) {
            gsap.set(slide, { opacity: 1, y: 0 });
          }
        });

        // Get current slide content elements
        const title = currentSlide.querySelector('.section-title');
        const subtitle = currentSlide.querySelector('.section-subtitle');
        const description = currentSlide.querySelector('.section-description');
        const button = currentSlide.querySelector('.section-button');
        const textElements = [title, subtitle, description].filter(Boolean);

        // Kill any existing animations on current slide content
        gsap.killTweensOf([...textElements, button].filter(Boolean));

        // Animate content only on mobile
        const elementStartY = 30;
        gsap.fromTo(
          textElements,
          { opacity: 0, y: elementStartY },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.15,
            immediateRender: false,
          }
        );

        // Animate the button
        if (button) {
          gsap.fromTo(
            button,
            { opacity: 0, y: elementStartY },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              immediateRender: false,
              delay: 0.35,
            }
          );
        }

        // Update previous section state
        setPreviousSection(activeSection);
        return;
      }

      // Desktop animations (existing code)
      // Determine animation direction based on scroll direction
      const isScrollingDown = scrollDirectionRef.current === 'down';
      const slideStartY = isScrollingDown ? -200 : 200;
      const slideEndY = isScrollingDown ? 200 : -200;
      const elementStartY = isScrollingDown ? -60 : 60;
      const elementEndY = isScrollingDown ? 60 : -60;

      // Animate the exiting slide out (if it exists and is different from current)
      if (previousSlide && prevSection !== activeSection) {
        const prevTitle = previousSlide.querySelector('.section-title');
        const prevSubtitle = previousSlide.querySelector('.section-subtitle');
        const prevDescription = previousSlide.querySelector('.section-description');
        const prevButton = previousSlide.querySelector('.section-button');
        const prevElements = [prevTitle, prevSubtitle, prevDescription, prevButton].filter(Boolean);

        // Kill any existing animations on the previous slide
        gsap.killTweensOf([previousSlide, ...prevElements]);

        // Animate the previous slide out (clean, sharp transition)
        gsap.to(previousSlide, {
          opacity: 0,
          y: slideEndY,
          duration: 0.6,
          ease: 'power3.in',
        });

        // Animate the previous slide's content out (faster)
        gsap.to(prevElements, {
          opacity: 0,
          y: elementEndY,
          duration: 1.0,
          ease: 'power2.out',
          stagger: 0.1,
        });
      }

      // Reset and prepare inactive slides (excluding previous and current)
      slidesRef.current.forEach((slide, index) => {
        if (slide && index !== activeSection && index !== prevSection) {
          const title = slide.querySelector('.section-title');
          const subtitle = slide.querySelector('.section-subtitle');
          const description = slide.querySelector('.section-description');
          const button = slide.querySelector('.section-button');
          const elements = [title, subtitle, description, button].filter(Boolean);
          
          gsap.killTweensOf([slide, ...elements]);
          gsap.set(slide, { opacity: 0, y: 0 });
          gsap.set(elements, { opacity: 0, y: 0 });
        }
      });

      // Get current slide elements
      const title = currentSlide.querySelector('.section-title');
      const subtitle = currentSlide.querySelector('.section-subtitle');
      const description = currentSlide.querySelector('.section-description');
      const button = currentSlide.querySelector('.section-button');
      const textElements = [title, subtitle, description].filter(Boolean);
      const allElements = [title, subtitle, description, button].filter(Boolean);

      // Kill any existing animations on current slide
      gsap.killTweensOf([currentSlide, ...allElements]);

      // Animate the current slide in (clean, sharp image transition)
      gsap.fromTo(
        currentSlide,
        { opacity: 0, y: slideStartY },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          immediateRender: false,
        }
      );

      // Content appears fast once image is visible
      gsap.fromTo(
        textElements,
        { opacity: 0, y: elementStartY },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.15,
          immediateRender: false,
        }
      );

      // Animate the button quickly after content
      if (button) {
        gsap.fromTo(
          button,
          { opacity: 0, y: elementStartY },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            immediateRender: false,
          }
        );
      }

      // Update previous section state
      setPreviousSection(activeSection);
    });
  }, [activeSection]);

  // Check if device is mobile for conditional rendering
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <div 
        ref={containerRef} 
        className={`relative w-full min-w-0 overflow-x-hidden ${isMobile ? 'overflow-y-auto bg-black' : 'overflow-hidden min-h-screen'}`}
        style={isMobile ? { minHeight: `${sections.length * 100}vh` } : {}}
      >
        {/* Right-side tracker */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
          <div className="relative">
            {/* Labels and indicators container */}
            <div className="relative flex flex-col space-y-10 pr-6">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className="relative flex items-center justify-between gap-4 group w-full"
                  style={{ minWidth: '120px' }}
                >
                  {/* Label on the left */}
                  <span
                    className={`transition-all duration-300 whitespace-nowrap ${
                      activeSection === index
                        ? 'text-white font-bold text-lg'
                        : 'text-white/50 text-sm font-normal group-hover:text-white/70'
                    }`}
                  >
                    {section.label}
                  </span>
                  
                  {/* Indicator container - positioned to align with line */}
                  <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: '1.5rem', height: '1.5rem' }}>
                    {/* Active indicator - bullseye effect */}
                    {activeSection === index ? (
                      <>
                        {/* Outer ring (larger) */}
                        <div className="absolute w-4 h-4 rounded-full border border-white" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
                        {/* Inner solid circle (smaller) */}
                        <div className="absolute w-2 h-2 rounded-full bg-white" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
                      </>
                    ) : (
                      /* Inactive indicator - simple outlined circle */
                      <div className="w-3 h-3 rounded-full border border-white/50 group-hover:border-white/70 transition-all duration-300" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Continuous vertical line through center of all indicators */}
            <div 
              className="absolute w-px bg-white"
              style={{ 
                right: '0.75rem',
                top: '0.75rem',
                bottom: '0.75rem',
              }} 
            />
          </div>
        </div>

        {/* Slides on same screen */}
        {sections.map((section, index) => (
          <section
            key={section.id}
            ref={(el) => (slidesRef.current[index] = el)}
            className={`${isMobile ? 'relative min-h-screen w-full min-w-0' : 'absolute inset-0 w-full min-w-0'} ${
              activeSection === index 
                ? 'z-10' 
                : previousSection === index 
                  ? 'z-5' 
                  : isMobile ? 'z-0' : 'z-0 pointer-events-none'
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat bg-black`}
              style={{ backgroundImage: `url(${section.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
            </div>

            <div className={`relative z-10 ${isMobile ? 'min-h-screen' : 'min-h-screen'} flex items-center justify-center py-12 md:py-0`}>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto text-center text-white min-w-0 px-1">
                  <div className="space-y-4 sm:space-y-6 md:space-y-8 break-words">
                    <h1 className="section-title text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight tracking-tight px-3 sm:px-4">
                      {section.title}
                    </h1>
                    <h2 className="section-subtitle text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 font-light max-w-3xl mx-auto leading-relaxed px-4">
                      {section.subtitle}
                    </h2>
                    <p className="section-description text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed px-4">
                      {section.description}
                    </p>
                    <div className="pt-2 sm:pt-4 px-4">
                      <Link
                        to={section.buttonLink}
                        className="section-button inline-block px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm font-semibold rounded-md shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 tracking-wide uppercase"
                      >
                        {section.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <GoToTop />
    </>
  );
};

export default HomePage;
