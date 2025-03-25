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
    updateScore();
}

function checkAnswer(selectedIndex) {
    const q = questions[currentQuestion];
    const options = document.querySelectorAll('.option-btn');
    
    options.forEach((option, index) => {
        option.disabled = true;
        if(index === q.correct) {
            option.classList.add('correct');
        } else if(index === selectedIndex) {
            option.classList.add('incorrect');
        }
    });

    elements.feedback.textContent = q.explanation;
    elements.feedback.style.display = 'block';
    elements.nextBtn.style.display = 'block';
    
    if(selectedIndex === q.correct) {
        score++;
        updateScore();
    }
}

function updateScore() {
    elements.score.textContent = `PUNTAJE: ${score}/${questions.length}`;
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
        updateScore();
        elements.score.style.color = '#00ff88';
        elements.score.style.textShadow = '0 0 20px rgba(0, 255, 136, 0.5)';
    }
}

elements.nextBtn.addEventListener('click', nextQuestion);
document.addEventListener('DOMContentLoaded', showQuestion);