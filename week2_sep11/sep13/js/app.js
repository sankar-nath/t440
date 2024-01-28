console.log("this message is from the file app.js");
var a = 20;
//backquote
//template literals using ` and ${}
//backquote is the key above TAB or shift Tilde
console.log(`a:${a}`);
console.log(a);
console.log(a + 20);
console.log(`a:${a + 20}`);
console.log(`${a * 100}`);

//string and type inference
var y = "Sankar";
console.log(y);
console.log(`Hello there ${y}`);

console.log("let's check the types");
console.log(`type of a: ${typeof (a)}`);
console.log(`type of b: ${typeof (y)}`);


// data types in js
var d = true;
var e = 'a';
var f = null;
var g = { firstname: "sankar", lastname: "suresh" };
var h = undefined

f = 50;
d = 20;

console.log("let's check the types of these others\n");
console.log(`type of d: ${typeof (d)}`);
console.log(`type of e: ${typeof (e)}`);
console.log(`type of f: ${typeof (f)}`);
console.log(`type of g: ${typeof (g)}`);
console.log(`type of h: ${typeof (h)}`);

f = 50;

console.log("Results of the variabsles");

console.log(d);
console.log(e);
console.log(f);
console.log(g);
console.log(h);

//type casting
console.log("Let's check type casting now");

g = "123"; //String
console.log(`${g}:${typeof (g)}`);
g = Number("1234"); //Number
console.log(`${g}:${typeof (g)}`);
g = String(12356); //string
console.log(`${g}:${typeof (g)}`);
g = Number("AAA"); //NaN
g = g + 10;
console.log(`${g}:${typeof (g)}`); //gives result as Number
g = Boolean(""); //boolean
//if empty it gives false, otherwise its always true
console.log(`${g}:${typeof (g)}`);

//Loops
console.log("Loops")

var count = 5;
for (count = 0; count <= 5; count++) {
    console.log(`count:${count}`);
}

//loop2

var sum = 0;
console.log("loop2")
for (var i = 0; i <= 10; i++) {
    console.log(`i:${i}`);
    sum += i;
}
console.log(`Sum is ${sum}`);
var average = sum / 10;
console.log(`Average is ${average}`);
console.log(i); // i seems to persist even though it was declared in the loop statement
console.log(count);

//while loop
console.log("while loop")
var pot = 0;
var flower = 0;
while (pot <= 5) {
    flower += pot;
    pot++;
}
var avg = flower / (count - 1);
console.log(`sum of all flowers: ${flower}`);
console.log(`avg of all flowers: ${avg}`);

//do while
var a = 0;
var b = 5;
console.log("Let's do a do while loop");
do {
    b = a + b;
    a++;
} while (a < 5)
console.log(`sum of a and b is: ${b}`);
console.log("test");

//if stratement
console.log("If statement");
if (5 > 0) {
    console.log("Yes 5 is more than 0")
}
else {
    console.log("No 5 is not more than 0");
}

//strict equality operator - triple equal sign
//use strict equality by default
console.log("strict equal");
var g = "20";

if (g === 20) {
    console.log("g is 20")
}
else {
    console.log("g is not 20");
}

//switch
console.log("Let's look at a switch operator now")
var h = 15;
switch (h) {
    case 15: console.log("h is 15"); break;
    case 10: console.log("h is 10"); break;
    case 20: console.log("h is 20"); break;
    default: console.log("h is the default value");
}

//variables and scope

var v1 = 19;
let v2 = 20;
const v3 = 45; // you cannot change the value once it has been initialized. 
console.log(`v1: ${v1}`);
console.log(`v2: ${v2}`);
console.log(`v3: ${v3}`);

for (var j1 = 1, s1 = 0; j1 <= 10; j1++) {
    //var s1=0;
    s1 += j1;
    console.log(`inner loop: ${j1} and ${s1}`);
}

console.log(`outside loop: ${j1} and ${s1}`);


//example 2
let s2 = 0;
let j2 = 0;
console.log("example 2");
for (j2 = 1, s2 = 0; j2 <= 10; j2++) {
    //let s2=0;
    s2 += j2;
    console.log(`inner loop: ${j2} and ${s2}`);
}

console.log(`outside loop: ${j2} and ${s2}`);

//array
console.log("let us take a look at an array");
let numberList1 = [];
console.log(`numberList1: ${numberList1} and the type of numberList1 is ${typeof (numberList1)}`);
let numberList2 = [1, 2, 3];
console.log(`numberList2: ${numberList2} and the type of numberList2 is ${typeof (numberList2)}`);
let numberList3 = new Array();
let numberList4 = new Array(1, 2, 3);
console.log(`numberList3: ${numberList3} and the type of numberList3 is ${typeof (numberList3)}`);
console.log(`numberList4: ${numberList4} and the type of numberList4 is ${typeof (numberList4)}`);

console.log(`numberList1: ${numberList1} and the length of numberList1 is ${numberList1.length}`);
console.log(`numberList2: ${numberList2} and the length of numberList2 is ${numberList2.length}`);
console.log(`numberList3: ${numberList3} and the length of numberList3 is ${numberList3.length}`);
console.log(`numberList4: ${numberList4} and the length of numberList4 is ${numberList4.length}`);

console.log("Let's add some elements to list 4")
numberList4.push(5);
numberList4.push(10, 11, 12, 22222, 4444);

console.log(`numberList4: ${numberList4} and the length of numberList4 is ${numberList4.length}`);

console.log("Let's delete some elements from the array")
numberList4.pop();
numberList4.pop();
let deletedElement = numberList4.pop();
console.log(`numberList4: ${numberList4} and the length of numberList4 after 3 pops is is ${numberList4.length}`);
console.log(`deleted element is ${deletedElement}`);

let array1 = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
//sum of numbers in an arrayh
console.log("Sum of numbers in an array");
let sum1 = 0;
for (let k = 0; k < (array1.length); k++) {
    sum1 += array1[k];
    console.log(array1[k]);
}
console.log(`the sum of the elements in the array is : ${sum1}`);

//alternate
sum2 = 0;
//each num in each iteration will the element of the array
//cannot get position or i in this alternate method
for (num of array1) {
    sum2 += num
    console.log(`${num}`);
}
console.log(`the sum of the elements in the array using the alternate method is : ${sum2}`);

//array of string
console.log("Let us look at how to combine items and prices");
let orderItems = ["masala dosa", "ghee dosa", "chutney", "sambar"];
let orderPrice = [2.60, 2.00, 3.00, 10.00];
let orderQuantity = [1,2,3,4];

//find order total for all items and all quantities
//find total of individual items
//display all of then

let sumItems = 0;
for(let i1 =0; i1 < orderItems.length; i1 ++){
    //console.log(`${orderItems[i]}`);
    let num2= 0;
    //console.log(orderPrice[i1]);

    num2 = orderPrice[i1] * orderQuantity[i1];
    sumItems+=num2;
    //console.log(`${num2}`);
    console.log(`The price of ${orderQuantity[i1]} of ${orderItems[i1]} is so ${num2}`);
    //console.log(`${num2}`);
}

console.log(`The total order is ${sumItems}`)

//array of objects
console.log("Let's look at an array of objects");
let classList = [
    {name:"Lewis", marks:50},
    {name:"Max", marks:85},
    {name:"Lando", marks:40}
];

for(let i2=0; i2<classList.length; i2++){
    console.log(`${classList[0]}`);
}

/*
1. show all the values from classList array
2. show all students whos marks >80
3. check if there is a student with trophies <2
*/