function addition(n1, n2){
    return n1 + n2;
}

console.log(addition(2, 3));

function division(n1, n2){
    return n1/n2;
}

console.log(division(10,5));

let numbers = [5, 1550, 7, 100];
let gNumber = 0;

function greatestN(n){
    for(i=0; i < n.length; i++){
        if(n[i] > gNumber){
            gNumber = n[i];
        }
    }
    console.log(gNumber);
    gNumber = 0;
}

greatestN(numbers);

console.log(5 + 10);

console.log("Addition: ", 20+2, "Division: ", 20/2);

let aTeacher = [2,8,9,7,5,6];

greatestN(aTeacher);