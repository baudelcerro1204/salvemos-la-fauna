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
    document.getElementById('result').textContent = `Puntaje: ${score} / 3`;
});
