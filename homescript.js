document.addEventListener('DOMContentLoaded', (event) => {
    const codexCrusade = document.getElementById('codexCrusade');
    const paragraph = document.getElementById('typewriter-paragraph');
    const nextButton = document.getElementById('nextButton');

    
    setTimeout(() => {
        codexCrusade.style.opacity = 0.97;
        setTimeout(() => {
            paragraph.style.visibility = 'visible'; 
        }, 2600); 
    }, 1200); 
});

function openNextPage() {
    window.location.href = 'calavera.html'; 
}
function openGuide() {
    window.location.href = 'GUIDEE.html';
}
