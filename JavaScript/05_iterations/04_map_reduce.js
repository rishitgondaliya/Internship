const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map -> returns new array by applying given conditions

// const newNums = arr.map((num) => num + 1)
// console.log(newNums)

// method chaining -> concat more then one method    

const newNums = arr.map((num) => num * 10).filter((num) => num > 50);

// console.log(newNums);

// reduce : returns accumulated result, intial value will be 0, if not provided
const sum = arr.reduce((acc, current) => {
    console.log(`acc: ${acc} and current: ${current}`)
    return acc + current
}, 100);
console.log(sum)
