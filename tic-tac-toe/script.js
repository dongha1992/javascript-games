const X_CLASS = "x"
const O_CLASS = "o"

const WINNING_ARRAY = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll("[data-cell")
const board = document.querySelector("#board")
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const winningMessageElement = document.getElementById("winningMessage")
const restartBtn = document.querySelector("#restartButton")
const timerSpan = document.querySelector(".timer")
let circleTurn
let countdown = 60

startGame()

restartBtn.addEventListener("click", startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove("show")
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? O_CLASS : X_CLASS

    plcaeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurn()
        setBoardHoverClass()
    }

}

function endGame(draw) {
    if (draw) {
        winningMessageElement.innerText = "Draw!"
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "player o" : "player x"} is won"`
    }
    winningMessageElement.classList.add("show")
}

function plcaeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurn() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (circleTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

function checkWin(currentClass) {
    return WINNING_ARRAY.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}