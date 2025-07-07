document.addEventListener('DOMContentLoaded', (event) => {
    let timer = document.getElementById('timer');
    let time;

    // Set the initial time based on the current page
    if (window.location.pathname.includes('calavera.html') || window.location.pathname.includes('hades.html')) {
        time = 20 * 60; // 20 minutes for Calavera and Hades
    } else if (window.location.pathname.includes('ragnarok.html')) {
        time = 40 * 60; // 40 minutes for Ragnarok
    }

    if (sessionStorage.getItem('remainingTime')){
        time = parseInt(sessionStorage.getItem('remainingTime'), 10);
    } else {
        sessionStorage.setItem('remainingTime', time);
    }

    function updateTimer() {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timer.textContent = minutes + ':' + seconds;
        time--;

        sessionStorage.setItem('remainingTime', time);

        if (time < 0) {
            clearInterval(timerInterval); // Stop the timer when it reaches 0
            
            sessionStorage.removeItem('remainingTime');

            // Create an overlay
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '1000';
            document.body.appendChild(overlay);

            // Create the alert box
            const alertBox = document.createElement('div');
            alertBox.style.backgroundColor = '#fff';
            alertBox.style.padding = '20px';
            alertBox.style.borderRadius = '10px';
            alertBox.style.textAlign = 'center';
            alertBox.style.maxWidth = '400px';
            overlay.appendChild(alertBox);

            // Create the alert message
            const alertMessage = document.createElement('p');
            alertMessage.style.fontSize = '24px';
            alertMessage.style.marginBottom = '20px';
            alertBox.appendChild(alertMessage);

            // Check if it's the Ragnarok page
            if (window.location.pathname.includes('ragnarok.html')) {
                alertMessage.textContent = "Time's up! Thank you for participating :)";
            } else {
                alertMessage.textContent = "Time's up!⏰";

                // Create the "Download Answers" button
                const downloadButton = document.createElement('button');
                downloadButton.textContent = 'Download Your Answers';
                downloadButton.style.marginBottom = '10px';


                if (window.location.pathname.includes('calavera.html')) 
                    { downloadButton.onclick = cal_storeAnswers; } 
                else if (window.location.pathname.includes('hades.html')) 
                    { downloadButton.onclick = hades_storeAnswers;}



                alertBox.appendChild(downloadButton);

                // Create the input box for the code check
                const codeInput = document.createElement('input');
                codeInput.type = 'text';
                codeInput.placeholder = 'Enter code for the next stage';
                codeInput.style.display = 'block';
                codeInput.style.margin = '10px auto';
                alertBox.appendChild(codeInput);

                // Create the "Submit Code" button
                const submitButton = document.createElement('button');
                submitButton.textContent = 'Next Event';
                submitButton.onclick = () => {
                    if (codeInput.value === '64925') {
                        redirectToNextPage();
                    } else {
                        alert('Incorrect code. Please try again.');
                    }
                };
                alertBox.appendChild(submitButton);
            }
        }
    }

    let timerInterval = setInterval(updateTimer, 1000); // Update timer every second
});

function cal_storeAnswers() {
    // Collect answers from checkboxes
    const answers = [];
    for (let i = 1; i <= 10; i++) {
        const options = document.getElementsByName('q' + i);
        options.forEach(option => {
            if (option.checked) {
                answers.push({ question: i, answer: option.value });
            }
        });
    }

    // Store answers in ans.html
    let answerFile = '<html><body><h1>Calavera Answers</h1><ul>';
    answers.forEach(ans => {
        answerFile += `<li>Ques ${ans.question}: ${ans.answer}</li>`;
    });
    answerFile += '</ul></body></html>';

    const blob = new Blob([answerFile], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'CalaveraAns.html';
    link.click();
}

// Store the previous page URL before navigating to the guide page 
function hades_storeAnswers() {
    // Collect answers from checkboxes
    const answers = [];
    for (let i = 1; i <= 10; i++) {
        const options = document.getElementsByName('q' + i);
        options.forEach(option => {
            if (option.checked) {
                answers.push({ question: i, answer: option.value });
            }
        });
    }

    // Store answers in ans.html
    let answerFile = '<html><body><h1>Hades Answers</h1><ul>';
    answers.forEach(ans => {
        answerFile += `<li>Question ${ans.question}: ${ans.answer}</li>`;
    });
    answerFile += '</ul></body></html>';

    const blob = new Blob([answerFile], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'HadesAns.html';
    link.click();
}

function navigateToHades() {
    window.location.href = 'hades.html';
}

function navigateToRagnarok() {
    window.location.href = 'ragnarok.html';
}
function copyQuestionText(questionId) {
    const questionElement = document.getElementById(questionId); 
    const questionText = questionElement.innerText;
  
    navigator.clipboard.writeText(questionText)
      .then(() => {
        alert('Question copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  }
function redirectToNextPage() {
    const currentPage = window.location.pathname;
    let nextPage = '';

    if (currentPage.includes('calavera.html')) {
        nextPage = 'hades.html';
    } else if (currentPage.includes('hades.html')) {
        nextPage = 'ragnarok.html';
    } else if (currentPage.includes('ragnarok.html')) {
        nextPage = 'calavera.html';
    }

    window.location.href = nextPage;
}

function navigateToGuide() {
    localStorage.setItem('previousPage', window.location.pathname);
    showGuidePopup();
}










//---------------------------------------------------------------
// --- Add this new function ---
function displayThankYouMessage() {
    // Hide all elements with class 'question-container'
    document.querySelectorAll('.question-container').forEach(container => {
        container.style.display = 'none';
    });

    // Hide the button itself
    const finishButton = document.getElementById('finishQuizButton');
    if (finishButton) {
        finishButton.style.display = 'none';
    }
    
    // Hide the paragraph with class 'ragna_paragraph'
    const ragnaParagraph = document.querySelector('.ragna_paragraph');
    if (ragnaParagraph) {
        ragnaParagraph.style.display = 'none';
    }

    // Hide and stop the timer
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        // IMPORTANT: Ensure 'timerInterval' is declared outside DOMContentLoaded or globally
        // e.g., at the very top of your call.js file: `let timerInterval;`
        // Then, inside DOMContentLoaded: `timerInterval = setInterval(updateTimer, 1000);`
        if (typeof timerInterval !== 'undefined') { // Check if it's defined
            clearInterval(timerInterval);
        }
        timerElement.style.display = 'none';
    }

    // Display the thank you message
    const thankYouContainer = document.getElementById('thankYouMessageContainer');
    if (thankYouContainer) {
        thankYouContainer.innerHTML = 'Well done Survivor, you made it out alive!';
        thankYouContainer.style.display = 'block';
    }
}