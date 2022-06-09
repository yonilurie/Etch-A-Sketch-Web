window.onload = () => {
	//Creates grid and appends to container on window load
	createGrid(size);
};

const colorSelector = document.querySelector("input");
const eraser = document.getElementById("eraser-btn");
const resetBtn = document.getElementById("reset-btn");
const sizeSlider = document.getElementById("size-slider");
const sizeText = document.getElementById("size-text");
//Keeps track of whether or not eraser is on
let eraserToggle = false;
let etchContainer = document.querySelector(".etch-container");
let currentColor = colorSelector.value;
let size = sizeSlider.value;
sizeText.innerText = size;

//changes current color whenever the colorpicker value is changed
//also checks if erases was on while color was changes, in which case the eraser is turned off.
colorSelector.addEventListener("change", (event) => {
	currentColor = event.target.value;
	if (eraserToggle) {
		eraserToggleOff();
	}
});

// adds initial event listener to eraser
eraser.addEventListener("click", eraserToggleOn);

//Turns on eraser
function eraserToggleOn() {
	currentColor = "#FFFFFF";
	eraser.addEventListener("click", eraserToggleOff);
	eraser.removeEventListener("click", eraserToggleOn);
	eraser.style.backgroundColor = "pink"
	eraserToggle = true;
}
//turns off eraser
function eraserToggleOff() {
	currentColor = colorSelector.value;
	eraser.addEventListener("click", eraserToggleOn);
	eraser.removeEventListener("click", eraserToggleOff);
	eraser.style.backgroundColor = "buttonface"
	eraserToggle = false;
}

//Adds event listener to reset btn
resetBtn.addEventListener("click", resetGrid);

//adds event listener to the size slider
//when its value is changed, a new grid is generated
sizeSlider.addEventListener("change", (event) => {
	size = event.target.value;
	resetGrid();
});

//Changes innertext of span next to size slider to indicate size
// sizeSlider.addEventListener("input", (event) => {
// 	sizeText.innerText = event.target.value;
// });

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
	if (eraserToggle) {
		eraserToggleOff();
	}
	etchContainer.remove();
	let newGridContainer = document.createElement("div");
	newGridContainer.setAttribute("class", "etch-container");
	document
		.querySelector(".etch-flex-container")
		.appendChild(newGridContainer);
	etchContainer = document.querySelector(".etch-container");
	createGrid();
}
