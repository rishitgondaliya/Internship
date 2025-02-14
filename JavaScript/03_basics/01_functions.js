const { use } = require("express/lib/application");

function sayMyName() { // function definition
    console.log("R");
    console.log("I");
    console.log("S");
    console.log("H");
    console.log("I");
    console.log("T");    
}

// sayMyName() // execution // sayMyName -> reference

// function addTwoNums(num1, num2) {
//     console.log(num1 + num2);
// }
// addTwoNums(4, "5")
// addTwoNums(4, 9)

// parameters -> these are the variables passed in a function definition, we can say it placeholders also
// arguments -> these are the actual values which we passes while executing a function

function addTwoNums(num1, num2) {
    // return (num1 + num2);
    let result = num1 + num2;
    return result;
    // console.log("after return"); // will not execute
}

const res = addTwoNums(9, 8)
// console.log("Result: ", res);

function loginMsg(username = "Unknown") { // default value
    // if(username === undefined) {
    if(!username){
        console.log("Please enter your username");
        return
    }
    return `${username} is just logged in`
}

// console.log(loginMsg("Rishit"));
// console.log(loginMsg()); // undefined

// rest parameter/ operator
// rest parameter is used to pass infinite number of arguments to a function

function calculateCartPrice(...price) {
    return price
}

// console.log(calculateCartPrice(20, 40, 60, 80));

const user = {
    name: "Rishit",
    age: 25,
}

function handleObject(anyObject) {
    console.log(`Username is ${anyObject.name} and age is ${anyObject.age}`);
}

// handleObject(user)
// handleObject({name: "Rishit", age: 25}) // will work same for array also