let width = 3


const board = document.querySelector(".grid")
const scroeSpan = document.getElementById("score")
const timeSpan = document.getElementById("time-left")
const squares = []
let score = 0;
let timeLeft = 60;




function createBoard() {
    for (let i = 0; i < Math.pow(width, 2); i++) {
        const square = document.createElement("div")
        square.classList.add("squre")
        square.setAttribute("id", i)
        board.appendChild(square)
        squares.push(square)
        square.addEventListener("click", hit)
    }
}
createBoard()

function randomMole() {
    let molePos;
    let randomMove = Math.floor(Math.random() * squares.length)
    for (let i = 0; i < squares.length; i++) {
        molePos = squares[randomMove]
    }
    molePos.classList.add("mole")
    setTimeout(() => {
        molePos.classList.remove("mole")
    }, 1000)

}

function countDown() {
    timeLeft--
    timeSpan.innerHTML = timeLeft
}


function moveMole() {
    let timerId;
    let countId
    timerId = setInterval(randomMole, 1000)
    countId = setInterval(countDown, 1000)
}

function hit(e) {
    console.log(e)
    if (e.target.classList.contains("mole")) {
        score++
    }
    scroeSpan.innerHTML = score

}



moveMole()