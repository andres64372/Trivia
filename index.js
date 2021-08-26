const form = document.getElementById('form');
const container = document.getElementById('container');
const questionform = document.getElementById('questionform');

let questions = [];
let question = 0;
let correct = 0;
let amount = "";
let difficulty = "";
let type = "";
let category = "";

form.addEventListener('submit', function(e) {
    e.preventDefault();
    amount = document.getElementById('amount').value;
    difficulty = document.getElementById('difficulty').value;
    type = document.getElementById('type').value;
    category = document.getElementById('category').value;
    fetch(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}&category=${category}`)
        .then(request => request.json())
        .then(response => {
            questions = response.results;
            form.innerHTML = '';
            console.log(questions);
            render();
        });
})

function render(){
    if(question >= parseInt(amount)) {
        questionform.innerHTML = `<p>Finished</p>
        <p>Correct answers &emsp; ${correct} / ${amount}</p>
        <button class="button" onclick="location.reload()">Try Again</button>`;
        return;
    }
    questionform.innerHTML = '';
    if(type == 'multiple'){
        questions[question].incorrect_answers.splice(getrand(),0,questions[question].correct_answer)
        questionform.innerHTML = `
            <h2>Category ${questions[question].category}</h2>
            <p>Question ${question} / ${amount}</p>
            <p>${questions[question].question}</p>
            <button class="button" onclick="clickme('${questions[question].incorrect_answers[0]}')">${questions[question].incorrect_answers[0]}</button><br>
            <button class="button" onclick="clickme('${questions[question].incorrect_answers[1]}')">${questions[question].incorrect_answers[1]}</button><br>
            <button class="button" onclick="clickme('${questions[question].incorrect_answers[2]}')">${questions[question].incorrect_answers[2]}</button><br>
            <button class="button" onclick="clickme('${questions[question].incorrect_answers[3]}')">${questions[question].incorrect_answers[3]}</button><br>
        `;
    }else{
        questionform.innerHTML = `
            <p>${questions[question].question}</p>
            <button class="button" onclick="clickme('True')">True</button><br>
            <button class="button" onclick="clickme('False')">False</button><br>
        `;
    }
    
}

function getrand(){
    const num = parseInt(Math.random()*4);
    console.log(num);
    return num;
}

function clickme(index){
    console.log(index);
    if(index == questions[question].correct_answer){
        correct++;
    }
    question++;
    render();
}