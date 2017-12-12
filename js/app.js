var Gol = function(width, height) {
	var container = document.getElementById('container');
	this.canvas = document.createElement('canvas');
	this.canvas.setAttribute('width', width);
	this.canvas.setAttribute('height', height);
	this.canvas.style.border = '1px solid #000';
	this.canvas.style.position = 'absolute';
	this.canvas.style.top = '0';
	this.canvas.style.left = '1px';
	this.canvas.id = 'canvas';
	container.appendChild(this.canvas);
	
	this.ctx = this.canvas.getContext('2d');
	this.width = this.canvas.width;
	this.height = this.canvas.height;
}

new Gol(200, 200);