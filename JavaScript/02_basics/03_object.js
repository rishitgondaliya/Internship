// object literals

const mySym = Symbol("Key1")

const user = {
    name: "Rishit",
    "full name": "Rishit Gondaliya",
    age: 20,
    city: "Ahmedabad",
    isLoggedIn: false,
    lastLogin: ["Mon", "Tue"],
    [mySym]: "myKey" // use [] to refer to symbol
}


// console.log(user.name)
// console.log(user["name"])
// console.log(user["full name"])
// console.log(user[mySym])

// Object.freeze(user) // restrict changes
// user.city = "Mumbai"

user.greetings = function() {
    console.log("Hello, JS user")
}

user.greetTwo = function() {
    console.log(`Hello, JS user ${this.name}`)
}

// console.log(user.greetings) // gives reference of the function, not executed
// console.log(user.greetings())
console.log(user.greetTwo())