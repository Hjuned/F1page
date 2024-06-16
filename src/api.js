const fetchData = async (url) => {
    const response = await fetch(url);
    let results = await response.json();
    return results;
};

const getScheduleData = async () => {
    return await fetchData('https://ergast.com/api/f1/2023.json');
};

const getResultData = async () => {
    let resultList = [];
    for (let i = 1; i < 23; i++) {
        const response = await fetch(`https://ergast.com/api/f1/2023/${i}/results.json`);
        const results = await response.json();
        resultList.push(results.MRData.RaceTable.Races[0].Results);
    }
    return resultList;
};

const createRoundRaceResult = async () => {
    let schedule = await getScheduleData();
    let results = await getResultData();
    let raceNameList = [];
    for (let { raceName } of schedule.MRData.RaceTable.Races) {
        raceNameList.push(raceName);
    }

    let roundResult = [];
    for (let e of results) {
        let singleRoundResult = [];
        for (let { position, Driver } of e) {
            const positionNameObject = { position: `${position}. ${Driver.givenName} ${Driver.familyName}` };
            singleRoundResult.push(positionNameObject);
        }
        roundResult.push(singleRoundResult);
    }

    let roundRaceResult = [];
    for (let i = 0; i < 22; i++) {
        roundRaceResult.push([raceNameList[i], roundResult[i]]);
    }
    console.log(roundRaceResult);
    return roundRaceResult;
};

const getDriverData = async () => {
    return await fetchData('https://ergast.com/api/f1/2023/driverStandings.json');
};

const getConstructorData = async () => {
    return await fetchData('https://ergast.com/api/f1/2023/constructorStandings.json');
};

module.exports = {
    fetchData,
    getScheduleData,
    getResultData,
    createRoundRaceResult,
    getDriverData,
    getConstructorData
};
