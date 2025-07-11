document.addEventListener('DOMContentLoaded', () => {
      // API Endpoints
      const AUTH_API_URL = 'http://localhost:3000/api/auth';
      const PROFILE_API_URL = 'http://localhost:3001/api/profile';
  
      // Views
      const homeView = document.getElementById('home-view');
      const registerView = document.getElementById('register-view');
      const loginView = document.getElementById('login-view');
      const dashboardView = document.getElementById('dashboard-view');
      const allViews = [homeView, registerView, loginView, dashboardView];
  
      // Forms
      const registerForm = document.getElementById('register-form');
      const loginForm = document.getElementById('login-form');
      const changePasswordForm = document.getElementById('change-password-form');
  
      // Buttons
      const gotoLoginBtn = document.getElementById('goto-login-btn');
      const gotoRegisterBtn = document.getElementById('goto-register-btn');
      const backBtns = document.querySelectorAll('.back-btn');
      const logoutBtn = document.getElementById('logout-btn');
      const profileIcon = document.getElementById('profile-icon');
  
      // Display Elements
      const messageArea = document.getElementById('message-area');
      const welcomeUsername = document.getElementById('welcome-username');
      const profileDetails = document.getElementById('profile-details');
      const profileFirstName = document.getElementById('profile-firstName');
      const profileLastName = document.getElementById('profile-lastName');
      const profileEmail = document.getElementById('profile-email');
  
      // --- UTILITY FUNCTIONS ---
      const showView = (viewId) => {
          allViews.forEach(view => view.classList.add('hidden'));
          document.getElementById(viewId).classList.remove('hidden');
          messageArea.textContent = '';
      };
  
      const showMessage = (message, isError = false) => {
          messageArea.textContent = message;
          messageArea.style.color = isError ? 'red' : 'green';
      };
  
      const loadDashboard = async () => {
          const token = localStorage.getItem('token');
          if (!token) {
              showView('home-view');
              return;
          }
  
          try {
              const res = await fetch(`${PROFILE_API_URL}/me`, {
                  headers: { 'Authorization': `Bearer ${token}` }
              });
  
              if (!res.ok) {
                  localStorage.removeItem('token');
                  throw new Error('Session expired. Please log in again.');
              }
  
              const user = await res.json();
              welcomeUsername.textContent = user.firstName;
              profileFirstName.textContent = user.firstName;
              profileLastName.textContent = user.lastName;
              profileEmail.textContent = user.email;
              showView('dashboard-view');
  
          } catch (error) {
              showMessage(error.message, true);
              showView('home-view');
          }
      };
  
      // --- EVENT LISTENERS ---
      gotoLoginBtn.addEventListener('click', () => showView('login-view'));
      gotoRegisterBtn.addEventListener('click', () => showView('register-view'));
      backBtns.forEach(btn => btn.addEventListener('click', () => showView('home-view')));
      profileIcon.addEventListener('click', () => {
          profileDetails.classList.toggle('hidden');
      });
  
      logoutBtn.addEventListener('click', () => {
          localStorage.removeItem('token');
          profileDetails.classList.add('hidden'); // Hide profile details on logout
          showView('home-view');
      });
  
      registerForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const body = {
              firstName: document.getElementById('reg-firstName').value,
              lastName: document.getElementById('reg-lastName').value,
              email: document.getElementById('reg-email').value,
              password: document.getElementById('reg-password').value,
              passwordHint: document.getElementById('reg-passwordHint').value,
          };
  
          try {
              const res = await fetch(`${AUTH_API_URL}/register`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(body)
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.msg);
              
              showMessage('Registration successful! Please log in.', false);
              showView('login-view');
          } catch (error) {
              showMessage(error.message, true);
          }
      });
      
      loginForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const body = {
              email: document.getElementById('login-email').value,
              password: document.getElementById('login-password').value,
          };
  
          try {
              const res = await fetch(`${AUTH_API_URL}/login`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(body)
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.msg);
              
              localStorage.setItem('token', data.token);
              loadDashboard();
          } catch (error) {
              showMessage(error.message, true);
          }
      });
  
      changePasswordForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const token = localStorage.getItem('token');
          const body = {
              currentPassword: document.getElementById('current-password').value,
              newPassword: document.getElementById('new-password').value,
          };
  
          try {
              const res = await fetch(`${PROFILE_API_URL}/change-password`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(body)
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.msg);
              
              showMessage('Password updated successfully!', false);
              changePasswordForm.reset();
          } catch (error) {
              showMessage(error.message, true);
          }
      });
  
  
      // --- INITIALIZATION ---
      loadDashboard(); // Check for existing token on page load
  });