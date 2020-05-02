const quiz = [
    ["What is Superman's real name?", "Clark Kent"],
    ["What is Wonder Woman's real name?", "Diana Prince"],
    ["What is Batman's real name?", "Bruce Wayne"]
];

function start(quiz){
    let score = 0;
    for (const [question, answer] of quiz) {
        const response = ask(question);
        check(response, answer);
    }

    gameOver();

    function ask(question) {
        return prompt(question);
    }

    function check(response, answer) {
        if (response === answer) {
            alert('Correct!');
            score++;
        }
        else {
            alert(`Wrong! The correct answer was ${answer}`);
        }
    
    }
    function gameOver(){
        alert(`Game Over, you scored ${score} 
        point${score !== 1 ? 's' : ''}`);
    }
}
start(quiz);

//The old versions
//const question = "What is Superman's real name?";
//const answer = prompt(question);
//alert(`You answered ${answer}`);    
/* let score = 0;
for (const [question,answer] of quiz){
    const response = prompt(question);
    if (response === answer){
        alert('Correct!');
        score++;
    } else {
        alert(`Wrong! The correct answer was ${answer}`);
    }
    }
alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`); */