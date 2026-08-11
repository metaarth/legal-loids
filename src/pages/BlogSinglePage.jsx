import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IntroSection from '../components/IntroSection';
import GoToTop from '../components/GoToTop';
import { PersonImage } from '../components/PersonImage';

gsap.registerPlugin(ScrollTrigger);

const BlogSinglePage = () => {
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    website: '',
    message: '',
  });
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, []);

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log('Comment submitted:', commentForm);
    setCommentForm({
      name: '',
      email: '',
      website: '',
      message: '',
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[40vh] h-[50vh] sm:h-[60vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero_3.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white px-2">
          <div className="container mx-auto px-4 text-center min-w-0">
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 break-words leading-tight">
              Lorem ipsum dolor sit amet
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-gray-200">February 12, 2020 • by Colorlib</p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section ref={contentRef} className="py-10 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8 min-w-0">
              <div className="max-w-none overflow-x-auto text-sm sm:text-base md:text-lg space-y-4 sm:space-y-6 [&_p]:text-gray-600 [&_p]:leading-relaxed">
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium">
                  Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
                </p>

                <blockquote className="border-l-4 border-primary-600 pl-6 py-4 my-8 bg-gray-50 italic text-gray-700">
                  Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.
                </blockquote>

                <p className="text-gray-600 leading-relaxed">
                  The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn't listen. She packed her seven versalia, put her initial into the belt and made herself on the way.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
                </p>
              </div>

              {/* Categories and Tags */}
              <div className="pt-8 border-t border-gray-200">
                <p className="text-gray-600">
                  Categories:{' '}
                  <Link to="/blog" className="text-primary-600 hover:text-primary-700">Design</Link>,{' '}
                  <Link to="/blog" className="text-primary-600 hover:text-primary-700">Events</Link>
                  {' '}Tags:{' '}
                  <Link to="/blog" className="text-primary-600 hover:text-primary-700">#html</Link>,{' '}
                  <Link to="/blog" className="text-primary-600 hover:text-primary-700">#trends</Link>
                </p>
              </div>

              {/* Comments Section */}
              <div className="pt-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">6 Comments</h3>
                <div className="space-y-8">
                  {/* Comment 1 */}
                  <div className="flex gap-3 sm:gap-4 min-w-0">
                    <img src="/images/person_2.jpg" alt="Jacob Smith" className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 mb-1">Jacob Smith</h4>
                      <p className="text-sm text-gray-500 mb-3">January 9, 2018 at 2:21pm</p>
                      <p className="text-gray-600 mb-3">When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove...</p>
                      <button className="text-primary-600 hover:text-primary-700 font-semibold">Reply</button>
                    </div>
                  </div>

                  {/* Comment 2 with nested */}
                  <div className="flex gap-3 sm:gap-4 min-w-0">
                    <img src="/images/person_3.jpg" alt="Chris Meyer" className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 mb-1">Chris Meyer</h4>
                      <p className="text-sm text-gray-500 mb-3">January 9, 2018 at 2:21pm</p>
                      <p className="text-gray-600 mb-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                      <button className="text-primary-600 hover:text-primary-700 font-semibold">Reply</button>

                      {/* Nested Comment */}
                      <div className="mt-6 ml-0 sm:ml-8 pl-4 sm:pl-6 border-l-2 border-gray-200 min-w-0">
                        <div className="flex gap-3 sm:gap-4 min-w-0">
                          <img src="/images/person_5.jpg" alt="Chintan Patel" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full object-cover" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 mb-1">Chintan Patel</h4>
                            <p className="text-sm text-gray-500 mb-3">January 9, 2018 at 2:21pm</p>
                            <p className="text-gray-600 mb-3">Far far away, behind the word mountains...</p>
                            <button className="text-primary-600 hover:text-primary-700 font-semibold">Reply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comment 3 */}
                  <div className="flex gap-3 sm:gap-4 min-w-0">
                    <img src="/images/person_1.jpg" alt="Jean Doe" className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 mb-1">Jean Doe</h4>
                      <p className="text-sm text-gray-500 mb-3">January 9, 2018 at 2:21pm</p>
                      <p className="text-gray-600 mb-3">Even the all-powerful Pointing has no control about the blind texts...</p>
                      <button className="text-primary-600 hover:text-primary-700 font-semibold">Reply</button>
                    </div>
                  </div>
                </div>

                {/* Comment Form */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Leave a comment</h3>
                  <form onSubmit={handleCommentSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={commentForm.name}
                          onChange={handleCommentChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={commentForm.email}
                          onChange={handleCommentChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={commentForm.website}
                        onChange={handleCommentChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows="6"
                        value={commentForm.message}
                        onChange={handleCommentChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Post Comment
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6 sm:space-y-8 min-w-0">
              {/* Search */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <form className="relative">
                  <input
                    type="text"
                    placeholder="Type a keyword and hit enter"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400 hover:text-primary-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
              </div>

              {/* Categories */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                <ul className="space-y-2">
                  {['Creatives (12)', 'News (22)', 'Design (37)', 'HTML (42)', 'Web Development (14)'].map((cat, index) => (
                    <li key={index}>
                      <Link to="/blog" className="text-gray-600 hover:text-primary-600 transition-colors">
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Author */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <PersonImage src="" alt="Author" className="w-full h-auto rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">About The Author</h3>
                <p className="text-gray-600 mb-4">
                  Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.
                </p>
                <Link
                  to="/about"
                  className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <IntroSection />
      <GoToTop />
    </>
  );
};

export default BlogSinglePage;
