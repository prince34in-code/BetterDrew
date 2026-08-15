import React, { useState, FormEvent } from 'react';
import Footer from '@/sections/Footer';
import { ArrowRight } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  subject?: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid.';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // TODO: Connect to an email sending service or backend API.
      console.log('Form Submitted:', formData);
      setIsSubmitted(true);
      // Reset form after a delay or on success confirmation
      // setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="bg-drew-warm-ivory">
      {/* 1. Contact Hero */}
      <section className="relative w-full h-[240px] sm:h-[280px] lg:h-[320px] bg-gradient-to-br from-drew-deep-green to-green-900 flex items-center justify-center">
        <h1 className="text-white text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter">
          Contact
        </h1>
      </section>

      {/* 3. Contact Form */}
      <section className="w-full max-w-4xl mx-auto py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-drew-deep-green tracking-tight">CONTACT US</h2>
        </div>
        <div className="bg-drew-soft-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-soft">
          <div className="text-center mb-10 hidden">
            <p className="mt-3 text-drew-secondary-text max-w-lg mx-auto">Fill out the form below and we'll get back to you as soon as possible.</p>
          </div>
          {isSubmitted ? (
            <div className="text-center py-10">
              <h3 className="text-2xl font-bold text-drew-deep-green">Thank you!</h3>
              <p className="mt-2 text-drew-secondary-text">Your message has been received.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-drew-secondary-text mb-1.5">Your Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className={`w-full px-4 py-3 bg-drew-warm-ivory/80 border-2 rounded-lg focus:ring-drew-lime-accent focus:border-drew-lime-accent transition ${errors.name ? 'border-red-400' : 'border-drew-soft-border'}`} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-drew-secondary-text mb-1.5">Your Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className={`w-full px-4 py-3 bg-drew-warm-ivory/80 border-2 rounded-lg focus:ring-drew-lime-accent focus:border-drew-lime-accent transition ${errors.email ? 'border-red-400' : 'border-drew-soft-border'}`} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-drew-secondary-text mb-1.5">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className={`w-full px-4 py-3 bg-drew-warm-ivory/80 border-2 rounded-lg focus:ring-drew-lime-accent focus:border-drew-lime-accent transition ${errors.subject ? 'border-red-400' : 'border-drew-soft-border'}`} />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-drew-secondary-text mb-1.5">Your Message</label>
                <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleInputChange} required className={`w-full px-4 py-3 bg-drew-warm-ivory/80 border-2 rounded-lg focus:ring-drew-lime-accent focus:border-drew-lime-accent transition ${errors.message ? 'border-red-400' : 'border-drew-soft-border'}`}></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <div className="text-center pt-2">
                <button type="submit" className="group inline-flex items-center justify-center px-8 py-4 bg-drew-deep-green text-drew-soft-white font-bold text-lg rounded-full transition-all duration-300 ease-out hover:bg-drew-lime-accent hover:text-drew-deep-green">
                  <span>SEND</span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;