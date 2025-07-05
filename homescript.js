document.addEventListener('DOMContentLoaded', (event) => {
    const codexCrusade = document.getElementById('codexCrusade');
    const paragraph = document.getElementById('typewriter-paragraph');
    const nextButton = document.getElementById('nextButton');

    // Typing effect for heading
    setTimeout(() => {
        codexCrusade.style.opacity = 0.97;
        // Start typing the paragraph after the heading is done
        setTimeout(() => {
            paragraph.style.visibility = 'visible'; // Make the paragraph visible
        }, 2600); // Adjust this delay to match the duration of the heading typing effect
    }, 1200); // 1-second delay for heading to start typing
});

function openNextPage() {
    window.location.href = 'calavera.html'; // Replace 'nextPage.html' with the path to your new HTML document
}
function openGuide() {
    window.location.href = 'GUIDEE.html'; // Replace 'nextPage.html' with the path to your new HTML document
}
