// for loop

for (let index = 0; index < 5; index++) {
    const element = index;
    // console.log(element)
}


// nested loops
for (let i = 0; i < 5; i++) {
    // console.log("outer loop value: ", i)
    for (let j = 0; j < 5; j++) {
        // console.log("inner loop value: ", j)
    }
}

// break and continue
for (let i = 0; i < 11; i++) {
    // if(i % 5 == 0) continue;
    // if(i % 9 == 0) break;
    // console.log(i)// 1, 2, 3, 4, 6, 7, 8
}

// while loop
let i = 0;
while (i < 5) {
    // console.log(i)
    i++; //terminating condition
}

// do-while loop -> will be executed at least once
let j = 0;
do {
    // console.log(j)
    j++;
} while(j < 10);
