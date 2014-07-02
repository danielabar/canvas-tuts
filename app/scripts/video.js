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
    this.isPlaying = true;

    // Create hidden canvas to support video image manipulation (it's hidden because we don't add it to DOM)
    this.backcanvas = document.createElement('canvas');
    this.backctx = this.backcanvas.getContext('2d');
    this.backcanvas.width = this.width;
    this.backcanvas.height = this.height;

    this.loadVideo();

    this.canvas.onclick = function() {
      self.isPlaying = self.isPlaying ? false : true;
      if (self.isPlaying) {
        self.videoElement.play();
      } else {
        self.videoElement.pause();
      }
    };
  };

  TP.loadVideo = function() {
    var self = this;
    this.videoElement = document.createElement('video');
    var videoDiv = document.createElement('div');
    document.body.appendChild(videoDiv);
    videoDiv.appendChild(this.videoElement);
    videoDiv.setAttribute('style', 'display:none;');
    this.videoElement.setAttribute('src', 'videos/BigBuckBunny_320x180.mp4');

    // onload is not reliable, so we need to add this event listener, fired when video is ready to be played
    this.videoElement.addEventListener('canplaythrough', function() {
      self.startVideo();
    });
  };

  TP.startVideo = function() {
    var self = this;
    this.videoElement.play();
    this.vidWidth = this.videoElement.videoWidth;
    this.vidHeight = this.videoElement.videoHeight;
    // 33ms ~ 30fps
    setInterval(function() {
      self.renderFrame();
    }, 33);
  };

  TP.renderFrame = function() {
    if (this.isPlaying) {

      // to simply display the video as is:
      // this.ctx.drawImage(this.videoElement, 10, 10, this.vidWidth, this.vidHeight);

      // to modify video size:
      // this.ctx.drawImage(this.videoElement, 10, 10, this.vidWidth/2, this.vidHeight/2);

      // to manipulate pixel level data in real time, technique:
      // render image one time to hidden canvas, get image data, manipulate it, then reder it to visible canvas
      // (we need the hidden canvas because the image data is only available AFTER its been rendered to the canvas)
      this.backctx.drawImage(this.videoElement, 10, 10, this.vidWidth, this.vidHeight);
      var frameData = this.backctx.getImageData(10,10,this.vidWidth, this.vidHeight);
      var data = frameData.data;
      // loop over all the image data and inverse the values
      for (var i = 0; i<data.length; i+=4) {
        data[i] = 255 - data[i]; // red
        data[i+1] = 255 - data[i+1]; // green
        data[i+2] = 255 - data[i+2]; // blue
      }
      // now put the modified data to the visible canvas
      this.ctx.putImageData(frameData, 10, 10);
    }
  };

  TP.init();

})();
