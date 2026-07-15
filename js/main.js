// ==========================================
// CENTRAL DATABASE FALLBACK
// ==========================================
const DEFAULT_DATA = {
  "agencyInfo": {
    "name": "The Story Circuit",
    "tagline": "We Craft Cinematic Stories That Convert",
    "description": "We are a creative media agency specializing in premium video production, brand storytelling, vertical content creation, and creative direction. We help brands stand out through high-production-value visual content.",
    "logo": "tHE STORY CIRCUIT LOGO.png",
    "introReel": "logomotion-720p.mp4",
    "instagram": "thestorycircut",
    "email": "hello@thestorycircuit.com",
    "phone": "+91 98765 43210",
    "address": "Mumbai, India"
  },
  "portfolio": [
    {
      "id": "project-1",
      "title": "The Cure - Brand Commercial",
      "category": "video-production",
      "mediaType": "video",
      "src": "Client Work/Cure.mp4",
      "thumbnail": "",
      "description": "A high-concept brand advertisement focusing on cinematic lighting, visual metaphors, and a premium editorial style to promote wellness and modern aesthetics.",
      "featured": true,
      "client": "Cure Wellness",
      "year": "2026",
      "gridSize": "large"
    },
    {
      "id": "project-2",
      "title": "Ragi Foods - Social Promo",
      "category": "video-production",
      "mediaType": "video",
      "src": "Client Work/Ragi.mp4",
      "thumbnail": "",
      "description": "Engaging, high-energy promotional clip showcasing organic Ragi ingredients, healthy recipes, and natural aesthetics designed to drive social media conversions.",
      "featured": true,
      "client": "Ragi Nutra",
      "year": "2026",
      "gridSize": "wide"
    },
    {
      "id": "project-3",
      "title": "Eye Focus - Cinematic Sequence",
      "category": "creative-reels",
      "mediaType": "video",
      "src": "Client Work/Eye Video.mp4",
      "thumbnail": "",
      "description": "An experimental visual sequence exploring macro lenses, high frame-rate motion tracking, and striking color grading to create an immersive abstract atmosphere.",
      "featured": false,
      "client": "Self-Initiated",
      "year": "2025",
      "gridSize": "standard"
    },
    {
      "id": "project-4",
      "title": "Urban Street Fashion",
      "category": "creative-reels",
      "mediaType": "video",
      "src": "Client Work/1782914831413454.mp4",
      "thumbnail": "",
      "description": "A vertical social media reel focusing on street fashion, fast cuts, and atmospheric beats to captivate mobile-first audiences.",
      "featured": true,
      "client": "Urban Threads",
      "year": "2026",
      "gridSize": "tall"
    },
    {
      "id": "project-5",
      "title": "Lifestyle & Motion",
      "category": "creative-reels",
      "mediaType": "video",
      "src": "Client Work/1783358300035853.mp4",
      "thumbnail": "",
      "description": "A dynamic social media commercial reel combining slow-motion lifestyle shots with high-contrast grading for Instagram and TikTok campaigns.",
      "featured": false,
      "client": "Velo Lifestyle",
      "year": "2026",
      "gridSize": "tall"
    },
    {
      "id": "project-6",
      "title": "Modern Branding - Editorial Campaign",
      "category": "design-photo",
      "mediaType": "image",
      "src": "Client Work/1.jpeg",
      "thumbnail": "Client Work/1.jpeg",
      "description": "Art direction and brand styling for a modern design studio, emphasizing clean grid structures, elegant typography, and stark contrasts.",
      "featured": true,
      "client": "Apex Creative",
      "year": "2025",
      "gridSize": "standard"
    },
    {
      "id": "project-7",
      "title": "Product Packaging - Visual Design",
      "category": "design-photo",
      "mediaType": "image",
      "src": "Client Work/2.jpeg",
      "thumbnail": "Client Work/2.jpeg",
      "description": "Packaging concept and digital render for a luxury cosmetics brand, blending minimalist layouts with rich color accents.",
      "featured": false,
      "client": "Aura Cosmetics",
      "year": "2026",
      "gridSize": "standard"
    },
    {
      "id": "project-8",
      "title": "Studio Session - Portrait Photography",
      "category": "design-photo",
      "mediaType": "image",
      "src": "Client Work/3.jpeg",
      "thumbnail": "Client Work/3.jpeg",
      "description": "A striking black-and-white studio portrait series exploring mood, shadow play, and minimalist composition.",
      "featured": true,
      "client": "Editorial Magazine",
      "year": "2025",
      "gridSize": "standard"
    }
  ],
  "packages": [
    {
      "id": "pkg-starter",
      "name": "Starter Socials",
      "price": "$599",
      "period": "month",
      "description": "Perfect for small businesses looking to establish a premium visual presence online.",
      "features": [
        "4 x High-quality reels (vertical format)",
        "Basic graphic templates",
        "Color grading & sound design",
        "1 x Revision round per project",
        "Delivery within 10 business days"
      ],
      "popular": false
    },
    {
      "id": "pkg-growth",
      "name": "Growth Campaign",
      "price": "$1,299",
      "period": "month",
      "description": "Our most popular package. Designed for growing brands who need consistent, high-impact media campaigns.",
      "features": [
        "8 x Premium vertical reels / ads",
        "1 x Brand storytelling promo (horizontal/vertical)",
        "Professional art direction & styling",
        "Custom music licensing & SFX",
        "Unlimited revisions (within reason)",
        "Priority 7-day turnaround"
      ],
      "popular": true
    },
    {
      "id": "pkg-production",
      "name": "Full-Scale Production",
      "price": "$2,999",
      "period": "month",
      "description": "For established brands requiring custom commercials, product launches, and editorial photography.",
      "features": [
        "1 x Cinematic Brand Film / Commercial",
        "12 x Social media video assets",
        "Full studio photo shoot (up to 20 final edits)",
        "Scriptwriting, storyboarding, and talent sourcing",
        "24/7 dedicated creative support",
        "Express delivery option"
      ],
      "popular": false
    }
  ]
};

