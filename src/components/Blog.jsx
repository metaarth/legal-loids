import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  const blogPosts = [
    {
      image: '/images/blog-1.jpg',
      title: 'Far from the countries Vokalia and Consonantia',
      date: 'Jan 5, 2017',
      comments: 3,
      excerpt: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however',
    },
    {
      image: '/images/blog-2.jpg',
      title: 'Far from the countries Vokalia and Consonantia',
      date: 'Jan 5, 2017',
      comments: 3,
      excerpt: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however',
    },
    {
      image: '/images/blog-3.jpg',
      title: 'Far from the countries Vokalia and Consonantia',
      date: 'Jan 5, 2017',
      comments: 3,
      excerpt: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however',
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
    const cards = cardsRef.current;
    
    cards.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
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
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">Recent Post</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life
            One day however
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {blogPosts.slice(0, isMobile ? 6 : blogPosts.length).map((post, index) => (
            <article
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 group"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.02,
                  y: -10,
                  duration: 0.3,
                  ease: 'power2.out',
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  y: 0,
                  duration: 0.3,
                  ease: 'power2.out',
                });
              }}
            >
              <Link to="/blog-single">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/20 transition-colors duration-300"></div>
                </div>
              </Link>
              <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2 sm:line-clamp-none">
                  <Link to="/blog-single">{post.title}</Link>
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-2 sm:mb-3 md:mb-4">
                  <span>{post.date}</span> | <span>{post.comments} Comments</span>
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-3 md:line-clamp-none">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
