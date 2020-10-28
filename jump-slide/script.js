document.addEventListener("DOMContentLoaded", () => {
    const prince = document.querySelector(".character")
    let bottom = 0
    let gravity = 0.9
    let isJumping = false
    let IsGoingLeft = false
    let IsGoingRight = false
    let left = 0

    let rightTimerId;
    let leftTimerId;

    function jump() {
        if (isJumping) return
        prince.classList.remove("character-slide")
        prince.classList.add("character")
        let timerUpId = setInterval(function() {
            if (bottom > 250) {
                clearInterval(timerUpId)
                let timerDownId = setInterval(function() {
                    if (bottom < 0) {
                        clearInterval(timerDownId)
                        isJumping = false
                    }
                    bottom -= 2
                    bottom = bottom * gravity
                    console.log(bottom)
                    prince.style.bottom = bottom + "px"
                }, 20)
            }
            isJumping = true
            bottom += 30
            bottom = bottom * gravity
            prince.style.bottom = bottom + "px"
        }, 20)

    }

    function slideLeft() {
        prince.classList.add("character-slide")
        prince.classList.remove("character")
        if (IsGoingRight) {
            clearInterval(rightTimerId)
            IsGoingRight = false
        }
        IsGoingLeft = true
        leftTimerId = setInterval(function() {
            left -= 5
            prince.style.left = left + "px"
        }, 20)
    }

    function slideRight() {
        prince.classList.add("character-slide")
        prince.classList.remove("character")
        if (IsGoingLeft) {
            clearInterval(leftTimerId)
            IsGoingLeft = false
        }
        IsGoingRight = true
        rightTimerId = setInterval(function() {
            left += 5
            prince.style.left = left + "px"
        }, 20)
    }

    function control(e) {
        if (e.keyCode === 38) {
            jump()
        } else if (e.keyCode === 37) {
            slideLeft()
        } else if (e.keyCode === 39) {
            slideRight()
        }
    }
    document.addEventListener("keydown", control)
})