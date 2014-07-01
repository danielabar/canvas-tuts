'use strict';

(function() {

  // Namespace to avoid collisions
  window.TP = {};

  TP.init = function(options) {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.drawCurves(this.ctx);

    this.canvas.onclick = function(e) {
      console.log(e.offsetX, e.offsetY);
      options.debugX.text(e.offsetX);
      options.debugY.text(e.offsetY);
    };

  };

  TP.drawCurves = function(ctx) {
    this.drawQuadraticCurve(ctx);
    this.drawBezierCurve(ctx);
    this.drawAndFill(ctx);
  };

  TP.drawQuadraticCurve = function(ctx) {
    ctx.beginPath();
    ctx.moveTo(90, 116);
    ctx.quadraticCurveTo(190, 0, 300, 130);
    this.setLineStyle(ctx, 15, '#990000');
    ctx.stroke();
  };

  TP.drawBezierCurve = function(ctx) {
    ctx.beginPath();
    ctx.moveTo(60, 250);
    ctx.bezierCurveTo(90, 155, 305, 160, 330, 260);
    this.setLineStyle(ctx, 15, '#009900');
    ctx.stroke();
  };

  // Draw two triangles, one inside the other,
  // In this case, inner triangle carves hole out of outer triangle
  // because canvas uses non-zero rule (see wiki)
  // order of drawing points matter, change in order changes how shape is filled
  TP.drawAndFill = function(ctx) {
    ctx.beginPath();
    ctx.moveTo(100, 320);
    ctx.lineTo(90, 492);
    ctx.lineTo(320, 430);
    ctx.lineTo(100, 320);
    ctx.moveTo(125, 360);
    ctx.lineTo(255, 425);
    ctx.lineTo(120, 455);
    ctx.lineTo(125, 360);
    ctx.closePath();

    this.fillShape(ctx, '#009900');
    this.setLineStyle(ctx, 10, '#990000');
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

  TP.init({
    debugX: $('.canvas-debug-widget #canvasX'),
    debugY: $('.canvas-debug-widget #canvasY')
  });

})();
