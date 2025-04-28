let firstNumber = 8;
let secondNumber = 2; 

document.getElementById('firstnumber').textContent = firstNumber;
document.getElementById('secondnumber').textContent = secondNumber;

//add numbers
function add() {
    let answer = firstNumber + secondNumber;
    document.getElementById('answer').textContent = answer;
}

//subtract numbers
function subtract() {
    let answer = firstNumber - secondNumber;
    document.getElementById('answer').textContent = answer;
}

// multiply numbers
function multiply() {
    let answer = firstNumber * secondNumber;
    document.getElementById('answer').textContent = answer;
}

// divide numbers
function divide() {
    let answer = firstNumber / secondNumber;
    document.getElementById('answer').textContent = answer;
}

//clear the calculator.
function clearFunction() {
    document.getElementById('answer').textContent = 0;
}

