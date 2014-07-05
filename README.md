# Tuts Plus: Canvas Essentials

Learning [Canvas](https://courses.tutsplus.com/courses/canvas-essentials) with [Tuts Plus](https://tutsplus.com/)

Canvas [reference](http://www.w3schools.com/tags/ref_canvas.asp)

## Introduction


Canvas element is bitmap surface that can be manipulated with a JavaScript API. Think of it as a drawing surface.

Once its drawn on, it remains like that until cleared or drawn over. It's just pixels.

Use [RaphaelJS](http://raphaeljs.com/) to replicate canvas behaviour in older browsers.

## Canvas Basics

Must always define width and height for canvas tag, otherwise it resets to default 300x150.

x values start at top left and increase to the right.

y values start at top left and increase down.

Many canvas methods such as `moveTo` and `lineTo` don't do anything until you _commit_ to them via `stroke()`

Lines that are joined together one after the other are referred to as a _path_

If `moveTo` is used between lines, that breaks the path and creates different subpaths

## Lines and Rectangles

Lines can be ended in different styles:

  ```javascript
  var ctx = canvas.getContext('2d');
  ctx.lineCap = 'butt';   //default
  ctx.lineCap = 'round';
  ctx.lineCap = 'square';
  ```

Lines can be joined in different styles:

  ```javascript
  ctx.lineJoin = 'miter';   // default
  ctx.lineJoin = 'round';
  ctx.lineJoin = 'bevel';
  ```

## Video

Unlike Image, cannot create a video element in pure JavaScript. Need to create video tag dom node.
Open source video downloads [here](http://www.bigbuckbunny.org/index.php/download/)

## Audio

Unlike image and video data which is available as array once rendered on canvas, audio data is more primitive.
Need to use [Web Audio API](http://webaudio.github.io/web-audio-api/)

Royalty free music downloads [here](http://incompetech.com/music/royalty-free/?keywords=rising+ethereal&Search=Search)

### Development

  ```
  grunt serve
  ```

### Build

  ```
  grunt build
  grunt connect:dist:keepalive
  ```

Make sure optimized version of site is working locally.

### Deploy

Push changes to master, then:

  ```
  git subtree push --prefix dist origin gh-pages
  ```