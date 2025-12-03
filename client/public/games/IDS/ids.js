document.addEventListener("DOMContentLoaded", function () {
    function startQuiz() {
        const quizQuestions = [
            {
                question: "A Host-Based IDS (HIDS) focuses on monitoring network-wide traffic.",
                options: ["True", "False"],
                answer: 1
            },
            {
                question: "An IDS can only detect, not prevent, intrusions.",
                options: ["True", "False"],
                answer: 0
            },
            {
                question: "Anomaly-based IDS can detect unknown threats but may have higher false positives.",
                options: ["True", "False"],
                answer: 0
            },
            {
                question: "Regular updates are not necessary for a signature-based IDS.",
                options: ["True", "False"],
                answer: 1
            },
            {
                question: "An IDS supports forensic analysis by providing detailed logs of system and network activity.",
                options: ["True", "False"],
                answer: 0
            },
            {
                question: "What is the primary function of an IDS?",
                options: ["To block all network traffic", "To monitor and detect unauthorized activities", "To replace antivirus software", "To scan for hardware issues"],
                answer: 1
            },
            {
                question: "Which type of IDS monitors network traffic for suspicious activities?",
                options: ["Host-Based IDS (HIDS)", "Network-Based IDS (NIDS)", "Signature-Based IDS", "Endpoint Detection"],
                answer: 1
            },
            {
                question: "An anomaly-based IDS detects threats by:",
                options: ["Comparing traffic to known attack signatures.", "Blocking all unfamiliar IP addresses.", "Identifying deviations from normal behavior.", "Updating antivirus definitions."],
                answer: 2
            },
            {
                question: "What is a major drawback of a signature-based IDS?",
                options: ["High cost", "Ineffectiveness against known threats", "Ineffectiveness against zero-day attacks", "Inability to detect normal traffic patterns"],
                answer: 2
            },
            {
                question: "What is NOT a component of an IDS?",
                options: ["Data Collection", "Analysis Engine", "Alerting System", "Operating System Updates"],
                answer: 3
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
