let size = 5;
let bombFrequency = 0.2
let tileSize = 60


const board = document.querySelector(".board")
let tiles;
let boardSize;

let bombs = [];
let numbers = [];
let numberColors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#34495e', '#7f8c8d', ];
let gameOver = false

function createBoard() {
    for (let i = 0; i < Math.pow(size, 2); i++) {
        const tile = document.createElement("div")
        tile.classList.add("tile")
        board.appendChild(tile)
    }
    tiles = document.querySelectorAll(".tile")
    boardSize = Math.sqrt(tiles.length)
    board.style.width = boardSize * tileSize + "px"
    document.documentElement.style.setProperty('--tileSize', `${tileSize}px`)
    document.documentElement.style.setProperty("--boardSize", `${boardSize * tileSize}px`)

    let x = 0;
    let y = 0;

    tiles.forEach((tile, i) => {
        tile.setAttribute('data-tile', `${x},${y}`)
            //add bombs
        let random_boolean = Math.random() < bombFrequency;
        if (random_boolean) {
            bombs.push(`${x},${y}`)

            if (x > 0) {
                numbers.push(`${x-1},${y}`);
            }
            if (x < boardSize - 1) {
                numbers.push(`${x+1},${y}`);
            }
            if (y > 0) {
                numbers.push(`${x},${y-1}`);
            }
            if (y < boardSize - 1) {
                numbers.push(`${x},${y+1}`);
            }
            if (x > 0 && y > 0) {
                numbers.push(`${x-1},${y-1}`);
            }
            if (x < boardSize - 1 && y < boardSize - 1) {
                numbers.push(`${x+1},${y+1}`);
            }
            if (y > 0 && x < boardSize - 1) {
                numbers.push(`${x+1},${y-1}`);
            }
            if (x > 0 && y < boardSize - 1) {
                numbers.push(`${x-1},${y+1}`);
            }
        }
        x++
        if (x >= boardSize) {
            x = 0;
            y++;
        }
        tile.oncontextmenu = function(e) {
            e.preventDefault();
            flag(tile);
        }
        tile.addEventListener("click", function(e) {
            clickTile(tile);
        })
    })

    numbers.forEach(num => {
        let coords = num.split(',');
        let tile = document.querySelectorAll(`[data-tile="${coords[0]},${coords[1]}"]`)[0]

        let dataNumber = parseInt(tile.getAttribute('data-number'))

        if (!dataNumber) {
            dataNumber = 0;
        }
        tile.setAttribute('data-number', dataNumber + 1)

    })
    console.log(bombs, tiles, numbers)

}
createBoard()

function flag(tile) {


}

function clickTile(tile) {
    if (gameOver) return
    if (tile.classList.contains('tile--checked') || tile.classList.contains("tile-flagged")) return
    let coordinate = tile.getAttribute("data-tile")
    if (bombs.includes(coordinate)) {
        endGame(tile)
    } else {
        let num = tile.getAttribute('data-number');
        if (num !== null) {
            tile.classList.add('tile--checked');
            tile.innerHTML = num;
            return
        }
        checkTile(tile, coordinate);
        console.log(coordinate)
    }
    tile.classList.add('tile--checked');

}

function checkTile(tile, coordinate) {
    let coords = coordinate.split(',');
    let x = parseInt(coords[0]);
    let y = parseInt(coords[1]);
    setTimeout(() => {

        if (x > 0) {
            let targetW = document.querySelector(`[data-tile="${x-1},${y}"]`)
            clickTile(targetW, `${x-1},${y}`);
            console.log(targetW)
        }
        if (x < boardSize - 1) {
            let targetE = document.querySelectorAll(`[data-tile="${x+1},${y}"`)[0];
            clickTile(targetE, `${x+1},${y}`);
        }
        if (y > 0) {
            let targetN = document.querySelectorAll(`[data-tile="${x},${y-1}"]`)[0];
            clickTile(targetN, `${x},${y-1}`);
        }
        if (y < boardSize - 1) {
            let targetS = document.querySelectorAll(`[data-tile="${x},${y+1}"]`)[0];
            clickTile(targetS, `${x},${y+1}`);
        }
        if (x > 0 && y > 0) {
            let targetNW = document.querySelectorAll(`[data-tile="${x-1},${y-1}"`)[0];
            clickTile(targetNW, `${x-1},${y-1}`);
        }
        if (x < boardSize - 1 && y < boardSize - 1) {
            let targetSE = document.querySelectorAll(`[data-tile="${x+1},${y+1}"`)[0];
            clickTile(targetSE, `${x+1},${y+1}`);
        }
        if (y > 0 && x < boardSize - 1) {
            let targetNE = document.querySelectorAll(`[data-tile="${x+1},${y-1}"]`)[0];
            clickTile(targetNE, `${x+1},${y-1}`);
        }
        if (x > 0 && y < boardSize - 1) {
            let targetSW = document.querySelectorAll(`[data-tile="${x-1},${y+1}"`)[0];
            clickTile(targetSW, `${x-1},${y+1}`);
        }
    }, 10)
}

function endGame(tile) {
    tiles.forEach(tile => {
        let coordinate = tile.getAttribute('data-tile')
        if (bombs.includes(coordinate)) {
            tile.classList.remove('tile--flagged');
            tile.classList.add('tile--checked', 'tile--bomb');
            tile.innerHTML = '💣';
        }
    })
}



/*
console.clear()
console.log("tiles", tiles)
console.log(`${boardSize} x ${boardSize} tiles`);
console.log('bombs', bombs);
console.log('numbers', numbers);
*/