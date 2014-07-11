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

    // can assign position to container - all contained shapes will be drawn relative to this
    this.container.x = 100;

    // add shapes to container - order matters, last one added will be on top
    this.container.addChild(rect);
    this.container.addChild(circle);

    // update the stage
    this.stage.update();

    // interaction - smart click, only fires on the shape object
    // event object is a custom easel object,
    // also exposes nativeEvent which is the native JavaScript mouse event
    circle.addEventListener('click', function(e) {
      console.log(e);
    });

    // animation
    var self = this;
    createjs.Ticker.addEventListener('tick', function(e) {
      self.tick(e);
    });
  };

  TP.tick = function(e) {
    var rect = this.container.getChildByName('rect');
    var newxpos = e.delta/1000*100;
    console.log('newxpos: ' + newxpos);
    rect.x = newxpos;
    this.stage.update();
    console.log('total time: ' + createjs.Ticker.getTime());
  };

  TP.init();

})();
