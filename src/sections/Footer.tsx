import { useEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import xIcon from '@/assets/common/x.svg';

import { siteData } from '@/data/site';
import { prefersReducedMotion } from '@/utils/motion';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Company: [
    { name: 'About Us', href: '#story' },
    { name: 'Our Story', href: '#story' },
    { name: 'Contact', href: '#contact' },
  ],
  Product: [
    { name: 'Young Coconut Water', href: '#shop' },
    { name: 'Product Details', href: '#shop' },
    { name: 'Compare', href: '#comparison' }, // Assuming this should link to the comparison section
  ],
  Help: [
    { name: 'FAQ', href: '#faq' },
    { name: 'Shipping & Delivery', href: '#' }, // Placeholder
    { name: 'Returns & Refunds', href: '#' }, // Placeholder
  ],
};
const policyLinks = [
  { name: 'Privacy Policy', href: 'https://betterdrew.com/privacy-policy' },
  { name: 'Terms of Service', href: 'https://betterdrew.com/terms-of-service' },
];

const socialData = [
  { name: 'Instagram', href: 'https://www.instagram.com/betterdrew.official/' },
  { name: 'Facebook', href: 'https://www.facebook.com/betterdrew' },
  { name: 'X', icon: xIcon, href: 'https://x.com/betterdrew' },
];

const Footer = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubscribed(true);
  };

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gsap-footer-item",
        { y: 20, opacity: 0 },
        {
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
          }
        }
      )
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={containerRef} 
      id="contact"
      className="relative w-full bg-drew-warm-ivory px-4 py-8 text-drew-soft-white"
    >
      <div className="mx-auto max-w-[1400px] rounded-3xl border border-white/5 bg-drew-deep-green p-8 md:p-12 lg:p-16">
        {/* Newsletter and social */}
        <div className="gsap-footer-item max-w-2xl">
          <div className="gsap-footer-item">
            <span className="text-sm font-semibold uppercase tracking-widest text-drew-lime-accent">Stay In The Know</span>
            <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-white">Better hydration, delivered.</h3>
            <p className="mt-3 text-white/70 max-w-md">Product updates, new launches, and the occasional hydration tip — nothing else.</p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="mt-6 flex max-w-md items-center border-b border-white/20 pb-2">
            <input type="email" name="email" required placeholder="Enter your email address" className="w-full bg-transparent px-0 py-2 text-white placeholder-white/50 focus:outline-none" />
            <button type="submit" aria-label="Subscribe" className="flex-shrink-0 text-drew-lime-accent transition-colors hover:text-white">
              <ArrowRight size={20} />
            </button>
          </form>
          {isSubscribed && <p className="mt-2 text-sm text-drew-lime-accent" aria-live="polite">Thanks for subscribing.</p>}
          <div className="mt-6 flex items-center gap-5">
            {socialData.map(social => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                target={social.name === 'Instagram' ? '_blank' : undefined}
                rel={social.name === 'Instagram' ? 'noopener noreferrer' : undefined}
                className="opacity-80 transition-opacity duration-200 hover:opacity-100"
              >
                {social.name === 'Instagram' ? (
                  <svg aria-hidden="true" className="h-5 w-5 fill-none stroke-drew-soft-white" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                ) : social.name === 'Facebook' ? (
                  <svg aria-hidden="true" className="h-5 w-5 fill-none stroke-drew-soft-white" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ) : (
                  <img src={social.icon} alt={`${social.name} logo`} className="h-5 w-5 brightness-0 invert" />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="gsap-footer-item my-10 border-white/10" />

        {/* Middle Section: Navigation */}
        <div className="gsap-footer-item grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 font-semibold text-white">{title}</h4>
              <ul className="space-y-3 text-sm">
                {links.map(link => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-white/65 transition-colors duration-200 hover:text-drew-lime-accent">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Brand and legal */}
        <div className="gsap-footer-item mt-16 border-t border-white/10 pt-10">
          <h3 className="text-5xl font-black tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl">{siteData.brandName.toUpperCase()}</h3>
          <div className="mt-8 flex flex-col gap-3 text-sm text-white/50">
            <p>&copy; 2026 Betterdrew. Made in India.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
            {policyLinks.map(link => (
              <Link key={link.name} to={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;