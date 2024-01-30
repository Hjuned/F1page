// abstracted function
async function fetchData(url){
    const response = await fetch(url)
    let results = await response.json()
    return results
}
// Countdown timer
export function createHomePage() {
    function updateCountdown() {
        const countdownContainer = document.getElementById('countdownTimer')
        const daysSpan = document.getElementById('days')
        const hoursSpan = document.getElementById('hours')
        const minutesSpan = document.getElementById('minutes')
        const secondsSpan = document.getElementById('seconds')

        const countDownDate = new Date("Mar 17, 2024 00:00:00").getTime()

        const x = setInterval(function () {

            const now = new Date().getTime()

            const timeRemaining = countDownDate - now;

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)).toString().padStart(2, '0')
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0')
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0')
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000).toString().padStart(2, '0')

            daysSpan.textContent = days
            hoursSpan.textContent = hours
            minutesSpan.textContent = minutes
            secondsSpan.textContent = seconds

            if (timeRemaining < 0) {
                clearInterval(x)
                countdownContainer.innerHTML = "The 2024 F1 season has begun!"
            }
        }, 1000)

    }

    document.addEventListener('DOMContentLoaded', updateCountdown)
}
