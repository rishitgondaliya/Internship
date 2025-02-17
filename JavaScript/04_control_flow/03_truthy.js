const userEmail = "user@mail.com"

if(userEmail){
    // console.log("Email is valid")
} else{
    // console.log("Email is invalid")
}

// falsy values
// false, 0, -0, BigInt (0n), "", null, undefined, NaN

// truthy values
// true, 1, 2, 3, ... , Infinity, "hello", [], {}, " ", "0", "false", function(){}

// check object has any key-value pair or not
const obj = {}
if(Object.keys(obj).length === 0){
    // console.log("Object is empty")
} else{
    // console.log("Object is not empty")
}

// console.log(false == 0);
// console.log(false == '');
// console.log('' == 0);

// Nullish Coalescing Operator (??) : null/undefined
// It returns the first operand if it is not null or undefined; otherwise, it returns the second operand

let val1
val1 = 10
val1 = val1 ?? 20
// console.log(val1);
// console.log(val1 ?? 20);
// console.log(val1 ?? null);
// console.log(val1 ?? undefined);
// console.log(val1 ?? null ?? 30);
// console.log(val1 ?? null ?? 30 ?? 40);
// console.log(undefined ?? null ?? 30 ?? 40 ?? 50);

// ternary operator
// condition ? value_if_true : value_if_false
const userAge = 25
const userStatus = userAge >= 18 ? "Adult" : "Minor"
// console.log(userStatus);