const marvel = ["thor", "iron man", "spider man"]
const dc = ["superman", "flash", "batman"]

// marvel.push(dc) // whole array will be added as a single element

const all = marvel.concat(dc) // join two arrays, do not modify existing array returns new array
// console.log(all)

const all_heroes = [...marvel, ...dc] // spread arrays
// console.log(all_heroes)

const another = [1, 2, 3, [4, 5], 6, [7, [8, 9]]]
// console.log(another.flat(2)) // flat => concats all nested elements

// console.log(Array.isArray("rishit"))
// console.log(Array.from("rishit")) // [ 'r', 'i', 's', 'h', 'i', 't' ]
// console.log(Array.of("rishit")) // [ 'rishit' ]

console.log(marvel)