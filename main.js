gsap.registerPlugin(ScrollTrigger);

gsap.to(".todo_header", {
    opacity: 0.7, // No lo hace desaparecer del todo, lo hace más elegante
    backgroundColor: "rgba(128, 128, 128, 0.8)", // Un azul translúcido bonito
    duration: 2, // Hace la transición más lenta y fluida
    ease: "power2.out", // Suaviza la animación
    scrollTrigger: {
        // markers:true,

        trigger: ".abajo",
        start: "top+=100px center",
        end: "bottom center",
        scrub: 2, // Hace que el cambio sea progresivo
    }
});

gsap.to(".background_header",{
    visibility: 'visible',
    opacity:'1',
    y: 80, 

    scrollTrigger:{
        markers:true,
        trigger:".abajo",
        start:"top+=315px center",
        end:"bottom-=30px center",
        scrub:true
    }
})


// main.js de adrian_rama

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
    },
    {
        question: "¿Qué técnica de IA se utiliza para crear sistemas que mejoran mediante experiencia?",
        options: ["1. Aprendizaje Supervisado", "2. Aprendizaje por Refuerzo", "3. Procesamiento de Lenguaje Natural", "4. Visión por Computadora"],
        correct: 1,
        explanation: "El Aprendizaje por Refuerzo se basa en agentes que aprenden tomando acciones en un entorno para maximizar una recompensa acumulativa."
    },
    {
        question: "¿Qué arquitectura de red es fundamental en los sistemas de reconocimiento de imágenes?",
        options: ["1. Transformers", "2. CNN", "3. LSTM", "4. Autoencoders"],
        correct: 1,
        explanation: "Las CNN (Redes Neuronales Convolucionales) son especializadas en procesar datos con estructura de grid como imágenes."
    },
    {
        question: "¿Qué algoritmo se usa para reducir la dimensionalidad de datos?",
        options: ["1. Regresión Lineal", "2. PCA", "3. K-NN", "4. Árboles de Decisión"],
        correct: 1,
        explanation: "PCA (Análisis de Componentes Principales) es una técnica estadística para simplificar la complejidad en datos manteniendo su información clave."
    },
    {
        question: "¿Qué tecnología permite a las máquinas entender el lenguaje humano?",
        options: ["1. Computer Vision", "2. NLP", "3. Deep Reinforcement Learning", "4. Fuzzy Logic"],
        correct: 1,
        explanation: "NLP (Procesamiento de Lenguaje Natural) es la rama de la IA que se enfoca en la interacción entre computadoras y lenguaje humano."
    },
    {
        question: "¿Qué ética debe considerarse prioritariamente en desarrollo de IA?",
        options: ["1. Eficiencia algorítmica", "2. Privacidad de datos", "3. Velocidad de procesamiento", "4. Reducción de costes"],
        correct: 1,
        explanation: "La privacidad de datos es crucial para proteger información sensible y mantener la confianza en sistemas de IA."
    },
    {
        question: "¿Qué técnica ayuda a prevenir el sobreajuste en modelos de ML?",
        options: ["1. Aumento de datos", "2. Regularización", "3. Incrementar parámetros", "4. Reducir el dataset"],
        correct: 1,
        explanation: "La regularización (como L1/L2) ayuda a simplificar modelos y prevenir overfitting penalizando parámetros complejos."
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const elements = {
    question: document.getElementById('question'),
    options: document.getElementById('options'),
    feedback: document.getElementById('feedback'),
    nextBtn: document.getElementById('next-btn'),
    score: document.getElementById('score')
};

function showAllAnswers() {
    const container = document.querySelector('.question-box');
    // Hacer scroll suave hasta el inicio del cuestionario
    window.scrollTo({
        top: container.offsetTop - 100,
        behavior: 'smooth'
    });

    container.innerHTML = '<h2 class="answers-title">Resumen del Cuestionario</h2>';
    
    questions.forEach((q, index) => {
        const userAnswerIndex = userAnswers[index];
        const isCorrect = userAnswerIndex === q.correct;
        const userAnswer = userAnswerIndex !== undefined ? q.options[userAnswerIndex] : "Sin respuesta";
        const correctAnswer = q.options[q.correct];
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'answer-item';
        questionDiv.innerHTML = `
            <div class="question-header">
                <span class="question-number">Pregunta ${index + 1}</span>
                <span class="question-status ${isCorrect ? 'correct' : 'incorrect'}">
                    ${isCorrect ? '✓ Correcta' : '✗ Incorrecta'}
                </span>
            </div>
            <p class="question-text">${q.question}</p>
            <div class="answer-details">
                <div class="user-answer ${isCorrect ? 'correct' : 'incorrect'}">
                    🗳 Tu respuesta: ${userAnswer}
                </div>
                <div class="correct-answer">
                    ✅ Correcta: ${correctAnswer}
                </div>
                <div class="explanation">
                    📚 Explicación: ${q.explanation}
                </div>
            </div>
        `;
        container.appendChild(questionDiv);
    });

    const closeBtn = document.createElement('button');
    closeBtn.id = 'close-btn';
    closeBtn.textContent = 'Cerrar';
    closeBtn.onclick = () => {
        // Scroll de vuelta al inicio al cerrar
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setTimeout(() => location.reload(), 500);
    };
    container.appendChild(closeBtn);

    // Ajuste final para asegurar el espacio
    container.style.minHeight = 'calc(100vh - 100px)';
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
    userAnswers[currentQuestion] = selectedIndex;
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

    if(selectedIndex === q.correct) {
        elements.feedback.innerHTML = `
            <div class="feedback-correct">✅ Correcto!</div>
            <div class="feedback-explanation">${q.explanation}</div>
        `;
        score++;
    } else {
        elements.feedback.innerHTML = `
            <div class="feedback-incorrect">❌ Tu respuesta: ${selectedOption}</div>
            <div class="feedback-correct-answer">✅ Correcta: ${correctOption}</div>
            <div class="feedback-explanation">📚 Explicación: ${q.explanation}</div>
        `;
    }

    elements.feedback.style.display = 'block';
    elements.nextBtn.style.display = 'block';
    updateQuestionNumber();
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