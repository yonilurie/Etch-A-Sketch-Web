window.onload = () => {
	//Creates grid and appends to container on window load
	createGrid(size);
};

const colorSelector = document.querySelector("input");
const etchContainer = document.querySelector(".etch-container");
let currentColor = colorSelector.value;
let size = 10;

//changes current color whenever the colorpicker value is changed
colorSelector.addEventListener("change", (event) => {
	currentColor = event.target.value;
	console.log(currentColor);
});

// callback for event listener that sets background color of cells
function activated(event) {
	event.target.style.backgroundColor = currentColor;
}

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
	etchContainer.addEventListener("mouseover", activated);
}
