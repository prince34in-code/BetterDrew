import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Using a timeout ensures this runs after all other effects and renders,
    // preventing conflicts with other components (like animated footers)
    // that might affect scroll position.
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;