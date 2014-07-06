'use strict';

(function() {

  window.TP = {};

  TP.init = function() {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.draw(this.ctx);
  };

  TP.draw = function(ctx) {

    // Save the context so we can later draw outside the clipping path
    ctx.save();

    // Draw a big circle starting at 0,0 with width 200
    ctx.beginPath();
    ctx.arc(0, 0, 200, 0, 2 * Math.PI, false);

    // Take last defined path as clipping path
    // Anything defined after this line will be contained within the clipping path
    ctx.clip();

    // Draw a rectangle with a drop shadow (will be clipped by above path)
    ctx.beginPath();
    ctx.rect(50, 40, 220, 100);
    ctx.fillStyle = '#990000';  // red
    ctx.shadowColor = '#444';   // darkish-grey
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;      // how far offset shadow is on x axis
    ctx.shadowOffsetY = 5;      // how far offset shadow is on y axis
    ctx.fill();

    // Restore so we can now draw outside the clipping path
    ctx.restore();

    // For example, this blue rectangle will not be cut off
    ctx.fillStyle = '#000099';
    ctx.fillRect(50, 200, 220, 100);

    // Composite Operations
    //  Source: Last added pixel
    //  Destination: What is already on the canvas


    // ctx.globalCompositeOperation = 'source-over'; // Default - source draws ON TOP OF destination
    // ctx.globalCompositeOperation = 'source-atop'; // Destination content masks the source
    // ctx.globalCompositeOperation = 'source-in'; // As per source-atop, but none of destination is drawn
    // ctx.globalCompositeOperation = 'source-out'; // Only draw that part of the source that is not interacting with the destination
    // ctx.globalCompositeOperation = 'destination-atop';
    // ctx.globalCompositeOperation = 'destination-in';
    // ctx.globalCompositeOperation = 'destination-out';
    // ctx.globalCompositeOperation = 'destination-over';  // Source draws UNDERNEATH destination
    // ctx.globalCompositeOperation = 'lighter';  // blend the overlapping portion
    // ctx.globalCompositeOperation = 'darker';  // blend the overlapping portion
    ctx.globalCompositeOperation = 'xor';  // cuts outoverlapping part
    // ctx.globalCompositeOperation = 'copy';  // show ONLY source

    // Global Alpha
    ctx.globalAlpha = 0.5; // transparency also has effect on composite operation area

    // Define a circle to overlap blue rectangle above
    ctx.beginPath();
    ctx.arc(260, 200, 75, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#009900';
    ctx.fill();
  };

  TP.init();

})();
