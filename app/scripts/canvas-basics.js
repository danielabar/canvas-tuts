(function() {

  // Namespace to avoid collisions
  window.TP = {};

  TP.init = function() {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.drawLines(this.ctx);
  };

  TP.drawLines = function(ctx) {
    ctx.strokeStyle = '#990000';
    ctx.beginPath();
    ctx.moveTo(0, this.height / 2);           // "lift up pen and start at..."
    ctx.lineTo(this.width, this.height / 2);
    ctx.moveTo(300, 150);
    ctx.lineTo(200, 100);
    ctx.stroke();
  };

  TP.init();

}).call(this);
