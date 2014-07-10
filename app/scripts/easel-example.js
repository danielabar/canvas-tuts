'use strict';

(function() {

  window.TP = {};

  TP.init = function() {
    this.stage = new createjs.Stage('canvas');
    this.container = new createjs.Container();
    this.stage.addChild(this.container);
    this.draw();
  };

  TP.draw = function() {
    var circle = new createjs.Shape();
    circle.graphics.beginFill('#990000').drawCircle(0, 0, 50); // xpos, ypos, radius
    // set the position here, outside the conext of drawing
    circle.x = 100;
    circle.y = 100;

    var rect = new createjs.Shape();
    rect.graphics.beginFill('#009900').drawRoundRect(0, 0, 100, 100, 8); // xpos, ypos, w, h, corner radius
    rect.x = 100;
    rect.y = 100;
    rect.name = 'rect'; // give it a name so we can reference it for animation later

    // add shapes to container
    this.container.addChild(circle);
    this.container.addChild(rect);

    // update the stage
    this.stage.update();
  };

  TP.init();

})();
