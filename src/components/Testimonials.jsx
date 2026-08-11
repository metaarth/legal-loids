import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PersonImage } from './PersonImage';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const sectionRef = useRef(null);
  const testimonialRef = useRef(null);

  const testimonials = [
    {
      image: '',
      name: 'Arjun Mehta',
      quote:
        'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
    },
    {
      image: '',
      name: 'Priya Sharma',
      quote:
        'Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
    },
    {
      image: '',
      name: 'Vikram Malhotra',
      quote:
        'Far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const testimonial = testimonialRef.current;

    if (section && testimonial) {
      gsap.fromTo(
        testimonial,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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

  useEffect(() => {
    if (testimonialRef.current) {
      gsap.fromTo(
        testimonialRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [currentTestimonial]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 px-2 break-words">
            What are the clients says
          </h2>
        </div>
        <div className="max-w-4xl mx-auto min-w-0">
          <div ref={testimonialRef} className="bg-white p-5 sm:p-8 md:p-12 rounded-2xl shadow-xl">
            <div className="text-center">
              <div className="mb-6">
                <PersonImage
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary-200 shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {testimonials[currentTestimonial].name}
              </h3>
              <blockquote className="text-lg text-gray-600 italic leading-relaxed">
                &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
              </blockquote>
            </div>
          </div>
          
          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-primary-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
