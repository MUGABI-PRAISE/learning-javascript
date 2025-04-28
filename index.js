
//make it work first and then make it better....
// let count = 0;
// function increment(){
//     count = count + 1;
//     passengerCount = document.getElementById('count_el').textContent=count
    
    
// }

// another way .. for incrementing the counter.
let countEl = document.getElementById('count_el');
let count = 0;

function increment() {
    count += 1
    countEl.textContent = count
}

// save btn
let previousEntries = document.getElementById('save-el')
function save() {
    
    passengerCountNumber = previousEntries.textContent += count + ' - ';
    previousEntries.textContent = passengerCountNumber;
    // clear the count when we hit the save button so that the counter resets.
    count = 0;
    countEl.textContent = count;
    
}

// welcome the user
welcomeEl = document.getElementById('welcome-el');

let name = 'Praise'; 
let greeting = "Welcome " 

//render the greeting
welcomeEl.textContent = greeting + name
