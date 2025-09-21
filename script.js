// script.js file

// Questions list (Aapke diye gaye questions se)
const questions = [
    {
        question: "Which is the largest desert in the world?",
        options: ["Thar Desert", "Sahara Desert", "Kalahari Desert", "Gobi Desert"],
        correctAnswer: "Sahara Desert"
    },
    {
        question: "Who invented the light bulb?",
        options: ["Alexander Graham Bell", "Thomas Alva Edison", "James Watt", "Albert Einstein"],
        correctAnswer: "Thomas Alva Edison"
    },
    {
        question: "Which is the longest river in India?",
        options: ["Ganga", "Yamuna", "Brahmaputra", "Godavari"],
        correctAnswer: "Ganga"
    },
    {
        question: "Which is the highest mountain peak in the world?",
        options: ["Kanchenjunga", "K2", "Mount Everest", "Nanda Devi"],
        correctAnswer: "Mount Everest"
    },
    {
        question: "Who is known as the \"Missile Man of India\"?",
        options: ["Homi Bhabha", "A.P.J. Abdul Kalam", "Vikram Sarabhai", "C.V. Raman"],
        correctAnswer: "A.P.J. Abdul Kalam"
    },
    // Aap yahan baaki questions add kar sakte hain
    {
        question: "What is the currency of Japan?",
        options: ["Yen", "Yuan", "Dollar", "Won"],
        correctAnswer: "Yen"
    },
    {
        question: "Which gas do plants release during photosynthesis?",
        options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
        correctAnswer: "Oxygen"
    },
    {
        question: "Who was the first woman President of India?",
        options: ["Sarojini Naidu", "Indira Gandhi", "Pratibha Patil", "Sonia Gandhi"],
        correctAnswer: "Pratibha Patil"
    },
    {
        question: "Which is the national aquatic animal of India?",
        options: ["Dolphin", "Crocodile", "Whale", "Shark"],
        correctAnswer: "Dolphin"
    },
    {
        question: "Who discovered gravity when an apple fell from a tree?",
        options: ["Galileo Galilei", "Albert Einstein", "Isaac Newton", "Charles Darwin"],
        correctAnswer: "Isaac Newton"
    },
    {
        question: "Which Mughal Emperor built the Taj Mahal?",
        options: ["Akbar", "Aurangzeb", "Shah Jahan", "Humayun"],
        correctAnswer: "Shah Jahan"
    },
    {
        question: "Which Indian city is called the “Pink City”?",
        options: ["Jaipur", "Jodhpur", "Udaipur", "Bikaner"],
        correctAnswer: "Jaipur"
    },
    {
        question: "Who was the first Indian woman to go to space?",
        options: ["Sunita Williams", "Kalpana Chawla", "Indira Gandhi", "Sarojini Naidu"],
        correctAnswer: "Kalpana Chawla"
    },
    {
        question: "Which state of India is known as the \"Land of Rising Sun\"?",
        options: ["Sikkim", "Arunachal Pradesh", "Assam", "Manipur"],
        correctAnswer: "Arunachal Pradesh"
    },
    {
        question: "Which planet has the most moons?",
        options: ["Earth", "Jupiter", "Saturn", "Neptune"],
        correctAnswer: "Saturn"
    },
    {
        question: "Who is the author of the book Discovery of India?",
        options: ["Rabindranath Tagore", "Mahatma Gandhi", "Jawaharlal Nehru", "Subhash Chandra Bose"],
        correctAnswer: "Jawaharlal Nehru"
    },
    {
        question: "What is the study of earthquakes called?",
        options: ["Geology", "Seismology", "Astrology", "Meteorology"],
        correctAnswer: "Seismology"
    },
    {
        question: "Which was the first satellite launched by India?",
        options: ["INSAT-1A", "Aryabhata", "Bhaskara", "Rohini"],
        correctAnswer: "Aryabhata"
    },
    {
        question: "Who gave the slogan “Jai Jawan, Jai Kisan”?",
        options: ["Mahatma Gandhi", "Lal Bahadur Shastri", "Jawaharlal Nehru", "Subhash Chandra Bose"],
        correctAnswer: "Lal Bahadur Shastri"
    },
    {
        question: "What is the official language of Bhutan?",
        options: ["Hindi", "Dzongkha", "Nepali", "Tibetan"],
        correctAnswer: "Dzongkha"
    }
];


