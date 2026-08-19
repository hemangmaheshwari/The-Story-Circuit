// ==========================================
// PORTFOLIO PAGE
// ==========================================

function renderPortfolioPage() {
    const portfolioGrid =
        document.getElementById('portfolio-grid');

    if (!siteData || !portfolioGrid) {
        return;
    }

    renderFilteredPortfolio('all');

    const filterButtons =
        document.querySelectorAll('.filter-btn');

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            filterButtons.forEach((item) => {
                item.classList.remove('active');
            });

            button.classList.add('active');

            const filterValue =
                button.getAttribute('data-filter');

            renderFilteredPortfolio(filterValue);
        });
    });
}


// ==========================================
// PORTFOLIO FILTERING
// ==========================================

function renderFilteredPortfolio(category) {
    const portfolioGrid =
        document.getElementById('portfolio-grid');

    if (!portfolioGrid) {
        return;
    }

    portfolioGrid.innerHTML = '';

    const projects = siteData.portfolio;

    const filteredProjects =
        category === 'all'
            ? projects
            : projects.filter(
                (project) => project.category === category
            );

    if (filteredProjects.length === 0) {
        portfolioGrid.innerHTML = `
      <p
        style="
          grid-column: 1/-1;
          text-align: center;
          color: var(--text-muted);
          padding: 4rem 0;
        "
      >
        No items found in this category.
      </p>
    `;

        return;
    }

    filteredProjects.forEach((project) => {
        portfolioGrid.appendChild(
            createPortfolioCard(project)
        );
    });

    setupRevealAnimation();
}


// ==========================================
// PORTFOLIO CARD
// ==========================================

function createPortfolioCard(project) {
    const card = document.createElement('div');

    card.className =
        'portfolio-card reveal';

    const bentoSize =
        project.gridSize || 'standard';

    card.classList.add(
        `bento-${bentoSize}`
    );

    const isVertical =
        project.src.includes('17829148') ||
        project.src.includes('1783358') ||
        bentoSize === 'tall';

    if (isVertical) {
        card.classList.add(
            'vertical-format'
        );
    }

    let mediaHtml = '';

    if (project.mediaType === 'video') {
        mediaHtml = `
      <video
        src="${project.src}"
        loop
        muted
        playsinline
        preload="metadata"
      ></video>

      <div class="portfolio-play-btn">
        <svg viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    `;
    } else {
        mediaHtml = `
      <img
        src="${project.src}"
        alt="${project.title}"
        loading="lazy"
      >
    `;
    }

    card.innerHTML = `
    <div class="portfolio-media">
      ${mediaHtml}
    </div>

    <div class="portfolio-overlay">

      <div class="portfolio-card-category">
        ${formatCategoryName(project.category)}
      </div>

      <h3 class="portfolio-card-title">
        ${project.title}
      </h3>

      <div class="portfolio-card-action">

        <span>
          View Details
        </span>

        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line
            x1="5"
            y1="12"
            x2="19"
            y2="12"
          ></line>

          <polyline
            points="12 5 19 12 12 19"
          ></polyline>
        </svg>

      </div>

    </div>
  `;


    // ==========================================
    // VIDEO HOVER PREVIEW
    // ==========================================

    if (project.mediaType === 'video') {
        const video =
            card.querySelector('video');

        card.addEventListener(
            'mouseenter',
            () => {
                video.play().catch(() => {
                    console.log(
                        'Autoplay blocked'
                    );
                });
            }
        );

        card.addEventListener(
            'mouseleave',
            () => {
                video.pause();
                video.currentTime = 0;
            }
        );
    }


    // ==========================================
    // OPEN PROJECT MODAL
    // ==========================================

    card.addEventListener(
        'click',
        () => {
            openProjectModal(project);
        }
    );

    return card;
}


// ==========================================
// UTILITIES
// ==========================================

function formatCategoryName(category) {
    return category
        .split('-')
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(' ');
}