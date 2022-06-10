window.addEventListener("DOMContentLoaded", () => {
	createGrid(size);
	document.addEventListener("keydown", (e) => {
		if (e.code === "KeyP") togglePause();
	});
});
// All DOM elements and variables
const colorSelector = document.querySelector("input");
const eraserBtn = document.getElementById("eraser-btn");
const pause = document.getElementById("pause");
const rainbowBtn = document.getElementById("rainbow-btn");
const resetBtn = document.getElementById("reset-btn");
const sizeSlider = document.getElementById("size-slider");
const sizeText = document.getElementById("size-text");
let etchContainer = document.querySelector(".etch-container");
let eraser = false;
let rainbow = false;
let currentColor = colorSelector.value;
let size = sizeSlider.value;
sizeText.innerText = size;

//Initial event listeners added to DOM elements
colorSelector.addEventListener("change", changeColor);
eraserBtn.addEventListener("click", toggleEraser);
rainbowBtn.addEventListener("click", toggleRainbow);
resetBtn.addEventListener("click", resetGrid);
sizeSlider.addEventListener("change", changeGridSize);
sizeSlider.addEventListener("input", (e) => {
	sizeText.innerText = e.target.value;
});

//Functions
//Colors in cell on mouseover with current color in color variable
function activate(event) {
	event.target.style.backgroundColor = currentColor;
}

//Colors in cell on mouseover with randomly generated number
function activateRainbow(event) {
	event.target.style.backgroundColor = generateRGB();
}

//When the user changes the value of the color input
// this will change the color variable
function changeColor(e) {
	currentColor = e.target.value;
	if (eraser) toggleEraser();
	if (rainbow) toggleRainbow();
}

//When the user resizes the grid using the range input,
//creates new grid and replaces old grid
//The size variable is also updated
function changeGridSize(e) {
	size = e.target.value;
	resetGrid();
	if (eraser) toggleEraser();
}

//Dynamically creates grid with size of 'size * size'
//and adds event listener and grid styling
function createGrid() {
	for (let i = 0; i < size * size; i++) {
		const cell = document.createElement("div");
		cell.setAttribute("class", "cell");
		etchContainer.appendChild(cell);
	}
	etchContainer.style.gridTemplateRow = `repeat(${size}, 1fr)`;
	etchContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	etchContainer.addEventListener("mouseover", activate);
	if (rainbow) {
		removeAddMouseOverEventListener(activate, activateRainbow);
	}
}

//Creates and returns a random rgb value for the rainbow color option
function generateRGB() {
	let RGBCode = [];
	for (let i = 0; i < 3; i++) {
		let randNum = Math.floor(Math.random() * 255);
		RGBCode.push(randNum);
	}
	return "rgb(" + RGBCode.join(",") + ")";
}

//callback function for pause event listener
//toggles cursor changing grid cells
//also reveals pause icon in options tab when active
function pauseRemoveListeners(attribute, cb) {
	if (etchContainer.getAttribute(`${attribute}`)) {
		etchContainer.removeEventListener("mouseover", cb);
		etchContainer.removeAttribute(`${attribute}`, "true");
		pause.style.display = "inline";
	} else {
		etchContainer.addEventListener("mouseover", cb);
		etchContainer.setAttribute(`${attribute}`, "true");
		pause.style.display = "none";
	}
}

//removes one event listener and adds another event listener
//from an element
function removeAddMouseOverEventListener(cb1, cb2) {
	etchContainer.removeEventListener("mouseover", cb1);
	etchContainer.addEventListener("mouseover", cb2);
}

//deletes old grid and create new empty one
function resetGrid() {
	etchContainer.remove();
	let newGridContainer = document.createElement("div");
	newGridContainer.setAttribute("class", "etch-container");
	let flexContainer = document.querySelector(".etch-flex-container");
	flexContainer.appendChild(newGridContainer);
	etchContainer = document.querySelector(".etch-container");
	createGrid();
}

//Toggles the eraser
function toggleEraser() {
	if (!eraser) {
		currentColor = "#FFFFFF";
		eraserBtn.setAttribute("class", "active-btn");
		eraser = true;
		if (rainbow) toggleRainbow();
	} else if (eraser) {
		currentColor = colorSelector.value;
		eraserBtn.removeAttribute("class", "active-btn");
		eraser = false;
	}
}

//toggles the pause
function togglePause() {
	switch (rainbow) {
		case true:
			pauseRemoveListeners("rainbow", activateRainbow);
			break;

		default:
			pauseRemoveListeners("listener", activate);
			break;
	}
}

//toggles the rainbow
function toggleRainbow() {
	if (!rainbow) {
		if (eraser) toggleEraser();
		rainbow = true;
		removeAddMouseOverEventListener(activate, activateRainbow);
		etchContainer.setAttribute("rainbow", "true");
		rainbowBtn.setAttribute("class", "active-rainbow");
	} else {
		rainbow = false;
		removeAddMouseOverEventListener(activateRainbow, activate);
		etchContainer.removeAttribute("rainbow", "true");
		rainbowBtn.removeAttribute("class", "active-rainbow");
	}
}
