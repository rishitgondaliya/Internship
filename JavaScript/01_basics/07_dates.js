let d = new Date()
// console.log(d)
// console.log(d.toString())
// console.log(d.toISOString())
// console.log(d.toDateString())
// console.log(d.toLocaleString())
// console.log(typeof d) // object

let myCreatedDate = new Date(2025, 6, 26)
// console.log(myCreatedDate.toDateString())

myCreatedDate = new Date("2025-07-26") // yyyy-mm-dd
// console.log(myCreatedDate.toDateString())

myCreatedDate = new Date("07-26-2025") // mm-dd-yyyy
// console.log(myCreatedDate.toLocaleString())

let myTimeStamp = Date.now()
// console.log(myTimeStamp)
// console.log(myCreatedDate.getTime()) // convert in mili sec
// console.log(Date.now() / 1000)

let newDate = new Date()
// console.log(newDate)
// console.log(newDate.getMonth() + 1)
// getMonth, getYear, getHours, getMiniutes

console.log(newDate.toLocaleString('default', {
    weekday: "long"
}))
