// ==========================================
// ADMIN DASHBOARD
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initAdminPanel();
});


// ==========================================
// INITIALIZATION
// ==========================================

async function initAdminPanel() {
    // data.js loads siteData asynchronously.
    // Wait for it before initializing anything
    // that depends on siteData.
    if (typeof loadSiteData === 'function') {
        await loadSiteData();
    }

    if (!siteData) {
        console.error('Site data could not be loaded.');

        return;
    }

    setupPasswordProtection();

    setupAdminTabs();

    populateAgencyForm();
    renderAdminPricing();

    setupAgencyForm();
    setupPricingForm();

    initializePortfolioManager();

    setupTopActionBar();
}


// ==========================================
// TAB NAVIGATION
// ==========================================

function setupAdminTabs() {
    const tabButtons =
        document.querySelectorAll('.admin-tab-btn');

    const contentPanes =
        document.querySelectorAll('.admin-content-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const paneId =
                button.getAttribute('data-pane');

            tabButtons.forEach(tab => {
                tab.classList.remove('active');
            });

            button.classList.add('active');

            contentPanes.forEach(pane => {
                pane.classList.toggle(
                    'active',
                    pane.id === paneId
                );
            });
        });
    });
}