// {} // scope
// var c = 40 // global scope
let a = 20

if(true){ // block scope
    let a = 10
    const b = 20
    var c = 30
    // console.log("in block: ", a)
}

// console.log(a) // error
// console.log(b) // error
// console.log(c) // no error

function one() {
    const user = "rishit"

    function two() {
        const site = "YT"
        console.log(user);
    }

    // console.log(site) //outside scope - not accessible
    two()
}

one()

for(var i = 0; i < 3; i++){
    setTimeout(() => {
        console.log(i)
    }, 1000);
}