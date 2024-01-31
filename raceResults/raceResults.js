import { createRoundRaceResult } from "../f1data.js";

// Appending results to page by looping through earlier created list for all race names, giving all results for corresponding race using another loop within
export async function createResultsPage() {

    let allResultsForResultsPage = await createRoundRaceResult() 
    console.log(allResultsForResultsPage)
    for(let i=0; i<22; i++) { 
        const raceResultsCard = document.createElement('div')
        raceResultsCard.classList.add('raceResultsCard')

        const trackNames = document.createElement('div')
        const flagsForCircuitNames = document.createElement('img')

        trackNames.textContent = `${allResultsForResultsPage[i][0]}` 
        flagsForCircuitNames.src= `./raceResults/${allResultsForResultsPage[i][0].split(' ')[0]}.jpeg`
        flagsForCircuitNames.classList.add('flagsForCircuitNames')
    
        raceResultsCard.append(trackNames)
        raceResultsCard.append(flagsForCircuitNames)
        resultList.append(raceResultsCard)
        for (let j=0; j<20; j++) {
            const driverResultsWithNames = document.createElement('p')
            driverResultsWithNames.classList.add('driverResultsWithNames')
            let positions = allResultsForResultsPage[i][1][j]
            driverResultsWithNames.textContent = `${positions.position}` 
            raceResultsCard.append(driverResultsWithNames)
        }
    }
    
}