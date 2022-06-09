window.onload = () => {
	createGrid(size);
};

const etchContainer = document.querySelector(".etch-container");
let size = 15;
etchContainer.style.gridTemplateRow = `repeat(${size}, 1fr)`;
etchContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
etchContainer.addEventListener("mouseover", activated);

function createGrid(size) {
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			const cell = document.createElement("div");
			cell.setAttribute("class", "cell");
			etchContainer.appendChild(cell);
		}
	}
}

function activated(event) {
	event.target.setAttribute("class", "cell activated")
}
