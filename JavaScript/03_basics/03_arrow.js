const user = {
    name: 'John Doe',
    price: 999,
    greetings: function() {
        console.log(`${this.name}, welcome to YT`);
        // console.log(this)
    }
}

// user.greetings()
user.name = "Rishit"
// user.greetings()
// console.log(this);

function aese() {
    let kese = "kuch nahi"
    console.log(this.kese) // undefined - dont work in function
}

// aese()

const chai = () => { // arrow function
    let kese = "kuch nahi"
    console.log(this.kese) // undefined
}

// chai()

// const add = (n1, n2) => {
//     return n1 + n2 // explicit return
// }

// const add = (n1, n2) =>  n1 + n2 // implicit return

// if we use {},  we must have to write return otherwise not

const add = (n1, n2) =>  ({user: "rishit"}) // () must be used to return an object

console.log(add(4, 5));
