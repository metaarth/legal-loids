import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BuildingOfficeIcon,
  LockClosedIcon,
  BriefcaseIcon,
  ScaleIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

const PracticeAreas = ({ title, description, showViewMore = false }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  const practiceAreas = [
    {
      icon: BriefcaseIcon,
      title: 'General Corporate Advisory & Legal Drafting',
      description: 'Expert guidance on company incorporation, filings, compliances, due diligence, and business development. We draft board and shareholder resolutions, negotiate deals, and ensure adherence to corporate laws, SEBI regulations, and RBI requirements.',
    },
    {
      icon: ScaleIcon,
      title: 'Commercial & Civil Litigation',
      description: 'Our litigation practice covers civil disputes, domestic and international arbitrations, statutory proceedings, and criminal matters in a corporate context. We formulate strategies for foreign investments, transactions, and resolutions.',
    },
    {
      icon: LockClosedIcon,
      title: 'Banking & Finance',
      description: 'We advise on full-spectrum financing transactions, including corporate facilities, leveraged finance, derivatives, trade finance, project finance, asset finance, and restructurings. Our team secures governmental approvals and coordinates with regulators.',
    },
  ];

  const extendedPracticeAreas = [
    ...practiceAreas,
    {
      icon: LockClosedIcon,
      title: 'Corporate Criminal Matters',
      description: 'Specializing in white-collar crime, anti-corruption, and ethical practices, we conduct investigations, pre-investment due diligence, compliance workshops, and litigation.',
    },
    {
      icon: HeartIcon,
      title: 'Intellectual Property Rights',
      description: 'Our IP practice encompasses prosecution, enforcement, transactions, and litigation for patents, trademarks, copyrights, designs, geographical indications, and domain names.',
    },
    {
      icon: BriefcaseIcon,
      title: 'Mergers and Acquisitions',
      description: 'We guide clients through M&A transactions, spin-offs, reorganizations, entry strategies, fund formations, and tax-efficient structures. Our advisory includes private equity deals and cross-border taxation.',
    },
    {
      icon: BuildingOfficeIcon,
      title: 'Information Technology and Cyber Crimes',
      description: 'We advise on the Information Technology Act, blockchain, RBI guidelines, big data, cryptocurrencies, and cyber crimes. Services include compliance, dispute resolution, and protection against digital threats.',
    },
    {
      icon: ScaleIcon,
      title: 'Taxation Laws',
      description: 'Excelling in direct and indirect taxation, we provide advisory on corporate tax, M&A tax, international taxation, private client trusts, estate planning, and disputes.',
    },
    {
      icon: HeartIcon,
      title: 'Real Estate Laws',
      description: 'Comprehensive support for property transactions, including vetting, drafting, registrations, title searches, due diligence for builders, and disputes resolution.',
    },
  ];

  const areasToShow = showViewMore ? extendedPracticeAreas : practiceAreas;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const cards = cardsRef.current;
    
    cards.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  }, [areasToShow]);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-semibold text-primary-600 uppercase tracking-wider">Our Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">{title}</h2>
            {description && (
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">{description}</p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          {areasToShow.slice(0, isMobile ? 6 : areasToShow.length).map((area, index) => {
            const IconComponent = area.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group bg-white p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200 transform hover:-translate-y-1"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    y: -4,
                    duration: 0.3,
                    ease: 'power2.out',
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                  });
                }}
              >
                <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 transform group-hover:scale-105 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-primary-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2 sm:line-clamp-none">
                  {area.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-[10px] sm:text-xs md:text-sm line-clamp-2 sm:line-clamp-3 md:line-clamp-none">{area.description}</p>
              </div>
            );
          })}
        </div>
        {showViewMore && (
          <div className="text-center mt-8 sm:mt-12 md:mt-16">
            <button
              className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm font-semibold rounded-md shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 inline-flex items-center gap-2 uppercase tracking-wide"
              onMouseEnter={(e) => {
                gsap.to(e.target, { scale: 1.02, x: 2, duration: 0.2 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.target, { scale: 1, x: 0, duration: 0.2 });
              }}
            >
              View All Practice Areas
              <span className="inline-block transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PracticeAreas;
