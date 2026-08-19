// ==========================================
// CONTACT FORM HANDLER
// ==========================================

function setupContactForm() {
    const contactForm =
        document.getElementById('agency-contact-form');

    if (!contactForm) {
        return;
    }

    const urlParams =
        new URLSearchParams(window.location.search);

    const selectedPkg =
        urlParams.get('package');

    if (selectedPkg && siteData) {
        const pkg =
            siteData.packages.find(
                (item) => item.id === selectedPkg
            );

        const messageField =
            document.getElementById('contact-message');

        if (pkg && messageField) {
            messageField.value =
                `Hi! I would like to inquire about the "${pkg.name}" pricing package (${pkg.price}/${pkg.period}) for my brand. Let's schedule a call!`;
        }
    }

    contactForm.addEventListener(
        'submit',
        (event) => {
            event.preventDefault();

            const submitBtn =
                contactForm.querySelector(
                    '.form-submit-btn'
                );

            const successMsg =
                document.getElementById(
                    'contact-success-msg'
                );

            const errorMsg =
                document.getElementById(
                    'contact-error-msg'
                );

            submitBtn.textContent =
                'Sending Message...';

            submitBtn.disabled = true;

            // Simulated form submission.
            setTimeout(() => {
                submitBtn.textContent =
                    'Send Message';

                submitBtn.disabled = false;

                successMsg.style.display =
                    'block';

                errorMsg.style.display =
                    'none';

                contactForm.reset();

                setTimeout(() => {
                    successMsg.style.display =
                        'none';
                }, 5000);

            }, 1500);
        }
    );
}