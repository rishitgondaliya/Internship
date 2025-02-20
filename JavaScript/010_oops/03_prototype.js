let myName = "Rishit"

let arr = ["a", "b", "c"]
let power = {
    a: "A",
    b: "B",

    getCPower: function(){
        console.log(`power of c is ${this.c}`);
    }
}

Object.prototype.rishit = function(){ // property is added to object -> will be available everywhere
    console.log("Rishit is present in all objects bcz new prototype id inserted");
}

// power.rishit()

// arr.rishit()

// if prototype is only added to array/string -> will be avalable only for array/string