var baseURL = window.location.pathname
import { createRoundRaceResult } from `${baseURL}/f1data.js`;

// Appending results to page by looping through earlier created list for all race names, giving all results for corresponding race using another loop within
export async function createResultsPage() {

    let allResultsForResultsPage = await createRoundRaceResult() // [22 * [name,[positions]],[name,[positions]].. ]
    console.log(allResultsForResultsPage)
    for(let i=0; i<22; i++) { //0, 1,2,3,4,5
        console.log(i);
        const raceResultsCard = document.createElement('div')
        raceResultsCard.classList.add('raceResultsCard')

        const trackNames = document.createElement('div')
        const flagsForCircuitNames = document.createElement('img')
        // trackNames.classList.add('raceNamesHover');
        trackNames.textContent = `${allResultsForResultsPage[i][0]}` // [name,[positions * 20]] -> name
        flagsForCircuitNames.src= `${baseURL}/raceResults/${allResultsForResultsPage[i][0].split(' ')[0]}.jpeg`
        flagsForCircuitNames.classList.add('flagsForCircuitNames')
    
        // console.log(allResultsForResultsPage[i][0])
        raceResultsCard.append(trackNames)
        raceResultsCard.append(flagsForCircuitNames)
        resultList.append(raceResultsCard)
        for (let j=0; j<20; j++) {
            const driverResultsWithNames = document.createElement('p')
            driverResultsWithNames.classList.add('driverResultsWithNames')
            // console.log(allResultsForResultsPage[i][1][j]) // [positions, position...]
            let positions = allResultsForResultsPage[i][1][j]
            driverResultsWithNames.textContent = `${positions.position}` // position.position
            raceResultsCard.append(driverResultsWithNames)
        }
    }
    
}