// HTML elements ko select karein
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-button');
const usernameInput = document.getElementById('username');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const timerElement = document.getElementById('timer');
const resultNameElement = document.getElementById('result-name');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

// Variables for quiz state
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let timer;
const TIME_PER_QUESTION = 10; // Har sawal ke liye 10 seconds
let timeLeft = TIME_PER_QUESTION;
let username = ""; // To store the user's name

// Function to start the quiz
startButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        startScreen.classList.remove('active');
        quizScreen.classList.add('active');
        resultNameElement.textContent = username; // Set the name for result screen
        startQuiz();
    } else {
        alert("Kripya apna naam likhein!");
    }
});

// Function to display questions and options
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `Q${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    optionsContainer.innerHTML = '';
    
    // Clear previous timer and set new one
    clearInterval(timer);
    timeLeft = TIME_PER_QUESTION;
    timerElement.textContent = timeLeft;
    startTimer();

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            checkAnswer(null); // Move to next question if time runs out
        }
    }, 1000);
}

// Function to check user's answer
function checkAnswer(selectedOption) {
    clearInterval(timer);
    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = optionsContainer.querySelectorAll('.option-button');

    optionButtons.forEach(button => {
        if (button.textContent === currentQuestion.correctAnswer) {
            button.classList.add('correct');
        } else if (button.textContent === selectedOption) {
            button.classList.add('incorrect'); // User's wrong answer
        }
        button.disabled = true; // Disable buttons after an answer is selected
    });

    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
        correctAnswers++;
    } else {
        incorrectAnswers++;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1500); // 1.5 seconds delay before next question
}

// Function to show the final result and submit to Google Form
function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    finalScoreElement.textContent = `Aapka score hai: ${score} out of ${questions.length}`;

    // --- Pie Chart ---
    const ctx = document.getElementById('resultChart').getContext('2d');
    // Destroy previous chart instance if it exists to avoid conflicts
    if (window.myChartInstance) {
        window.myChartInstance.destroy();
    }
    window.myChartInstance = new Chart(ctx, { // Store chart instance globally
        type: 'pie',
        data: {
            labels: ['Sahi Jawab', 'Galat Jawab'],
            datasets: [{
                data: [correctAnswers, incorrectAnswers],
                backgroundColor: ['#28a745', '#dc3545'], // Green for correct, Red for incorrect
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Quiz Performance'
                }
            }
        }
    });

    // --- Submit score to Google Form ---
    // !!! IMPORTANT: Is URL aur entry IDs ko apne Google Form ke hisab se badle !!!
    // Form action URL, jo Google Form "pre-filled link" ke "viewform" ko "formResponse" se badal kar milta hai.
    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeNH3Ec9SKehJLS_AMy5wRQNagRHghV3uF3ZVOir3jrFPIE1g/formResponse'; // REPLACE THIS WITH YOUR FORM'S ACTION URL

    const formData = new FormData();
    // REPLACE THESE ENTRY IDs with the ones you got from your pre-filled link
    formData.append('entry.123456789', username); // Example Entry ID for "Apna Naam"
    formData.append('entry.987654321', score);    // Example Entry ID for "Score"

    fetch(googleFormUrl, {
        method: 'POST',
        mode: 'no-cors', // This is crucial for cross-origin submission without server-side
        body: formData
    })
    .then(() => console.log('Score submitted successfully to Google Form!'))
    .catch(error => console.error('Error submitting score to Google Form:', error));
}

// Restart the quiz
restartButton.addEventListener('click', () => {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
    usernameInput.value = ''; // Clear username input
    if (window.myChartInstance) {
        window.myChartInstance.destroy(); // Destroy chart when restarting
    }
});
  
