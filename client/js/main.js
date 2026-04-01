import { initLogoCloud } from './components/logo-cloud.js';
import { initSidebar } from './components/sidebar.js';
import { initNavbar } from './components/navbar.js';
import { loadDashboardData } from './views/boarder/dashboard.js';
import { initLandlordDashboard } from './views/landlord/landlord.js';
import CONFIG from './config.js';

/**
 * Redirect to login page based on current path
 */
function redirectToLogin() {
  const path = window.location.pathname;
  let loginPath = '';

  if (path.includes('/views/public/auth/')) {
    loginPath = 'login.html';
  } else if (
    path.includes('/views/boarder/index.html') ||
    path.includes('/views/landlord/index.html')
  ) {
    loginPath = '../public/auth/login.html';
  } else if (path.includes('/views/boarder/') || path.includes('/views/landlord/')) {
    // For subfolders like boarder/applications/
    loginPath = '../../public/auth/login.html';
  } else {
    // Default fallback
    loginPath = 'views/public/auth/login.html';
  }

  window.location.href = loginPath;
}

// Initialize components
document.addEventListener('DOMContentLoaded', async () => {
  const userStr = localStorage.getItem('user');
  let user = userStr ? JSON.parse(userStr) : null;

  // Only init logo cloud if element exists (homepage only)
  if (document.getElementById('logoSlider')) {
    initLogoCloud();
  }

  initFloatingHeader();

  // Detect if this is a dashboard page
  const isLandlordDashboard = document.querySelector('.landlord-dashboard');
  const isBoarderDashboard = document.querySelector('.boarder-dashboard');
  const isDashboard = isLandlordDashboard || isBoarderDashboard;

  // Auth Guard
  if (isDashboard) {
    // Verify token with backend
    let authSuccess = false;
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/auth/me.php`, {
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        user = result.user;
        localStorage.setItem('user', JSON.stringify(user));
        authSuccess = true;
      } else if (response.status === 401) {
        // Try to refresh token
        console.log('Access token expired, attempting refresh...');
        const refreshResponse = await fetch(`${CONFIG.API_BASE_URL}/auth/refresh-token.php`, {
          method: 'POST',
          credentials: 'include',
        });

        if (refreshResponse.ok) {
          // Retry me.php
          const retryResponse = await fetch(`${CONFIG.API_BASE_URL}/auth/me.php`, {
            credentials: 'include',
          });
          if (retryResponse.ok) {
            const result = await retryResponse.json();
            user = result.user;
            localStorage.setItem('user', JSON.stringify(user));
            authSuccess = true;
          }
        }
      }
    } catch (error) {
      console.error('Auth verification failed:', error);
    }

    if (!authSuccess) {
      console.warn('Authentication failed. Redirecting to login...');
      localStorage.removeItem('user');
      redirectToLogin();
      return;
    }

    // Role-based Access Control
    if (isLandlordDashboard && user.role !== 'landlord') {
      console.warn('User is not a landlord. Redirecting to boarder dashboard...');
      window.location.href = '../../boarder/index.html';
      return;
    }
    if (isBoarderDashboard && user.role !== 'boarder') {
      console.warn('User is not a boarder. Redirecting to landlord dashboard...');
      window.location.href = '../../landlord/index.html';
      return;
    }
  }

  // Only init sidebar if container exists (dashboard pages only)
  if (document.getElementById('sidebar-container')) {
    const userData = user
      ? {
          name: user.first_name ? `${user.first_name} ${user.last_name}` : user.email,
          initials: user.first_name
            ? `${user.first_name[0]}${user.last_name[0]}`
            : user.email[0].toUpperCase(),
          role: user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User',
        }
      : {
          name: 'Guest',
          initials: 'G',
          role: 'Guest',
        };

    if (isLandlordDashboard) {
      initSidebar({
        role: 'landlord',
        user: userData,
      });

      // Initialize landlord dashboard
      initLandlordDashboard({
        user: userData,
      });
    } else if (isBoarderDashboard) {
      initSidebar({
        role: 'boarder',
        user: userData,
      });

      // Initialize boarder dashboard
      loadDashboardData();
    } else {
      // Default to boarder for other dashboard pages
      initSidebar({
        role: 'boarder',
        user: userData,
      });
    }
  }

  // Only init navbar if container exists (dashboard pages only)
  if (document.getElementById('navbar-container')) {
    const userData = user
      ? {
          name: user.first_name ? `${user.first_name} ${user.last_name}` : user.email,
          initials: user.first_name
            ? `${user.first_name[0]}${user.last_name[0]}`
            : user.email[0].toUpperCase(),
          avatarUrl: '', // Will use default sample.png
        }
      : {
          name: 'Guest',
          initials: 'G',
          avatarUrl: '',
        };

    initNavbar({
      user: userData,
      notificationCount: 3,
    });
  }
});
/**
 * Main Entry Point - View Router
 *
 * Detects current view and initializes appropriate components
 * Uses data attributes on body to detect view type
 */

import { initPublicViews } from './views/public/index.js';
import { initBoarderDashboard } from './views/boarder/index.js';
import { initLandlordDashboardEntry } from './views/landlord/index.js';
import { initAdminDashboard } from './views/admin/index.js';

/**
 * Detect current view and initialize appropriate components
 * Uses data attribute on body to detect view type
 */
function detectAndInitialize() {
  const body = document.body;
  const view = body.dataset.view || 'public';
  const dashboardType = body.dataset.dashboardType;

  console.log('Main: Detected view:', view, 'Dashboard type:', dashboardType);

  switch (view) {
    case 'public':
      initPublicViews();
      break;
    case 'boarder':
      initBoarderDashboard();
      break;
    case 'landlord':
      initLandlordDashboardEntry();
      break;
    case 'admin':
      initAdminDashboard();
      break;
    default:
      console.warn('Main: Unknown view type:', view);
      initPublicViews();
  }
}

// Initialize on DOM ready
function initialize() {
  console.log('Main: DOMContentLoaded');
  detectAndInitialize();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  // DOM already loaded, initialize immediately
  initialize();
}