let siteData = null;

// ==========================================
// INITIAL DATA LOADER
// ==========================================
async function loadSiteData() {
  // 1. Try local storage (allows instant updates in user's browser)
  const localSaved = localStorage.getItem('story_circuit_data');
  if (localSaved) {
    try {
      siteData = JSON.parse(localSaved);
      console.log("Loaded data from localStorage");
      return siteData;
    } catch(e) {
      console.error("Error parsing local storage data", e);
    }
  }

  // 2. Try fetching data.json
  try {
    const response = await fetch('data.json');
    if (response.ok) {
      siteData = await response.json();
      console.log("Loaded data from data.json");
      return siteData;
    }
  } catch (error) {
    console.warn("Could not fetch data.json (possibly running locally via file://). Using fallback database.");
  }

  // 3. Fallback to hardcoded database
  siteData = DEFAULT_DATA;
  return siteData;
}

// ==========================================
// DYNAMIC COMPONENT RENDERING
// ==========================================
function renderGlobalElements() {
  if (!siteData) return;

  const info = siteData.agencyInfo;

  // Render Brand Name
  document.querySelectorAll('.agency-name').forEach(el => {
    el.textContent = info.name;
  });

  // Render Logo
  document.querySelectorAll('.logo-container').forEach(container => {
    container.innerHTML = `
      <img src="${info.logo}" alt="${info.name} Logo" class="logo-img" onerror="this.style.display='none'">
      <span class="logo-text">${info.name}</span>
    `;
  });

  // Render Socials
  document.querySelectorAll('.instagram-link').forEach(el => {
    el.href = `https://instagram.com/${info.instagram}`;
  });
  document.querySelectorAll('.instagram-handle-text').forEach(el => {
    el.textContent = `@${info.instagram}`;
  });
  document.querySelectorAll('.agency-email').forEach(el => {
    el.href = `mailto:${info.email}`;
    el.textContent = info.email;
  });
  document.querySelectorAll('.agency-phone').forEach(el => {
    el.href = `tel:${info.phone.replace(/\s+/g, '')}`;
    el.textContent = info.phone;
  });
  document.querySelectorAll('.agency-address').forEach(el => {
    el.textContent = info.address;
  });
  document.querySelectorAll('.agency-tagline').forEach(el => {
    el.textContent = info.tagline;
  });
  document.querySelectorAll('.agency-desc').forEach(el => {
    el.textContent = info.description;
  });
}

