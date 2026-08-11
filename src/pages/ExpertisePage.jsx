import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BuildingOfficeIcon,
  ArrowsRightLeftIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UsersIcon,
  LockClosedIcon,
  ComputerDesktopIcon,
  BriefcaseIcon,
  ScaleIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import GoToTop from '../components/GoToTop';

gsap.registerPlugin(ScrollTrigger);

const ExpertisePage = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const industriesRef = useRef(null);
  const cardsRef = useRef([]);
  const industryCardsRef = useRef([]);
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

  useEffect(() => {
    const cards = cardsRef.current;
    
    cards.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: index * 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  }, []);

  useEffect(() => {
    const industryCards = industryCardsRef.current;
    
    industryCards.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  }, []);

  const services = [
    {
      icon: BriefcaseIcon,
      title: 'General Corporate Advisory & Legal Drafting',
      description: 'Expert guidance on company incorporation, filings, compliances, due diligence, and business development. We draft board and shareholder resolutions, negotiate deals, and ensure adherence to corporate laws, SEBI regulations, and RBI requirements.',
      color: 'bg-primary-50 border-primary-200',
      iconColor: 'text-primary-600',
    },
    {
      icon: ScaleIcon,
      title: 'Commercial & Civil Litigation',
      description: 'Our litigation practice covers civil disputes, domestic and international arbitrations, statutory proceedings, and criminal matters in a corporate context. We formulate strategies for foreign investments, transactions, and resolutions.',
      color: 'bg-primary-50 border-primary-200',
      iconColor: 'text-primary-600',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Banking & Finance',
      description: 'We advise on full-spectrum financing transactions, including corporate facilities, leveraged finance, derivatives, trade finance, project finance, asset finance, and restructurings. Our team secures governmental approvals and coordinates with regulators.',
      color: 'bg-primary-50 border-primary-200',
      iconColor: 'text-primary-600',
    },
    {
      icon: LockClosedIcon,
      title: 'Corporate Criminal Matters',
      description: 'Specializing in white-collar crime, anti-corruption, and ethical practices, we conduct investigations, pre-investment due diligence, compliance workshops, and litigation. Our experience includes advising multinational corporations on fraud and financial crime.',
      color: 'bg-primary-50 border-primary-200',
      iconColor: 'text-primary-600',
    },
    {
      icon: DocumentTextIcon,
      title: 'Intellectual Property Rights',
      description: 'Our IP practice encompasses prosecution, enforcement, transactions, and litigation for patents, trademarks, copyrights, designs, geographical indications, and domain names. We handle licensing, assignments, franchising, and renewals.',
      color: 'bg-primary-50 border-primary-200',
      iconColor: 'text-primary-600',
    },
    {
      icon: ArrowsRightLeftIcon,
      title: 'Mergers and Acquisitions',
      description: 'We guide clients through M&A transactions, spin-offs, reorganizations, entry strategies, fund formations, and tax-efficient structures. Our advisory includes private equity deals, transfer pricing, and cross-border taxation.',
      color: 'bg-primary-50 border-primary-200',
      iconColor: 'text-primary-600',
    },
    {
      icon: ComputerDesktopIcon,
      title: 'Information Technology and Cyber Crimes',
      description: 'With India\'s booming IT sector, we advise on the Information Technology Act, blockchain, RBI guidelines, big data, cryptocurrencies, and cyber crimes. Services include compliance, dispute resolution, and protection against digital threats.',
      color: 'bg-primary-50 border-primary-200',
      iconColor: 'text-primary-600',
    },
    {
      icon: WrenchScrewdriverIcon,
      title: 'Corporate Legal Services Outsourcing',
      description: 'We offer outsourced legal support for startups and enterprises, handling day-to-day agreements, compliances, funding rounds, and regulatory filings like income tax returns, digital signatures, TIN, and DIN.',
      color: 'bg-primary-50 border-primary-200',
      iconColor: 'text-primary-600',
    },
    {
      icon: UsersIcon,
      title: 'Labour Laws',
      description: 'Our dedicated practice manages employment agreements, consultant engagements, executive compensation, statutory compliances, HR policies, disputes, employee claims, ESOPs, and industrial relations. We advise on restructurings and terminations.',
      color: 'bg-primary-50 border-primary-200',
      iconColor: 'text-primary-600',
    },
    {
      icon: ChartBarIcon,
      title: 'Taxation Laws',
      description: 'Excelling in direct and indirect taxation, we provide advisory on corporate tax, M&A tax, international taxation, private client trusts, estate planning, and disputes. Services include advance rulings, VAT, service tax, SEZs, and export incentives.',
      color: 'bg-primary-50 border-primary-200',
      iconColor: 'text-primary-600',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Customized Legal Services',
      description: 'Tailored solutions for unique needs, including due diligence, insurance sector advisory, education law, hospitality, property laws, environment law (NGT disputes, CSR), and infrastructure (RERA, title clearance).',
      color: 'bg-primary-50 border-primary-200',
      iconColor: 'text-primary-600',
    },
    {
      icon: HomeIcon,
      title: 'Real Estate Laws',
      description: 'Comprehensive support for property transactions, including vetting, drafting, registrations, title searches, due diligence for builders, and disputes resolution.',
      color: 'bg-primary-50 border-primary-200',
      iconColor: 'text-primary-600',
    },
  ];

  const industries = [
    {
      name: 'Automotive',
      description: 'Specialized legal support for contracts, IP protection, and regulatory compliance in the automotive sector.',
    },
    {
      name: 'Banking',
      description: 'Consulting covers banking regulations, finance transactions, and debt recovery for financial institutions.',
    },
    {
      name: 'Energy & Utilities',
      description: 'Advising on project finance, environmental compliance, and infrastructure deals for energy and utility companies.',
    },
    {
      name: 'Fintech',
      description: 'Specializing in RBI guidelines, blockchain, cryptocurrencies, and data privacy for fintech companies.',
    },
    {
      name: 'Healthcare',
      description: 'Services include regulatory approvals, M&A, and compliance with health laws for healthcare organizations.',
    },
    {
      name: 'Industrials',
      description: 'Handling corporate transactions, labour issues, and supply chain legalities for industrial companies.',
    },
    {
      name: 'Infrastructure & Transport',
      description: 'Providing advisory on public-private partnerships, contracts, and disputes for infrastructure projects.',
    },
    {
      name: 'Robotics',
      description: 'IP and tech law expertise supporting innovation and commercialization in robotics and automation.',
    },
    {
      name: 'Telecoms',
      description: 'Advising on licensing, data protection, and mergers for telecommunications companies.',
    },
  ];

  const whyChooseUs = [
    {
      title: 'Multidisciplinary Team',
      description: 'Our team of lawyers, company secretaries, and chartered accountants combines deep industry knowledge with strategic insights.',
    },
    {
      title: 'Full-Service Approach',
      description: 'From corporate advisory to litigation, we provide end-to-end legal solutions tailored to your business needs.',
    },
    {
      title: 'Industry Expertise',
      description: 'We understand the industries and sectors our clients operate in, applying years of experience to advise leading companies.',
    },
    {
      title: 'Strategic Partnerships',
      description: 'We focus on long-term partnerships, providing personalized service with commercial acumen.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[60vh] sm:h-[65vh] md:h-[70vh] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold text-primary-200 uppercase tracking-wider">Our Expertise</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight px-2">
            Comprehensive Legal Consulting
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 max-w-4xl mx-auto mb-4 sm:mb-6 leading-relaxed px-4">
            Delivering integrated legal solutions tailored to complex commercial challenges
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed px-4">
            Legaloids Law Offices provides comprehensive legal consulting services across key practice areas, designed to support businesses at every stage. Our expertise spans corporate governance, dispute resolution, regulatory compliance, and specialized sector advisory.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
              Expert Legal Solutions for Modern Business
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 px-4">
              As a trusted partner for businesses in India and internationally, we deliver integrated legal solutions tailored to complex commercial challenges. Our multidisciplinary team combines deep industry knowledge with strategic insights to drive client success.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mt-6 sm:mt-8 md:mt-12">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="text-center px-2 sm:px-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-primary-600 rounded-full"></div>
                  </div>
                  <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-semibold text-primary-600 uppercase tracking-wider">Our Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
              Practice Areas
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Explore our comprehensive range of legal services, optimized for international standards and client-centric outcomes
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-6 lg:gap-8">
            {services.slice(0, isMobile ? 6 : services.length).map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className={`bg-white rounded-lg border-2 ${service.color} p-3 sm:p-4 md:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group`}
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
                  <div className={`mb-2 sm:mb-3 md:mb-5 lg:mb-6 transform group-hover:scale-110 transition-transform duration-300 ${service.iconColor}`}>
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 group-hover:text-primary-600 transition-colors duration-300 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-[10px] sm:text-xs md:text-sm line-clamp-3 sm:line-clamp-none">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section ref={industriesRef} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-semibold text-primary-600 uppercase tracking-wider">Industries</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
              Industries We Serve
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Legaloids Law Offices partners with diverse industries, providing sector-specific legal consulting to navigate regulatory complexities and drive growth
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-5 lg:gap-6">
            {industries.slice(0, isMobile ? 6 : industries.length).map((industry, index) => (
              <div
                key={index}
                ref={(el) => (industryCardsRef.current[index] = el)}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out',
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                  });
                }}
              >
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 md:mb-3">{industry.name}</h3>
                <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight px-4">
              Our Approach
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed mb-6 sm:mb-8 px-4">
              Our approach emphasizes thorough due diligence, strategic planning, and proactive risk management to resolve issues without litigation whenever possible. However, we are prepared to aggressively advocate for our clients' rights in court if necessary.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
              <div className="text-center px-4">
                <div className="text-3xl sm:text-4xl font-bold text-primary-200 mb-2">1</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Strategic Planning</h3>
                <p className="text-gray-300 text-xs sm:text-sm">Comprehensive analysis and strategic planning for optimal outcomes</p>
              </div>
              <div className="text-center px-4">
                <div className="text-3xl sm:text-4xl font-bold text-primary-200 mb-2">2</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Risk Management</h3>
                <p className="text-gray-300 text-xs sm:text-sm">Proactive risk identification and mitigation strategies</p>
              </div>
              <div className="text-center px-4">
                <div className="text-3xl sm:text-4xl font-bold text-primary-200 mb-2">3</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Client Advocacy</h3>
                <p className="text-gray-300 text-xs sm:text-sm">Aggressive representation when litigation becomes necessary</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 text-white shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              Ready to Discuss Your Legal Needs?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
              Our experienced legal team is here to provide strategic counsel and comprehensive solutions tailored to your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                to="/contact"
                className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-white text-primary-600 font-semibold rounded-md shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 uppercase tracking-wide text-xs sm:text-sm"
              >
                Schedule Consultation
              </Link>
              <Link
                to="/practice"
                className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-primary-800 text-white font-semibold rounded-md shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 uppercase tracking-wide text-xs sm:text-sm border-2 border-white/20"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GoToTop />
    </>
  );
};

export default ExpertisePage;
