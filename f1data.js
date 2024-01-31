import {createDriverStandingsPage} from './driverstandings/driverStandings.js'
import {createConstructorsStandingsPage} from './constructorStandings/constructorStandings.js';
import {createResultsPage } from './raceResults/raceResults.js';
import {createSchedulePage } from './raceSchedule/raceSchedule.js';
import {createHomePage } from './homePage.js';

// abstracted function
export async function fetchData(url){
        const response = await fetch(url);
        let results = await response.json();
        return results;
}

// API for Race Schedule
export async function getScheduleData() {
        return await fetchData('https://ergast.com/api/f1/current.json');
}

export async function getResultData() {
    let resultList = [];
    for (let i=1; i<23; i++) {
        const response = await fetch(`https://ergast.com/api/f1/2023/${i}/results.json`);
        const results = await response.json();
        resultList.push(results.MRData.RaceTable.Races[0].Results);
    }
    return resultList
}

export async function createRoundRaceResult() {
    let schedule = await getScheduleData();
    let results = await getResultData();
    let raceNameList = [];
    for (let { raceName } of schedule.MRData.RaceTable.Races) {
        raceNameList.push(raceName);
    }

    let roundResult = [];
    // outer for loop iterates all items in 'results' to push onto roundResult list
    // inner for grabs position and driver items from results to push it onto singleRoundResult 
    for (let e of results) {
        let singleRoundResult = [];
        for (let { position, Driver } of e) {
            const positionNameObject = { position: `${position}. ${Driver.givenName} ${Driver.familyName}` };
            singleRoundResult.push(positionNameObject);
        }
        roundResult.push(singleRoundResult);
    }

    // declare empty list roundRaceResult to push name and rounds onto
    let roundRaceResult = [];
    // for loop iterates from index 0-21 in in both name and result list and pushes onto a new list combining both
    for (let i = 0; i < 22; i++) {
        roundRaceResult.push([raceNameList[i], roundResult[i]]);
    }
    console.log(roundRaceResult);
    return roundRaceResult
};

//API for driver standings
export async function getDriverData() {
    return await fetchData('https://ergast.com/api/f1/2023/driverStandings.json');
}

//API for constructor standings
export async function getConstructorData() {
    return await fetchData('https://ergast.com/api/f1/2023/constructorStandings.json');
}

document.addEventListener('DOMContentLoaded', async function (){
    if (currentPage === 'schedulePage') {
        document.getElementById('loadingScreen').style.display = 'flex';
        await createSchedulePage();
        document.getElementById('loadingScreen').style.display = 'none';
    }

    if (currentPage === 'resultsPage') {
        document.getElementById('loadingScreen').style.display = 'flex';
        await createResultsPage();
        document.getElementById('loadingScreen').style.display = 'none';
    }
 
    if (currentPage === 'driverStandingsPage') {
        document.getElementById('loadingScreen').style.display = 'flex';
        await createDriverStandingsPage();
        document.getElementById('loadingScreen').style.display = 'none';
    }

    if (currentPage === 'constructorsStandingPage') {
        document.getElementById('loadingScreen').style.display = 'flex';
        await createConstructorsStandingsPage();
        document.getElementById('loadingScreen').style.display = 'none';
    }
});

if (currentPage === 'homePage') {
    createHomePage();
}

