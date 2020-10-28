const board = document.querySelector(".grid")
const scoreDisplay = document.querySelector(".score span")
const startBtn = document.querySelector(".start")

let width = 10;
let squares = []
let currentIndex = 0
let appleIndex = 0
let currentSnake = [2, 1, 0] // div in grid being 2(or the head), and being the end(tail with 1's being the body from now on)
let direction = 1
let intervalTime = 740
let interval = 0
let speed = 0.8
let score = 0;

function createBoard() {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement("div")
        square.classList.add("square")
        squares.push(square)
        board.appendChild(square)
    }
    setGame()
}

function setGame() {
    currentSnake.forEach(index => squares[index].classList.remove("snake"))
    randomApple()
    currentSnake.forEach(index => squares[index].classList.add("snake"))
    interval = setInterval(moveOutComes, intervalTime)
}

function moveOutComes() {

    if ((currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] % width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")) {
        return clearInterval(interval)
    }
    const tail = currentSnake.pop()
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);

    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple")
        squares[tail].classList.add("snake")
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutComes, intervalTime)

    }
    squares[currentSnake[0]].classList.add("snake");
}

function randomApple() {
    appleIndex = Math.floor(Math.random() * squares.length)
    console.log(appleIndex)
    if (!squares[appleIndex].classList.contains("snake")) {
        squares[appleIndex].classList.add("apple")
    } else {
        randomApple()
    }
}

function control(e) {
    squares[currentIndex].classList.remove("snake")
    if (e.keyCode === 39) {
        direction = 1
    } else if (e.keyCode === 38) {
        direction = -width //press the up key, 
    } else if (e.keyCode === 37) {
        direction = -1 // left
    } else if (e.keyCode === 40) {
        direction = +width
    }
}
document.addEventListener("keyup", control)
createBoard()