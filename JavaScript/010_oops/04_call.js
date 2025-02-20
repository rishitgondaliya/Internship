const { set } = require("mongoose");

function setName(name){
    this.name = name;
    console.log("called")
}

function create(name, email, pass){
    // setName(name)// will not set
    setName.call(this, name)

    this.email = email;
    this.pass = pass;
}

const chai = new create("chai", "chai@x.com", 1234)
console.log(chai)