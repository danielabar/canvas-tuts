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

    this.imageObj = new Image();
    this.imageObj.src = 'images/butterfly.jpg';
    this.imageObj.onload = function() {
      self.renderImage(self.ctx, self.imageObj);
    };

    TP.renderImage = function(ctx, imageObj) {
      // simple implementation
      // ctx.drawImage(imageObj, 10, 10); //image, xpos, ypos

      var sourceX = 150;
      var sourceY = 100;
      var sourceWidth = 200;
      var sourceHeight = 200;

      // make destination w/h same as source to not stretch or shrink image
      var destWidth = sourceWidth;
      var destHeight = sourceHeight;

      // position image in center of canvas
      var destX = canvas.width / 2 - destWidth / 2;
      var destY = canvas.height / 2 - destHeight / 2;

      ctx.drawImage(
        imageObj,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        destX,
        destY,
        destWidth,
        destHeight
      );

      // get all the pixel data
      var imageData = ctx.getImageData(destX, destY, destWidth, destHeight);
      var data = imageData.data; // array
      console.dir(data);
      // every 4 numbers represents r/g/b and opacity

      // the data array can be traversed, mannipulated and redrawn
      // subtracting 255 from each value will "reverse" the image
      for(var i=0; i<data.length; i +=4 ) {

        // to greyscale
        var brightness = 0.34 * data[i] + 0.5 * data[i+1] + 0.16 * data[i+2];

        //red
        // data[i] = 255 - data[i];
        data[i] = brightness;

        //green
        // data[i+1] = 255 - data[i+1];
        data[i+1] = brightness;

        //blue
        // data[i+2] = 255 - data[i+2];
        data[i+2] = brightness;

        // opacity
        // data[i+3] = data[i+3] - 100;
      }
      // overwrite original image
      ctx.putImageData(imageData, destX, destY);

      // convert image data to base64 url
      var dataUrl = this.canvas.toDataURL();
      console.log(dataUrl);

      // can click on url in console, and image will be opened in new tab
      // image is now a file that can be saved
    };
  };


  TP.init();

})();
