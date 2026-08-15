import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import instagramIcon from '@/assets/common/instagram.svg';
import facebookIcon from '@/assets/common/facebook.svg';
import xIcon from '@/assets/common/x.svg';

import { siteData } from '@/data/site';

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
const policyLinks = [{ name: 'Privacy Policy', href: '#' }, { name: 'Terms of Service', href: '#' }]; // No change requested

const socialData = [
  { name: 'Instagram', icon: instagramIcon, href: '#' },
  { name: 'Facebook', icon: facebookIcon, href: '#' },
  { name: 'X', icon: xIcon, href: '#' },
];

const Footer = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
      className="relative w-full bg-drew-warm-ivory text-drew-soft-white py-8 px-4"
    >
      <div className="max-w-[1400px] mx-auto bg-[#111312] rounded-3xl p-8 md:p-10 lg:p-12 border border-white/5">
        {/* Top Section: Newsletter & Social */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="gsap-footer-item">
            <span className="text-sm font-semibold uppercase tracking-widest text-drew-lime-accent">Stay in the know</span>
            <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-white">Better hydration, delivered.</h3>
            <p className="mt-3 text-white/70 max-w-md">Get product updates, new launches, and thoughtful hydration tips from Betterdrew.</p>
          </div>
          <div className="gsap-footer-item">
            <form className="flex items-center border border-white/10 rounded-full p-1 bg-white/5">
              <input type="email" placeholder="Enter your email address" className="w-full bg-transparent px-4 py-3 text-white placeholder-white/50 focus:outline-none" />
              <button type="submit" aria-label="Subscribe" className="flex-shrink-0 w-12 h-12 bg-drew-lime-accent rounded-full flex items-center justify-center text-drew-deep-green hover:bg-opacity-90 transition-colors">
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <hr className="gsap-footer-item my-10 border-white/10" />

        {/* Middle Section: Navigation */}
        <div className="gsap-footer-item grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-white/80 hover:text-drew-lime-accent transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 md:col-span-1 flex items-start md:justify-end">
            <div className="flex items-center gap-5">
              {socialData.map(social => (
                <a key={social.name} href={social.href} aria-label={social.name} className="opacity-80 hover:opacity-100 transition-opacity duration-200">
                  <img
                    src={social.icon} // This is a placeholder, will be replaced with actual icon
                    alt={`${social.name} logo`}
                    className="w-6 h-6"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Policies */}
        <div className="gsap-footer-item mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="text-2xl font-bold tracking-wider text-white">{siteData.brandName.toUpperCase()}</h3>
              <p className="text-white/70">Pure hydration. Nothing unnecessary.</p>
            </div>
            <p className="text-sm text-white/50">
            &copy; 2026 Betterdrew. Made in India.
          </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {policyLinks.map(link => (
              <Link key={link.name} to={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;