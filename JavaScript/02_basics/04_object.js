// const tinderUser = new Object() // singletone
const tinderUser = {} // non-singletone

tinderUser.id = "123rj"
tinderUser.name = "Rishit"
tinderUser.isLoggedIn = true

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

// const obj3 = {...obj1, ...obj2}  // spread
// const obj3 = Object.assign({}, obj1, obj2) //Copy the values of all the properties from one or more source objects to a target object. Returns the target object.
// console.log(obj3)

// array of objects
const users = [
    {id: 1, name: "Rishit"},
    {id: 2, name: "Rishit"},
    {id: 3, name: "Rishit"},
]

// console.log(users[1].name)

// console.log(tinderUser);

// console.log(Object.keys(tinderUser)); // returns all the keys
// console.log(Object.values(tinderUser)) // returns values
// console.log(Object.entries(tinderUser)); // makes array of each key-value pair
// console.log(tinderUser.hasOwnProperty('name')); // checks whether object has given property

// object destructuring

const course = {
    courseName: "JavaScript",
    price: 999,
    isFree: false,
    courseInstructor: "YT"
}

const {courseInstructor: instructor} = course
// console.log(instructor);

// JSON -JavaScript Object Notation
{
    // "name": "Rishit",
    // "age": 25,
    // "city": "Ahmedabad",
}