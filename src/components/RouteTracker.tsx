import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '@/lib/analytics';

const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname + location.search;
    analytics.pageView(path, document.title);
    // Funnel events for receipt page
    if (location.pathname.startsWith('/comprovante')) {
      analytics.generatePix(29.9);
    }
  }, [location.pathname, location.search]);
  return null;
};

export default RouteTracker;
