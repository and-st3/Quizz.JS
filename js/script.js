// Declaração de variaveis

const question = document.querySelector('#question');
const answersBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

// Perguntas
    const questions = [
        {
            "question": "PHP foi desenvolvido para qual fim?",
            "answers": [
                {
                    "answer": "back-end",
                    "correct": true
                },
                {
                    "answer": "front-end",
                    "correct": false
                },
                {
                    "answer": "Sistema operacional",
                    "correct": false
                },
                {
                    "answer": "Banco de dados",
                    "correct": false
                }
            ]
        },
        {
            "question": "Uma forma de declarar variável em JavaScript:",
            "answers": [
                {
                    "answer": "$var",
                    "correct": false
                },
                {
                    "answer": "var",
                    "correct": true
                },
                {
                    "answer": "@var",
                    "correct": false
                },
                {
                    "answer": "#let",
                    "correct": false
                }
            ]
        },
        {
            "question": "Qual o seletor de id no CSS?",
            "answers": [
                {
                    "answer": "#",
                    "correct": true
                },
                {
                    "answer": ".",
                    "correct": false
                },
                {
                    "answer": "@",
                    "correct": false
                },
                {
                    "answer": "/",
                    "correct": false
                }
            ]
        }
    ];

// Substituição do quizz

function init() {
    console.log('Iniciou o Quizz');

    createQuestion(0);
}

function createQuestion(i) {
    const oldbuttons = answersBox.querySelectorAll('button');

    oldbuttons.forEach(function(btn) {
        btn.remove();
    });

    const questiontext = document.querySelector("#question-text");
    const questionNumber = document.querySelector("#question-number");

    questiontext.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    questions[i].answers.forEach(function(answer, i) {
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer["answer"];

        answerTemplate.setAttribute('correct-answer', answer['correct']);

        answerTemplate.classList.remove('hide');
        answerTemplate.classList.remove('answer-template');

        answersBox.appendChild(answerTemplate);

        answerTemplate.addEventListener('click', function() {
            checkAnswer(this);
        });
});
        actualQuestion++;
}

    

    function checkAnswer(btn) {
        const buttons = answersBox.querySelectorAll('button');

        buttons.forEach(function(button) {

            if(button.getAttribute("correct-answer") === "true") 
                {
                button.classList.add("correct-answer");

                if(btn === button) {
                    points++;
                }

                } else {
                    button.classList.add("wrong-answer");
                }
        });

        nextQuestion();

    }
    
    function nextQuestion() {
        setTimeout(function() {
            if(actualQuestion >= questions.length) {
                showSuccessMessage();
                return;
            }

            createQuestion(actualQuestion);
        }, 400);
    }

    function showSuccessMessage() {
        quizzContainer.classList.toggle('hide');
        scoreContainer.classList.toggle('hide');

        const score = ((points / questions.length) * 100).toFixed(2);

        const displayScore = document.querySelector('#display-score span');

        console.log(score);

        displayScore.textContent = score.toString();

        const correctAnswers = document.querySelector('#correct-answers');
        correctAnswers.textContent = points;

        const totalQuestions = document.querySelector('#questions-qty');
        totalQuestions.textContent = questions.length;
    }
        function hideOrShowQuizz() {
            quizzContainer.classList.toggle('hide');
            scoreContainer.classList.toggle('hide');

        }

        const restartBtn = document.querySelector('#restart');
        restartBtn.addEventListener('click', function() {
            actualQuestion = 0;
            points = 0;
            hideOrShowQuizz();
            init();
        });

init();