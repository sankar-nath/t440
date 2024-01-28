console.log("Dice Game");
const calcDice = () => {
    let numberFromUI = document.getElementById("inputNumber").value;
    console.log(`${numberFromUI}`);
    let cvalue = Math.floor(Math.random() * 6) +1;
    let pvalue = parseInt(numberFromUI);
    document.getElementById("pvalue").innerHTML = `${pvalue}`;
    document.getElementById("cvalue").innerHTML = `${cvalue}`;

    if (cvalue > pvalue){
        console.log(`Computer wins`)
        document.getElementById("wvalue").innerHTML="Computer wins";
    }
    else if (pvalue > cvalue) {
        console.log(`Player wins`)
        document.getElementById("wvalue").innerHTML="Player wins";
    }
    else if (pvalue === cvalue){
        console.log(`Equal`)
        document.getElementById("wvalue").innerHTML="Equal";
    }
}

// document.querySelector("submit").addEventListener("click",calcDice)
document.getElementById("submit").addEventListener("click", calcDice);