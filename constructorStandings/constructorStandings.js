var baseURL = window.location.pathname
import { getConstructorData } from `${baseURL}/f1data.js`

const constructorStandingsList = document.querySelector('#constructorStandingsList')
// abstracted function
async function fetchData(url){
    const response = await fetch(url)
    let results = await response.json()
    return results
}

//function that appends constructor standings info by looping through API to retrieve, constructor name, position, points and wins. Constructor images also appended through manually created list
export async function createConstructorsStandingsPage() {
    let constructorStandings1 = await getConstructorData()
    let allConstructorStandings = []
    let constructorStandingsElementAPI = constructorStandings1.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
    for (let i = 0; i < constructorStandingsElementAPI.length; i++) {
        const constructor = constructorStandingsElementAPI[i].Constructor
        const constructorName = `${constructor.name}`
        const positionForconstructorStandings = constructorStandingsElementAPI[i].position
        const PointsForconstructorStandings = constructorStandingsElementAPI[i].points
        const WinsForconstructorStandings = constructorStandingsElementAPI[i].wins
        allConstructorStandings.push({Position: positionForconstructorStandings, Name:constructorName, Points:PointsForconstructorStandings, Wins: WinsForconstructorStandings})
    }
    console.log(allConstructorStandings)
    for (let {Position, Name, Points, Wins} of allConstructorStandings) {
        const raceConstructorStandingsCard = document.createElement('div')
        raceConstructorStandingsCard.classList.add('raceConstructorStandingsCard')
        const constructorLeaderboardPosition = document.createElement('p')
        const constructorLeaderboardName = document.createElement('h1')
        const constructorLeaderboardPoints = document.createElement('p')
        const constructorLeaderboardWins = document.createElement('p')
        constructorLeaderboardPosition.textContent = `${Position}`
        constructorLeaderboardName.textContent = `${Name}`
        constructorLeaderboardPoints.textContent = `Points: ${Points}`
        constructorLeaderboardWins.textContent = `Wins: ${Wins}`
        raceConstructorStandingsCard.append(constructorLeaderboardPosition)
        raceConstructorStandingsCard.append(constructorLeaderboardName)
        raceConstructorStandingsCard.append(constructorLeaderboardPoints)
        raceConstructorStandingsCard.append(constructorLeaderboardWins)
        
        const constructorImgAppended = document.createElement('img')

        constructorImgAppended.src = `${baseURL}/constructorStandings/${Name}.avif` 


        constructorImgAppended.classList.add('raceConstructorStandingsCardImg')
        raceConstructorStandingsCard.append(constructorImgAppended)
        constructorStandingsList.append(raceConstructorStandingsCard)
    }
}