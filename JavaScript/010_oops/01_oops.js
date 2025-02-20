const user = {
    name: 'John Doe',
    age: 30,
    occupation: 'Software Engineer',

    // getDetails: () => {
    //     // return `Name: ${this.name}, Age: ${this.age}, Occupation: ${this.occupation}`
    //     console.log(this) // returns {} due to arrow function
    // }
    
    getDetails: function() {
        // return `Name: ${this.name}, Age: ${this.age}, Occupation: ${this.occupation}`
        console.log(this) // returns object
    }
}

// console.log(user.getDetails())

function users(name, age, isLoggedIn){
    this.name = name;
    this.age = age;
    this.isLoggedIn = isLoggedIn;

    return this
}

const user1 = new users("Rishit", 20, true)
const user2 = new users("John", 25, false)

// console.log(user1, user2)

// new -> creates an empty instance / object -> constructor is called -> injects values in variables -> return new object