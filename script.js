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
            setTimeout(typeHeading, 100); 
        } else {
            setTimeout(typeParagraph1, 1000); 
        }
    }

    let j = 0;
    function typeParagraph1() {
        if (j < paragraph1Text.length) {
            paragraph1.textContent += paragraph1Text.charAt(j);
            j++;
            setTimeout(typeParagraph1, 75); 
        } else {
            setTimeout(typeParagraph2, 1000); 
        }
    }

    let k = 0;
    function typeParagraph2() {
        if (k < paragraph2Text.length) {
            paragraph2.textContent += paragraph2Text.charAt(k);
            k++;
            setTimeout(typeParagraph2, 75); 
        } else {
            nextButton.style.display = 'inline-block'; 
            setTimeout(() => { nextButton.style.opacity = 1; }, 100); 
        }
    }

    typeHeading();
});

function navigateWithFade(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = url;
    }, 1000); 
}

document.getElementById('nextButton').addEventListener('click', () => {
    navigateWithFade('home.html');
});
