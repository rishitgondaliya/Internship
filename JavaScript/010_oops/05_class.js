// class User {
//     constructor(name, email, pass){
//         this.name = name;
//         this.email = email;
//         this.pass = pass
//     }

//     encryptPass(){
//         return `${this.pass}xyz`
//     }
// }

// const chai = new User("Chai", "chai@x.com", 1234)

// console.log(chai.encryptPass());

// behind the scene

function User(username, email, password){
    this.username = username;
    this.email = email;
    this.password = password
}

User.prototype.encryptPassword = function(){
    return `${this.password}abc`
}
User.prototype.changeUsername = function(){
    return `${this.username.toUpperCase()}`
}


const tea = new User("tea", "tea@gmail.com", "123")

console.log(tea.encryptPassword());
console.log(tea.changeUsername());