const tbody = document.querySelector("#table tbody");
let dataSet = []

function setMine() {
    tbody.innerHTML = "";
    dataSet = []
    const col = parseInt(document.querySelector("#hori").value)
    const row = parseInt(document.querySelector("#vert").value)
    const mine = parseInt(document.querySelector("#mine").value)
    for (let i = 0; i < row; i++) {
        let arr = []
        const tr = document.createElement("tr")
        dataSet.push(arr)
        for (let j = 0; j < col; j++) {
            arr.push(1)
            const td = document.createElement("td")
            td.addEventListener("contextmenu", function(e) {
                e.preventDefault();
                const currentTd = e.target
                const parentTr = currentTd.parentNode
                const parentTbody = currentTd.parentNode.parentNode;
                let targetRow = Array.prototype.indexOf.call(parentTbody.children, parentTr)
                let targetCol = Array.prototype.indexOf.call(parentTr.children, currentTd)
                if (currentTd.textContent === "" || currentTd.textContent === "x") {
                    currentTd.textContent = "!"
                } else if (currentTd.textContent === "!" || currentTd.textContent === "x") {
                    currentTd.textContent = "?"
                } else if (currentTd.textContent === "?" || currentTd.textContent === "x") {
                    if (dataSet[targetRow][targetCol] = 1) {
                        currentTd.textContent = ""
                    } else if (dataSet[targetRow][targetCol] === "x") {
                        currentTd.textContent = "x"
                    }
                }

            })
            td.addEventListener("click", function(e) {
                const currentTd = e.target
                const parentTr = currentTd.parentNode
                const parentTbody = currentTd.parentNode.parentNode;

                currentTd.classList.add("opend")
                let targetRow = Array.prototype.indexOf.call(parentTbody.children, parentTr)
                let targetCol = Array.prototype.indexOf.call(parentTr.children, currentTd)
                if (dataSet[targetRow][targetCol] === "x") {
                    alert("booooom")
                } else if (dataSet[targetRow][targetCol] === 1) {
                    //지뢰가 아닌 칸은 주변 8칸을 돌면서 지뢰가 몇 개 있나 계산한다.
                    let countingMine = countMine(dataSet, targetRow, targetCol)[3]
                    currentTd.textContent = countingMine;
                    if (countingMine === 0) {
                        openNearby(currentTd, dataSet, targetRow, targetCol)
                    }
                }
            })
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }
    const mineList = randomMine(col, row)
    makeMine(mineList)
    const mined = makeMine(mineList)
    for (let el in mined) {
        tbody.children[mined[el].a].children[mined[el].b].innerHTML = "x"
        dataSet[mined[el].a][mined[el].b] = "x"
    }

}

function openNearby(currentTd, dataSet, targetRow, targetCol) {
    const openedList = []
    let newRow = targetRow + 2;
    let newCol = targetCol + 2;


    for (let i = targetRow - 1; i < newRow; i++) {
        for (let j = targetCol - 1; j < newCol; j++) {
            if (i < 0 || j < 0 || i > dataSet.length - 1 || j > dataSet.length - 1 || (i === targetRow && j === targetCol)) {
                continue;
            }

        }
    }
    console.log(openedList)
}


function countMine(dataSet, targetRow, targetCol) {
    let cnt = 0;
    let newRow = targetRow + 2;
    let newCol = targetCol + 2;
    for (let i = targetRow - 1; i < newRow; i++) {
        for (let j = targetCol - 1; j < newCol; j++) {
            if (i < 0 || j < 0 || i > dataSet.length - 1 || j > dataSet.length - 1 || (i === targetRow && j === targetCol)) {
                continue;
            }
            if (dataSet[i][j] === "x") {
                cnt++;
            }
        }
    }
    return [dataSet, targetRow, targetCol, cnt]
}

function randomMine(col, row) {
    const target = Array(col * row).fill().map(function(el, idx) {
        return idx
    })
    const shaking = [];
    while (target.length > 80) {
        let move = target.splice(Math.floor(Math.random() * target.length), 1)[0]
        shaking.push(move)
    }
    return shaking
}

function makeMine(list) {
    let a;
    let b;
    let temp = []
    for (let k = 0; k < list.length; k++) {
        a = Math.floor(list[k] / 10)
        b = list[k] % 10
        temp.push({ a, b })
    }
    return temp
}

document.querySelector("#execute").addEventListener("click", setMine)