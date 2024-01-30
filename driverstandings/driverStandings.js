const driverStandingsList = document.querySelector('#driverStandingsList')

var baseURL = window.location.pathname
// abstracted function
async function fetchData(url){
    const response = await fetch(url)
    let results = await response.json()
    return results
}
//API for driver standings
async function getDriverData() {
    return await fetchData('http://ergast.com/api/f1/2023/driverStandings.json')
}

// function that appends driver standings information by looping through api to retrieve driver names, positions in standings, points and wins. Driver images also appended through manually created list
export async function createDriverStandingsPage() {
    let driverStandings1 = await getDriverData()
    let alldriverIdforDriverStandings = []
    let driverStandingsElementAPI = driverStandings1.MRData.StandingsTable.StandingsLists[0].DriverStandings
    for (let i = 0; i < driverStandingsElementAPI.length; i++) {
        const driver = driverStandingsElementAPI[i].Driver
        const driverName = `${driver.givenName} ${driver.familyName}`
        const positionForDriverStandings = driverStandingsElementAPI[i].position
        const PointsForDriverStandings = driverStandingsElementAPI[i].points
        const WinsForDriverStandings = driverStandingsElementAPI[i].wins
        alldriverIdforDriverStandings.push({Position: positionForDriverStandings, Name:driverName, Points:PointsForDriverStandings, Wins: WinsForDriverStandings})
    }
    console.log(alldriverIdforDriverStandings)
    for (let {Position, Name, Points, Wins} of alldriverIdforDriverStandings) {
        const raceDriverStandingsCard = document.createElement('p')
        raceDriverStandingsCard.classList.add('raceDriverStandingsCard')
        const driverLeaderboardPosition = document.createElement('p')
        const driverLeaderboardName = document.createElement('h1')
        const driverLeaderboardPoints = document.createElement('p')
        const driverLeaderboardWins = document.createElement('p')
        driverLeaderboardPosition.textContent = `${Position}`
        driverLeaderboardName.textContent = `${Name}`
        driverLeaderboardPoints.textContent = `Points: ${Points}`
        driverLeaderboardWins.textContent = `Wins: ${Wins}`
        raceDriverStandingsCard.append(driverLeaderboardPosition)
        raceDriverStandingsCard.append(driverLeaderboardName)
        raceDriverStandingsCard.append(driverLeaderboardPoints)
        raceDriverStandingsCard.append(driverLeaderboardWins)

        const driverImgAppended = document.createElement('img')
        driverImgAppended.src = `/f1page/driverStandings/${Name.split(' ')[0]}.avif` 
        driverImgAppended.classList.add('raceScheuleCardImg')
        raceDriverStandingsCard.appendChild(driverImgAppended)
        driverStandingsList.append(raceDriverStandingsCard)
    }
}