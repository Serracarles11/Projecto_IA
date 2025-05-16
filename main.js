gsap.registerPlugin(ScrollTrigger);

gsap.to(".todo_header", {
    opacity: 0.7, // No lo hace desaparecer del todo, lo hace más elegante
    backgroundColor: "rgba(0,0,0,0)", // Un azul translúcido bonito
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
gsap.to(".cuadrado", {
    opacity: 0.7, // No lo hace desaparecer del todo, lo hace más elegante
    backgroundColor: "rgba(0,0,0,0)", // Un azul translúcido bonito
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
        end:"bottom-=30px top",
        scrub:true
    }
})


document.addEventListener('DOMContentLoaded', function() {
    const wordList = document.querySelector('[data-looping-words-list]');
    const words = Array.from(wordList.children);
    const totalWords = words.length;
    const wordHeight = 100 / totalWords; // Offset as a percentage
    const edgeElement = document.querySelector('[data-looping-words-selector]');
    let currentIndex = 0;
    function updateEdgeWidth() {
      const centerIndex = (currentIndex + 1) % totalWords;
      const centerWord = words[centerIndex];
      const centerWordWidth = centerWord.getBoundingClientRect().width;
      const listWidth = wordList.getBoundingClientRect().width;
      const percentageWidth = (centerWordWidth / listWidth) * 100;
      gsap.to(edgeElement, {
        width: `${percentageWidth}%`,
        duration: 0.5,
        ease: 'Expo.easeOut',
      });
    }
    function moveWords() {
        
      currentIndex++;
      gsap.to(wordList, {
        yPercent: -wordHeight * currentIndex,
        duration: 1.2,
        ease: 'elastic.out(1, 0.85)',
        onStart: () => {
            updateEdgeWidth();
            updateWordStyles(); // 💡 Añadimos esta
        },
        onComplete: function() {
          if (currentIndex >= totalWords - 3) {
            wordList.appendChild(wordList.children[0]);
            currentIndex--;
            gsap.set(wordList, { yPercent: -wordHeight * currentIndex });
            words.push(words.shift());
          }
        }
      });
    }
    updateEdgeWidth();
    function updateWordStyles() {
        words.forEach((word, i) => {
          const isCenter = i === (currentIndex + 1) % totalWords;
          gsap.to(word, {
            opacity: isCenter ? 1 : 0.5,
            scale: isCenter ? 1.1 : 0.5,
            duration: 0.5,
            ease: 'power2.out'
          });
        });
      }
      
    gsap.timeline({ repeat: -1, delay: 1 })
      .call(moveWords)
      .to({}, { duration: 2 })
      .repeat(-1);
      
  });





// main.js de adrian_rama



document.addEventListener('DOMContentLoaded', function() {
    // Datos para simular actividad cerebral
    function generateWaveData(points, amplitude, frequency, phase, noise) {
        let data = [];
        for (let i = 0; i < points; i++) {
            let x = i / points;
            let y = amplitude * Math.sin(2 * Math.PI * frequency * x + phase) + 
                    (Math.random() * noise - noise/2);
            data.push({x: x, y: y});
        }
        return data;
    }
    
    const ctxBrain = document.getElementById('brainActivityChart').getContext('2d');
    
    // Gradiente para el área bajo la línea
    const gradientFill1 = ctxBrain.createLinearGradient(0, 0, 0, 300);
    gradientFill1.addColorStop(0, 'rgba(0, 247, 255, 0.4)');
    gradientFill1.addColorStop(1, 'rgba(0, 247, 255, 0.0)');
    
    const gradientFill2 = ctxBrain.createLinearGradient(0, 0, 0, 300);
    gradientFill2.addColorStop(0, 'rgba(110, 68, 255, 0.4)');
    gradientFill2.addColorStop(1, 'rgba(110, 68, 255, 0.0)');
    
    // Configurar el gráfico de actividad cerebral
    const brainChart = new Chart(ctxBrain, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Sin NeuroEcho',
                data: generateWaveData(100, 30, 1, 0, 15),
                borderColor: 'rgba(255, 255, 255, 0.5)',
                borderWidth: 2,
                pointRadius: 0,
                fill: false,
                tension: 0.4
            }, {
                label: 'Ondas Alpha',
                data: generateWaveData(100, 40, 2, 1, 5),
                borderColor: '#00f7ff',
                borderWidth: 3,
                backgroundColor: gradientFill1,
                pointRadius: 0,
                fill: true,
                tension: 0.4
            }, {
                label: 'Ondas Theta',
                data: generateWaveData(100, 25, 3, 2, 3),
                borderColor: '#6e44ff',
                borderWidth: 3,
                backgroundColor: gradientFill2,
                pointRadius: 0,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    display: false
                },
                y: {
                    display: false,
                    min: -50,
                    max: 50
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.9)',
                        boxWidth: 15,
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: false
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: 0,
                            yMax: 0,
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderWidth: 1,
                            borderDash: [5, 5]
                        }
                    }
                }
            },
            animation: {
                duration: 0
            }
        }
    });
    
    // Animación para simular actividad cerebral en tiempo real
    function updateChart() {
        brainChart.data.datasets[0].data = generateWaveData(100, 30, 1, Date.now()/1000, 15);
        brainChart.data.datasets[1].data = generateWaveData(100, 40, 2, Date.now()/800, 5);
        brainChart.data.datasets[2].data = generateWaveData(100, 25, 3, Date.now()/600, 3);
        brainChart.update();
        requestAnimationFrame(updateChart);
    }
    
    requestAnimationFrame(updateChart);
});


