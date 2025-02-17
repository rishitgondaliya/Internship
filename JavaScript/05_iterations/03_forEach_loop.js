const coding = ["C", "C++", "Java", "Python", "Ruby", "Dart"]

// coding.forEach((val) => {
//     console.log(val);
// })

// function print(item) {
//     console.log(item);
// }

// coding.forEach(print)

// forEach has access to index and array also
// forEach do not return anything implictly or explicitly
coding.forEach((val, index, array) => {
    // console.log(val, index, array);
})


// filter -> returns array of filtered value
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const newNums = nums.filter((num) => num > 5)
console.log(newNums)