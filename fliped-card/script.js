document.addEventListener("DOMContentLoaded", () => {
    const cardArray = [{
        name: 'bag',
        img: 'img/img1.jpeg'
    }, {
        name: 'bag',
        img: 'img/img1.jpeg'
    }, {
        name: 'street',
        img: 'img/img2.jpeg'
    }, {
        name: 'street',
        img: 'img/img2.jpeg'
    }, {
        name: 'cafe',
        img: 'img/img3.jpeg'
    }, {
        name: 'cafe',
        img: 'img/img3.jpeg'
    }, {
        name: 'beer',
        img: 'img/img4.jpeg'
    }, {
        name: 'beer',
        img: 'img/img4.jpeg'
    }, {
        name: 'plant',
        img: 'img/img5.jpeg'
    }, {
        name: 'plant',
        img: 'img/img5.jpeg'
    }, {
        name: 'sister',
        img: 'img/img8.jpeg'
    }, {
        name: 'sister',
        img: 'img/img8.jpeg'
    }]
    const grid = document.querySelector(".grid")
    let cardChoosen = []
    let cardChoosenId = []
    let cardMatched = []
    const resultDisplay = document.querySelector("#result")
    cardArray.sort(() => 0.5 - Math.random())

    function createBorad() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img')
            card.setAttribute("src", "img/bomb.jpg")
            card.setAttribute('data-id', i)
            card.addEventListener("click", flipCard)
            grid.appendChild(card)
        }
    }

    function checkForMatch() {
        let cards = document.querySelectorAll("img")
        const optionOneId = cardChoosenId[0]
        const optionTwoId = cardChoosenId[1]
        if (cardChoosen[0] === cardChoosen[1]) {
            cards[optionOneId].setAttribute("src", "img/front.png")
            cards[optionTwoId].setAttribute("src", "img/front.png")
            cardMatched.push(cardChoosen)
        } else {
            cards[optionOneId].setAttribute("src", "img/bomb.jpg")
            cards[optionTwoId].setAttribute("src", "img/bomb.jpg")
        }
        cardChoosen = []
        cardChoosenId = []
        resultDisplay.textContent = cardMatched.length
        if (cardMatched.length === cardArray.length / 2) {
            resultDisplay.textContent = "you won"
        }
    }

    function flipCard() {
        let cardId = this.getAttribute("data-id")
        cardChoosen.push(cardArray[cardId].name)
        cardChoosenId.push(cardId)
        this.setAttribute("src", cardArray[cardId].img)
        if (cardChoosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }

    }
    createBorad()
})