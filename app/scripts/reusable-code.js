'use strict';

(function() {

  // Namespace to avoid collisions
  window.TP = {};

  TP.init = function() {
    var self = this;

    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    // keep track of all the shapes on TP
    this.shapeList = [];

    canvas.onclick = function(e) {
      var square = new TP.Square(e.offsetX, e.offsetY, 40, self.ctx);
      square.render();
      self.shapeList.push(square);
    };
  };

  // Clear out the entire canvas and re-render all the shapes
  TP.render = function() {
    this.ctx.clearRect(0, 0, this.width, this.height); // clear it out
    for(var index in this.shapeList) {
      this.shapeList[index].render();
    }
  };

  TP.Square = function(x, y, size, ctx) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
    this.color = '#' + Math.floor(Math.random()*16777215).toString(16);
  };

  TP.Square.prototype.move = function(newX, newY) {
    this.x = newX;
    this.y = newY;
  };

  TP.Square.prototype.render = function() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.size, this.size);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  };

  TP.init();

})();