function renderHomePage() {
  if (!siteData || !document.getElementById('home-featured-grid')) return;

  // Set Hero video
  const heroVideo = document.querySelector('.hero-video-bg');
  if (heroVideo && siteData.agencyInfo.introReel) {
    heroVideo.src = siteData.agencyInfo.introReel;
  }

  // Render featured projects (max 3-4)
  const featuredGrid = document.getElementById('home-featured-grid');
  const featuredProjects = siteData.portfolio.filter(p => p.featured).slice(0, 4);

  featuredGrid.innerHTML = '';

  if (featuredProjects.length === 0) {
    featuredGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No featured projects available.</p>`;
    return;
  }

  featuredProjects.forEach(project => {
    const card = createPortfolioCard(project);
    featuredGrid.appendChild(card);
  });

  setupRevealAnimation();
}

function renderPortfolioPage() {
  const portfolioGrid = document.getElementById('portfolio-grid');
  if (!siteData || !portfolioGrid) return;

  const projects = siteData.portfolio;
  renderFilteredPortfolio('all');

  // Filter Event Listeners
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      renderFilteredPortfolio(filterValue);
    });
  });
}

function renderFilteredPortfolio(category) {
  const portfolioGrid = document.getElementById('portfolio-grid');
  if (!portfolioGrid) return;

  portfolioGrid.innerHTML = '';
  const projects = siteData.portfolio;

  const filtered = category === 'all' 
    ? projects 
    : projects.filter(p => p.category === category);

  if (filtered.length === 0) {
    portfolioGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 4rem 0;">No items found in this category.</p>`;
    return;
  }

  filtered.forEach(project => {
    const card = createPortfolioCard(project);
    portfolioGrid.appendChild(card);
  });

  setupRevealAnimation();
}

function createPortfolioCard(project) {
  const card = document.createElement('div');
  card.className = 'portfolio-card reveal';
  
  // Apply Bento Grid size classes
  const bentoSize = project.gridSize || 'standard';
  card.classList.add(`bento-${bentoSize}`);

  // Custom video check / format class
  const isVertical = project.src.includes('17829148') || project.src.includes('1783358') || bentoSize === 'tall';
  if (isVertical) {
    card.classList.add('vertical-format');
  }

  let mediaHtml = '';
  if (project.mediaType === 'video') {
    mediaHtml = `
      <video src="${project.src}" loop muted playsinline preload="metadata"></video>
      <div class="portfolio-play-btn">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </div>
    `;
  } else {
    mediaHtml = `
      <img src="${project.src}" alt="${project.title}" loading="lazy">
    `;
  }

  card.innerHTML = `
    <div class="portfolio-media">
      ${mediaHtml}
    </div>
    <div class="portfolio-overlay">
      <div class="portfolio-card-category">${formatCategoryName(project.category)}</div>
      <h3 class="portfolio-card-title">${project.title}</h3>
      <div class="portfolio-card-action">
        <span>View Details</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </div>
    </div>
  `;

  // Autoplay video snippet on hover
  if (project.mediaType === 'video') {
    const video = card.querySelector('video');
    card.addEventListener('mouseenter', () => {
      video.play().catch(e => console.log('Autoplay blocked'));
    });
    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  }

  // Open modal on click
  card.addEventListener('click', () => openProjectModal(project));

  return card;
}

function renderPricingPage() {
  const pricingGrid = document.getElementById('pricing-grid');
  if (!siteData || !pricingGrid) return;

  pricingGrid.innerHTML = '';
  const packages = siteData.packages;

  packages.forEach(pkg => {
    const card = document.createElement('div');
    card.className = `pricing-card reveal ${pkg.popular ? 'popular' : ''}`;

    const badgeHtml = pkg.popular ? `<div class="pricing-badge">Popular</div>` : '';
    
    let featuresList = '';
    pkg.features.forEach(feat => {
      featuresList += `
        <div class="pricing-feature">
          <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          <span>${feat}</span>
        </div>
      `;
    });

    const ctaClass = pkg.popular ? 'primary' : 'secondary';
    const cleanMailSubject = encodeURIComponent(`Inquiry for ${pkg.name} Package`);
    const contactHref = `contact.html?package=${encodeURIComponent(pkg.id)}`;

    card.innerHTML = `
      ${badgeHtml}
      <div class="pricing-header">
        <h3 class="pricing-name">${pkg.name}</h3>
        <p class="pricing-description">${pkg.description}</p>
      </div>
      <div class="pricing-price-container">
        <span class="pricing-price">${pkg.price}</span>
        <span class="pricing-period">/ ${pkg.period}</span>
      </div>
      <div class="pricing-features">
        ${featuresList}
      </div>
      <a href="${contactHref}" class="pricing-action ${ctaClass}">Get Started</a>
    `;

    pricingGrid.appendChild(card);
  });

  setupRevealAnimation();
}

