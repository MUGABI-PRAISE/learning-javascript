// Utility function for path checking
function isAuthPage() {
    const path = window.location.pathname.toLowerCase();
    return path.includes('login.html') || path.includes('signup.html');
}

function isAppPage() {
    const path = window.location.pathname.toLowerCase();
    return path === '/' || path.endsWith('/index.html');
}

// User Storage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Password Visibility Toggle
document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        const input = e.target.closest('.form-group').querySelector('input');
        const icon = e.target.tagName === 'I' ? e.target : e.target.querySelector('i');

        if (input) {
            input.type = input.type === 'password' ? 'text' : 'password';
        }

        if (icon) {
            icon.classList.toggle('fa-eye-slash');
            icon.classList.toggle('fa-eye');
        }
    });
});

// Signup Functionality
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const password = document.getElementById('password')?.value;
        const confirmPassword = document.getElementById('confirmPassword')?.value;

        if (!name || !email || !password || !confirmPassword) return;

        if (password !== confirmPassword) {
            showError('confirmPassword', 'Passwords do not match');
            return;
        }

        if (users.some(user => user.email === email)) {
            showError('email', 'Email already registered');
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // In production, hash the password!
            tasks: []
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        sessionStorage.setItem('currentUser', JSON.stringify(newUser));

        await new Promise(resolve => setTimeout(resolve, 50));
        window.location.href = '/index.html';
    });
}

// Login Functionality
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail')?.value.trim();
        const password = document.getElementById('loginPassword')?.value;
        const rememberMe = document.getElementById('rememberMe')?.checked;

        if (!email || !password) return;

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            showError('loginPassword', 'Invalid email or password');
            return;
        }

        if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        }

        await new Promise(resolve => setTimeout(resolve, 50));
        window.location.href = '/index.html';
    });
}

// Auth Check
function checkAuth() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) ||
                        JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && isAuthPage()) {
        window.location.href = '/index.html';
        return false;
    }

    if (!currentUser && isAppPage()) {
        window.location.href = '/auth/login.html';
        return false;
    }

    return true;
}

// Error Display
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const formGroup = field.closest('.form-group');
    if (!formGroup) return;

    let errorElement = formGroup.querySelector('.error-message');

    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }

    errorElement.textContent = message;
    errorElement.style.display = 'block';
    field.style.borderColor = 'var(--error-color)';

    setTimeout(() => {
        errorElement.style.display = 'none';
        field.style.borderColor = 'var(--border-color)';
    }, 3000);
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Attach greeting if on index.html
    if (isAppPage()) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) ||
                            JSON.parse(localStorage.getItem('currentUser'));
        const greeting = document.getElementById('userGreeting');
        if (currentUser && greeting) {
            greeting.textContent = `Hello, ${currentUser.name}`;
        }
    }

    // Auth check after everything is set up
    checkAuth();
});