// grafica 2


document.addEventListener('DOMContentLoaded', function() {
    const ctxIndustry = document.getElementById('industryChart').getContext('2d');
    
    const industryChart = new Chart(ctxIndustry, {
        type: 'radar',
        data: {
            labels: ['Mejora en comunicación', 'Reducción de errores', 'Toma de decisiones', 'Optimización de procesos', 'Satisfacción de usuarios', 'Retorno de inversión'],
            datasets: [{
                label: 'Sector Salud',
                data: [47, 36, 29, 41, 38, 32],
                backgroundColor: 'rgba(0, 247, 255, 0.2)',
                borderColor: 'rgba(0, 247, 255, 0.8)',
                pointBackgroundColor: 'rgba(0, 247, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(0, 247, 255, 1)'
            }, {
                label: 'Educación',
                data: [32, 28, 39, 35, 43, 30],
                backgroundColor: 'rgba(110, 68, 255, 0.2)',
                borderColor: 'rgba(110, 68, 255, 0.8)',
                pointBackgroundColor: 'rgba(110, 68, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(110, 68, 255, 1)'
            }, {
                label: 'Finanzas',
                data: [29, 42, 48, 34, 27, 39],
                backgroundColor: 'rgba(255, 68, 130, 0.2)',
                borderColor: 'rgba(255, 68, 130, 0.8)',
                pointBackgroundColor: 'rgba(255, 68, 130, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 68, 130, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 12
                        }
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        backdropColor: 'transparent',
                        font: {
                            size: 10
                        }
                    },
                    suggestedMin: 0,
                    suggestedMax: 50
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.9)',
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '% de mejora';
                        }
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                },
                title: {
                    display: true,
                    text: 'Porcentaje de mejora por área y sector',
                    color: 'rgba(255, 255, 255, 0.9)',
                    font: {
                        size: 16
                    },
                    padding: {
                        bottom: 20
                    }
                }
            }
        }
    });
});


// grafica 3


document.addEventListener('DOMContentLoaded', function() {
    const ctxUser = document.getElementById('userTypeChart').getContext('2d');
    
    const userChart = new Chart(ctxUser, {
        type: 'doughnut',
        data: {
            labels: ['Ejecutivos', 'Creativos', 'Investigadores', 'Médicos', 'Educadores'],
            datasets: [{
                data: [35, 28, 22, 10, 5],
                backgroundColor: [
                    '#00f7ff',
                    '#6e44ff',
                    '#ff4482',
                    '#ffb344',
                    '#44ff9a'
                ],
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 2,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.9)',
                        padding: 20,
                        font: {
                            size: 14
                        },
                        generateLabels: function(chart) {
                            const datasets = chart.data.datasets;
                            return chart.data.labels.map(function(label, i) {
                                const meta = chart.getDatasetMeta(0);
                                const style = meta.controller.getStyle(i);
                                
                                return {
                                    text: label + ' (' + datasets[0].data[i] + '%)',
                                    fillStyle: datasets[0].backgroundColor[i],
                                    strokeStyle: datasets[0].borderColor,
                                    lineWidth: datasets[0].borderWidth,
                                    hidden: false,
                                    index: i
                                };
                            });
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '% de usuarios pioneros';
                        }
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                },
                title: {
                    display: true,
                    text: 'Distribución de Usuarios Pioneros por Perfil',
                    color: 'rgba(255, 255, 255, 0.9)',
                    font: {
                        size: 16
                    },
                    padding: {
                        bottom: 20
                    }
                }
            }
        }
    });
});



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


// grafica 1

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 300);
    gradientFill.addColorStop(0, 'rgba(110, 68, 255, 0.6)');
    gradientFill.addColorStop(1, 'rgba(110, 68, 255, 0.1)');
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2022 Q1', '2022 Q2', '2022 Q3', '2022 Q4', '2023 Q1', '2023 Q2', '2023 Q3', '2023 Q4', '2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4', '2025 Q1'],
            datasets: [{
                label: 'Precisión en interpretación (Gen 1-5)',
                data: [78.5, 81.2, 84.7, 87.3, 89.8, 92.1, 93.5, 95.2, 96.8, 97.7, 98.5, 99.2, 99.8],
                borderColor: '#00f7ff',
                borderWidth: 3,
                pointBackgroundColor: '#00f7ff',
                pointRadius: 4,
                tension: 0.4,
                fill: false
            }, {
                label: 'Tiempo de respuesta (ms)',
                data: [22, 19, 17, 14, 12, 10, 9, 7, 6, 5, 4, 3.5, 3],
                borderColor: '#6e44ff',
                borderWidth: 3,
                pointBackgroundColor: '#6e44ff',
                pointRadius: 4,
                tension: 0.4,
                fill: false,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 75,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    },
                    title: {
                        display: true,
                        text: 'Precisión (%)',
                        color: 'rgba(255, 255, 255, 0.9)'
                    }
                },
                y1: {
                    position: 'right',
                    beginAtZero: false,
                    min: 0,
                    max: 25,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    },
                    title: {
                        display: true,
                        text: 'Tiempo de respuesta (ms)',
                        color: 'rgba(255, 255, 255, 0.9)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255, 255, 255, 0.9)'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                }
            }
        }
    });
});