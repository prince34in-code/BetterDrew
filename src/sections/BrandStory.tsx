import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const BrandStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const story = containerRef.current;
    if (!story) return;

    const imageContainer = story.querySelector('.image-placeholder-container');
    const textContent = story.querySelector('.text-content');
    
    if (!imageContainer || !textContent) return;
    
    const textParagraph = textContent.querySelector('p');
    if (!textParagraph) return;

    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: story,
                start: 'top center',
                end: 'center center',
                scrub: 1,
            },
        });

        // Image reveal (clipPath)
        tl.fromTo(imageContainer.querySelector('.image-reveal'),
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', ease: 'power3.out', duration: 0.8 }
        );
        
        // Text reveal
        const split = new SplitType(textParagraph, { types: 'lines' });
        gsap.from(split.lines, {
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: textContent,
                start: 'top 80%',
            }
        });
    }, story);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="story" className="w-full max-w-[1400px] mx-auto my-12 p-8 md:p-12 lg:p-16 rounded-3xl shadow-xl overflow-hidden bg-drew-soft-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
        <div className="image-placeholder-container group relative h-[300px] sm:h-[400px] md:h-[540px] w-full shadow-xl rounded-[32px] overflow-hidden">
          <div className="image-reveal absolute inset-0">
            <img src="https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?q=80&w=2970&auto=format&fit=crop" alt="Lush, natural landscape representing the Betterdrew brand ethos" className="h-full w-full object-cover rounded-[32px] transition-transform duration-300 ease-in-out group-hover:scale-[1.03]" />
          </div>
        </div>
        <div className="text-content flex justify-center">
            <div className="max-w-xl">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-drew-coconut-green tracking-wide">Our Philosophy</h3>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-forest-green/90 leading-relaxed mt-3 sm:mt-4">
                    We believe in clarity. In a world full of noise and buzzwords, we choose transparency. Our journey is about creating a straightforward, quality product you can understand and trust.
                </p>
                <button className="mt-4 sm:mt-6 px-6 py-2 bg-drew-deep-green text-drew-soft-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-drew-lime-accent hover:text-drew-deep-green hover:shadow-lg self-start">
                    Learn Our Story
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;