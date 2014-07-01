(function() {

  // Namespace to avoid collisions
  window.TP = {};

  TP.init = function(options) {
    var self = this;
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.draw(this.ctx);

    this.canvas.onclick = function(e) {
      options.debugX.text(e.layerX);
      options.debugY.text(e.layerY);
    };

  };

  TP.draw = function(ctx) {

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

}).call(this);
