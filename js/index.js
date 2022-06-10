window.onload = () => {
	//Creates grid and appends to container on window load
	createGrid(size);
};

const colorSelector = document.querySelector("input");
const eraserBtn = document.getElementById("eraser-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const resetBtn = document.getElementById("reset-btn");
const sizeSlider = document.getElementById("size-slider");
const sizeText = document.getElementById("size-text");
//Keeps track of whether or not eraser is on
let pause = false;
let eraser = false;
let rainbow = false;
let pausedRainbow = false;
let etchContainer = document.querySelector(".etch-container");
//Pause button attribute
// etchContainer.setAttribute("listener", "true");
//
let currentColor = colorSelector.value;
let size = sizeSlider.value;
sizeText.innerText = size;

document.addEventListener("keydown", (event) => {
	if (event.code === "KeyP") togglePause();
});

function togglePause() {
	switch (rainbow) {
		case true:
			if (etchContainer.getAttribute("rainbow")) {
				etchContainer.removeEventListener("mouseover", activateRainbow);
				etchContainer.removeAttribute("rainbow", "true");
			} else {
				etchContainer.addEventListener("mouseover", activateRainbow);
				etchContainer.setAttribute("rainbow", "true");
			}
			break;

		default:
			if (etchContainer.getAttribute("listener")) {
				etchContainer.removeEventListener("mouseover", activate);
				etchContainer.removeAttribute("listener", "true");
			} else {
				etchContainer.addEventListener("mouseover", activate);
				etchContainer.setAttribute("listener", "true");
			}
			break;
	}
}

//changes current color whenever the colorpicker value is changed
//also checks if erases was on while color was changes, in which case the eraser is turned off.
colorSelector.addEventListener("change", (event) => {
	currentColor = event.target.value;
	if (eraser) toggleEraser();
	if (rainbow) toggleRainbow();
});

// adds initial event listener to eraser
eraserBtn.addEventListener("click", toggleEraser);

rainbowBtn.addEventListener("click", toggleRainbow);

//Adds event listener to reset btn
resetBtn.addEventListener("click", resetGrid);

//adds event listener to the size slider
//when its value is changed, a new grid is generated
sizeSlider.addEventListener("change", (event) => {
	size = event.target.value;
	resetGrid();
	// if (rainbow) toggleRainbow()
	if (eraser) toggleEraser();
});

//Changes innertext of span next to size slider to indicate size
sizeSlider.addEventListener("input", (event) => {
	sizeText.innerText = event.target.value;
});

// callback for event listener that sets background color of cells
function activate(event) {
	event.target.style.backgroundColor = currentColor;
}

function activateRainbow(event) {
	event.target.style.backgroundColor = generateRGB();
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
	if (rainbow) {
		etchContainer.removeEventListener("mouseover", activate);
		etchContainer.addEventListener("mouseover", activateRainbow);
	}
}

//Creates a random rgb value for the rainbow color option
function generateRGB() {
	let RGBCode = [];
	for (let i = 0; i < 3; i++) {
		let randNum = Math.floor(Math.random() * 255);
		RGBCode.push(randNum);
	}
	return "rgb(" + RGBCode.join(",") + ")";
}

//deletes old grid and create new one
function resetGrid() {
	etchContainer.remove();
	let newGridContainer = document.createElement("div");
	newGridContainer.setAttribute("class", "etch-container");
	document
		.querySelector(".etch-flex-container")
		.appendChild(newGridContainer);
	etchContainer = document.querySelector(".etch-container");
	createGrid();
}

//Toggles the eraser
function toggleEraser() {
	//turns eraser on
	if (!eraser) {
		currentColor = "#FFFFFF";
		eraserBtn.setAttribute("class", "active-btn");
		eraser = true;
		if (rainbow) toggleRainbow();

		//turns eraser off
	} else if (eraser) {
		currentColor = colorSelector.value;
		eraserBtn.removeAttribute("class", "active-btn");
		eraser = false;
	}
}
//toggles the rainbow
function toggleRainbow() {
	//this runs if the rainbow is off
	if (!rainbow) {
		etchContainer.removeEventListener("mouseover", activate);
		etchContainer.addEventListener("mouseover", activateRainbow);
		rainbowBtn.setAttribute("class", "active-rainbow");
		rainbow = true;
		etchContainer.setAttribute("rainbow", "true");
		//when turning on the rainbow, the eraser is turned off
		if (eraser) toggleEraser();
		//this runs if the rainbow is on
	} else {
		etchContainer.removeEventListener("mouseover", activateRainbow);
		etchContainer.addEventListener("mouseover", activate);
		rainbowBtn.removeAttribute("class", "active-rainbow");
		rainbow = false;
		etchContainer.removeAttribute("rainbow", "true");
	}
}
