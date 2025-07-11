document.addEventListener('DOMContentLoaded', async () => {
      const PROFILE_API_URL = 'http://localhost:3001/api/profile';
      const token = localStorage.getItem('token');
  
      // If no token, redirect to login page immediately
      if (!token) {
          window.location.href = 'index.html';
          return;
      }
  
      // --- Fetch and Display User Data ---
      try {
          const res = await fetch(`${PROFILE_API_URL}/me`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
  
          if (!res.ok) {
              // If token is invalid (e.g., expired), clear it and redirect to login
              localStorage.removeItem('token');
              window.location.href = 'index.html';
              return;
          }
  
          const user = await res.json();
          
          // Populate profile modal with fetched data
          document.getElementById('profile-name').textContent = `${user.firstName} ${user.lastName}`;
          document.getElementById('profile-email').textContent = user.email;
          document.getElementById('profile-firstName').textContent = user.firstName;
          document.getElementById('profile-lastName').textContent = user.lastName;
          document.getElementById('profile-passwordHint').textContent = user.passwordHint || 'Not set';
  
      } catch (error) {
          console.error('Failed to fetch profile:', error);
          localStorage.removeItem('token');
          window.location.href = 'index.html';
      }
  
      // --- Modal Logic ---
      const profileIcon = document.getElementById('profile-icon');
      const profileModal = document.getElementById('profile-modal');
      const closeModalBtn = document.getElementById('close-modal');
  
      profileIcon.addEventListener('click', () => {
          profileModal.classList.remove('hidden');
      });
  
      closeModalBtn.addEventListener('click', () => {
          profileModal.classList.add('hidden');
      });
  
      // --- Logout Logic ---
      const logoutButton = document.getElementById('logout-button');
      logoutButton.addEventListener('click', () => {
          localStorage.removeItem('token');
          window.location.href = 'index.html';
      });
  });