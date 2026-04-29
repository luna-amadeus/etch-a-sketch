const gridOutline = document.querySelector("#gridoutline");
let gridEdge = 16;
const newGridBtn = document.querySelector("button");

const removeCurrentGrid = () => {
    while (gridOutline.firstChild) {
        gridOutline.removeChild(gridOutline.firstChild);
    }
}
function componentToHex(c) {
    const number = Number.parseInt(c);
    if (number >= 25) {
        const hex = (number - 25).toString(16);
        return (hex.length === 1) ? "0" + hex : hex;
    } else {
        const hex = 0
        const newVal = hex.toString(16);
        return (newVal.length === 1) ? "0" + newVal : newVal;
    }
}

function rgbToDarkenedHex(arr) {
            return componentToHex(arr[0]) + componentToHex(arr[1]) + componentToHex(arr[2]);
        }

const draw = (e) => {
    if (e.target.classList.contains("filled")) {
        const tileStyle = window.getComputedStyle(e.target);
        const rgb = tileStyle.backgroundColor;
        const rgbNumbers = rgb.match(/\d+(\.\d+)?/g);
        const newColor = rgbToDarkenedHex(rgbNumbers);
        e.target.style.backgroundColor = `#${newColor}`;
    } else {
        const newColor = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;
        e.target.style.backgroundColor = newColor;
        e.target.classList.add("filled");
    }
    
}

const createGrid = (gridLength) => {
    removeCurrentGrid();
    const totalSquares = gridLength * gridLength;
    const squareLength = (600 / gridLength);
    console.log(squareLength);
    /// Create tile
    for (let a = 1; a <= totalSquares; a++) {
        let tile = document.createElement("div");
        tile.style.width = squareLength + "px";
        tile.style.height = squareLength + "px";
        tile.style.backgroundColor = "white";
        tile.style.margin = "0";
        tile.style.padding = "0";
        tile.classList.add("tile");
        console.log(tile);
        gridOutline.appendChild(tile);
        tile.addEventListener("mouseover", (e) => {
            draw(e);
        })
    }
}

const getNewGridEdge = () => {
    const newSize = Number.parseInt(prompt("How many tiles along the side of the grid (max 100)?"), 10);
    switch (true) {
        case (newSize <= 100 && newSize >= 1) :
            return newSize;
            break;
        default :
            return getNewGridEdge();
            break;
    }
}

newGridBtn.addEventListener("click", (e) => {
    gridEdge = getNewGridEdge();
    createGrid(gridEdge);
})





createGrid(16);

