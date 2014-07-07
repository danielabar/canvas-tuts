'use strict';

(function() {

  window.TP = {};

  TP.init = function() {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.shapeList = [];
    this.moveHandler = null;
    this.upHandler = null;

    this.generateRandomSquares();
    this.setupEvents();
    this.render();
  };

  TP.generateRandomSquares = function() {
    for (var i = 0; i < 20; i++) {
      var randX = Math.floor(Math.random()*this.width);   // rand x pos between 0 and width of canvas
      var randY = Math.floor(Math.random()*this.height);  // rand y pos between 0 and height of canvas
      var randSize = Math.floor(Math.random()*60)+20;     // rand size between 20 and 80
      var square = new TP.Square(randX, randY, randSize, this.ctx);
      this.shapeList.push(square);
    }
  };

  TP.setupEvents = function() {
    var self = this;
    this.canvas.addEventListener('mousedown', function(e) {
      self.startDrag(e);
    });
  };

  TP.startDrag = function(e) {
    var self = this;

    var shapes = this.getShapesAtXY(e.offsetX, e.offsetY);
    // mark the last element in the array the 'selected' one
    if (shapes.length > 0) {
      var selectedShape = shapes[shapes.length-1];
      selectedShape.selected = true;

      // Defining handlers here makes it easier to manage scope
      // This will get triggerred many many times, as user is moving the mouse
      this.moveHandler = function(e) {
        self.dragShape(selectedShape, e.offsetX, e.offsetY);
      };

      this.upHandler = function() {
        self.stopDrag(selectedShape);
      };

      // addEventListener more powerful than 'on' because we can cancel the event, given that same handler is provided
      this.canvas.addEventListener('mousemove', this.moveHandler, false);
      this.canvas.addEventListener('mouseup', this.upHandler, false);
    }
  };

  TP.dragShape = function(shape, x, y) {
    shape.x = x - shape.size/2;  // dragging object from middle, not edge
    shape.y = y - shape.size/2;
    this.render();   // re-render entire canvas
  };

  TP.stopDrag = function(shape) {
    shape.selected = false;
    shape.render();

    // cancel the mouse listeners
    this.canvas.removeEventListener('mousemove', this.moveHandler, false);
    this.canvas.removeEventListener('mouseup', this.upHandler, false);
  };

  // Given a point on the canvas, determine which suares are overlapping it
  TP.getShapesAtXY = function(x, y) {
    var validShapes = [];
    for(var index in this.shapeList) {
      var shape = this.shapeList[index];
      var startX = shape.x;
      var endX = shape.x + shape.size;
      var startY = shape.y;
      var endY = shape.y + shape.size;
      if (x >= startX && x <= endX && y >= startY && y <= endY) {
        validShapes.push(shape);
      }
    }
    return validShapes;
  };

  TP.render = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
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
    this.selected = false;
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
    this.renderSelected();
  };

  TP.Square.prototype.renderSelected = function() {
    if (this.selected) {
      this.ctx.strokeStyle = '#FF0000';
      this.ctx.lineWidth = 8;
      this.ctx.stroke();
    }
  };

  TP.init();

})();
