'use strict';

(function() {

  // Namespace to avoid collisions
  window.TP = {};

  TP.init = function(options) {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.drawGradients(this.ctx);

    this.canvas.onclick = function(e) {
      console.log(e.offsetX, e.offsetY);
      options.debugX.text(e.offsetX);
      options.debugY.text(e.offsetY);
    };

  };

  TP.drawGradients = function(ctx) {
    ctx.beginPath();
    ctx.rect(20, 20, this.width-40, this.height/2 - 40);
    var grad = ctx.createLinearGradient(20, 20, this.width-20, this.height/2 - 20);
    ctx.closePath(); // must close path to avoid leaks

    grad.addColorStop(0, '#000000');  // start at black
    grad.addColorStop(1, '#aa0000');  // end at red
    ctx.fillStyle = grad;
    ctx.fill();
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
