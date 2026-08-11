import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PersonImage } from './PersonImage';

gsap.registerPlugin(ScrollTrigger);

const Attorneys = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const founderWrapRef = useRef(null);
  const founderImgRef = useRef(null);
  const founderContentRef = useRef(null);
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  const attorneys = [
    {
      image: '/images/Sk.png',
      name: 'Shobhit Kulshrestha',
      role: 'Managing Partner',
      description:
        'Lawyer and Company Secretary specializing in banking, corporate laws, fintech, securities, and taxation. With thorough expertise in corporate practices, he navigates modern business policies effectively.',
    },
    {
      image: '/images/Anant.png',
      name: 'Anant Aggarwal',
      role: 'Senior Partner',
      description:
        'Advocate advising on corporate, commercial, and regulatory matters.',
    },
    {
      image: '/images/aj.png',
      name: 'A.J. Ashish',
      role: 'Partner',
      description:
        'Advocate focusing on DRT, NCLT, consumer, recovery suits, corporate insolvency, and due diligence.',
    },
    {
      image: '',
      name: 'Pradeep Kumar Kulshrestha',
      role: 'Senior Partner',
      description:
        'Practicing advocate with 34 years in banking and civil matters; heads Agra associate branch, paneled with major banks.',
    },
    {
      image: '',
      name: 'Aishwarya Mohan Gahrana',
      role: 'Senior Partner',
      description:
        'Expert in corporate advisory and litigation.',
    },
    {
      image: '',
      name: 'Rajiv Kumar Shrivastava',
      role: 'Senior Partner',
      description:
        'Specializes in commercial and financial law.',
    },
    {
      image: '',
      name: 'Raghav Chabra',
      role: 'Senior Partner',
      description:
        'Expert in commercial and civil litigation having 10+ years of experience.',
    },
    {
      image: '',
      name: 'Pallavi Tiwari',
      role: 'Associate Partner',
      description:
        'Focuses on customized legal strategies and client servicing.',
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const founderWrap = founderWrapRef.current;
    const founderImg = founderImgRef.current;
    const founderContent = founderContentRef.current;
    const cards = cardsRef.current;

    const ctx = gsap.context(() => {
      // Section header: fade + slide up on scroll
      if (header) {
        gsap.fromTo(
          header,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      }

      // Founder card: image from left, content from right, no rotation
      if (founderWrap && founderImg && founderContent) {
        gsap.set(founderImg, { x: -80, opacity: 0 });
        gsap.set(founderContent, { x: 60, opacity: 0 });
        gsap.to(founderImg, {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: { trigger: founderWrap, start: 'top 82%', toggleActions: 'play none none none' },
        });
        gsap.to(founderContent, {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power2.out',
          delay: 0.1,
          scrollTrigger: { trigger: founderWrap, start: 'top 82%', toggleActions: 'play none none none' },
        });
      }

      // Other people cards: staggered fade + slide up (no rotation)
      cards.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 56, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              delay: index * 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const founder = attorneys[0];
  const otherAttorneys = attorneys.slice(1);

  return (
    <section ref={sectionRef} className="py-8 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-6 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 px-2">Our Attorneys</h2>
          <p className="text-xs sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2 sm:px-4">
            Our team is focused on delivering commercial solutions to legal challenges. We understand the industries and sectors our clients operate in, applying years of experience to advise leading companies worldwide.
          </p>
        </div>

        {/* Founder – horizontal card with photo and social (larger) */}
        <div className="max-w-sm sm:max-w-2xl md:max-w-6xl mx-auto mb-8 sm:mb-16 md:mb-20">
          <div
            ref={founderWrapRef}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row group"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { y: -8, duration: 0.4, ease: 'power2.out' });
              const img = e.currentTarget.querySelector('.founder-img');
              if (img) gsap.to(img, { scale: 1.06, duration: 0.5, ease: 'power2.out' });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { y: 0, duration: 0.35, ease: 'power2.out' });
              const img = e.currentTarget.querySelector('.founder-img');
              if (img) gsap.to(img, { scale: 1, duration: 0.4, ease: 'power2.out' });
            }}
          >
            <div ref={founderImgRef} className="relative overflow-hidden flex-shrink-0 w-full md:w-2/5 aspect-[4/5] md:aspect-auto md:min-h-[380px]">
              <PersonImage
                src={founder.image}
                alt={founder.name}
                className="founder-img w-full h-full object-cover object-top will-change-transform"
              />
              <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/30 transition-colors duration-300" />
            </div>
            <div ref={founderContentRef} className="p-4 sm:p-6 md:p-10 lg:p-12 flex flex-col justify-center text-left">
              <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">{founder.name}</h3>
              <p className="text-sm sm:text-base md:text-xl text-primary-600 font-semibold mb-2 sm:mb-4">{founder.role}</p>
              <p className="text-xs sm:text-sm md:text-lg text-gray-600 mb-3 sm:mb-6 md:mb-8 line-clamp-4 sm:line-clamp-none">{founder.description}</p>
              <div className="flex justify-start">
                <a
                  href="https://www.linkedin.com/in/shobhit-kulshrestha-4a881617/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-100 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <span className="text-xs text-gray-600 hover:text-white transition-colors font-semibold">in</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Other attorneys – photo, name, role, and description */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {otherAttorneys.slice(0, isMobile ? 5 : otherAttorneys.length).map((attorney, index) => (
            <div
              key={attorney.name}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300"
              onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -6, duration: 0.3, ease: 'power2.out' })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, duration: 0.25, ease: 'power2.out' })}
            >
              <div className="relative w-full aspect-[4/5] max-h-80 sm:max-h-[22rem] overflow-hidden bg-gray-100">
                <PersonImage
                  src={attorney.image}
                  alt={attorney.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2">{attorney.name}</h3>
                <p className="text-primary-600 font-semibold text-sm sm:text-base mb-2">{attorney.role}</p>
                <p className="text-sm text-gray-600">{attorney.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Attorneys;
