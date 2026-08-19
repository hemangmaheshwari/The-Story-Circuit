// ==========================================
// MODAL CONTROLLER
// ==========================================

const projectModal =
    document.getElementById('project-modal');


function openProjectModal(project) {
    if (!projectModal) {
        return;
    }

    const modalMedia =
        projectModal.querySelector(
            '.modal-media-wrapper'
        );

    const modalCategory =
        projectModal.querySelector(
            '.modal-category'
        );

    const modalTitle =
        projectModal.querySelector(
            '.modal-title'
        );

    const modalClient =
        projectModal.querySelector(
            '.modal-client-val'
        );

    const modalYear =
        projectModal.querySelector(
            '.modal-year-val'
        );

    const modalDesc =
        projectModal.querySelector(
            '.modal-body-desc'
        );


    modalMedia.innerHTML = '';


    const isVertical =
        project.src.includes('17829148') ||
        project.src.includes('1783358') ||
        project.gridSize === 'tall';


    modalMedia.classList.toggle(
        'vertical-format',
        isVertical
    );


    if (project.mediaType === 'video') {

        modalMedia.innerHTML = `
      <video
        src="${project.src}"
        controls
        autoplay
        playsinline
        class="modal-video-player"
      ></video>
    `;

    } else {

        modalMedia.innerHTML = `
      <img
        src="${project.src}"
        alt="${project.title}"
        class="modal-image-player"
      >
    `;

    }


    modalCategory.textContent =
        formatCategoryName(
            project.category
        );

    modalTitle.textContent =
        project.title;

    modalClient.textContent =
        project.client ||
        'Agency Client';

    modalYear.textContent =
        project.year ||
        '2026';

    modalDesc.textContent =
        project.description;


    projectModal.classList.add(
        'active'
    );

    document.body.style.overflow =
        'hidden';


    const closeBtn =
        projectModal.querySelector(
            '.modal-close-btn'
        );

    const overlay =
        projectModal.querySelector(
            '.modal-overlay'
        );


    const closeModal = () => {

        projectModal.classList.remove(
            'active'
        );

        document.body.style.overflow =
            '';


        const video =
            modalMedia.querySelector(
                'video'
            );

        if (video) {
            video.pause();
            video.src = '';
        }
    };


    closeBtn.onclick =
        closeModal;

    overlay.onclick =
        closeModal;
}