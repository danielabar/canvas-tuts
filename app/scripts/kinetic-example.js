'use strict';

(function() {

  window.TP = {};

  TP.init = function() {

    // Initialize a stage with some config options
    this.stage = new Kinetic.Stage({
      container: 'kinetic-container',
      width: 380,
      height: 600
    });

    // Create foreground and background layers
    this.backLayer = new Kinetic.Layer();
    this.frontLayer = new Kinetic.Layer();

    // Add layers to stage (last added layer will appear in front)
    this.stage.add(this.backLayer);
    this.stage.add(this.frontLayer);

    this.draw();
  };

  TP.draw = function() {

    // Define some shapes
    var blueRect = new Kinetic.Rect({
      id: 'blueRect',
      x: 239,
      y: 75,
      width: 100,
      height: 50,
      fill: '#000099',
      stroke: '#000045',
      strokeWidth: 4
    });

    var greenRect = new Kinetic.Rect({
      id: 'greenRect',
      x: 180,
      y: 50,
      width: 100,
      height: 50,
      fill: '#009900',
      stroke: '#004500',
      strokeWidth: 4
    });

    // Add shapes to layers
    this.backLayer.add(blueRect);
    this.frontLayer.add(greenRect);
    this.stage.draw();
  };

  TP.init();

})();
