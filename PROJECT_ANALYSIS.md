# Life Drink: Project Analysis & Creative Strategy

This document outlines the architectural and creative plan for the Life Drink website, based on the project goals and technical specifications provided.

## 1. Core Architecture

The application will be built on a modern, performant, and scalable frontend stack.

-   **Framework:** React with Vite for a fast development experience and optimized builds.
-   **Language:** TypeScript for robust type safety and maintainability.
-   **Styling:** Tailwind CSS for a utility-first workflow, allowing us to rapidly implement the custom, premium design. The configuration will be customized with the brand's color palette and typography scales.
-   **Animation:**
    -   **GSAP (GreenSock Animation Platform):** The primary tool for all complex, scroll-based, and interactive animations. We will leverage `ScrollTrigger` extensively to create the cinematic, story-driven scroll experience.
    -   **Framer Motion:** Used sparingly for micro-interactions on specific UI elements like buttons or cards, where its simplified API is more efficient.
    -   **Lenis:** For a smooth, high-quality scrolling feel which is essential for the premium user experience and works well with GSAP's `ScrollTrigger`.
-   **Code Quality:** ESLint and Prettier will be configured to enforce a consistent and clean coding style.

## 2. Folder Structure

A clean, feature-sliced architecture will be used to ensure scalability and maintainability.

```
src/
├── animations/         # GSAP animation logic (e.g., text reveals, section transitions)
├── assets/             # Static assets (images, logos, custom fonts, videos)
│   ├── images/
│   ├── videos/
│   └── icons/
├── components/         # Reusable, generic components (e.g., Button, Accordion, Card)
│   ├── ui/             # Core UI elements
│   └── common/         # More complex, project-specific reusable components
├── hooks/              # Custom React hooks (e.g., useLenis, useScrollAnimation)
├── layouts/            # Main layout wrappers (e.g., MainLayout, Section)
├── sections/           # Major, single-use page sections (e.g., Hero, BrandStory)
├── styles/             # Global styles, Tailwind base layers, and font definitions
├── types/              # Global TypeScript type definitions
└── utils/              # Utility functions (e.g., classname mergers, constants)
```

## 3. User Journey & Section Purpose

The website tells a story in a specific sequence. Each section is a chapter, guiding the user from initial intrigue to brand advocacy.

1.  **Navbar & Hero:** The user arrives and is immediately immersed. The `100vh` hero section acts as a cinematic opening shot. Its purpose is to establish the brand's premium, natural identity and create a strong first impression. The primary CTA (`Discover Purity`) prompts exploration.

2.  **Brand Story:** As the user scrolls, they transition into an editorial layout. This section's purpose is to build an emotional connection. It communicates the *why* behind the brand—its philosophy of purity and connection to nature—using minimal text and powerful imagery.

3.  **Ingredient Journey:** This interactive timeline engages the user by revealing the meticulous process behind the product. Its purpose is to build trust and justify the premium positioning. By showing the journey from `Harvest` to `Delivery`, we demonstrate transparency and a commitment to quality.

4.  **Product Showcase:** The user is now primed to see the product itself in detail. This section's purpose is to make the product tangible and desirable. Interactive mouse-based parallax and lighting effects create a sense of holding a premium object.

5.  **Benefits:** Now that the user desires the product, we reinforce the decision with logic. This section's purpose is to clearly and elegantly communicate the functional benefits (Hydration, Electrolytes, etc.). The premium card design maintains the luxury feel while providing rational reasons to believe.

6.  **Lifestyle:** The user begins to envision the product in their own life. This section's purpose is to create aspirational context. The editorial gallery shows the product as a seamless part of a healthy, sophisticated lifestyle, moving it from a simple beverage to a status marker.

7.  **Comparison:** This section directly addresses the competition. Its purpose is to eliminate doubt and position Life Drink as the superior choice. The animated data visualization makes the comparison clear, impactful, and easy to digest.

8.  **Manufacturing:** Similar to the Ingredient Journey, this section reinforces the "premium" promise. Its purpose is to showcase technological sophistication and cleanliness, building further trust in the quality of the final product.

9.  **Testimonials:** Social proof is introduced. The purpose is to build confidence through third-party validation. The smooth, glass-card slider presents customer feedback in a trustworthy and elegant format.

10. **FAQ:** Any lingering questions are resolved here. The purpose is to remove final barriers to conversion. The animated accordion provides answers without overwhelming the user.

11. **Final CTA:** The journey culminates in a powerful, emotional appeal. The purpose is to drive conversion (e.g., "Buy Now" or "Find a Store"). It combines the product, the natural atmosphere, and a strong call to action, summarizing the entire brand promise.

