export default class Grid {
	constructor(size, currentColor) {
		this.size = size;
		this.currentColor = currentColor;
		this.storedColor;
		this.pause = false;
		this.eraserOn = false;
		this.etch = document.querySelector(".etch-container");
		this.rainbow = false;
	}

	createGrid() {
		const etchContainer = document.querySelector(".etch-container");
		for (let i = 0; i < this.size * this.size; i++) {
			const cell = document.createElement("div");
			cell.setAttribute("class", "cell");
			etchContainer.appendChild(cell);
		}
		etchContainer.style.gridTemplateRow = `repeat(${this.size}, 1fr)`;
		etchContainer.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;
	}

	//generate rgb
	generateRGB() {
		let RGBCode = [];
		for (let i = 0; i < 3; i++) {
			let randNum = Math.floor(Math.random() * 255);
			RGBCode.push(randNum);
		}
		return "rgb(" + RGBCode.join(",") + ")";
	}

	toggleEraser(cb1, cb2) {
		if (this.rainbow) {
			this.toggleRainbow(cb1, cb2);
		}
		const eraser = document.getElementById("eraser-btn");
		if (!this.eraserOn) {
			this.eraserOn = true;
			this.storedColor = this.currentColor;
			this.currentColor = "rgb(255,255,255)";
			eraser.setAttribute("class", "active-btn");
		} else {
			this.eraserOn = false;
			this.currentColor = this.storedColor;
			this.storedColor = "";
			eraser.removeAttribute("class", "active-btn");
		}
	}

	toggleRainbow(activate, activateRainbow) {
		// this.currentColor = this.generateRGB();
		const etchContainer = document.querySelector(".etch-container");
		const rainbowBtn = document.getElementById("rainbow-btn");
		console.log(etchContainer);
		if (!this.rainbow) {
			if (this.eraserOn) this.toggleEraser();
			etchContainer.removeEventListener("mouseover", activate);
			etchContainer.addEventListener("mouseover", activateRainbow);
			rainbowBtn.setAttribute("class", "active-rainbow");
			this.rainbow = true;
		} else {
			etchContainer.removeEventListener("mouseover", activateRainbow);
			etchContainer.addEventListener("mouseover", activate);
			rainbowBtn.removeAttribute("class", "active-rainbow");
			this.rainbow = false;
		}
	}
}
