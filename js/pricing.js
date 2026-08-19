// ==========================================
// PRICING PAGE
// ==========================================

function renderPricingPage() {
    const pricingGrid =
        document.getElementById('pricing-grid');

    if (!siteData || !pricingGrid) {
        return;
    }

    pricingGrid.innerHTML = '';

    const packages = siteData.packages;

    packages.forEach((pkg) => {
        const card = document.createElement('div');

        card.className = `pricing-card reveal ${
            pkg.popular ? 'popular' : ''
        }`;

        const badgeHtml = pkg.popular
            ? `<div class="pricing-badge">Popular</div>`
            : '';

        let featuresList = '';

        pkg.features.forEach((feature) => {
            featuresList += `
        <div class="pricing-feature">

          <svg viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>

          <span>${feature}</span>

        </div>
      `;
        });

        const ctaClass =
            pkg.popular
                ? 'primary'
                : 'secondary';

        const contactHref =
            `contact.html?package=${encodeURIComponent(pkg.id)}`;

        card.innerHTML = `
      ${badgeHtml}

      <div class="pricing-header">

        <h3 class="pricing-name">
          ${pkg.name}
        </h3>

        <p class="pricing-description">
          ${pkg.description}
        </p>

      </div>


      <div class="pricing-price-container">

        <span class="pricing-price">
          ${pkg.price}
        </span>

        <span class="pricing-period">
          / ${pkg.period}
        </span>

      </div>


      <div class="pricing-features">
        ${featuresList}
      </div>


      <a
        href="${contactHref}"
        class="pricing-action ${ctaClass}"
      >
        Get Started
      </a>
    `;

        pricingGrid.appendChild(card);
    });

    setupRevealAnimation();
}