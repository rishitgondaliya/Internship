// Immediately Invoked Function Expression - IIFE
// IIFE is a JavaScript function that runs as soon as it is defined
// IIFE is used to avoid polluting global scope, it does not affect global scope

(function IIFE() {
    console.log("Immediately Invoked Function Expression")
})(); // ; should be applied after IIFE

( (name) => {
    console.log(`hello, ${name}`);
}) ('Rishit');