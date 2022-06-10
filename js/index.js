window.addEventListener("DOMContentLoaded", () => {
	createGrid(size);
	document.addEventListener("keydown", (e) => {
		if (e.code === "KeyP") togglePause();
	});
});

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

colorSelector.addEventListener("change", changeColor);
eraserBtn.addEventListener("click", toggleEraser);
rainbowBtn.addEventListener("click", toggleRainbow);
resetBtn.addEventListener("click", resetGrid);
sizeSlider.addEventListener("change", changeGridSize);
sizeSlider.addEventListener("input", (e) => {
	sizeText.innerText = e.target.value;
});

function activate(event) {
	event.target.style.backgroundColor = currentColor;
}

function activateRainbow(event) {
	event.target.style.backgroundColor = generateRGB();
}

function changeColor(e) {
	currentColor = e.target.value;
	if (eraser) toggleEraser();
	if (rainbow) toggleRainbow();
}

function changeGridSize(e) {
	size = e.target.value;
	resetGrid();
	if (eraser) toggleEraser();
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

//deletes old grid and create new one
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
