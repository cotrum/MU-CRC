document.addEventListener("DOMContentLoaded", function () {
    function startQuiz() {
        const quizQuestions = [
            {
                question: "A performance monitoring system primarily tracks and measures system health and resource usage.",
                options: ["True", "False"],
                answer: 0
            },
            {
                question: "Performance monitoring tools can help detect bottlenecks in system resources.",
                options: ["True", "False"],
                answer: 0
            },
            {
                question: "Logs and real-time metrics are common outputs of performance monitoring systems.",
                options: ["True", "False"],
                answer: 0
            },
            {
                question: "It's unnecessary to monitor disk usage in a performance monitoring system.",
                options: ["True", "False"],
                answer: 1
            },
            {
                question: "Performance monitoring can help improve response times and overall system stability.",
                options: ["True", "False"],
                answer: 0
            },
            {
                question: "Which of the following is NOT a key metric in performance monitoring?",
                options: ["CPU Utilization", "Memory Usage", "Network Latency", "Weather Conditions"],
                answer: 3
            },
            {
                question: "Which tool is commonly used for real-time performance monitoring?",
                options: ["Microsoft Word", "Grafana", "Photoshop", "Slack"],
                answer: 1
            },
            {
                question: "An increase in response time can indicate:",
                options: ["Improved performance", "A potential performance bottleneck", "Better system health", "Increased storage capacity"],
                answer: 1
            },
            {
                question: "Which component is critical for tracking performance trends over time?",
                options: ["Static Logs", "Historical Data", "Random Sampling", "Network Switches"],
                answer: 1
            },
            {
                question: "What is a typical use case for performance monitoring systems?",
                options: ["Detecting cyberattacks", "Optimizing resource allocation", "Graphic design", "Developing games"],
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
