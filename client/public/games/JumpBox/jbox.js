document.addEventListener("DOMContentLoaded", function () {
    function startQuiz() {
        const quizQuestions = [
            {
                question: "What is the primary purpose of a jump box?",
                options: [
                    "To host public-facing websites",
                    "To act as a secure intermediary for accessing internal systems",
                    "To monitor network performance",
                    "To store sensitive data"
                ],
                answer: 1
            },
            {
                question: "Which of the following is another name for a jump box?",
                options: [
                    "Firewall",
                    "Bastion Host",
                    "Load Balancer",
                    "Proxy Server"
                ],
                answer: 1
            },
            {
                question: "Why is a jump box considered more secure than direct access to internal systems?",
                options: [
                    "It uses weaker encryption",
                    "It reduces the attack surface by centralizing access",
                    "It allows unlimited user access",
                    "It bypasses firewall rules"
                ],
                answer: 1
            },
            {
                question: "What security measure is commonly enforced on a jump box?",
                options: [
                    "No authentication required",
                    "Multi-factor authentication (MFA)",
                    "Open access to all users",
                    "Direct internet access for internal systems"
                ],
                answer: 1
            },
            {
                question: "Which of the following is a benefit of using a jump box?",
                options: [
                    "Increased attack surface",
                    "Enhanced logging and monitoring",
                    "Direct access to sensitive systems",
                    "No need for firewall rules"
                ],
                answer: 1
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
                questionContent += `
                    <label><input type='radio' name='q${index}' value='${i}'> ${option}</label><br>
                `;
            });

            questionContent += `
                    <div>
                        <button type="button" id="prev" ${index === 0 ? 'disabled' : ''}>Previous</button>
                        <button type="button" id="${index === quizQuestions.length - 1 ? 'submit' : 'next'}">${index === quizQuestions.length - 1 ? 'Submit' : 'Next'}</button>
                    </div>
                </form>
            </div>
            `;

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