12. **Footer:** The final section provides essential utility—navigation, legal information, and social links—in a minimal, unobtrusive design that upholds the premium aesthetic.

## 4. Animation & Interaction Strategy

Motion will be purposeful, supporting the narrative of each section. The goal is cinematic elegance, not flashy effects. `GSAP ScrollTrigger` will be the engine for the entire scroll-based story.

-   **Global:** Lenis smooth scroll provides a foundational layer of tactile, fluid motion.
-   **Navbar:** A transparent-to-blur transition on scroll. The logo and CTA will have subtle, smooth alpha and scale transitions.
-   **Hero:**
    -   **Background:** A very slow, subtle zoom/pan on the background image/video to create a sense of atmosphere.
    -   **Particles:** Gently floating dust/light particles using GSAP tickers for a magical feel.
    -   **Text:** A grand, staggered character reveal on the main headline.
    -   **Scroll Indicator:** A gracefully animated indicator that fades out as the user begins to scroll.
-   **Brand Story:**
    -   **Pinning:** The entire section will be pinned while the editorial content animates.
    -   **Image Reveals:** Images will be revealed using animated masks (e.g., a wipe or iris effect) as the user scrolls.
    -   **Text:** Staggered line-by-line fade-in reveals.
-   **Ingredient Journey:**
    -   **Timeline Pinning:** The main timeline component will be pinned.
    -   **SVG Line Drawing:** An SVG path will draw itself along the timeline as the user scrolls.
    -   **Milestones:** As the line reaches each milestone (Harvest, Extraction, etc.), the corresponding content will trigger a reveal animation (fade + translate).
-   **Product Showcase:**
    -   **Parallax:** The bottle will have a slight parallax effect against the background.
    -   **Mouse Interaction:** A subtle `mousemove` event will shift lighting/reflections on the bottle, making it feel interactive and premium. GSAP will be used to smoothly interpolate the values.
-   **Benefits:**
    -   **Staggered Reveal:** Cards will animate in with a staggered fade and scale effect as the section scrolls into view.
    -   **Icon Animation:** On hover, the animated icons will play their loop.
-   **Lifestyle Gallery:**
    -   **Horizontal Scroll:** This section might use a horizontal scroll (pin the container, translate the inner gallery) for a classic editorial feel.
    -   **Image Parallax:** Images within the gallery will have a subtle parallax effect as they scroll, creating a sense of depth.
-   **Comparison:**
    -   **Animated Bars:** The data visualization bars will animate in sequence, with GSAP controlling their width or height to draw the user's eye to the comparison.
-   **Manufacturing:**
    -   **Sequence Animation:** We can use an image sequence or a video that is scrubbed by the scroll position to show the manufacturing process in a highly visual, luxurious way.
-   **Testimonials:**
    -   **Slider Transitions:** A smooth, custom-eased transition for the card slider. The inactive cards will have a subtle scale/opacity shift.
-   **FAQ:**
    -   **Accordion Animation:** Custom animation for the opening/closing of each FAQ item, moving beyond a simple wipe to include a subtle stagger on the content inside.
-   **Final CTA:**
    -   **Scale & Fade:** The background will scale up slightly, and the text will fade in to create a final, impactful emotional moment.

## 5. Component Architecture

We will prioritize reusability without sacrificing the unique design of each section.

-   **`src/components/ui`:**
    -   `Button.tsx`: A highly customizable button component with variants for the primary CTA, secondary actions, etc.
    -   `AnimatedIcon.tsx`: Wrapper for animated icons.
    -   `GlassCard.tsx`: Reusable card with the glassmorphism effect for testimonials.
    -   `Accordion.tsx`: The core logic for the FAQ section.
-   **`src/components/common`:**
    -   `Navbar.tsx`: The site-wide navigation.
    -   `Footer.tsx`: The site-wide footer.
    -   `Section.tsx`: A layout component to enforce consistent padding/margins for each major section.
    -   `Heading.tsx`: A component for consistent heading styles (e.g., h1, h2) that can include text reveal animations.
-   **`src/sections`:**
    -   Each section listed in the user journey will be a dedicated component here (e.g., `Hero.tsx`, `BrandStory.tsx`). These will be largely single-use, composed of smaller `components` and custom layouts/animations to ensure each one is unique.

This plan provides a clear roadmap to achieving the project's ambitious goals. It balances a robust technical foundation with a highly creative and narrative-driven approach to design and animation.
