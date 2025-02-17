let arr = [1, 2, 3, 4, 5]

// for of loop
for (const num of arr) {
    // console.log(num)
}

const greetings = "Good morning!"
for (const char of greetings) {
    // console.log(char)
}

// Maps -> will not store duplicate key and maintains insertion order
// map is non iterative
const map = new Map()
map.set('name', 'John')
map.set('age', 30)
map.set('city', 'New York')
map.set('name', 'Rishit') // overwrites existing value
// console.log(map)
// console.log(map.get('name'))

for (const [k, v] of map){
    // console.log(k, ": ", v)
}

const obj = {
    name: 'John',
    age: 30,
    city: 'New York',
}

// for(const [k, v] of obj){  // in forof loop object is not iterable
//     console.log(k, ": ", v)
// }

// to iterate an object -> forIn is used
// for(const key in obj){
//     console.log(key, ": ", obj[key])
// }

for(const key in arr){
    // console.log(key) // will print indexes
    console.log(arr[key]) // will print values
}