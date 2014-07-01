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
    this.drawText(this.ctx);

    this.canvas.onclick = function(e) {
      console.log(e.offsetX, e.offsetY);
      options.debugX.text(e.offsetX);
      options.debugY.text(e.offsetY);
    };

  };

  TP.drawGradients = function(ctx) {
    ctx.beginPath();
    ctx.rect(20, 20, this.width-40, this.height/2 - 40);
    // By changing size of gradient, get a different angle
    // arguments specify begin and end points of gradient
    // var grad = ctx.createLinearGradient(20, 20, this.width-20, this.height/2 - 20);
    var grad = ctx.createLinearGradient(0, 0, 100, 0);
    ctx.closePath(); // must close path to avoid leaks

    grad.addColorStop(0, '#000000');    // start at black
    grad.addColorStop(1, '#aa0000');    // end at red
    ctx.fillStyle = grad;
    ctx.fill();

    // Now create a radial gradient
    ctx.beginPath();
    ctx.rect(20, this.height/2, this.width-40, this.height/2-20);
    // xcenter/ycenter/radius of first circle, then second circle
    var radGrad = ctx.createRadialGradient(90, 360, 10, 90, 360, 300);
    ctx.closePath();
    radGrad.addColorStop(0, '#ffffff');
    radGrad.addColorStop(1, '#aa0000');
    ctx.fillStyle = radGrad;
    ctx.fill();
  };

  TP.drawText = function(ctx) {
    ctx.fillStyle = '#660000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = 'italic 40px Arial';
    console.log(ctx.measureText('Hello World!'));
    ctx.fillText('Hello World!', 120, 350); // string, xpos, ypos
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
