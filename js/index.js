window.onload = () => {
	//Creates grid and appends to container on window load
	createGrid(size);
};

const colorSelector = document.querySelector("input");
let etchContainer = document.querySelector(".etch-container");
const resetBtn = document.getElementById("reset-btn");
const sizeSlider = document.getElementById("size-slider")
console.log(sizeSlider)
let currentColor = colorSelector.value;
let size = sizeSlider.value;

//changes current color whenever the colorpicker value is changed
colorSelector.addEventListener("change", (event) => {
	currentColor = event.target.value;
});

//Adds event listener to reset btn
resetBtn.addEventListener("click", resetGrid);

// callback for event listener that sets background color of cells
function activate(event) {
	event.target.style.backgroundColor = currentColor;
}

//generates grid with dimensions of size by size, and appends to etch-container
function createGrid() {
	for (let i = 0; i < size * size; i++) {
		const cell = document.createElement("div");
		cell.setAttribute("class", "cell");
		etchContainer.appendChild(cell);
	}
	etchContainerDimensions();
}

//Sets dimension of etch container
function etchContainerDimensions() {
	etchContainer.style.gridTemplateRow = `repeat(${size}, 1fr)`;
	etchContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	etchContainer.addEventListener("mouseover", activate);
}

//deletes old grid and create new one
function resetGrid() {
	etchContainer.remove();
	let newGridContainer = document.createElement("div");
	newGridContainer.setAttribute("class", "etch-container");
    document.querySelector(".main-container").appendChild(newGridContainer);
    etchContainer = document.querySelector(".etch-container");
    createGrid()
}
