window.onload = () => {
createGrid(size);
}

const etchContainer = document.querySelector(".etch-container");
etchContainer.style.gridTemplateRow = "repeat(10, 1fr)"
etchContainer.style.gridTemplateColumns = "repeat(10, 1fr)"
let size = 10;

function createGrid(size) {
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.setAttribute("class","cell")
			etchContainer.appendChild(cell);
		}
	}
}
