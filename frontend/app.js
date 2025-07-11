document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    // --- API Communication Logic ---
    const AUTH_API_URL = 'http://localhost:3000/api/auth';
    
    // Forms
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    // Message Areas
    const registerMessageArea = document.getElementById('register-message-area');
    const loginMessageArea = document.getElementById('login-message-area');

    const showMessage = (area, message, isError = false) => {
        area.textContent = message;
        area.style.color = isError ? 'red' : 'green';
    };

    // --- Event Listeners for Forms ---
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        showMessage(registerMessageArea, ''); // Clear previous message
        const body = {
            firstName: document.getElementById('reg-firstName').value,
            lastName: document.getElementById('reg-lastName').value,
            email: document.getElementById('reg-email').value,
            password: document.getElementById('reg-password').value,
        };

        try {
            const res = await fetch(`${AUTH_API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Registration failed');
            
            showMessage(registerMessageArea, 'Success! Please sign in.', false);
            setTimeout(() => {
                // Switch to the sign-in panel automatically
                signInButton.click();
            }, 2000);

        } catch (error) {
            showMessage(registerMessageArea, error.message, true);
        }
    });
      
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        showMessage(loginMessageArea, ''); // Clear previous message
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
            if (!res.ok) throw new Error(data.msg || 'Login failed');
            
            localStorage.setItem('token', data.token);
            showMessage(loginMessageArea, 'Login successful!', false);

            // In a real application, you would now redirect to the main app page:
            // window.location.href = '/dashboard.html';

        } catch (error) {
            showMessage(loginMessageArea, error.message, true);
        }
    });
});