// ==========================================
// ADMIN DASHBOARD MODULE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Wait short duration to ensure main.js finished loading database
  setTimeout(() => {
    initAdminPanel();
  }, 100);
});

function initAdminPanel() {
  if (!siteData) {
    console.error("Site data not loaded yet.");
    return;
  }

  // Password Protection Gate
  setupPasswordProtection();

  // 1. Tab Switching Handler
  const tabButtons = document.querySelectorAll('.admin-tab-btn');
  const contentPanes = document.querySelectorAll('.admin-content-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const paneId = btn.getAttribute('data-pane');
      
      // Update buttons
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panes
      contentPanes.forEach(pane => {
        if (pane.id === paneId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // 2. Populate Agency Form Fields
  populateAgencyForm();

  // 3. Render Portfolio Management List
  renderAdminPortfolio();

  // 4. Render Pricing Configuration Fields
  renderAdminPricing();

  // 5. Setup Action Listeners
  setupFormSubmitListeners();
  setupProjectModalListeners();
  setupTopActionBar();
}

// ==========================================
// FORM POPULATORS & RENDERERS
// ==========================================
function populateAgencyForm() {
  const info = siteData.agencyInfo;
  
  setValueIfExist('agency-name-in', info.name);
  setValueIfExist('agency-tagline-in', info.tagline);
  setValueIfExist('agency-desc-in', info.description);
  setValueIfExist('agency-logo-in', info.logo);
  setValueIfExist('agency-reel-in', info.introReel);
  setValueIfExist('agency-ig-in', info.instagram);
  setValueIfExist('agency-email-in', info.email);
  setValueIfExist('agency-phone-in', info.phone);
  setValueIfExist('agency-addr-in', info.address);
}

function renderAdminPortfolio() {
  const listContainer = document.getElementById('admin-portfolio-list');
  if (!listContainer) return;

  listContainer.innerHTML = '';
  const projects = siteData.portfolio;

  if (projects.length === 0) {
    listContainer.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 2rem 0;">No projects in portfolio. Click "Add New Project" to get started.</p>`;
    return;
  }

  projects.forEach(project => {
    const row = document.createElement('div');
    row.className = 'admin-item-row';

    // Media Thumbnail Preview
    let mediaPreview = '';
    if (project.mediaType === 'video') {
      mediaPreview = `<video src="${project.src}" muted preload="metadata"></video>`;
    } else {
      mediaPreview = `<img src="${project.src}" alt="${project.title}">`;
    }

    row.innerHTML = `
      <div class="admin-item-thumb">
        ${mediaPreview}
      </div>
      <div class="admin-item-info">
        <h4 class="admin-item-name">${project.title}</h4>
        <span class="admin-item-cat">${formatCategoryName(project.category)} ${project.featured ? '★ Featured' : ''}</span>
      </div>
      <div class="admin-item-actions">
        <button class="btn-icon edit" data-id="${project.id}" title="Edit Project">
          <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
        </button>
        <button class="btn-icon delete" data-id="${project.id}" title="Delete Project">
          <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
      </div>
    `;

    // Hook events
    row.querySelector('.btn-icon.edit').addEventListener('click', () => openEditProjectModal(project.id));
    row.querySelector('.btn-icon.delete').addEventListener('click', () => deleteProject(project.id));

    listContainer.appendChild(row);
  });
}

function renderAdminPricing() {
  const container = document.getElementById('admin-packages-container');
  if (!container) return;

  container.innerHTML = '';
  const packages = siteData.packages;

  packages.forEach((pkg, index) => {
    const cardSection = document.createElement('div');
    cardSection.className = 'admin-form-section';
    
    // Convert features array back to newline separated string
    const featuresStr = pkg.features.join('\n');

    cardSection.innerHTML = `
      <div class="admin-form-section-title">
        <span>Package ${index + 1}: ${pkg.name}</span>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <input type="checkbox" id="pkg-pop-${pkg.id}" ${pkg.popular ? 'checked' : ''} style="width: 16px; height: 16px; cursor: pointer;">
          <label for="pkg-pop-${pkg.id}" style="font-size: 0.85rem; font-weight: normal; cursor: pointer;">Highlight Popular</label>
        </div>
      </div>
      <input type="hidden" class="pkg-id-field" value="${pkg.id}">
      
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Package Name</label>
          <input type="text" class="form-control pkg-name-field" value="${pkg.name}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Price Rate (e.g. $999)</label>
          <input type="text" class="form-control pkg-price-field" value="${pkg.price}" required>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Plan Description</label>
        <input type="text" class="form-control pkg-desc-field" value="${pkg.description}" required>
      </div>

      <div class="form-group">
        <label class="form-label">Deliverables List (One per line)</label>
        <textarea class="form-control pkg-features-field" rows="5" required>${featuresStr}</textarea>
        <div class="features-textarea-note">Write each package deliverable or inclusion on a new line.</div>
      </div>
    `;

    container.appendChild(cardSection);
  });
}

// ==========================================
// SUBMIT ACTIONS & STATE SAVERS
// ==========================================
function saveDatabase() {
  localStorage.setItem('story_circuit_data', JSON.stringify(siteData));
  console.log("Database updated in localStorage preview");
  
  // Re-run global elements updates on index.html, portfolio.html etc.
  renderGlobalElements();
}

function setupFormSubmitListeners() {
  // Agency Profile Form
  const agencyForm = document.getElementById('admin-agency-form');
  if (agencyForm) {
    agencyForm.addEventListener('submit', (e) => {
      e.preventDefault();

      siteData.agencyInfo.name = getValueOf('agency-name-in');
      siteData.agencyInfo.tagline = getValueOf('agency-tagline-in');
      siteData.agencyInfo.description = getValueOf('agency-desc-in');
      siteData.agencyInfo.logo = getValueOf('agency-logo-in');
      siteData.agencyInfo.introReel = getValueOf('agency-reel-in');
      siteData.agencyInfo.instagram = getValueOf('agency-ig-in');
      siteData.agencyInfo.email = getValueOf('agency-email-in');
      siteData.agencyInfo.phone = getValueOf('agency-phone-in');
      siteData.agencyInfo.address = getValueOf('agency-addr-in');

      saveDatabase();
      alert("Agency profile updated locally! Export data.json to make it public.");
    });
  }

  // Pricing Form
  const pricingForm = document.getElementById('admin-pricing-form');
  if (pricingForm) {
    pricingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const sections = document.querySelectorAll('.admin-form-section');
      const updatedPackages = [];

      sections.forEach(section => {
        const id = section.querySelector('.pkg-id-field').value;
        const name = section.querySelector('.pkg-name-field').value;
        const price = section.querySelector('.pkg-price-field').value;
        const description = section.querySelector('.pkg-desc-field').value;
        const popular = section.querySelector(`#pkg-pop-${id}`).checked;
        
        // Split text area by line break and filter out empty strings
        const features = section.querySelector('.pkg-features-field').value
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0);

        updatedPackages.push({
          id,
          name,
          price,
          period: "month",
          description,
          features,
          popular
        });
      });

      siteData.packages = updatedPackages;
      saveDatabase();
      alert("Pricing packages updated locally! Export data.json to make it public.");
    });
  }
}

// ==========================================
// PORTFOLIO CRUD MODAL ACTION
// ==========================================
const projModal = document.getElementById('admin-project-modal');
const projForm = document.getElementById('admin-project-form');

function setupProjectModalListeners() {
  if (!projModal || !projForm) return;

  const addBtn = document.getElementById('admin-add-project-btn');
  const closeBtn = document.getElementById('admin-modal-close');
  const cancelBtn = document.getElementById('admin-modal-cancel');
  const overlay = projModal.querySelector('.modal-overlay');

  const showModal = () => {
    projModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const hideModal = () => {
    projModal.classList.remove('active');
    document.body.style.overflow = '';
    projForm.reset();
    document.getElementById('proj-id').value = '';
    document.getElementById('proj-gridsize').value = 'standard';
  };

  // Open on "Add New"
  addBtn.addEventListener('click', () => {
    document.getElementById('modal-project-title-label').textContent = 'Add Portfolio Item';
    showModal();
  });

  closeBtn.addEventListener('click', hideModal);
  cancelBtn.addEventListener('click', hideModal);
  overlay.addEventListener('click', hideModal);

  // Form submit for projects
  projForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('proj-id').value;
    const title = document.getElementById('proj-title').value;
    const category = document.getElementById('proj-category').value;
    const mediaType = document.getElementById('proj-mediatype').value;
    const src = document.getElementById('proj-src').value;
    const gridSize = document.getElementById('proj-gridsize').value;
    const client = document.getElementById('proj-client').value;
    const year = document.getElementById('proj-year').value;
    const description = document.getElementById('proj-desc').value;
    const featured = document.getElementById('proj-featured').checked;

    if (id) {
      // Mode: EDIT
      const index = siteData.portfolio.findIndex(p => p.id === id);
      if (index !== -1) {
        siteData.portfolio[index] = {
          id,
          title,
          category,
          mediaType,
          src,
          gridSize,
          thumbnail: mediaType === 'image' ? src : '',
          description,
          featured,
          client,
          year
        };
      }
    } else {
      // Mode: ADD NEW
      const newId = `project-${Date.now()}`;
      siteData.portfolio.push({
        id: newId,
        title,
        category,
        mediaType,
        src,
        gridSize,
        thumbnail: mediaType === 'image' ? src : '',
        description,
        featured,
        client,
        year
      });
    }

    saveDatabase();
    hideModal();
    renderAdminPortfolio();
    alert("Project saved locally!");
  });
}

