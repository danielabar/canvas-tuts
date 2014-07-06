'use strict';

(function() {

  window.TP = {};

  TP.init = function() {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.registerToolTips();
    this.setupAudio();
    this.registerHandlers();
  };

  TP.registerToolTips = function() {
    $('.action').tooltip({
      container: 'body'
    });
  };

  TP.registerHandlers = function() {
    var self = this;
    $('#startvisualize').on('click', function() {
      self.startVisualize();
    });
    $('#stopvisualize').on('click', function() {
      self.stopVisualize();
    });
    $('#ex1').slider({
      formater: function(value) {
        return 'Current value: ' + value;
      }
    });
  };

  TP.startVisualize = function() {
    var self = this;
    if (!this.refreshIntervalId) {
      this.refreshIntervalId = setInterval(function() {
        self.draw();
      }, 33);
    }
  };

  TP.stopVisualize = function() {
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
    }
  };

  // Reference: https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js#L128-L205
  TP.setupAudio = function() {
    // audio html element has reference to mp3 source
    var audioElement = document.getElementById('audio');

    // similar purpose as canvas context
    var audioCtx = new webkitAudioContext();

    // access to waveform spectrum data
    this.analyser = audioCtx.createAnalyser();

    var source = audioCtx.createMediaElementSource(audioElement);

    // hook up audio equipment
    source.connect(this.analyser);
    this.analyser.connect(audioCtx.destination);
  };

  TP.draw = function() {

    // create empty array of 8-bit characters, works well with storing frequency data
    var freqData = new Uint8Array(this.analyser.frequencyBinCount);

    // populate frequency data array
    this.analyser.getByteFrequencyData(freqData);

    // clear the canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // draw a visual representation of audio data
    for (var i = 0; i < freqData.length; i++) {
      var magnitude = freqData[i];
      this.ctx.fillRect(i, this.height, i, -magnitude * 2);
    }
  };

  TP.init();

})();
