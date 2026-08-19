// ==========================================
// AGENCY MANAGEMENT
// ==========================================

function populateAgencyForm() {
    const info = siteData.agencyInfo;

    setValueIfExist(
        'agency-name-in',
        info.name
    );

    setValueIfExist(
        'agency-tagline-in',
        info.tagline
    );

    setValueIfExist(
        'agency-desc-in',
        info.description
    );

    setValueIfExist(
        'agency-logo-in',
        info.logo
    );

    setValueIfExist(
        'agency-reel-in',
        info.introReel
    );

    setValueIfExist(
        'agency-ig-in',
        info.instagram
    );

    setValueIfExist(
        'agency-email-in',
        info.email
    );

    setValueIfExist(
        'agency-phone-in',
        info.phone
    );

    setValueIfExist(
        'agency-addr-in',
        info.address
    );
}


function setupAgencyForm() {
    const agencyForm =
        document.getElementById(
            'admin-agency-form'
        );

    if (!agencyForm) {
        return;
    }

    agencyForm.addEventListener(
        'submit',
        (event) => {
            event.preventDefault();

            siteData.agencyInfo.name =
                getValueOf('agency-name-in');

            siteData.agencyInfo.tagline =
                getValueOf('agency-tagline-in');

            siteData.agencyInfo.description =
                getValueOf('agency-desc-in');

            siteData.agencyInfo.logo =
                getValueOf('agency-logo-in');

            siteData.agencyInfo.introReel =
                getValueOf('agency-reel-in');

            siteData.agencyInfo.instagram =
                getValueOf('agency-ig-in');

            siteData.agencyInfo.email =
                getValueOf('agency-email-in');

            siteData.agencyInfo.phone =
                getValueOf('agency-phone-in');

            siteData.agencyInfo.address =
                getValueOf('agency-addr-in');

            saveDatabase();

            alert(
                'Agency profile updated locally! Export data.json to make it public.'
            );
        }
    );
}


// ==========================================
// HELPERS
// ==========================================

function setValueIfExist(id, value) {
    const element =
        document.getElementById(id);

    if (element) {
        element.value = value || '';
    }
}


function getValueOf(id) {
    const element =
        document.getElementById(id);

    return element
        ? element.value.trim()
        : '';
}