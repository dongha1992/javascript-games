const grid = document.querySelector(".grid")
const doodler = document.createElement("div")
let doodlerLeftSpace = 50
let startPoint = 250
let doodlerBottomSpace = startPoint
let platformCount = 5
let isGameOver = false
let isGoingLeft = false;
let isGoingRight = false;
let leftTimeId;
let rightTimeId;
let platforms = []
let upTimerId;
let downTimerId;

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
        }
    })
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
        }
    }, 30)

}

function moveUp() {
    isGoingLeft = false
    isGoingRight = false
    clearInterval(rightTimeId)
    clearInterval(leftTimeId)
}

function jump() {
    clearInterval(downTimerId)
    upTimerId = setInterval(function() {
        doodlerBottomSpace += 20
        doodler.style.bottom = doodlerBottomSpace + "px"
        if (doodlerBottomSpace > startPoint + 200) {
            fall()
        }
    }, 39)
}

function fall() {
    clearInterval(upTimerId)
    downTimerId = setInterval((function() {
        doodlerBottomSpace -= 5
        doodler.style.bottom = doodlerBottomSpace + "px"
        platforms.forEach(platform => {
            if ((doodlerBottomSpace >= platform.bottom) && (doodlerBottomSpace <= platform.bottom + 15) && (doodlerLeftSpace + 60 >= platform.left) && (doodlerLeftSpace <= platform.left + 85)) {
                jump()
            }
        })
    }), 30)
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