function formatCategoryName(category) {
  return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// ==========================================
// MODAL CONTROLLER
// ==========================================
const projectModal = document.getElementById('project-modal');

function openProjectModal(project) {
  if (!projectModal) return;

  const modalMedia = projectModal.querySelector('.modal-media-wrapper');
  const modalCategory = projectModal.querySelector('.modal-category');
  const modalTitle = projectModal.querySelector('.modal-title');
  const modalClient = projectModal.querySelector('.modal-client-val');
  const modalYear = projectModal.querySelector('.modal-year-val');
  const modalDesc = projectModal.querySelector('.modal-body-desc');

  // Load correct media
  modalMedia.innerHTML = '';
  const isVertical = project.src.includes('17829148') || project.src.includes('1783358') || project.gridSize === 'tall';
  if (isVertical) {
    modalMedia.classList.add('vertical-format');
  } else {
    modalMedia.classList.remove('vertical-format');
  }

  if (project.mediaType === 'video') {
    modalMedia.innerHTML = `
      <video src="${project.src}" controls autoplay playsinline class="modal-video-player"></video>
    `;
  } else {
    modalMedia.innerHTML = `
      <img src="${project.src}" alt="${project.title}" class="modal-image-player">
    `;
  }

  // Populate text
  modalCategory.textContent = formatCategoryName(project.category);
  modalTitle.textContent = project.title;
  modalClient.textContent = project.client || 'Agency Client';
  modalYear.textContent = project.year || '2026';
  modalDesc.textContent = project.description;

  // Show Modal
  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Stop background scrolling

  // Setup close events
  const closeBtn = projectModal.querySelector('.modal-close-btn');
  const overlay = projectModal.querySelector('.modal-overlay');

  const closeModal = () => {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Stop video playback on close
    const video = modalMedia.querySelector('video');
    if (video) {
      video.pause();
      video.src = "";
    }
  };

  closeBtn.onclick = closeModal;
  overlay.onclick = closeModal;
}

// ==========================================
// CONTACT FORM HANDLER
// ==========================================
function setupContactForm() {
  const contactForm = document.getElementById('agency-contact-form');
  if (!contactForm) return;

  // Auto-fill package if provided in URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const selectedPkg = urlParams.get('package');
  if (selectedPkg && siteData) {
    const pkg = siteData.packages.find(p => p.id === selectedPkg);
    const messageField = document.getElementById('contact-message');
    if (pkg && messageField) {
      messageField.value = `Hi! I would like to inquire about the "${pkg.name}" pricing package (${pkg.price}/${pkg.period}) for my brand. Let's schedule a call!`;
    }
  }

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.form-submit-btn');
    const successMsg = document.getElementById('contact-success-msg');
    const errorMsg = document.getElementById('contact-error-msg');
    
    submitBtn.textContent = 'Sending Message...';
    submitBtn.disabled = true;

    // Simulate form submission (e.g. Formspree/Netlify forms mock)
    setTimeout(() => {
      // Form successfully submitted (simulated)
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      
      successMsg.style.display = 'block';
      errorMsg.style.display = 'none';
      contactForm.reset();

      // Fade out success notice after 5 seconds
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 5000);
    }, 1500);
  });
}

// ==========================================
// UTILITIES & GLOBAL EVENTS
// ==========================================
function setupNavbar() {
  const header = document.querySelector('.header');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  // Sticky header transition
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Highlight Active Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-link');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && href === './')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Mobile Menu Toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

// Intersection Observer for fade-in reveals
function setupRevealAnimation() {
  const reveals = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Trigger once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(rev => observer.observe(rev));
  } else {
    // Fallback if IntersectionObserver is not supported
    reveals.forEach(rev => rev.classList.add('revealed'));
  }
}

// ==========================================
// APP INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
  // Load data first
  await loadSiteData();

  // Render elements
  setupNavbar();
  renderGlobalElements();
  
  // Page-specific renderers
  renderHomePage();
  renderPortfolioPage();
  renderPricingPage();
  setupContactForm();
  
  // Start animations
  setupRevealAnimation();
});
