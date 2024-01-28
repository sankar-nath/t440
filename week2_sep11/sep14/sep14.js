console.log("Sep 14 js")

//list of grades of students

let gradeList = [
    {name:"Lewis", courseCode:"MADS4007", percentage:50.55},
    {name:"Max", courseCode:"MADS4007", percentage:60.55},
    {name:"Alonso", courseCode:"MADS4007", percentage:70.55},
    {name:"Lance", courseCode:"MADS4007", percentage:90.55},
]

//using for loop to access each element within the object array
for(obj of gradeList)
{
    console.log(`Name:${obj.name}`);
}

let array1 = [1,2,3,4,5]

array1.push(57);
array1.push(5722);

for (obj1 in array1)
{
    console.log(`Objects in array are: ${array1[obj1]}`);
}

let findElement = 5;
let matchedIndex = array1.indexOf(findElement);
console.log(`Element found at  ${matchedIndex}`);


// did till here alone then copy pasted

//find position of first element which is more than 13


matchedIndex = array1.findIndex( (element) => element > 13)


console.log(`position of first element which is more than 13 is ${matchedIndex}`);




searchElement = 5722;
matchedIndex = array1.indexOf(searchElement)
console.log(`Element ${searchElement} is at position ${matchedIndex}`);

// //find the position of an object where the grade is more 70


matchedIndex = gradeList.findIndex( (obj) => obj.percentage > 70)
console.log(`The first object having percentage more than 70 is at position ${matchedIndex}`);


if (matchedIndex !== -1){
//if the matching object is present
console.log(`matching object : ${gradeList[matchedIndex]}`);
console.log(`matching object : ${gradeList[matchedIndex].name}, ${gradeList[matchedIndex].courseCode}, ${gradeList[matchedIndex].percentage}`);


}else{
console.log(`no matching object with percentage more than 70 found`);
}




//find the object where percentage is more than 90


//find() - returns the element which matches the criteria;
//if there is no matching element, it returns undefined


let matchedObject = gradeList.find( (element) => element.percentage >= 90)


if(matchedObject === undefined){
console.log(`matching object not found`);
}else{
console.log(`matching object : ${matchedObject.name}, ${matchedObject.courseCode}, ${matchedObject.percentage}`);
}

//dom
console.log("DOM Manipulation")
