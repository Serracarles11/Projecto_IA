 // Animaciones GSAP
 gsap.registerPlugin(ScrollTrigger);

 gsap.from(".stat-card", {
     scrollTrigger: {
         trigger: ".ai-stats",
         start: "top center"
     },
     opacity: 0,
     y: 100,
     duration: 1,
     stagger: 0.2
 });

 gsap.from(".timeline-item", {
     scrollTrigger: {
         trigger: ".timeline",
         start: "top center"
     },
     opacity: 0,
     x: -100,
     duration: 1,
     stagger: 0.3
 });

 // Sistema de partículas
 function initParticles() {
     const scene = new THREE.Scene();
     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
     const renderer = new THREE.WebGLRenderer({
         alpha: true,
         antialias: true
     });
     
     renderer.setSize(window.innerWidth, window.innerHeight);
     renderer.setPixelRatio(window.devicePixelRatio);
     document.getElementById('particles-js').appendChild(renderer.domElement);

     camera.position.z = 1000;

     const geometry = new THREE.BufferGeometry();
     const vertices = [];
     
     for(let i = 0; i < 5000; i++) {
         vertices.push(
             Math.random() * 2000 - 1000,
             Math.random() * 2000 - 1000,
             Math.random() * 2000 - 1000
         );
     }

     geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

     const material = new THREE.PointsMaterial({
         size: 1.5,
         color: 0x00b4d8,
         transparent: true,
         opacity: 0.5,
         sizeAttenuation: true
     });

     const particles = new THREE.Points(geometry, material);
     scene.add(particles);

     function animate() {
         requestAnimationFrame(animate);
         particles.rotation.x += 0.0001;
         particles.rotation.y += 0.0001;
         renderer.render(scene, camera);
     }
     
     animate();

     window.addEventListener('resize', () => {
         camera.aspect = window.innerWidth / window.innerHeight;
         camera.updateProjectionMatrix();
         renderer.setSize(window.innerWidth, window.innerHeight);
     });
 }

 initParticles();

 // cosas nuevas

 // Cuestionario mejorado
 let currentQuestion = 1;
let score = 0;
const totalQuestions = 7;
const correctAnswers = {
 q1: 'Inteligencia Artificial',
 q2: '87%',
 q3: 'Deep Blue',
 q4: 'NLP (Procesamiento de Lenguaje Natural)',
 q5: 'Propuesta del Test de Turing',
 q6: '40%',
 q7: 'Un modelo de IA que utiliza datos etiquetados para entrenarse'
};

document.querySelectorAll('.answer-btn').forEach(btn => {
 btn.addEventListener('click', function() {
     if (this.disabled) return;
     
     this.parentElement.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
     
     const isCorrect = this.textContent === correctAnswers[`q${currentQuestion}`];
     this.classList.add(isCorrect ? 'correct' : 'wrong');
     
     if (isCorrect) score++;
     
     setTimeout(() => {
         if (currentQuestion < totalQuestions) {
             document.getElementById(`q${currentQuestion}`).classList.remove('active');
             currentQuestion++;
             document.getElementById(`q${currentQuestion}`).classList.add('active');
             updateProgress();
         } else {
             updateProgress();
             showResults();
         }
     }, 1000);
 });
});

function updateProgress() {
 const answeredQuestions = currentQuestion - 1;
 const progress = Math.min((answeredQuestions / totalQuestions) * 100, 100);
 document.getElementById('progress').style.width = `${progress}%`;
}

function showResults() {
 document.querySelectorAll('.question-card').forEach(card => card.style.display = 'none');
 document.getElementById('result').style.display = 'block';
 document.getElementById('score').textContent = score;
 document.getElementById('progress').style.width = '100%';
}

function resetQuiz() {
 currentQuestion = 1;
 score = 0;
 document.querySelectorAll('.question-card').forEach(card => {
     card.style.display = 'block';
     card.classList.remove('active');
     card.querySelectorAll('.answer-btn').forEach(btn => {
         btn.disabled = false;
         btn.classList.remove('correct', 'wrong');
     });
 });
 document.getElementById('q1').classList.add('active');
 document.getElementById('result').style.display = 'none';
 document.getElementById('progress').style.width = '0%';
}

gsap.from(".question-card", {
 scrollTrigger: {
     trigger: "#quiz",
     start: "top center"
 },
 opacity: 0,
 y: 100,
 duration: 1,
 stagger: 0.1
});