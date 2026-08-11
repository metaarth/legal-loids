import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ConsultationForm from '../components/ConsultationForm';
import IntroSection from '../components/IntroSection';
import GoToTop from '../components/GoToTop';
import ContactMap from '../components/ContactMap';
import { sendContactForm } from '../lib/emailjs';

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const heroRef = useRef(null);
  const contactInfoRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    setErrorMessage('');
    try {
      await sendContactForm(formData);
      setSubmitStatus('success');
      setFormData({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero_1.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 px-4">Contact Us</h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 px-4">
              Get in touch with our legal experts
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* Contact Information */}
            <div ref={contactInfoRef} className="space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 px-4 lg:px-0">Contact Information</h2>
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Head Office</h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Unit 410 – Tower - A, Enkay Towers,<br />
                      Phase V, Sector 19, Udyog Vihar,<br />
                      Gurugram
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">
                      <strong>Noida Office:</strong><br />
                      617, Wave Silver Tower,<br />
                      Sector – 18, Noida, 201301
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">
                      <strong>Chandigarh Office:</strong><br />
                      Unit No. 228, Advocates Society,<br />
                      Sector 49A, Chandigarh - 160047
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Phone</h3>
                    <a href="tel:+918881668058" className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 block">
                      +91-8881668058
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:admin@legaloids.com" className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 break-all">
                      admin@legaloids.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Website</h3>
                    <a href="#!" onClick={(e) => e.preventDefault()} className="text-xs sm:text-sm text-primary-600 hover:text-primary-700">
                      legaloids.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Send A Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div>
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="Your firstname"
                      value={formData.fname}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder="Your lastname"
                      value={formData.lname}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Your subject of this message"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    id="message"
                    rows="6"
                    placeholder="Say something about us"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    required
                  ></textarea>
                </div>

                {submitStatus === 'success' && (
                  <p className="text-green-600 text-sm sm:text-base font-medium">
                    Thank you. Your message has been sent successfully.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-600 text-sm sm:text-base font-medium">
                    {errorMessage}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section – Office Locations */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Find Us</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-2xl">
            Head Office: Unit 410 – Tower - A, Enkay Towers, Phase V, Sector 19, Udyog Vihar, Gurugram
          </p>
          <ContactMap />
        </div>
      </section>

      <IntroSection />
      <GoToTop />
    </>
  );
};

export default ContactPage;
