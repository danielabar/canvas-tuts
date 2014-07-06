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

## Transforms

Order of rate and translate changes results.

`save` and `restore` methods of context actually create an array of contexts, but not accessible like normal array.

Each time `save` is called, the context gets pushed onto the stack of saved states.

Calling `restore` given a stack of saved states, effectively pops off the last saved context, and restores to the previous one.

`context.transform` method takes 6 parameters and is based on [matrix theory](http://en.wikipedia.org/wiki/Matrix_(mathematics))

`context.setTransform` resets canvas, then applies transform, useful if `save` was called previously and want to clear that.

`setTransform` can also be used to rest by calling `context.setTransform(1, 0, 0, 1, 0, 0)`

To mirror an object, set the `scale` to `-1` in the direction you want to mirror in.

## Composites

Clipping areas: not drawing outside the lines

`ctx.globalCompositeOperation` by default is `source-over`

Source refers to last added pixel, Destination refers to what is already on the canvas

Some operations eliminate entirety of destination (i.e. whatever is already on the canvas).
If that's not what you want, then create secondary context to put shapes together, then read image data from the secondary context,
and put image data onto original canvas.

`ctx.globalAlpha` affects transparency of composite area, including ligher and darker option.

## Animation

Instead of [setInterval](https://developer.mozilla.org/en/docs/Web/API/window.setInterval), use [window.requestAnimationFrame](https://developer.mozilla.org/en/docs/Web/API/window.requestAnimationFrame)
because it's more efficient and has extra features like pausing when browser loses focus.

But requestAnimationFrame is not fully supported in all [browsers](http://caniuse.com/requestanimationframe),
therefore use a [polyfill](https://gist.github.com/paulirish/1579671)


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