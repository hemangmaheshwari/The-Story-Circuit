// ==========================================
// ADMIN DATA PERSISTENCE & EXPORT
// ==========================================

function saveDatabase() {
    localStorage.setItem(
        'story_circuit_data',
        JSON.stringify(siteData)
    );

    console.log(
        'Database updated in localStorage preview'
    );

    if (typeof renderGlobalElements === 'function') {
        renderGlobalElements();
    }
}


function setupTopActionBar() {
    const exportButton =
        document.getElementById(
            'admin-export-btn'
        );

    const resetButton =
        document.getElementById(
            'admin-reset-btn'
        );

    if (exportButton) {
        exportButton.addEventListener(
            'click',
            exportDatabase
        );
    }

    if (resetButton) {
        resetButton.addEventListener(
            'click',
            resetDatabase
        );
    }
}


function exportDatabase() {
    const dataString =
        JSON.stringify(
            siteData,
            null,
            2
        );

    const dataBlob =
        new Blob(
            [dataString],
            {
                type: 'application/json'
            }
        );

    const downloadLink =
        document.createElement('a');

    downloadLink.href =
        URL.createObjectURL(dataBlob);

    downloadLink.download =
        'data.json';

    document.body.appendChild(
        downloadLink
    );

    downloadLink.click();

    document.body.removeChild(
        downloadLink
    );

    URL.revokeObjectURL(
        downloadLink.href
    );
}


function resetDatabase() {
    const confirmed =
        confirm(
            'Reset will discard all local unsaved edits and reload from the main data.json file. Proceed?'
        );

    if (!confirmed) {
        return;
    }

    localStorage.removeItem(
        'story_circuit_data'
    );

    window.location.reload();
}