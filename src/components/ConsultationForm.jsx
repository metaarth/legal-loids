import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sendContactForm } from '../lib/emailjs';

gsap.registerPlugin(ScrollTrigger);

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const inputsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;

    if (section && form) {
      gsap.fromTo(
        form,
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

      gsap.fromTo(
        inputsRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
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
      if (formRef.current) {
        gsap.to(formRef.current, {
          scale: 0.98,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
        });
      }
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <section ref={sectionRef} className="relative py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div
          className="hidden lg:block relative h-full min-h-[600px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero_3.jpg)' }}
        >
          <div className="absolute inset-0 bg-primary-900/60"></div>
        </div>
        <div className="bg-gray-50 p-5 sm:p-8 lg:p-16 flex items-center min-w-0">
          <div ref={formRef} className="w-full max-w-2xl mx-auto min-w-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 break-words">
              Free Legal Advice
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div ref={(el) => (inputsRef.current[0] = el)}>
                  <label htmlFor="fname" className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                <div ref={(el) => (inputsRef.current[1] = el)}>
                  <label htmlFor="lname" className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div ref={(el) => (inputsRef.current[2] = el)}>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div ref={(el) => (inputsRef.current[3] = el)}>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div ref={(el) => (inputsRef.current[4] = el)}>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div ref={(el) => (inputsRef.current[5] = el)}>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                  required
                ></textarea>
              </div>

              {(submitStatus === 'success' || submitStatus === 'error') && (
                <p
                  className={`text-sm font-medium ${
                    submitStatus === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {submitStatus === 'success'
                    ? 'Thank you. Your message has been sent successfully.'
                    : errorMessage}
                </p>
              )}
              <div>
                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  className="w-full px-8 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onMouseEnter={(e) => {
                    if (submitStatus !== 'sending') gsap.to(e.target, { scale: 1.02, duration: 0.2 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.target, { scale: 1, duration: 0.2 });
                  }}
                >
                  {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
