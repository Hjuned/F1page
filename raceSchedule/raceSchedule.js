const raceList = document.querySelector('#raceList');
// abstracted function
async function fetchData(url){
    const response = await fetch(url)
    let results = await response.json()
    return results
}

// API for Race Schedule
async function getScheduleData() {
    return await fetchData('https://ergast.com/api/f1/2023.json')
}

// function that appends schedule info by looping through api to retrieve round, race names, circuit names and dates 
export async function createSchedulePage() {
        let schedule = await getScheduleData();
        console.log(schedule.MRData.RaceTable.Races);

            let racesElementAPI = schedule.MRData.RaceTable.Races;
            console.log(racesElementAPI);
            for (let { round, raceName, Circuit, date } of racesElementAPI) {
                const raceScheduleCard = document.createElement('div')
                raceScheduleCard.classList.add('raceScheduleCard')
            
                const raceNameElement = document.createElement('h1')
                const roundElement = document.createElement('p')
                const circuitNameElement = document.createElement('p')
                const circuitDateElement = document.createElement('p')
            
                raceNameElement.textContent = `${raceName}`
                roundElement.textContent = `R${round}`
                circuitDateElement.textContent = `${date}`
        
                if (Circuit) {
                        const circuitName = Circuit.circuitName;
                        circuitNameElement.textContent = `${circuitName}`
                    } else {
                        console.log('Location is undefined within Circuit')
                    }
                raceScheduleCard.appendChild(raceNameElement)
                raceScheduleCard.appendChild(roundElement)
                raceScheduleCard.appendChild(circuitNameElement)
                raceScheduleCard.appendChild(circuitDateElement)
                raceList.appendChild(raceScheduleCard)
                const circuitImagesAppended = document.createElement('img')
                circuitImagesAppended.src = `./raceSchedule/${raceName.split(' ')[0]}.jpeg`  // Adjust index to start from 0
                circuitImagesAppended.classList.add('raceScheuleCardImg')
                raceScheduleCard.appendChild(circuitImagesAppended)
                
    
                raceList.appendChild(raceScheduleCard)
        }
        // for (let {circuitName} of schedule.MRData.RaceTable.Races[0].Circuit.Location.circuitName)
    }
