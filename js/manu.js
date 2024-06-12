document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const answers = {
        question1: 'Pesca excesiva',
        question2: 'Todas las anteriores',
        question3: 'Todas las anteriores'
    };

    let score = 0;
    const userAnswers = {};

    for (let question in answers) {
        const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
        if (userAnswer) {
            userAnswers[question] = userAnswer.value;
            if (userAnswer.value === answers[question]) {
                score++;
            }
        }
    }

    localStorage.setItem('quizAnswers', JSON.stringify(userAnswers));
    localStorage.setItem('quizScore', score);

    document.getElementById('modalResult').textContent = `Puntaje: ${score} / 3`;
    document.getElementById('modal').style.display = 'block';
});

document.getElementById('closeModal').onclick = function() {
    document.getElementById('modal').style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
};

function retryQuiz() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('quizForm').reset();
}
