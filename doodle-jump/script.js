document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid")
    const doodler = document.createElement("div")
    let doodlerLeftSpace = 50
    let startPoint = 150
    let doodlerBottomSpace = startPoint
    let isGameOver = false;
    let platformCount = 5
    let platforms = []
    let upTimerId;
    let downTimerId;
    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimeId;
    let rightTimeId;

    function createDoodler() {
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerLeftSpace = platforms[0].left
        console.log(platforms[0].left)
        doodler.style.left = doodlerLeftSpace + "px"
        doodler.style.bottom = doodlerBottomSpace + "px"
    }
    class Platform {
        constructor(newPlatformBottom) {
            this.bottom = newPlatformBottom
            this.left = Math.random() * 315
            this.visual = document.createElement("div")
            const visual = this.visual
            visual.classList.add("platform")
            visual.style.left = this.left + "px"
            visual.style.bottom = this.bottom + "px"
            grid.appendChild(visual)

        }
    }

    function createPlatform() {
        for (let i = 0; i < platformCount; i++) {
            let platformGap = 600 / platformCount
            let newPlatformBottom = 100 + i * platformGap
            let newPlatform = new Platform(newPlatformBottom)
            platforms.push(newPlatform)
        }
    }

    function movePlatforms() {
        if (doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 3
                let visual = platform.visual
                visual.style.bottom = platform.bottom + "px"
                if (platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual
                    firstPlatform.classList.remove("platform")
                    console.log(platforms)
                    platforms.shift()
                    let newPlatform = new Platform(600)
                    platforms.push(newPlatform)
                }
            })
        }
    }

    function jump() {
        clearInterval(downTimerId)
        upTimerId = setInterval(function() {
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace + "px"
            if (doodlerBottomSpace > startPoint + 200) {
                fall()
            }
        }, 30)
    }

    function fall() {
        clearInterval(upTimerId)
        isJumping = false
        downTimerId = setInterval(function() {
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + "px"
            if (doodlerBottomSpace <= 0) {
                gameOver()
            }
            platforms.forEach(platform => {
                if ((doodlerBottomSpace >= platform.bottom) && (doodlerBottomSpace <= platform.bottom + 15) && (doodlerLeftSpace + 60 >= platform.left) && (doodlerLeftSpace <= platform.left + 85) && !isJumping) {
                    startPoint = doodlerBottomSpace
                    console.log(startPoint)
                    jump()
                }
            })
        }, 30)

    }

    function gameOver() {
        isGameOver = true
        clearInterval(upTimerId)
        console.log(grid)
        while (grid.firstChild) {
            grid.remove(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(downTimerId)
        clearInterval(leftTimeId)
        clearInterval(rightTimeId)
    }

    function control(e) {

        if (e.key === "ArrowLeft") {
            moveLeft()

        } else if (e.key === "ArrowRight") {
            moveRight()

        } else if (e.key === "ArrowUp") {
            moveUp()
        }
    }

    function moveLeft() {
        if (isGoingRight) {
            clearInterval(rightTimeId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimeId = setInterval(function() {
            if (doodlerLeftSpace >= 0) {
                doodlerLeftSpace -= 5
                doodler.style.left = doodlerLeftSpace + "px"

            } else {
                moveRight()
            }

        }, 30)
    }

    function moveRight() {
        if (isGoingLeft) {
            clearInterval(leftTimeId)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimeId = setInterval(function() {
            if (doodlerLeftSpace <= 340) {
                doodlerLeftSpace += 5
                doodler.style.left = doodlerLeftSpace + "px"
            } else {
                moveLeft()
            }
        }, 30)
    }

    function moveUp() {
        isGoingLeft = false
        isGoingRight = false
        clearInterval(rightTimeId)
        clearInterval(leftTimeId)
    }

    function start() {
        if (!isGameOver) {
            createPlatform()
            createDoodler()
            setInterval(movePlatforms, 30)
            jump()
            document.addEventListener("keyup", control)
        }
    }
    start()
})