const questions = [
    {
        question: "¿Qué tipo de red neuronal es mejor para procesar secuencias temporales?",
        options: ["1. CNN", "2. RNN", "3. GAN", "4. MLP"],
        correct: 1,
        explanation: "Las RNN (Redes Neuronales Recurrentes) están diseñadas para trabajar con datos secuenciales y series temporales."
    },
    {
        question: "¿Qué algoritmo se usa comúnmente para problemas de clasificación binaria?",
        options: ["1. Regresión Lineal", "2. SVM", "3. K-Means", "4. Árbol de Decisión"],
        correct: 1,
        explanation: "SVM (Máquinas de Vectores de Soporte) son particularmente efectivas para clasificación binaria de alta dimensión."
    },
    {
        question: "¿Qué técnica de IA utiliza redes generativas y discriminativas?",
        options: ["1. Redes Neuronales Convolucionales", "2. GANs", "3. Árboles de Decisión", "4. K-Vecinos más Cercanos"],
        correct: 1,
        explanation: "Las GANs (Redes Generativas Antagónicas) usan dos redes neuronales compitiendo entre sí para generar datos realistas."
    },
    {
        question: "¿Qué algoritmo de aprendizaje no supervisado agrupa datos similares?",
        options: ["1. Regresión Logística", "2. SVM", "3. K-Means", "4. Redes Bayesianas"],
        correct: 2,
        explanation: "K-Means es un algoritmo de clustering que agrupa datos en 'k' grupos basados en similitudes."
    }
];

let currentQuestion = 0;
let score = 0;
const elements = {
    question: document.getElementById('question'),
    options: document.getElementById('options'),
    feedback: document.getElementById('feedback'),
    nextBtn: document.getElementById('next-btn'),
    score: document.getElementById('score')
};

function showAllAnswers() {
    const container = document.querySelector('.question-box');
    container.innerHTML = '<h2 class="answers-title">Respuestas Correctas</h2>';
    
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'answer-item';
        questionDiv.innerHTML = `
            <p class="question-text">${index + 1}. ${q.question}</p>
            <p class="correct-answer">Respuesta correcta: ${q.options[q.correct]}</p>
        `;
        container.appendChild(questionDiv);
    });

    const closeBtn = document.createElement('button');
    closeBtn.id = 'close-btn';
    closeBtn.textContent = 'Cerrar';
    closeBtn.onclick = () => location.reload();
    container.appendChild(closeBtn);
}

function showQuestion() {
    const q = questions[currentQuestion];
    elements.question.textContent = q.question;
    elements.options.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        elements.options.appendChild(button);
    });
    
    elements.feedback.style.display = 'none';
    elements.nextBtn.style.display = 'none';
    updateQuestionNumber();
}

function checkAnswer(selectedIndex) {
    const q = questions[currentQuestion];
    const options = document.querySelectorAll('.option-btn');
    const selectedOption = q.options[selectedIndex];
    const correctOption = q.options[q.correct];
    
    options.forEach((option, index) => {
        option.disabled = true;
        if(index === q.correct) {
            option.classList.add('correct');
        } else if(index === selectedIndex) {
            option.classList.add('incorrect');
        }
    });

    // Mostrar respuesta seleccionada y explicación
    if(selectedIndex === q.correct) {
        elements.feedback.innerHTML = `
            <div class="feedback-correct">✅ Correcto!</div>
            <div class="feedback-explanation">${q.explanation}</div>
        `;
    } else {
        elements.feedback.innerHTML = `
            <div class="feedback-incorrect">❌ Tu respuesta: ${selectedOption}</div>
            <div class="feedback-correct-answer">✅ Correcta: ${correctOption}</div>
            <div class="feedback-explanation">📚 Explicación: ${q.explanation}</div>
        `;
    }

    elements.feedback.style.display = 'block';
    elements.nextBtn.style.display = 'block';
    
    if(selectedIndex === q.correct) {
        score++;
    }
}

function updateQuestionNumber() {
    elements.score.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
}

function nextQuestion() {
    currentQuestion++;
    if(currentQuestion < questions.length) {
        showQuestion();
    } else {
        elements.question.textContent = "¡QUIZ COMPLETADO!";
        elements.options.innerHTML = '';
        elements.feedback.style.display = 'none';
        elements.nextBtn.style.display = 'none';
        
        // Mostrar puntuación final
        elements.score.textContent = `Puntuación final: ${score}/${questions.length}`;
        elements.score.style.color = '#00ff88';
        elements.score.style.textShadow = '0 0 20px rgba(0, 255, 136, 0.5)';
        
        const viewAnswersBtn = document.createElement('button');
        viewAnswersBtn.id = 'view-answers-btn';
        viewAnswersBtn.textContent = 'Ver Respuestas';
        viewAnswersBtn.onclick = showAllAnswers;
        document.querySelector('.question-box').appendChild(viewAnswersBtn);
    }
}

elements.nextBtn.addEventListener('click', nextQuestion);
document.addEventListener('DOMContentLoaded', showQuestion);