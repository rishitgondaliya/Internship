// const tinderUser = new Object() // singletone
const tinderUser = {} // non-singletone

tinderUser.id = "123rj"
tinderUser.name = "Rishit"
tinderUser.isLoggedIn = false

// console.log(tinderUser)

const regUser = {
    email: "xyz@gmail.com",
    fullName: {
        firstName: "Rishit",
        lastName: "Gondaliya",
    }
}

// console.log(regUser.fullName.firstName)

const obj1 = {1: "a", 2: "b"}
const obj2 = {3: "A", 4: "B"}

// const obj3 = {obj1, obj2}
const obj3 = Object.assign(obj1, obj2)
console.log(obj3)