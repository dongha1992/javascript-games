const dataCell = document.querySelectorAll("[data-cell]")
const board = document.querySelector("#board")
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const winningMessageElement = document.getElementById("winningMessage")
const restartBtn = document.querySelector("#restartButton")
const timerSpan = document.querySelector(".timer")
let circleTurn

let O_CLASS = "o"
let X_CLASS = "x"


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

board.addEventListener("click", click)

function click(e) {
    const cell = e.target
    let currentTurn = circleTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentTurn)
    if (checkWin(currentTurn)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurn()
        setBoardHoverClass()
    }
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

function placeMark(cell, currentTurn) {

    if (cell.classList.contains("cell")) {
        if (!cell.classList.contains("x") && !cell.classList.contains("o")) {
            cell.classList.add(currentTurn)
        }
    }
}

function swapTurn() {
    circleTurn = !circleTurn
}

function checkWin(currentTurn) {
    console.clear()
    return WINNING_ARRAY.some(combination => {
        console.log(combination)
        return combination.every(index => {
            console.log(dataCell[index], index, currentTurn)
            return dataCell[index].classList.contains(currentTurn)
        })
    })
}

function endGame() {}

function isDraw() {

    return [...dataCell].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}