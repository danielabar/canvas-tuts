'use strict';

(function() {

  window.TP = {};

  TP.init = function() {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.registerHandlers();
    // this.draw(this.ctx);
    this.drawTransform(this.ctx);
    this.drawOval(this.ctx);
    // this.mirror(this.ctx);
  };

  TP.registerHandlers = function() {
    var self = this;
    $('#doit').on('click', function() {
      self.doIt(self.ctx);
    });
  };

  TP.doIt = function(ctx) {
    ctx.restore();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);

    this.squareMiddle(ctx);

    for (var i=1; i<=180; i++) {
      ctx.rotate(i * Math.PI / 180);
      this.squareMiddle(ctx);
    }
  };

  TP.squareMiddle = function(ctx) {
    ctx.beginPath();
    ctx.rect(this.width/2 - 50, this.height/2 - 50, 100, 100);
    ctx.fillStyle = '#000099';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  TP.draw = function(ctx) {

    // save original context before we start messing with it
    ctx.save();

    // translate entire context by 100px on x and y axes
    // i.e. new starting point is 100/100
    ctx.translate(100, 100);

    // rotate context by 20 degrees (arg is in radians, so convert to degrees using Math.PI)
    ctx.rotate(20 * Math.PI / 180);

    // make context twice as wide in x direction, while keeping y the same
    ctx.scale(2, 1);

    // now draw a blue square - it will be translated, rotated, and scaled as per above
    ctx.fillStyle = '#000099';
    ctx.fillRect(0, 0, 100, 100);

    // now restore the context and draw another square, this time in red
    ctx.restore();
    ctx.fillStyle = '#990000';
    ctx.fillRect(0, 0, 100, 100);
  };

  TP.drawTransform = function(ctx) {
    var horizontalScale = 2;
    var horizontalSkew = 0.75;
    var verticalSkew = 0.5;
    var verticalScale = 1;
    var translateX = 0;
    var translateY = 0;

    ctx.transform(
      horizontalScale, horizontalSkew,
      verticalSkew, verticalScale,
      translateX, translateY
    );

    // draw a green rectangle, affected by above transformation
    ctx.fillStyle = '#009900';
    ctx.fillRect(0, 0, 100, 100);

    // reset
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // this red square will not be affected by any transform because of reset above
    // ctx.fillStyle = '#990000';
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(0, 0, 100, 100);
  };

  // Scales and Transforms can be used to draw an oval
  TP.drawOval = function(ctx) {

    // translate the canvas first, so that we can use 0,0 for x,y of oval
    ctx.translate(100, 100);

    // stretch out the horizontal axies
    ctx.scale(2, 1);

    // start drawing...
    ctx.beginPath();

    // an arc with radius of 40 degrees (but will be stretched out)
    ctx.arc(0, 0, 40, 0, 2 * Math.PI, false);

    // now fill it in
    ctx.fillStyle = '#009999';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();
  };

  TP.mirror = function(ctx) {
    ctx.translate(200, 200);
    ctx.rotate(20 * Math.PI / 180);
    ctx.scale(2, 1);
    ctx.fillStyle = '#000099';
    ctx.fillRect(0, 0, 100, 100);

    ctx.scale(-1, -1);
    ctx.fillStyle = '#000099';
    ctx.fillRect(0, 0, 100, 100);
  };

  TP.init();

})();
