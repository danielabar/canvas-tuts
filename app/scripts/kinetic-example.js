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

    // All items added to the group will be relative to y position of 100?
    var group = new Kinetic.Group({
      y: 100
    });

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

    // Interaction: Will detect clicks only on green rectangle surface area
    greenRect.on('click', function(e) {
      console.log(e);
      console.dir(e.target);  // event has reference to Kinetic.Rect shape object that was clicked on
    });

    // Add shape to group
    group.add(blueRect);

    // Add group to layer
    this.backLayer.add(group);

    // Add shape to layer
    this.frontLayer.add(greenRect);

    this.stage.draw();

    // Animation - this code from course doesn't work
    // var self = this;
    // blueRect.on('click', function() {
    //   var anim = new Kinetic.Animation(function(frame) {
    //     self.animate(frame);
    //   }, self.backLayer);
    //   anim.start();
    // });

    // http://www.html5canvastutorials.com/kineticjs/html5-canvas-kineticjs-rotation-animation-tutorial/
    var self = this;
    var angularSpeed = 360 / 4;
    var anim = new Kinetic.Animation(function(frame) {
      var angleDiff = frame.timeDiff * angularSpeed / 1000;
      blueRect.rotate(angleDiff);
    }, self.backLayer);

    anim.start();
  };

  // Code from course doesn't work
  TP.animate = function(frame) {
    // get a handle to object we want to animate by ID
    // get method returns an array, therefore must specify we want the first element in the array
    var rect = this.backLayer.get('#blueRect')[0];

    // distance we want to animate the rectangle by
    // to have consistent animation, don't tie distance directly to frame,
    // instead tie distance to calculation on time difference from last frame
    // frame.timeDiff tells us time that has elapsed from last frame
    var dist = 5 * (frame.timeDiff / 1000);

    // move rectangle in the y direction by the distance calculated above
    rect.move(0, dist);
  };

  TP.init();

})();
