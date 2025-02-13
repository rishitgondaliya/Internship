// const arr = [0, 1, 2, 3, 4, 5]
const arr = new Array(1, 2, 3, 4)

// console.log(arr[2])

// methods
// arr.push(6) // add element at the end
// console.log(arr)
// arr.pop() // removes last element

// arr.unshift(5) // add element at start
// arr.shift() // remove from start

// console.log(arr.includes(8)) // checks inclusion
// console.log(arr.indexOf(3)) // give index

// const newArr = arr.join() // converts into string
// console.log(typeof newArr)

// slice, splice

const nArr = arr.slice(1, 3) // returns copy of a section of array[)
console.log("A ", arr)
console.log("slice ", nArr)

const nArr2 = arr.splice(1, 3) // [] changes original array, Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
console.log("splice ", nArr2)
console.log("B ", arr)