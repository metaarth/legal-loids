import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  UserIcon, 
  BuildingOfficeIcon, 
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

const Counter = () => {
  const [counters, setCounters] = useState([
    { 
      value: 0, 
      target: 15, 
      label: 'Lawyers', 
      icon: UserIcon 
    },
    { 
      value: 0, 
      target: 300, 
      label: 'Clients', 
      icon: BuildingOfficeIcon 
    },
    { 
      value: 0, 
      target: 1100, 
      label: 'Legal & Compliance Advisories', 
      icon: DocumentTextIcon 
    },
  ]);
  const counterRef = useRef(null);
  const itemsRef = useRef([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            // Animate counter items
            itemsRef.current.forEach((item, index) => {
              if (item) {
                gsap.fromTo(
                  item,
                  { y: 50, opacity: 0, scale: 0.8 },
                  {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'back.out(1.7)',
                  }
                );
              }
            });

            // Animate counters
            counters.forEach((counter, index) => {
              const duration = 2;
              const steps = 60;
              const increment = counter.target / steps;
              let current = 0;

              const timer = setInterval(() => {
                current += increment;
                if (current >= counter.target) {
                  setCounters((prev) => {
                    const updated = [...prev];
                    updated[index].value = counter.target;
                    return updated;
                  });
                  clearInterval(timer);
                } else {
                  setCounters((prev) => {
                    const updated = [...prev];
                    updated[index].value = Math.floor(current);
                    return updated;
                  });
                }
              }, (duration * 1000) / steps);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={counterRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/images/blog-4.jpg)' }}
    >
      <div className="absolute inset-0 bg-primary-900/85"></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16">
          {counters.map((counter, index) => {
            const IconComponent = counter.icon;
            return (
              <div
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                className="text-center text-white"
              >
                <div className="flex justify-center mb-3 sm:mb-4 md:mb-6 transform hover:scale-105 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white/90" strokeWidth={1.5} />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-2 sm:mb-3 text-white tracking-tight">
                  {counter.value.toLocaleString()}+
                </div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white/90 uppercase tracking-wider break-words text-balance px-1 max-w-full mx-auto">
                  {counter.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Counter;
