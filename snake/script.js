document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".grid div")
    const scoreDisplay = document.querySelector(".score span")
    const startBtn = document.querySelector(".start")

    const width = 10
    let currentIndex = 0 // first div in grid
    let appleIndex = 0 // first div in grid
    let currentSnake = [2, 1, 0] // div in grid being 2(or the head), and being the end(tail with 1's being the body from now on)
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0 // 뱀을 정해진 시간마다 움직이게 할 변수
    let interval = 0 // setInterval을 위한 변수

    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove("snake"))
        squares[appleIndex].classList.remove("apple")
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentIndex[2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add("snake"))
        interval = setInterval(moveOutComes, intervalTime)
    }

    function moveOutComes() {
        //deals with snake hittinh border and snake hittinh self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //if hit bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || //hit right wall
            (currentSnake[0] % width === 0 && direction === -1) || // hit left wall
            (currentSnake[0] - width < 0 && direction === -width) || // hit the top
            squares[currentSnake[0] + direction].classList.contains("snake") // gose into itself
        ) {
            return clearInterval(interval)
        }

        const tail = currentSnake.pop() // removes last item of the array and shows interval
        squares[tail].classList.remove("snake")
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array
            //deals with snake getting apple

        if (squares[currentSnake[0]].classList.contains("apple")) {
            squares[currentSnake[0]].classList.remove("apple")
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutComes, intervalTime)
        }
        squares[currentSnake[0]].classList.add("snake")
    }

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains("snake")) {
            squares[appleIndex].classList.add("apple")
        }
    }

    function control(e) {
        squares[currentIndex].classList.remove('snake')
        if (e.keyCode === 39) {
            direction = 1 // press the right key, snake go right
        } else if (e.keyCode === 38) {
            direction = -width //press the up key, 
        } else if (e.keyCode === 37) {
            direction = -1 // left
        } else if (e.keyCode === 40) {
            direction = +width
        }
    }
    document.addEventListener("keyup", control)
    startBtn.addEventListener("click", startGame)
})