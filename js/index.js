window.onload = () => {
	//Creates grid and appends to container on window load
	createGrid(size);
};

const colorSelector = document.querySelector("input");
const eraser = document.getElementById("eraser-btn");
const resetBtn = document.getElementById("reset-btn");
const sizeSlider = document.getElementById("size-slider");
const sizeText = document.getElementById("size-text");
const rainbowBtn = document.getElementById("rainbow-btn");
//Keeps track of whether or not eraser is on
let rainbowGotToggled = false;
let eraserToggle = false;
let rainbow = false;
let etchContainer = document.querySelector(".etch-container");
let currentColor = colorSelector.value;
let size = sizeSlider.value;
sizeText.innerText = size;

//changes current color whenever the colorpicker value is changed
//also checks if erases was on while color was changes, in which case the eraser is turned off.
colorSelector.addEventListener("change", (event) => {
	currentColor = event.target.value;
	if (eraserToggle) {
		eraserToggler();
	}
	if (rainbow) {
		toggleRainbow();
	}
});

// adds initial event listener to eraser
eraser.addEventListener("click", eraserToggler);

//Turns on eraser
function eraserToggler() {
	if (rainbow) {
		toggleRainbow();
		rainbowGotToggled = true;
		rainbowBtn.style.backgroundImage =
			"linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)";
	}
	//turns eraser on
	if (!eraserToggle) {
		currentColor = "#FFFFFF";
		eraser.setAttribute("class", "active-btn");
		eraserToggle = true;
		//turns eraser off
	} else if (eraserToggle) {
		currentColor = colorSelector.value;
		eraser.removeAttribute("class", "active-btn");
		eraserToggle = false;
		if (rainbowGotToggled) {
			toggleRainbow();
			rainbowGotToggled = false;
		}
	}
	console.log({
		from: "eraser toggler",
		eraserToggle: `${eraserToggle}`,
		rainbow: `${rainbow}`,
		rainbowGotToggled: `${rainbowGotToggled}`,
	});
}

rainbowBtn.addEventListener("click", toggleRainbow);

//Adds event listener to reset btn
resetBtn.addEventListener("click", resetGrid);

//adds event listener to the size slider
//when its value is changed, a new grid is generated
sizeSlider.addEventListener("change", (event) => {
	size = event.target.value;
	resetGrid();
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

function toggleRainbow() {
	if (eraserToggle) {
		eraserToggler();
	}
	if (rainbow) {
		etchContainer.removeEventListener("mouseover", activateRainbow);
		etchContainer.addEventListener("mouseover", activate);
		rainbowBtn.style.backgroundImage = "none";
		rainbowBtn.style.backgroundColor = "#EFEFEF";
		rainbow = false;
	} else {
		etchContainer.removeEventListener("mouseover", activate);
		etchContainer.addEventListener("mouseover", activateRainbow);
		rainbowBtn.style.backgroundImage =
			"linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)";
		rainbow = true;
	}

	console.log({
		from: "rainbow toggler",
		eraserToggle: `${eraserToggle}`,
		rainbow: `${rainbow}`,
		rainbowGotToggled: `${rainbowGotToggled}`,
	});
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
	if (eraserToggle) {
		eraserToggler();
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
