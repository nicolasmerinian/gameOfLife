var Gol = function(size, cellSize) {
	var container = document.getElementById('container');
	this.canvas = document.createElement('canvas');
	this.canvas.setAttribute('width', size);
	this.canvas.setAttribute('height', size);
	this.canvas.style.border = '1px solid #000';
	this.canvas.style.position = 'absolute';
	this.canvas.style.top = '0';
	this.canvas.style.left = '1px';
	this.canvas.id = 'canvas';
	container.appendChild(this.canvas);
	
	this.cellSize = cellSize;
	this.ctx = this.canvas.getContext('2d');
	this.width = this.canvas.width;
	this.height = this.canvas.height;
}

Gol.prototype.draw = function draw() {
	this.clear();
	this.drawBoard();
}

Gol.prototype.clear = function draw() {
	this.ctx.clearRect(0, 0, this.width, this.height);
}

Gol.prototype.drawBoard = function drawBoard() {
	this.ctx.fillStyle = '#fff';
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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

var gol = new Gol(200, 40);
gol.draw();