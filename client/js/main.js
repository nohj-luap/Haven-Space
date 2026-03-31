import { initLogoCloud } from './components/logo-cloud.js';
import { initSidebar } from './components/sidebar.js';
import { initNavbar } from './components/navbar.js';
import { loadDashboardData } from './views/boarder/dashboard.js';
import { initLandlordDashboard } from './views/landlord/landlord.js';

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
  // Only init logo cloud if element exists (homepage only)
  if (document.getElementById('logoSlider')) {
    initLogoCloud();
  }

  initFloatingHeader();

  // Only init sidebar if container exists (dashboard pages only)
  if (document.getElementById('sidebar-container')) {
    // Detect if this is a landlord dashboard page
    const isLandlordDashboard = document.querySelector('.landlord-dashboard');
    const isBoarderDashboard = document.querySelector('.boarder-dashboard');

    if (isLandlordDashboard) {
      initSidebar({
        role: 'landlord',
        user: {
          name: 'Juan Dela Cruz',
          initials: 'JD',
          role: 'Landlord',
        },
      });

      // Initialize landlord dashboard
      initLandlordDashboard({
        user: {
          name: 'Juan',
          initials: 'JD',
          role: 'Landlord',
        },
      });
    } else if (isBoarderDashboard) {
      initSidebar({
        role: 'boarder',
        user: {
          name: 'Juan Dela Cruz',
          initials: 'JD',
          role: 'Boarder',
        },
      });

      // Initialize boarder dashboard
      loadDashboardData();
    } else {
      // Default to boarder for other dashboard pages
      initSidebar({
        role: 'boarder',
        user: {
          name: 'Juan Dela Cruz',
          initials: 'JD',
          role: 'Boarder',
        },
      });
    }
  }

  // Only init navbar if container exists (dashboard pages only)
  if (document.getElementById('navbar-container')) {
    initNavbar({
      user: {
        name: 'Juan Dela Cruz',
        initials: 'JD',
        avatarUrl: '', // Will use default sample.png
        email: 'juan@example.com',
      },
      notificationCount: 3,
    });
  }
});

/**
 * Floating Header - Scroll-triggered transition
 * Transitions header from full-width to floating pill on scroll
 */
function initFloatingHeader() {
  const navbar = document.querySelector('.navbar');
  const scrollThreshold = 50; // px to trigger floating state

  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Add scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Initial check in case page loads mid-scroll
  handleScroll();

  // Cleanup function (for SPA navigation or component unmounting)
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}
