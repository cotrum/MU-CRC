document.addEventListener("DOMContentLoaded", function () {
    function startQuiz() {
        const quizQuestions = [
            {
                question: "What is phishing?",
                options: ["A cyber-attack technique", "A type of fishing", "A software tool", "A programming language"],
                answer: 0
            },
            {
                question: "Which of the following is a common phishing method?",
                options: ["Email phishing", "Legitimate bank calls", "Secure websites", "Firewall protection"],
                answer: 0
            },
            {
                question: "What should you do if you receive a suspicious email?",
                options: ["Click on links to verify", "Reply with personal information", "Report it and delete it", "Forward it to friends"],
                answer: 2
            },
            {
                question: "Which of the following is a red flag for phishing emails?",
                options: ["Spelling and grammar mistakes", "Urgent requests for personal data", "Unknown senders", "All of the above"],
                answer: 3
            },
            {
                question: "What is Spear Phishing?",
                options: ["Phishing targeted at specific individuals", "Phishing using social media", "A phishing attack on software", "A mass email scam"],
                answer: 0
            },
            {
                question: "What is a common goal of phishing attacks?",
                options: ["Stealing personal information", "Fixing security vulnerabilities", "Improving internet speed", "Testing website performance"],
                answer: 0
            },
            {
                question: "How can you verify a suspicious email?",
                options: ["Contact the sender through official channels", "Click on the link to check", "Forward it to everyone", "Ignore it"],
                answer: 0
            },
            {
                question: "What is Vishing?",
                options: ["Voice phishing over the phone", "Video phishing", "Virus phishing", "Virtual security scanning"],
                answer: 0
            },
            {
                question: "How does Multi-Factor Authentication (MFA) help prevent phishing attacks?",
                options: ["Adds extra layers of security", "Makes passwords unnecessary", "Automatically detects phishing emails", "Prevents all cyber-attacks"],
                answer: 0
            },
            {
                question: "Which of the following is a good practice to avoid phishing scams?",
                options: ["Use strong and unique passwords", "Click on every link in emails", "Respond to every email immediately", "Download attachments from unknown sources"],
                answer: 0
            }
        ];

        let currentQuestionIndex = 0;
        let userAnswers = [];

        function renderQuestion(index) {
            const q = quizQuestions[index];
            let questionContent = `
                <div id="quiz-container">
                    <h2>Question ${index + 1}</h2>
                    <p>${q.question}</p>
                    <form id="quiz-form">
            `;
            q.options.forEach((option, i) => {
                questionContent += `<label><input type='radio' name='q${index}' value='${i}'> ${option}</label><br>`;
            });

            questionContent += `
                <div>
                    <button type="button" id="prev" ${index === 0 ? 'disabled' : ''}>Previous</button>
                    <button type="button" id="${index === quizQuestions.length - 1 ? 'submit' : 'next'}">${index === quizQuestions.length - 1 ? 'Submit' : 'Next'}</button>
                </div>
            </form>
        </div>`;

            const existingPopup = document.getElementById("quiz-popup");
            if (existingPopup) {
                existingPopup.remove();
            }

            let quizPopup = document.createElement("div");
            quizPopup.id = "quiz-popup";
            quizPopup.className = "popup";
            quizPopup.innerHTML = questionContent;
            document.body.appendChild(quizPopup);

            document.getElementById("next")?.addEventListener("click", function () {
                const selectedAnswer = document.querySelector(`input[name='q${index}']:checked`);
                if (selectedAnswer) {
                    userAnswers[index] = parseInt(selectedAnswer.value);
                }
                if (currentQuestionIndex < quizQuestions.length - 1) {
                    currentQuestionIndex++;
                    renderQuestion(currentQuestionIndex);
                }
            });

            document.getElementById("prev").addEventListener("click", function () {
                if (currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    renderQuestion(currentQuestionIndex);
                }
            });

            document.getElementById("submit")?.addEventListener("click", function () {
                const selectedAnswer = document.querySelector(`input[name='q${index}']:checked`);
                if (selectedAnswer) {
                    userAnswers[index] = parseInt(selectedAnswer.value);
                }
                calculateScore();
            });
        }

        function calculateScore() {
            let score = 0;
            quizQuestions.forEach((q, i) => {
                if (userAnswers[i] === q.answer) {
                    score++;
                }
            });
            const percentage = (score / quizQuestions.length) * 100;
            displayResult(score, percentage);
        }

        function displayResult(score, percentage) {
            const quizContainer = document.getElementById("quiz-popup");
            let resultContent = `
                <h2>Your Score: ${score} / ${quizQuestions.length}</h2>
            `;

            if (percentage >= 75) {
                resultContent += `
                    <p>Congratulations! You passed the quiz.</p>
                    <button id="success-button">Proceed to Challenges</button>
                `;
            } else {
                resultContent += `
                    <p>You scored less than 75%. Please try again.</p>
                    <button id="retry-button">Try Again</button>
                `;
            }

            quizContainer.innerHTML = resultContent;

            if (percentage >= 75) {
                document.getElementById("success-button").addEventListener("click", function () {
                    window.location.href = "../pages/challenges.html";
                });
            } else {
                document.getElementById("retry-button").addEventListener("click", function () {
                    window.location.reload();
                });
            }
        }

        renderQuestion(currentQuestionIndex);
    }

    document.querySelector(".btn").addEventListener("click", startQuiz);
});
