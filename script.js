// 📚 1. Simple Greeting Function

//     Write a function called sayHello.

//     It should take one parameter name.

//     It should print: Hello, [name]!

sayHello('praise'); //function declaration can be called before it's declaration.
function sayHello (name='mugabi'){
    console.log(`Hello ${name}`);
}

// 3. Find the Larger Number

//     Write a function findMax.

//     It should take two numbers and return the larger one.

const findMax =(x=0 ,y=0) => {
    if(x > y){
        return x;
    } else if(y > x){
        return y;
    }else{
        return ` the two numbers ${x} and ${y} are the equal`
    }
}

console.log(findMax(9,9));

// Write a function called toCelsius.

// It should take a temperature in Fahrenheit and return it in Celsius.

// Formula:
// Celsius=(Fahrenheit−32)×59
// Celsius=(Fahrenheit−32)×95​

const toCelsius = (temperature = 0) => (temperature - 32) * (5/9);

console.log(toCelsius(100));

// Declare a global variable language = "JavaScript".

// Create a function printLanguage that:

//     Declares a local variable framework = "React".

//     Prints both language and framework.

// After calling the function, try printing framework outside the function.
let globaVar = 'Javascript';

function printLanguage(){
    let framework = 'React';
    return console.log(`${globaVar} is the language and ${framework} is the framework`);
}

printLanguage();

//console.log(framework); // cannobe be accesssed outside the loop.