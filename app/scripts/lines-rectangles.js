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
    this.drawTriangle(this.ctx);
    this.drawRectangle(this.ctx);
    this.drawCircle(this.ctx);

    this.canvas.onclick = function() {
      self.clearCanvas();
    };
  };

  TP.clearCanvas = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  };

  TP.drawTriangle = function(ctx) {
    ctx.beginPath();
    ctx.moveTo(50, this.height / 2);
    ctx.lineTo(this.width-50, this.height / 2);
    ctx.lineTo(200, 50);
    ctx.closePath();  // draws final line from start point to end point
    this.setLineStyle(ctx, 20, '#990000');
    this.fillShape(ctx, '660000');
    ctx.stroke();     // must be called AFTER closePath() and fill()
  };

  TP.drawRectangle = function(ctx) {
    ctx.beginPath();
    ctx.rect(70, 320, 200, 160);  // starting x pos, starting y pos, width, height
    this.setLineStyle(ctx, 10, '#000066', 'round', 'round');
    this.fillShape(ctx, '#000099');
    ctx.stroke();
  };

  TP.drawCircle = function(ctx) {
    ctx.beginPath();
    // centerX, centerY, radius, startingRadians, endRadians, anticlockwise true/false
    // 2*Math.PI = 360 degrees
    // 1*Math.PI = 180 degrees (so from 0 to 180 yields a semi-circle)
    // 0.5*Math.PI = 45 degrees (arc, but by default, fill will only go between the points)
    ctx.arc(this.width/2, this.height/2, 70, 0, 0.5*Math.PI, false);
    // to make fill the entire quarter
    ctx.lineTo(this.width/2, this.height/2);
    ctx.closePath();
    this.setLineStyle(ctx, 5, '#006600');
    this.fillShape(ctx, 'rgba(0, 128, 0, 0.5)'); // red, green, blue, opacity or alpha number
    ctx.stroke();
  };

  TP.setLineStyle = function(ctx, width, color, cap, join) {
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.lineCap = cap || 'butt';
    ctx.lineJoin = join || 'miter';
  };

  TP.fillShape = function(ctx, color) {
    ctx.fillStyle = color;
    ctx.fill();
  };

  TP.init();

})();