function openEditProjectModal(projectId) {
  if (!projModal || !projForm) return;

  const project = siteData.portfolio.find(p => p.id === projectId);
  if (!project) return;

  document.getElementById('modal-project-title-label').textContent = 'Edit Portfolio Item';

  // Fill modal values
  document.getElementById('proj-id').value = project.id;
  document.getElementById('proj-title').value = project.title;
  document.getElementById('proj-category').value = project.category;
  document.getElementById('proj-mediatype').value = project.mediaType;
  document.getElementById('proj-src').value = project.src;
  document.getElementById('proj-gridsize').value = project.gridSize || 'standard';
  document.getElementById('proj-client').value = project.client || '';
  document.getElementById('proj-year').value = project.year || '';
  document.getElementById('proj-desc').value = project.description;
  document.getElementById('proj-featured').checked = !!project.featured;

  // Show
  projModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function deleteProject(projectId) {
  const project = siteData.portfolio.find(p => p.id === projectId);
  if (!project) return;

  if (confirm(`Are you sure you want to delete "${project.title}" from your portfolio?`)) {
    siteData.portfolio = siteData.portfolio.filter(p => p.id !== projectId);
    saveDatabase();
    renderAdminPortfolio();
  }
}

// ==========================================
// EXPORT & RESET ACTIONS
// ==========================================
function setupTopActionBar() {
  const exportBtn = document.getElementById('admin-export-btn');
  const resetBtn = document.getElementById('admin-reset-btn');

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      // Format data nicely with 2 space indents
      const dataStr = JSON.stringify(siteData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(dataBlob);
      downloadLink.download = 'data.json';
      
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm("Reset will discard all local unsaved edits and reload from the main data.json file. Proceed?")) {
        localStorage.removeItem('story_circuit_data');
        window.location.reload();
      }
    });
  }
}

