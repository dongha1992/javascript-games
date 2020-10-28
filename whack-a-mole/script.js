const square = document.querySelectorAll(".squre")
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector("#time-left")
let score = document.querySelector("#score")

let result = 0
let curTime = timeLeft.textContent

function randomSquare() {
    square.forEach(className => {
        className.classList.remove('mole')
    })
    let randomPos = square[Math.floor(Math.random() * 9)]
    randomPos.classList.add("mole")
    hitPos = randomPos.id
}

square.forEach(id => {
    id.addEventListener("mouseup", () => {
        if (id.id === hitPos) {
            result = result + 1
            score.textContent = result
        }
    })
})

function moveMole() {
    let timerId = null
    timerId = setInterval(randomSquare, 500)
}
moveMole()

function countDown() {
    curTime--
    timeLeft.textContent = curTime
    if (curTime === 0) {
        clearInterval(timerId)
        alert("game over")
    }
}

let timerId = setInterval(countDown, 500)