"use strict"; // traet all js code as newer version

// primitive -> 7 types
// String, Number, Boolean, null, undefined, Symbol, BigInt

// Reference (non-primitive)
// Object, Array, Function, Date

// alert(3 + 3) // we are using nodejs not browser

// datatypes
// number
// bigint
// string
// boolean
// object
// null => standalone value
// undefined
// symbol => unique 

// const id = Symbol('123')
// const id2 = Symbol('123')

// console.log(id === id2)

const bigNum = 123456789123456789n
// console.log(typeof bigNum)

// console.log(typeof null) // object
// console.log(typeof undefined) // undefined

const arr = ["one", "two", "three"] // array

let myObj = { // object
    name: "John",
    age: 30,
}

const myFunc = function() { // function
    console.log("Hello, world!")
}

// console.log(typeof myFunc) // function


// memory allocation

// stack (primitive) => gives copy of variable
// heap (non-primitive) => gives reference