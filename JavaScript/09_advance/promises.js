// promise -> is an object that returns eventual completion or failure of an
// asynchronous operation and its results.

// const promiseOne = new Promise((resolve, reject) => {
//   // code that takes some time to execute - async task, DB call, network call
//   setTimeout(function () {
//     console.log("Async task is completed");
//     resolve();
//   }, 1000);
// });

// promiseOne.then(function () {
//   console.log("Promise is resolved");
// });

// new Promise((resolve, reject) => {
//   setTimeout(function () {
//     console.log("Async task 2 is completed");
//     resolve();
//   }, 1000);
// }).then(function () {
//   console.log("Promise 2 is resolved");
// });

// const third = new Promise((resolve, reject) => {
//   setTimeout(function () {
//     resolve({ userName: "Rishit", email: "rj@123.com" });
//   }, 1000);
// });

// third.then(function (user) {
//   console.log(user);
// });

// const four = new Promise((resolve, reject) => {
//   setTimeout(function () {
//     let error = false;
//     if (!error) {
//       resolve({ userName: "Rishit", pass: 1234 }, "Success");
//     } else {
//       reject("ERROR: Something went wrong");
//     }
//   }, 1000);
// });

// four
//   .then((user) => {
//     console.log(user.userName);
//     return user.userName;
//   })
//   .then((userName) => {         //chaining
//     console.log("User Name is resolved", userName);
//   })
//   .catch(function (error) {
//     console.log("Error is caught", error);
//   })
//   .finally(() => {
//     console.log("Finally block is executed either promise is resolved or rejected");
//   })

// const five = new Promise((resolve, reject) => {
//   setTimeout(function () {
//     let error = true;
//     if (!error) {
//       resolve({ userName: "RJ", pass: 1234 });
//     } else {
//       reject("ERROR: Something went wrong");
//     }
//   }, 1000);
// });

//   promise using async await

// async function proFive() {
//   try {
//     const response = await five;
//     console.log(response);
//   } catch (e) {
//     console.log(e);
//   }
// }

// proFive();

// async function getAllUsers() {
//     try{
//         const response = await fetch('https://jsonplaceholder.typicode.com/users')
//         // console.log(response)
//         const data = await response.json()
//         console.log(data)
//     } catch(e){
//         console.log('Error')
//     }
// }

// getAllUsers()

fetch('https://api.github.com/users/rishitgondaliya')
.then((response) => {
    return response.json()
})
.then((res) => {
    console.log(res)
})
.catch((e) => {
    console.log('Error')
})