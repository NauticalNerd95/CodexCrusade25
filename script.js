document.addEventListener('DOMContentLoaded', (event) => {
    const heading = document.getElementById('typewriter-heading');
    const paragraph1 = document.getElementById('typewriter-paragraph1');
    const paragraph2 = document.getElementById('typewriter-paragraph2');
    const nextButton = document.getElementById('nextButton');

    const headingText = heading.textContent;
    const paragraph1Text = paragraph1.textContent;
    const paragraph2Text = paragraph2.textContent;

    heading.textContent = '';
    paragraph1.textContent = '';
    paragraph2.textContent = '';

    let i = 0;
    function typeHeading() {
        if (i < headingText.length) {
            heading.textContent += headingText.charAt(i);
            i++;
            setTimeout(typeHeading, 100); // Adjust typing speed here
        } else {
            setTimeout(typeParagraph1, 1000); // Start first paragraph animation after a delay
        }
    }

    let j = 0;
    function typeParagraph1() {
        if (j < paragraph1Text.length) {
            paragraph1.textContent += paragraph1Text.charAt(j);
            j++;
            setTimeout(typeParagraph1, 75); // Adjust typing speed here
        } else {
            setTimeout(typeParagraph2, 1000); // Start second paragraph animation after a delay
        }
    }

    let k = 0;
    function typeParagraph2() {
        if (k < paragraph2Text.length) {
            paragraph2.textContent += paragraph2Text.charAt(k);
            k++;
            setTimeout(typeParagraph2, 75); // Adjust typing speed here
        } else {
            nextButton.style.display = 'inline-block'; // Show button after second paragraph finishes typing
            setTimeout(() => { nextButton.style.opacity = 1; }, 100); // Add slow transition
        }
    }

    typeHeading();
});

// Add this function to handle the transition
function navigateWithFade(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = url;
    }, 1000); // Match the delay to the 3-second transition duration
}

// Use this function to navigate instead of direct navigation
document.getElementById('nextButton').addEventListener('click', () => {
    navigateWithFade('home.html');
});
