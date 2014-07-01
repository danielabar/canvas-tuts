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

    this.shapeList = [];

    canvas.onclick = function(e) {
      var square = new TP.Square(e.offsetX, e.offsetY, 40, self.ctx);
      square.render();
      self.shapeList.push(square);
    };
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
