
//function
const findEligibility = () => {
    console.log("validate button is clicked");
    let ageFromUI = document.querySelector("input").value;
    console.log(`the age from the ui is :${ageFromUI} and the type of it is ${typeof (ageFromUI)}`)

    let age = parseInt(ageFromUI)

    if (age >= 18) {
        console.log(`eligible`);
        document.querySelector("p").innerHTML = "Eligible"
        document.querySelector("p").style.color = "green"
        document.getElementById("secondLine").innerHTML = "ELIGIBLE NOW!"
        document.getElementById("secondLine").style.color = "red"

            ;
    }
    else {
        console.log(`not eligible`)
        document.querySelector("p").innerHTML = "Not Eligible"
        document.querySelector("p").style.color = "red"
        document.getElementById("secondLine").innerHTML = "NAAH TOO YOUNG"
        document.getElementById("secondLine").style.color = "green"
    }
}

//locate and find HTML element and then add a click event for the button. make function work with the click. 
document.querySelector("button").addEventListener("click", findEligibility);

let gradeList = [
    { name: "Amy", courseCode: "MADS4007", percentage: 89.54 },
    { name: "Bob", courseCode: "MADS4007", percentage: 45.67 },
    { name: "Charlie", courseCode: "MADS4013", percentage: 67.65 },
    { name: "Denny", courseCode: "MADS4012", percentage: 87.89 },
    { name: "Eric", courseCode: "MADS4007", percentage: 78.99 },
    { name: "Bob", courseCode: "MADS4012", percentage: 59.43 },
    { name: "Fing", courseCode: "MADS4008", percentage: 93.55 },
    { name: "Ching", courseCode: "MADS4012", percentage: 67.90 },
    { name: "Jasdeep", courseCode: "MADS4013", percentage: 87.90 }
]


const showEntireList = () => {
    //iterate through entire gradeList


    let outputData = `<table><tr> <th>Name </th><th> Course Code </th> <th> Percentage </th> </tr>`;


    for (obj of gradeList) {
        outputData += `<tr> <td>${obj.name}</td> <td>${obj.courseCode}</td> <td>${obj.percentage}</td> </tr>`;
    }


    outputData += `</table>`;


    document.getElementById("outTable").innerHTML = outputData;
}


document.getElementById("button1").addEventListener("click", showEntireList);


const showMADSList = () => {
    //iterate through entire gradeList


    let outputData = `<table><tr> <th>Name </th><th> Course Code </th> <th> Percentage </th> </tr>`;


    for (obj of gradeList) {
        if (obj.courseCode === "MADS4007") {
            outputData += `<tr> <td>${obj.name}</td> <td>${obj.courseCode}</td> <td>${obj.percentage}</td> </tr>`;
            console.log("here")
        }
        else{
            console.log("here")
        }
    }


    outputData += `</table>`;


    document.getElementById("outTable").innerHTML = outputData;
}


document.getElementById("button2").addEventListener("click", showMADSList);

let validateButton = document.querySelector("button");

if (validateButton != undefined) {
    console.log("button found")
}
else {
    console.log("button not found")
}

validateButton.addEventListener("click", findEligibility);



let selectedParas = document.querySelectorAll("p.redHeader")


for (element of selectedParas){
element.innerHTML = "Selected";


//remove the CSS class redHeader from the selected element
element.classList.remove("redHeader");




//add the CSS class underlineDecor to the selected element
element.classList.add("underlineDecor");




}

const sayHi = (name) => {
    console.log(`Hello ${name}`)
}

sayHi("Sankar");

const addNumbers = (n1, n2) => {
    console.log(`sum of ${n1+n2}`);
}

addNumbers(5,6);