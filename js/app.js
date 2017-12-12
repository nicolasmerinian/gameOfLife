var Gol = function(rowAndColNumber, cellSize, i) {
	this.rowAndColNumber = rowAndColNumber;
	this.cellSize = cellSize;
	this.interval = i;
	this.cellSize = cellSize;
	this.createCanvas();
	this.ctx = this.canvas.getContext('2d');
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.init();
}

Gol.prototype.createCanvas = function createCanvas() {
	var container = document.getElementById('container');
	this.canvas = document.createElement('canvas');
	this.canvas.setAttribute('width', this.rowAndColNumber * this.cellSize);
	this.canvas.setAttribute('height', this.rowAndColNumber * this.cellSize);
	this.canvas.style.border = '1px solid #000';
	this.canvas.style.position = 'absolute';
	this.canvas.style.top = '0';
	this.canvas.style.left = '1px';
	this.canvas.id = 'canvas';
	container.appendChild(this.canvas);
}

Gol.prototype.init = function init() {
	this.timer = null;
	this.cells = null;
	this.cellsOld = null;
	this.steps = 0;
	this.cellColor = ['#FFF', '#AAA', '#AEE489', '#22BB38'];
	this.cellState = { 'DEAD': 0, 'DYING': 1, 'BIRTH': 2, 'ALIVE': 3 };
	this.initCells();
	this.run();
}

Gol.prototype.initCells = function initCells() {
	this.cells = [];
	var subArray;
	for (var j = 0; j < this.height / this.cellSize; j++) {
		subArray = [];
		for (var i = 0; i < this.width / this.cellSize; i++) {
			subArray.push(0);
		}
		this.cells.push(subArray);
	}
	var rand;
	for (var i = 0; i < this.cells.length; i++) {
		for (var j = 0; j < this.cells[i].length; j++) {
			rand = Math.random();
			rand < 0.5 ? this.cells[i][j] = 0 : this.cells[i][j] = 3;
		}
	}
}

Gol.prototype.run = function run() {
	var self = this;
	this.draw();
	this.calc();
	this.steps += 1;
	this.timer = setTimeout(function() {
		self.run();
	}, this.interval);
}

Gol.prototype.draw = function draw() {
	this.clear();
	this.drawCells();
	this.drawBoard();
}

Gol.prototype.clear = function clear() {
	this.ctx.fillStyle = '#fff';
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

Gol.prototype.drawBoard = function drawBoard() {
	this.ctx.strokeStyle = '#000';
	this.ctx.beginPath();
	for (var i = 0; i < this.width / this.cellSize; i++) {
		this.ctx.moveTo(i * this.cellSize, 0);
		this.ctx.lineTo(i * this.cellSize, this.height);
	}
	for (var j = 0; j < this.height / this.cellSize; j++) {
		this.ctx.moveTo(0, j * this.cellSize);
		this.ctx.lineTo(this.width, j * this.cellSize);
	}
	this.ctx.closePath();
	this.ctx.stroke();
}

Gol.prototype.drawCells = function drawCells() {
	var currentCellValue;
	for (var j = 0; j < this.cells.length; j++) {
		for (var i = 0; i < this.cells[j].length; i++) {
			currentCellValue = this.cells[j][i];
			this.drawCell(i, j, this.cellColor[currentCellValue]);
		}
	}
}

Gol.prototype.drawCell = function drawCell(x, y, color) {
	var cx = x * this.cellSize;
	var cy = y * this.cellSize;
	this.ctx.fillStyle = color;
	this.ctx.fillRect(cx, cy, this.cellSize, this.cellSize);
}

Gol.prototype.calc = function calc() {
	var neightboursNumber;

	this.prepareData();
	
	for (var j = 0; j < this.cellsOld.length; j++) {
		for (var i = 0; i < this.cellsOld[j].length; i++) {
			neightboursNumber = this.getNeighboursNumber(j, i);
			if (this.cellsOld[j][i] === this.cellState.DYING) {
				this.cells[j][i] = this.cellState.DEAD;
			}
			else if (this.cellsOld[j][i] === this.cellState.BIRTH) {
				this.cells[j][i] = this.cellState.ALIVE;
			}
			
			if (this.isAlive(i, j)) {
				if (neightboursNumber < 2 || neightboursNumber > 3) {
					this.cells[j][i] = this.cellState.DYING;
				}
			}
			else {
				if (neightboursNumber === 3) {
					this.cells[j][i] = this.cellState.BIRTH;
				}
			}
		}
	}
}

Gol.prototype.prepareData = function prepareData() {
	this.cellsOld = [];
	var subArray;
	for (var j = 0; j < this.height / this.cellSize; j++) {
		subArray = [];
		for (var i = 0; i < this.width / this.cellSize; i++) {
			subArray.push(0);
		}
		this.cellsOld.push(subArray);
	}
	for (var j = 0; j < this.cellsOld.length; j++) {
		for (var i = 0; i < this.cellsOld[j].length; i++) {
			this.cellsOld[j][i] = this.cells[j][i];
		}
	}
}

Gol.prototype.getNeighboursNumber = function getNeighboursNumber(j, i) {
	var numberOfNeightbours = 0;
	var neightbourValue;
	// Top left
	if (i - 1 >= 0 && j - 1 >= 0) {
		if (this.isAlive(i - 1, j - 1)) {
			numberOfNeightbours += 1;
		}
	}
	// Top
	if (j - 1 >= 0) {
		if (this.isAlive(i, j - 1)) {
			numberOfNeightbours += 1;
		}
	}
	// Top right
	if (i + 1 < this.width / this.cellSize && j - 1 >= 0) {
		if (this.isAlive(i + 1, j - 1)) {
			numberOfNeightbours += 1;
		}
	}
	// Center left
	if (i - 1 >= 0) {
		if (this.isAlive(i - 1, j)) {
			numberOfNeightbours += 1;
		}
	}
	// No center
	// Center right
	if (i + 1 <= this.width / this.cellSize) {
		if (this.isAlive(i + 1, j)) {
			numberOfNeightbours += 1;
		}
	}
	// Bottom left
	if (i - 1 >= 0 && j + 1 < this.height / this.cellSize) {
		if (this.isAlive(i - 1, j + 1)) {
			numberOfNeightbours += 1;
		}
	}
	// Bottom
	if (j + 1 < this.height / this.cellSize) {
		if (this.isAlive(i, j + 1)) {
			numberOfNeightbours += 1;
		}
	}
	// Bottom right
	if (i + 1 <= this.width / this.cellSize && j + 1 < this.height / this.cellSize) {
		if (this.isAlive(i + 1, j + 1)) {
			numberOfNeightbours += 1;
		}
	}
	return numberOfNeightbours;
}

Gol.prototype.isAlive = function isAlive(i, j) {
	var cellValue = this.cellsOld[j][i];
	return cellValue === this.cellState.BIRTH || cellValue === this.cellState.ALIVE;
}


var gol = new Gol(20, 10, 250);




















gol.draw();