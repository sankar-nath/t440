//client side script

//async indicates the tasks/operations to be executed in the background
// await means specific instruction has to be executed in background
const getDataFromAPI = async (method, url) => {
    try {
        //background task
        const response = await fetch(url, { 
            method: method, //get put post delete
            headers: { 'Content-Type': 'application/json' }
        })
        const responseJSON = await response.json();
        console.log(`response: ${JSON.stringify(response)}`)
        //console.log(`responseJSON: ${JSON.stringify(responseJSON)}`)

        //if response not ok

        if (response.ok === false){
            console.log(`response not ok: ${response.status}`)
            
            //throw error
            throw Error(`cannot connect. response not ok: ${response.status}`)
        }

        //document.getElementById("countryData").innerHTML = "";

        for(country of responseJSON){
            console.log(`Country Name: ${country.name.common}`)
        }

       

    } catch (err) {
        console.log(`error: ${err}`)
    }
}

//fetch methods
//1. GET 2. PUT 3. Delete

const getAllCountries = () => {
    console.log('trying to get all countries from api')
    getDataFromAPI("GET", "https://restcountries.com/v3.1/all");

}
document.getElementById("btnGetAll").addEventListener("click", getAllCountries);