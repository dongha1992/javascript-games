const imageArr = [{
    name: "bag",
    url: "img/img1.jpeg"
}, {
    name: "bag",
    url: "img/img1.jpeg"
}, {
    name: "street",
    url: "img/img2.jpeg"
}, {
    name: "street",
    url: "img/img2.jpeg"
}, {
    name: "cafe",
    url: "img/img3.jpeg"
}, {
    name: "cafe",
    url: "img/img3.jpeg"
}, {
    name: "beer",
    url: "img/img4.jpeg"
}, {
    name: "beer",
    url: "img/img4.jpeg"
}, {
    name: "plant",
    url: "img/img5.jpeg"
}, {
    name: "plant",
    url: "img/img5.jpeg"
}, {
    name: "sister",
    url: "img/img8.jpeg"
}, {
    name: "sister",
    url: "img/img8.jpeg"
}, ]

const board = document.querySelector(".grid")
const shffuled = imageArr.sort(() => Math.random() - 0.5)
const resultSpan = document.getElementById("result")
let score = 0
let clickedCards = []
let clickedCardIds = []
let cardMatched = []


function createBoard() {
    for (let i = 0; i < imageArr.length; i++) {
        const square = document.createElement("img")
        square.setAttribute("src", "img/bomb.jpg")
        square.setAttribute("id", i)
        square.addEventListener("click", flipedCard)
        board.appendChild(square)

    }
}

function flipedCard(e) {
    let clickedCard = e.target
    let clickedCardId = clickedCard.id;

    clickedCardIds.push(clickedCardId)
    if (clickedCardIds.length > 2) {
        return
    }
    clickedCards.push(shffuled[clickedCardId].name)
    clickedCard.setAttribute("src", shffuled[clickedCardId].url)
    if (clickedCardIds.length === 2) {
        setTimeout(matchCard, 500)
    }


}

function matchCard() {
    const cards = document.querySelectorAll("img")
    const firstCardID = clickedCardIds[0]
    const secondCardID = clickedCardIds[1]
    if (clickedCards[0] === clickedCards[1]) {
        cards[firstCardID].setAttribute("src", "img/front.png")
        cards[secondCardID].setAttribute("src", "img/front.png")
        score++
        resultSpan.innerHTML = score
        cardMatched.push(clickedCards)
        console.log(cardMatched)
    } else {
        cards[firstCardID].setAttribute("src", "img/bomb.jpg")
        cards[secondCardID].setAttribute("src", "img/bomb.jpg")

    }
    clickedCardIds = []
    clickedCards = []

}
createBoard()