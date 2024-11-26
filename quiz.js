const allQuestions = [

    {
        "question": "sin0°",
        "options": ["1", "0", "1/2", "1/√2"],
        "answer": "0"
    },
    {
        "question": "sin30°",
        "options": ["1", "1/2", "√3/2", "1/√2"],
        "answer": "1/2"
    },
    {
        "question": "sin45°",
        "options": ["1", "1/2", "1/√2", "√3/2"],
        "answer": "1/√2"
    },
    {
        "question": "sin60°",
        "options": ["1", "1/2", "√3/2", "1/√2"],
        "answer": "√3/2"
    },
    {
        "question": "sin90°",
        "options": ["1", "0", "1/2", "√3/2"],
        "answer": "1"
    },
    {
        "question": "sin120°",
        "options": ["1", "-1/2", "√3/2", "-1/√2"],
        "answer": "√3/2"
    },
    {
        "question": "sin135°",
        "options": ["1", "-1/2", "1/√2", "-√3/2"],
        "answer": "1/√2"
    },
    {
        "question": "sin150°",
        "options": ["1", "1/2", "√3/2", "-1/√2"],
        "answer": "1/2"
    },
    {
        "question": "sin180°",
        "options": ["1", "0", "-1", "√3/2"],
        "answer": "0"
    },
    {
        "question": "cos0°",
        "options": ["1", "0", "1/2", "1/√2"],
        "answer": "1"
    },
    {
        "question": "cos30°",
        "options": ["1", "1/2", "√3/2", "1/√2"],
        "answer": "√3/2"
    },
    {
        "question": "cos45°",
        "options": ["1", "1/2", "√3/2", "1/√2"],
        "answer": "1/√2"
    },
    {
        "question": "cos60°",
        "options": ["1", "1/2", "√3/2", "1/√2"],
        "answer": "1/2"
    },
    {
        "question": "cos90°",
        "options": ["1", "0", "1/2", "1/√2"],
        "answer": "0"
    },
    {
        "question": "cos120°",
        "options": ["-1", "0", "-1/2", "-√3/2"],
        "answer": "-1/2"
    },
    {
        "question": "cos135°",
        "options": ["1/√2", "-1", "-√3/2", "-1/√2"],
        "answer": "-1/√2"
    },
    {
        "question": "cos150°",
        "options": ["-1", "0", "-√3/2", "-1/2"],
        "answer": "-√3/2"
    },
    {
        "question": "cos180°",
        "options": ["-1", "0", "1/2", "-√3/2"],
        "answer": "-1"
    },
    {
        "question": "tan0°",
        "options": ["0", "1/2", "1", "×"],
        "answer": "0"
    },
    {
        "question": "tan30°",
        "options": ["1", "1/2", "√3", "1/√3"],
        "answer": "1/√3"
    },
    {
        "question": "tan45°",
        "options": ["1", "1/2", "√3", "1/√3"],
        "answer": "1"
    },
    {
        "question": "tan60°",
        "options": ["1", "1/2", "√3", "1/√3"],
        "answer": "√3"
    },
    {
        "question": "tan90°",
        "options": ["×", "0", "1/2", "1"],
        "answer": "×"
    },
    {
        "question": "tan120°",
        "options": ["1", "-1/√3", "-√3", "√3"],
        "answer": "-√3"
    },
    {
        "question": "tan135°",
        "options": ["1", "-1", "-√3", "-1/√3"],
        "answer": "-1"
    },
    {
        "question": "tan150°",
        "options": ["1/√3", "-√3", "-1", "-1/√3"],
        "answer": "-1/√3"
    },
    {
        "question": "tan180°",
        "options": ["0", "-1", "1/2", "×"],
        "answer": "0"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];
let userAnswers = []; // ユーザーの回答を記録するための配列

function startQuiz() {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("header").style.display = "block";
    document.getElementById("quizContainer").style.display = "block";
    selectedQuestions = getRandomQuestions(5); // ランダムで5問選ぶ
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = []; // クイズをリセットするときにクリア
    displayQuestion();
}

function getRandomQuestions(num) {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function displayQuestion() {
    const questionObj = selectedQuestions[currentQuestionIndex];
    document.getElementById("questionText").textContent = questionObj.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = '';

    questionObj.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("optionButton");
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const questionObj = selectedQuestions[currentQuestionIndex];

    // ユーザーの回答を記録する
    userAnswers.push({
        question: questionObj.question,
        selectedAnswer: selectedOption,
        correctAnswer: questionObj.answer
    });

    if (selectedOption === questionObj.answer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const totalQuestions = selectedQuestions.length;

    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';
    document.getElementById('header').style.display = 'none';
    
    // 各問題の結果を表示
    const resultHtml = userAnswers.map((answer) => 
        `<div>
            <p><strong>問題:</strong> ${answer.question}</p>
            <p><strong>結果:</strong> ${answer.selectedAnswer === answer.correctAnswer ? '⭕️' : '❌'}</p>
            <p><strong>あなたの解答:</strong> ${answer.selectedAnswer}</p>
            <p><strong>正答:</strong> ${answer.correctAnswer}</p>
        </div>`
    ).join('');

    document.getElementById('resultList').innerHTML = resultHtml;
    document.getElementById('score').innerText = `得点: ${score} / ${totalQuestions}`;
}

function restartQuiz() {
    document.getElementById("resultContainer").style.display = "none";
    startQuiz();
}
