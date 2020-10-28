const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
const timerSpan = document.querySelector(".timer")
const width = 8
const squares = []
let score = 0
let count = 60

const candyColors = [
    'url(img/red-candy.png)',
    'url(img/yellow-candy.png)',
    'url(img/orange-candy.png)',
    'url(img/purple-candy.png)',
    'url(img/green-candy.png)',
    'url(img/blue-candy.png)'
]

function createBoard() {
    for (let i = 0; i < Math.pow(width, 2); i++) {
        const square = document.createElement("div")
        square.setAttribute("draggable", true)
        square.setAttribute("id", i)
        let randomImg = Math.floor(Math.random() * candyColors.length)
        square.style.backgroundImage = candyColors[randomImg]
        squares.push(square)
        grid.appendChild(square)
    }

}
createBoard()


let colorBeingDragged;
let colorBeingReplaced;
let squareIdBeingDargged;
let squareIdBeingReplaced;
let currentTarget;

squares.forEach(square => square.addEventListener("dragstart", dragStart))
squares.forEach(square => square.addEventListener("dragend", dragEnd))
squares.forEach(square => square.addEventListener("dragover", dragOver))
squares.forEach(square => square.addEventListener("dragenter", dragEnter))
squares.forEach(square => square.addEventListener("dragleave", dragLeave))
squares.forEach(square => square.addEventListener("drop", dragDrop))

function dragStart(e) {
    currentTarget = e.target
    colorBeingDragged = currentTarget.style.backgroundImage
    squareIdBeingDargged = parseInt(currentTarget.id)
    console.log(colorBeingDragged)

}


function dragOver(e) {
    e.preventDefault()
    console.log("over")
}

function dragEnter(e) {
    e.preventDefault()
    console.log("enter")
}

function dragLeave() {
    console.log("leave")
}


function dragDrop(e) {
    currentTarget = e.target
    colorBeingReplaced = e.target.style.backgroundImage
    squareIdBeingReplaced = parseInt(currentTarget.id)
    currentTarget.style.backgroundImage = colorBeingDragged
    squares[squareIdBeingDargged].style.backgroundImage = colorBeingReplaced
    console.log(colorBeingReplaced)

}


function dragEnd(e) {
    let validMoves = [squareIdBeingDargged - 1, squareIdBeingDargged - width, squareIdBeingDargged + 1, squareIdBeingDargged + width]
    let validMove = validMoves.includes(squareIdBeingReplaced)
    if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null
    } else if (squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
        squares[squareIdBeingDargged].style.backgroundImage = colorBeingDragged
    }
}

function moveDown() {
    for (let i = 0; i < 55; i++) {
        if (squares[i + width].style.backgroundImage === "") {
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ""
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            console.log(i)
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && squares[i].style.backgroundImage === "") {}
            let randomColor = Math.floor(Math.random() * candyColors.length)
            squares[i].style.backgroundImage = candyColors[randomColor]
        }
    }
}

function checkRowForThree() {
    for (let i = 0; i < 61; i++) {
        let rowOfThree = [i, i + 1, i + 2]
        let targetImg = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ""
        if (rowOfThree.every(index => squares[index].style.backgroundImage === targetImg && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score;
            rowOfThree.forEach(index => {
                squares[index].style.backgroundImage = ""
            })
        }
    }
}
checkRowForThree()

function checkColumnForThree() {
    for (let i = 0; i < 47; i++) {
        let colOfThree = [i, i + width, i + width * 2]
        let targetImg = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ""
        if (colOfThree.every(index => squares[index].style.backgroundImage === targetImg && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score;
            colOfThree.forEach(index => {
                squares[index].style.backgroundImage = ""
            })
        }
    }
}
checkColumnForThree()

window.setInterval(function() {
    moveDown()

    checkColumnForThree()
    checkRowForThree()

}, 100)