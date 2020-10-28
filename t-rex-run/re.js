document.addEventListener("DOMContentLoaded", () => {

    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    const body = document.querySelector('body')
    const alert = document.getElementById('alert')

    let isJumping = false
    let gravity = 0.9
    let isGameOver = false

    function control(e) {
        if (e.keyCode === 32) {
            if (!isJumping) {
                isJumping = true
                jump()
            }
        }
    }
    document.addEventListener("keyup", control)
    let pos = 0

    function jump() {
        let cnt = 0
        let timerId = setInterval(function() {
            if (cnt === 15) {
                clearInterval(timerId)
                let downTimerId = setInterval(function() {
                    if (cnt === 0) {
                        clearInterval(downTimerId)
                        isJumping = false
                    }
                    pos -= 5
                    cnt--
                    pos = pos * gravity
                    dino.style.bottom = pos + "px"
                }, 20)
            }
            pos += 30
            cnt++
            pos = pos * gravity
            dino.style.bottom = pos + "px"
        }, 20)
    }

    function generateObstacles() {
        let randomTime = Math.random() * 4000
        let obstaclePos = 1000;
        const obstacle = document.createElement("div")
        if (!isGameOver) {
            obstacle.classList.add("obstacle")
        }
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePos + "px"
        let timerId = setInterval(function() {
            obstaclePos -= 10
            obstacle.style.left = obstaclePos + "px"
        }, 20)
        if (!isGameOver) {
            setTimeout(generateObstacles, randomTime)
        }

    }
    generateObstacles()
})