// ==========================================
// SITE DATA
// ==========================================

let siteData = null;

const DATA_STORAGE_KEY = 'story_circuit_data';
const DATA_FILE = 'data/data.json';


// ==========================================
// EMERGENCY FALLBACK DATA
// ==========================================

const DEFAULT_DATA = {
    agencyInfo: {
        name: 'The Story Circuit',
        tagline: 'We Craft Cinematic Stories That Convert',
        description: '',
        logo: 'assets/images/tHE STORY CIRCUIT LOGO.png',
        introReel: 'assets/videos/logomotion-720p.mp4',
        instagram: 'thestorycircut',
        email: 'hello@thestorycircuit.com',
        phone: '+91 98765 43210',
        address: 'Mumbai, India'
    },

    portfolio: [],

    packages: []
};


// ==========================================
// DATA LOADING
// ==========================================

async function loadSiteData() {
    const savedData = getStoredSiteData();

    if (savedData) {
        siteData = savedData;

        console.log(
            'Loaded data from localStorage'
        );

        return siteData;
    }

    const fileData = await loadDataFile();

    if (fileData) {
        siteData = fileData;

        console.log(
            'Loaded data from data/data.json'
        );

        return siteData;
    }

    siteData = DEFAULT_DATA;

    console.warn(
        'Loaded emergency fallback data.'
    );

    return siteData;
}


// ==========================================
// LOCAL STORAGE
// ==========================================

function getStoredSiteData() {
    const storedData =
        localStorage.getItem(
            DATA_STORAGE_KEY
        );

    if (!storedData) {
        return null;
    }

    try {
        return JSON.parse(storedData);

    } catch (error) {
        console.error(
            'Error parsing localStorage data:',
            error
        );

        localStorage.removeItem(
            DATA_STORAGE_KEY
        );

        return null;
    }
}


// ==========================================
// DATA FILE
// ==========================================

async function loadDataFile() {
    try {
        const response =
            await fetch(DATA_FILE);

        if (!response.ok) {
            throw new Error(
                `Failed to load ${DATA_FILE}: ${response.status}`
            );
        }

        const data =
            await response.json();

        return data;

    } catch (error) {
        console.warn(
            'Could not load data.json.',
            error
        );

        return null;
    }
}