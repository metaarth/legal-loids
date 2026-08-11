import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const playButtonRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const content = contentRef.current;
    const playButton = playButtonRef.current;

    if (section && video && content && playButton) {
      gsap.fromTo(
        video,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
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

      gsap.fromTo(
        playButton,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        content.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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

  const handleVideoClick = (e) => {
    e.preventDefault();
    gsap.to(playButtonRef.current, {
      scale: 0.8,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
    window.open('https://vimeo.com/channels/staffpicks/93951774', '_blank');
  };

  return (
    <section ref={sectionRef} className="relative py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div
          ref={videoRef}
          className="relative min-h-[16rem] h-64 sm:h-96 lg:h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/blog-4.jpg)' }}
        >
          <div className="absolute inset-0 bg-primary-900/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              ref={playButtonRef}
              onClick={handleVideoClick}
              className="w-20 h-20 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 group"
              onMouseEnter={(e) => {
                gsap.to(e.target, { scale: 1.1, rotation: 360, duration: 0.5 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.target, { scale: 1, rotation: 0, duration: 0.5 });
              }}
            >
              <svg
                className="w-10 h-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={contentRef}
          className="bg-gray-50 flex items-center p-5 sm:p-8 lg:p-16 min-w-0"
        >
          <div className="space-y-4 sm:space-y-6 min-w-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 break-words">
              Far far away, behind the word mountains
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind
              texts far from the countries Vokalia and Consonantia, there live the blind texts.
            </p>
            <button
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              onMouseEnter={(e) => {
                gsap.to(e.target, { scale: 1.05, x: 5, duration: 0.2 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.target, { scale: 1, x: 0, duration: 0.2 });
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
