const bird = document.querySelector('.bird')
const gameDisplay = document.querySelector('.game-container')
const ground = document.querySelector('.ground-moving')
let birdLeft = 220
let birdBottom = 100
let gravity = 2
let isGameOver = false

function startGame() {
    birdBottom -= gravity
    bird.style.bottom = birdBottom + "px"
    bird.style.left = birdLeft + "px"
}

let gameTimerId = setInterval(startGame, 30)

function control(e) {
    if (e.keyCode === 32) {
        jump()
    }
}


function jump() {
    if (birdBottom < 340) {
        birdBottom += 50
        bird.style.bottom = birdBottom + "px"
    }
}
document.addEventListener("keyup", control)

function generateObstacle() {
    let obstacleLeft = 500
    let randomHeight = Math.random() * 100
    let obstacleBottom = randomHeight
    const obstacle = document.createElement("div")
    if (!isGameOver) {
        obstacle.classList.add("obstacle")
    }
    gameDisplay.appendChild(obstacle)
    obstacle.style.left = obstacleLeft + "px"
    obstacle.style.bottom = obstacleBottom + "px"

    function moveObstacle() {
        obstacleLeft -= 2
        obstacle.style.left = obstacleLeft + "px"
        if (obstacleLeft === -70) {
            clearInterval(timerId)
            gameDisplay.removeChild(obstacle)
        }


    }
    timerId = setInterval(moveObstacle, 10)
    if (!isGameOver) {
        setTimeout(generateObstacle, 3000)
    }
}
generateObstacle()