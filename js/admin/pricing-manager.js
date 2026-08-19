// ==========================================
// PRICING MANAGEMENT
// ==========================================

function renderAdminPricing() {
    const container =
        document.getElementById(
            'admin-packages-container'
        );

    if (!container) {
        return;
    }

    container.innerHTML = '';

    const packages = siteData.packages;

    packages.forEach((pkg, index) => {
        const section =
            document.createElement('div');

        section.className =
            'admin-form-section';

        const features =
            pkg.features.join('\n');

        section.innerHTML = `
            <div class="admin-form-section-title">
                <span>
                    Package ${index + 1}: ${pkg.name}
                </span>

                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <input
                        type="checkbox"
                        id="pkg-pop-${pkg.id}"
                        ${pkg.popular ? 'checked' : ''}
                        style="width: 16px; height: 16px; cursor: pointer;"
                    >

                    <label
                        for="pkg-pop-${pkg.id}"
                        style="font-size: 0.85rem; font-weight: normal; cursor: pointer;"
                    >
                        Highlight Popular
                    </label>
                </div>
            </div>

            <input
                type="hidden"
                class="pkg-id-field"
                value="${pkg.id}"
            >

            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">
                        Package Name
                    </label>

                    <input
                        type="text"
                        class="form-control pkg-name-field"
                        value="${pkg.name}"
                        required
                    >
                </div>

                <div class="form-group">
                    <label class="form-label">
                        Price Rate (e.g. $999)
                    </label>

                    <input
                        type="text"
                        class="form-control pkg-price-field"
                        value="${pkg.price}"
                        required
                    >
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">
                    Plan Description
                </label>

                <input
                    type="text"
                    class="form-control pkg-desc-field"
                    value="${pkg.description}"
                    required
                >
            </div>

            <div class="form-group">
                <label class="form-label">
                    Deliverables List (One per line)
                </label>

                <textarea
                    class="form-control pkg-features-field"
                    rows="5"
                    required
                >${features}</textarea>

                <div class="features-textarea-note">
                    Write each package deliverable or inclusion on a new line.
                </div>
            </div>
        `;

        container.appendChild(section);
    });
}


function setupPricingForm() {
    const pricingForm =
        document.getElementById(
            'admin-pricing-form'
        );

    if (!pricingForm) {
        return;
    }

    pricingForm.addEventListener(
        'submit',
        (event) => {
            event.preventDefault();

            const sections =
                document.querySelectorAll(
                    '.admin-form-section'
                );

            const updatedPackages = [];

            sections.forEach(section => {
                const id =
                    section.querySelector(
                        '.pkg-id-field'
                    ).value;

                const name =
                    section.querySelector(
                        '.pkg-name-field'
                    ).value;

                const price =
                    section.querySelector(
                        '.pkg-price-field'
                    ).value;

                const description =
                    section.querySelector(
                        '.pkg-desc-field'
                    ).value;

                const popular =
                    section.querySelector(
                        `#pkg-pop-${id}`
                    ).checked;

                const features =
                    section
                        .querySelector(
                            '.pkg-features-field'
                        )
                        .value
                        .split('\n')
                        .map(line => line.trim())
                        .filter(
                            line => line.length > 0
                        );

                updatedPackages.push({
                    id,
                    name,
                    price,
                    period: 'month',
                    description,
                    features,
                    popular
                });
            });

            siteData.packages =
                updatedPackages;

            saveDatabase();

            alert(
                'Pricing packages updated locally! Export data.json to make it public.'
            );
        }
    );
}