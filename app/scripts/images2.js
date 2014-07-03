'use strict';

// http://stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas

(function() {

  window.TP = {};

  TP.init = function() {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.imageObj = new Image();
    this.imageObj.src = 'images/butterfly.jpg';
    this.registerToolTips();
    this.registerEvents();
  };

  TP.registerToolTips = function() {
    $('.action').tooltip({
      container: 'body'
    });
  };

  TP.registerEvents = function() {
    var self = this;
    this.imageObj.onload = function() {
      self.renderImage(self.ctx, self.imageObj);
    };
    $('#greyScale').on('click', function() {
      self.toGreyScale(self.ctx);
    });
    $('#inverse').on('click', function() {
      self.inverse(self.ctx);
    });
    $('#reset').on('click', function() {
      self.renderImage(self.ctx, self.imageObj);
    });
  };

  TP.renderImage = function(ctx, imageObj) {
    ctx.drawImage(imageObj, 10, 10);
  };

  TP.toGreyScale = function(ctx) {
    var imageData = ctx.getImageData(10, 10, 350, 520);
    var data = imageData.data;
    for(var i=0; i<data.length; i +=4) {
      var brightness = 0.34 * data[i] + 0.5 * data[i+1] + 0.16 * data[i+2];
      data[i] = brightness;     // red
      data[i+1] = brightness;   // green
      data[i+2] = brightness;   // blue
    }
    ctx.putImageData(imageData, 10, 10);
  };

  TP.inverse = function(ctx) {
    var imageData = ctx.getImageData(10, 10, 350, 520);
    var data = imageData.data;
    for(var i=0; i<data.length; i +=4) {
      data[i] = 255 - data[i];        // red
      data[i+1] = 255 - data[i+1];    // green
      data[i+2] = 255 - data[i+2];    // blue
    }
    ctx.putImageData(imageData, 10, 10);
  };

  TP.init();

})();