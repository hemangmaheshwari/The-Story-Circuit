// ==========================================
// PORTFOLIO MANAGEMENT
// ==========================================

let projectModal = null;
let projectForm = null;


function initializePortfolioManager() {
    projectModal =
        document.getElementById(
            'admin-project-modal'
        );

    projectForm =
        document.getElementById(
            'admin-project-form'
        );

    renderAdminPortfolio();
    setupProjectModalListeners();
}


function renderAdminPortfolio() {
    const listContainer =
        document.getElementById(
            'admin-portfolio-list'
        );

    if (!listContainer) {
        return;
    }

    listContainer.innerHTML = '';

    const projects =
        siteData.portfolio;

    if (projects.length === 0) {
        listContainer.innerHTML = `
            <p style="text-align: center; color: var(--text-muted); padding: 2rem 0;">
                No projects in portfolio.
                Click "Add New Project" to get started.
            </p>
        `;

        return;
    }

    projects.forEach(project => {
        const row =
            document.createElement('div');

        row.className =
            'admin-item-row';

        let mediaPreview = '';

        if (project.mediaType === 'video') {
            mediaPreview = `
                <video
                    src="${project.src}"
                    muted
                    preload="metadata"
                ></video>
            `;
        } else {
            mediaPreview = `
                <img
                    src="${project.src}"
                    alt="${project.title}"
                >
            `;
        }

        row.innerHTML = `
            <div class="admin-item-thumb">
                ${mediaPreview}
            </div>

            <div class="admin-item-info">
                <h4 class="admin-item-name">
                    ${project.title}
                </h4>

                <span class="admin-item-cat">
                    ${formatCategoryName(project.category)}
                    ${project.featured ? '★ Featured' : ''}
                </span>
            </div>

            <div class="admin-item-actions">
                <button
                    class="btn-icon edit"
                    data-id="${project.id}"
                    title="Edit Project"
                >
                    <svg viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0-1.83 1.83-1.83 1.83 1.92 5.58z"/>
                    </svg>
                </button>

                <button
                    class="btn-icon delete"
                    data-id="${project.id}"
                    title="Delete Project"
                >
                    <svg viewBox="0 0 24 24">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                </button>
            </div>
        `;

        row
            .querySelector('.btn-icon.edit')
            .addEventListener(
                'click',
                () => openEditProjectModal(project.id)
            );

        row
            .querySelector('.btn-icon.delete')
            .addEventListener(
                'click',
                () => deleteProject(project.id)
            );

        listContainer.appendChild(row);
    });
}


// ==========================================
// PROJECT MODAL
// ==========================================

function setupProjectModalListeners() {
    if (!projectModal || !projectForm) {
        return;
    }

    const addButton =
        document.getElementById(
            'admin-add-project-btn'
        );

    const closeButton =
        document.getElementById(
            'admin-modal-close'
        );

    const cancelButton =
        document.getElementById(
            'admin-modal-cancel'
        );

    const overlay =
        projectModal.querySelector(
            '.modal-overlay'
        );

    const showModal = () => {
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const hideModal = () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';

        projectForm.reset();

        document.getElementById(
            'proj-id'
        ).value = '';

        document.getElementById(
            'proj-gridsize'
        ).value = 'standard';
    };

    if (addButton) {
        addButton.addEventListener(
            'click',
            () => {
                document.getElementById(
                    'modal-project-title-label'
                ).textContent =
                    'Add Portfolio Item';

                showModal();
            }
        );
    }

    if (closeButton) {
        closeButton.addEventListener(
            'click',
            hideModal
        );
    }

    if (cancelButton) {
        cancelButton.addEventListener(
            'click',
            hideModal
        );
    }

    if (overlay) {
        overlay.addEventListener(
            'click',
            hideModal
        );
    }

    projectForm.addEventListener(
        'submit',
        event => {
            event.preventDefault();

            saveProject();
            hideModal();
            renderAdminPortfolio();

            alert(
                'Project saved locally!'
            );
        }
    );
}


function saveProject() {
    const id =
        document.getElementById(
            'proj-id'
        ).value;

    const title =
        document.getElementById(
            'proj-title'
        ).value;

    const category =
        document.getElementById(
            'proj-category'
        ).value;

    const mediaType =
        document.getElementById(
            'proj-mediatype'
        ).value;

    const src =
        document.getElementById(
            'proj-src'
        ).value;

    const gridSize =
        document.getElementById(
            'proj-gridsize'
        ).value;

    const client =
        document.getElementById(
            'proj-client'
        ).value;

    const year =
        document.getElementById(
            'proj-year'
        ).value;

    const description =
        document.getElementById(
            'proj-desc'
        ).value;

    const featured =
        document.getElementById(
            'proj-featured'
        ).checked;

    const project = {
        id: id || `project-${Date.now()}`,
        title,
        category,
        mediaType,
        src,
        gridSize,
        thumbnail:
            mediaType === 'image'
                ? src
                : '',
        description,
        featured,
        client,
        year
    };

    if (id) {
        const index =
            siteData.portfolio.findIndex(
                project => project.id === id
            );

        if (index !== -1) {
            siteData.portfolio[index] =
                project;
        }
    } else {
        siteData.portfolio.push(
            project
        );
    }

    saveDatabase();
}


function openEditProjectModal(projectId) {
    if (!projectModal || !projectForm) {
        return;
    }

    const project =
        siteData.portfolio.find(
            item => item.id === projectId
        );

    if (!project) {
        return;
    }

    document.getElementById(
        'modal-project-title-label'
    ).textContent =
        'Edit Portfolio Item';

    document.getElementById(
        'proj-id'
    ).value = project.id;

    document.getElementById(
        'proj-title'
    ).value = project.title;

    document.getElementById(
        'proj-category'
    ).value = project.category;

    document.getElementById(
        'proj-mediatype'
    ).value = project.mediaType;

    document.getElementById(
        'proj-src'
    ).value = project.src;

    document.getElementById(
        'proj-gridsize'
    ).value =
        project.gridSize || 'standard';

    document.getElementById(
        'proj-client'
    ).value =
        project.client || '';

    document.getElementById(
        'proj-year'
    ).value =
        project.year || '';

    document.getElementById(
        'proj-desc'
    ).value =
        project.description;

    document.getElementById(
        'proj-featured'
    ).checked =
        !!project.featured;

    projectModal.classList.add(
        'active'
    );

    document.body.style.overflow =
        'hidden';
}


function deleteProject(projectId) {
    const project =
        siteData.portfolio.find(
            item => item.id === projectId
        );

    if (!project) {
        return;
    }

    const confirmed =
        confirm(
            `Are you sure you want to delete "${project.title}" from your portfolio?`
        );

    if (!confirmed) {
        return;
    }

    siteData.portfolio =
        siteData.portfolio.filter(
            item => item.id !== projectId
        );

    saveDatabase();
    renderAdminPortfolio();
}


// ==========================================
// HELPERS
// ==========================================

function formatCategoryName(category) {
    return category
        .split('-')
        .map(word =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(' ');
}