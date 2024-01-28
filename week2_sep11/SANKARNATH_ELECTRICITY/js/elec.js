console.log("Electricty Bill Demo 2")

console.log("Electricty Bill Demo 2")

console.log("Electricty Bill Demo 2")



const calcElectricty = () => {
    // the values from the textboxes gets captured
    let offpeakfromUI = document.getElementById("offPeak").value;
    let offpeak = parseFloat(offpeakfromUI);
    let onpeakfromUI = document.getElementById("onPeak").value;
    let onpeak = parseFloat(onpeakfromUI);
    let province = document.getElementById(`province`).value;
    console.log(`${offpeak}`)
    console.log(`${onpeak}`)
    console.log(`${province}`)

    console.log(`${offpeak}`)

    //calculating the actual number values of consumption
    let onPeakConsumption = parseFloat(0.132 * onpeak);
    let offPeakConsumption = 0.065 * offpeak;
    let grossConsumption = onPeakConsumption + offPeakConsumption;
    let HST = 0.13 * grossConsumption;
    // using a ternary operator here to calculate rebate based on province
    let provincialRebate = (province === "Ontario" ? 0 : (0.08 * grossConsumption));
    let netConsumption = grossConsumption + HST - provincialRebate;

    // only displaying two decimal places
    console.log(`On Peak Consumption: ${onPeakConsumption.toFixed(2)}`)
    console.log(`Off Peak Consumption: ${offPeakConsumption.toFixed(2)}`)
    console.log(`Gross Consumption: ${grossConsumption.toFixed(2)}`)
    console.log(`HST: ${HST.toFixed(2)}`)
    console.log(`Provincial Rebate: ${provincialRebate.toFixed(2)}`)
    console.log(`Net Consumption: ${netConsumption.toFixed(2)}`)

    let outputData = 
    document.getElementById("onpeakusage").innerHTML = `$ ${onPeakConsumption.toFixed(2)}`;
    document.getElementById("onpeakused").innerHTML = `${onpeak.toFixed(2)} kwH used @ 0.132/hr`;
    document.getElementById("offpeakusage").innerHTML = `$ ${offPeakConsumption.toFixed(2)}`;
    document.getElementById("offpeakused").innerHTML = `${offpeak.toFixed(2)} kwH used @ 0.065/hr`;
    document.getElementById("totalCharges").innerHTML = `Total Consumption Charges: $${grossConsumption.toFixed(2)}`;
    document.getElementById("salesTax").innerHTML = `Sales Tax(13%): $${HST.toFixed(2)}`;
    document.getElementById("provincialRebate").innerHTML = `Provincial Rebate: -$${provincialRebate.toFixed(2)}`;
    document.getElementById("total").innerHTML = `TOTAL TO PAY<br><h2>${netConsumption.toFixed(2)}</h2>`;

    // document.getElementById("output").style.display = "block";
}
// when user clicks on calculate, the function calcElectricity gets called
document.getElementById("calculate").addEventListener("click", calcElectricty);
