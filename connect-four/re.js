const board = document.querySelector(".grid")
let width = 7
let currentPlayer = 1
let squares = []
const result = document.querySelector("#result")
const displayCurrentPlayer = document.querySelector("#current-player")

function createBoard() {
    for (let i = 0; i < Math.pow(width, 2); i++) {
        const square = document.createElement("div")
        square.classList.add("square")
        square.setAttribute("id", i)
        squares.push(square)
        if (parseInt(squares[i].id) + width >= width * width) {
            squares[i].classList.add("taken")
        }

        board.appendChild(square)
        squares[i].addEventListener("click", function(e) {
            if (squares[i + 7].classList.contains("taken")) {
                if (currentPlayer === 1) {
                    squares[i].classList.add("taken")
                    squares[i].classList.add("player-one")
                    currentPlayer = 2
                    displayCurrentPlayer.innerHTML = currentPlayer
                } else if (currentPlayer === 2) {
                    squares[i].classList.add("taken")
                    squares[i].classList.add("player-two")
                    currentPlayer = 1
                    displayCurrentPlayer.innerHTML = currentPlayer
                }

            } else {
                alert("can't go")
            }

        })
    }
}

createBoard()