// ==========================================
// HELPERS
// ==========================================
function setValueIfExist(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

function getValueOf(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function setupPasswordProtection() {
  const loginContainer = document.getElementById('admin-login-container');
  const dashboardContainer = document.getElementById('admin-dashboard-container');
  const loginForm = document.getElementById('admin-login-form');
  const passwordInput = document.getElementById('admin-password');
  const errorText = document.getElementById('admin-login-error');

  if (!loginContainer || !dashboardContainer || !loginForm) return;

  // Check sessionStorage credentials
  if (sessionStorage.getItem('story_circut_authenticated') === 'true') {
    loginContainer.style.display = 'none';
    dashboardContainer.style.display = 'block';
    return;
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pwd = passwordInput.value;

    // Use corrected handle name for password
    if (pwd === 'storycircut2026') {
      sessionStorage.setItem('story_circut_authenticated', 'true');
      
      // Smooth fade-out transitions
      loginContainer.style.opacity = '0';
      loginContainer.style.transition = 'opacity 0.3s ease';
      
      setTimeout(() => {
        loginContainer.style.display = 'none';
        dashboardContainer.style.display = 'block';
        dashboardContainer.style.opacity = '0';
        dashboardContainer.style.transition = 'opacity 0.4s ease';
        setTimeout(() => {
          dashboardContainer.style.opacity = '1';
        }, 50);
      }, 300);
    } else {
      errorText.textContent = 'Incorrect admin password. Access denied.';
      errorText.style.display = 'block';
      
      // Reset shake animation
      loginContainer.style.animation = 'none';
      loginContainer.offsetHeight; // Trigger DOM reflow
      loginContainer.style.animation = 'shake 0.4s ease';
    }
  });
}
