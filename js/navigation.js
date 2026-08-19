// ==========================================
// NAVIGATION
// ==========================================

function setupNavbar() {
    const header =
        document.querySelector('.header');

    const menuToggle =
        document.getElementById('menu-toggle');

    const navLinks =
        document.getElementById('nav-links');

    if (!header) {
        return;
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const currentPath =
        window.location.pathname.split('/').pop() ||
        'index.html';

    const navItems =
        document.querySelectorAll('.nav-link');

    navItems.forEach((item) => {
        const href = item.getAttribute('href');

        if (
            href === currentPath ||
            (currentPath === 'index.html' && href === './')
        ) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            if (
                !menuToggle.contains(event.target) &&
                !navLinks.contains(event.target)
            ) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}