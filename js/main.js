// ==========================================
// GLOBAL ELEMENT RENDERING
// ==========================================

function renderGlobalElements() {
  if (!siteData) {
    return;
  }

  const info = siteData.agencyInfo;

  // Agency name
  document
      .querySelectorAll('.agency-name')
      .forEach((element) => {
        element.textContent = info.name;
      });

  // Logos
  document
      .querySelectorAll('.logo-container')
      .forEach((container) => {
        container.innerHTML = `
        <img
          src="${info.logo}"
          alt="${info.name} Logo"
          class="logo-img"
          onerror="this.style.display='none'"
        >

        <span class="logo-text">
          ${info.name}
        </span>
      `;
      });

  // Instagram links
  document
      .querySelectorAll('.instagram-link')
      .forEach((element) => {
        element.href =
            `https://instagram.com/${info.instagram}`;
      });

  // Instagram handles
  document
      .querySelectorAll('.instagram-handle-text')
      .forEach((element) => {
        element.textContent =
            `@${info.instagram}`;
      });

  // Email
  document
      .querySelectorAll('.agency-email')
      .forEach((element) => {
        element.href =
            `mailto:${info.email}`;

        element.textContent =
            info.email;
      });

  // Phone
  document
      .querySelectorAll('.agency-phone')
      .forEach((element) => {
        element.href =
            `tel:${info.phone.replace(/\s+/g, '')}`;

        element.textContent =
            info.phone;
      });

  // Address
  document
      .querySelectorAll('.agency-address')
      .forEach((element) => {
        element.textContent =
            info.address;
      });

  // Tagline
  document
      .querySelectorAll('.agency-tagline')
      .forEach((element) => {
        element.textContent =
            info.tagline;
      });

  // Description
  document
      .querySelectorAll('.agency-desc')
      .forEach((element) => {
        element.textContent =
            info.description;
      });
}


// ==========================================
// HOME PAGE
// ==========================================

function renderHomePage() {
  const featuredGrid =
      document.getElementById(
          'home-featured-grid'
      );

  if (!siteData || !featuredGrid) {
    return;
  }

  // Hero intro video
  const heroVideo =
      document.querySelector(
          '.hero-video-bg'
      );

  if (
      heroVideo &&
      siteData.agencyInfo.introReel
  ) {
    heroVideo.src =
        siteData.agencyInfo.introReel;
  }

  // Featured projects
  const featuredProjects =
      siteData.portfolio
          .filter(
              (project) => project.featured
          )
          .slice(0, 4);

  featuredGrid.innerHTML = '';

  if (featuredProjects.length === 0) {
    featuredGrid.innerHTML = `
      <p
        style="
          grid-column: 1/-1;
          text-align: center;
          color: var(--text-muted);
        "
      >
        No featured projects available.
      </p>
    `;

    return;
  }

  featuredProjects.forEach((project) => {
    featuredGrid.appendChild(
        createPortfolioCard(project)
    );
  });

  setupRevealAnimation();
}


// ==========================================
// APP INITIALIZATION
// ==========================================

document.addEventListener(
    'DOMContentLoaded',
    async () => {
      await loadSiteData();

      setupNavbar();

      renderGlobalElements();

      renderHomePage();

      renderPortfolioPage();

      renderPricingPage();

      setupContactForm();

      setupRevealAnimation();
    }
);