'use strict';

(function() {

  // Namespace to avoid collisions
  window.TP = {};

  TP.init = function() {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.setupAudio();
  };

  // Trying from https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js#L128-L205
  TP.setupAudio = function() {
    var self = this;
    var audioElement = document.getElementById('audio');
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioCtx.createAnalyser();
    var source = audioCtx.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    setInterval(function() {
      self.draw(analyser);
    }, 33);
  };

  TP.draw = function(analyser) {
    var freqData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqData);
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (var i = 0; i < freqData.length; i++) {
      var magnitude = freqData[i];
      this.ctx.fillRect(i, this.height, i, -magnitude * 2);
    }
  };

  // Code from course doesn't work
  // TP.setupAudio = function() {
  //   var self = this;
  //   var audioElement = document.getElementById('audio');

  //   // Chrome only, kind of like canvas context
  //   var audioContext = new webkitAudioContext();

  //   // access to waveform spectrum data
  //   this.analyser = audioContext.createAnalyser();

  //   var source = audioContext.createMediaElementSource(audioElement);
  //   source.connect(this.analyzer);

  //   // like hooking up audio equipment
  //   this.analyser.connect(audioContext.destination);

  //   // use interval so results can be animated
  //   setInterval(function() {
  //     self.draw();
  //   }, 33);
  // };

  // code from course doesn't work
  // TP.draw = function() {
  //   var self = this;

  //   // create empty array of 8-bit characters, works well with storing frequency data
  //   var freqData = new Uint8Array(this.analyser.frequencyBinCount);

  //   // populate frequency data array
  //   this.analyser.getByteFrequencyData(freqData);

  //   this.ctx.clearRect(0, 0, this.width, this.height);

  //   // draw a visual representation of audio data
  //   for (var i = 0; i < freqData.length; i++) {
  //     var magnitude = freqData[i];
  //     this.ctx.fillRect(i, this.height, i -magnitude * 2);
  //   }

  // };

  TP.init();

})();
