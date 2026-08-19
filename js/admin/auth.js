// ==========================================
// ADMIN AUTHENTICATION
// ==========================================

const ADMIN_SESSION_KEY = 'story_circut_authenticated';
const ADMIN_PASSWORD = 'storycircut2026';


// ==========================================
// SETUP
// ==========================================

function setupPasswordProtection() {
    const loginContainer = document.getElementById(
        'admin-login-container'
    );

    const dashboardContainer = document.getElementById(
        'admin-dashboard-container'
    );

    const loginForm = document.getElementById(
        'admin-login-form'
    );

    const passwordInput = document.getElementById(
        'admin-password'
    );

    const errorText = document.getElementById(
        'admin-login-error'
    );

    // Admin authentication UI is not available.
    if (
        !loginContainer ||
        !dashboardContainer ||
        !loginForm
    ) {
        return;
    }

    // Already authenticated during this browser session.
    if (isAuthenticated()) {
        showDashboardImmediately(
            loginContainer,
            dashboardContainer
        );

        return;
    }

    loginForm.addEventListener(
        'submit',
        (event) => {
            event.preventDefault();

            handleLogin(
                passwordInput,
                errorText,
                loginContainer,
                dashboardContainer
            );
        }
    );
}


// ==========================================
// AUTHENTICATION
// ==========================================

function isAuthenticated() {
    return (
        sessionStorage.getItem(
            ADMIN_SESSION_KEY
        ) === 'true'
    );
}


function handleLogin(
    passwordInput,
    errorText,
    loginContainer,
    dashboardContainer
) {
    const password =
        passwordInput
            ? passwordInput.value
            : '';

    if (password === ADMIN_PASSWORD) {
        authenticateUser();

        transitionToDashboard(
            loginContainer,
            dashboardContainer
        );

        return;
    }

    showLoginError(
        errorText,
        loginContainer
    );
}


function authenticateUser() {
    sessionStorage.setItem(
        ADMIN_SESSION_KEY,
        'true'
    );
}


// ==========================================
// UI STATES
// ==========================================

function showDashboardImmediately(
    loginContainer,
    dashboardContainer
) {
    loginContainer.style.display = 'none';

    dashboardContainer.style.display = 'block';
}


function transitionToDashboard(
    loginContainer,
    dashboardContainer
) {
    loginContainer.style.opacity = '0';
    loginContainer.style.transition =
        'opacity 0.3s ease';

    setTimeout(() => {
        loginContainer.style.display = 'none';

        dashboardContainer.style.display =
            'block';

        dashboardContainer.style.opacity = '0';
        dashboardContainer.style.transition =
            'opacity 0.4s ease';

        setTimeout(() => {
            dashboardContainer.style.opacity = '1';
        }, 50);
    }, 300);
}


function showLoginError(
    errorText,
    loginContainer
) {
    if (errorText) {
        errorText.textContent =
            'Incorrect admin password. Access denied.';

        errorText.style.display = 'block';
    }

    loginContainer.style.animation = 'none';

    // Force browser reflow so the animation
    // can run again on consecutive failures.
    void loginContainer.offsetHeight;

    loginContainer.style.animation =
        'shake 0.4s ease';
}