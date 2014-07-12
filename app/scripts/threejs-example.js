'use strict';

(function() {

  window.TP = {};

  TP.init = function() {
    var WIDTH = 400;
    var HEIGHT = 300;
    var VIEW_ANGLE = 45;          // for the camera
    var ASPECT = WIDTH / HEIGHT;  // aspect ratio for the scene
    var NEAR = 0.1;               // how close to camera objects are rendered
    var FAR = 10000;              // how far away objects are rendered

    var container = document.getElementById('container');

    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    this.scene = new THREE.Scene();

    // when new objects are created, they're always at 0,0,0 on 3D axis,
    // but if want to view anything with camera, need to pull it back
    this.camera.position.z = 300;

    this.renderer = new THREE.WebGLRenderer();  // watch out not full browser support
    this.renderer.setSize(WIDTH, HEIGHT);

    // now pull all the pieces together to render
    // this.renderer.domElement refers to canvas element that will be created by threejs
    container.appendChild(this.renderer.domElement);

    // add camera to scene
    this.scene.add(this.camera);

    this.setupLights();
    this.drawObjects();
  };

  TP.setupLights = function() {
    var pointLight = new THREE.PointLight( 0xFFFFFF ); // make light completely white
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    this.scene.add(pointLight);
  };

  TP.drawObjects = function() {

    // create an object to be used as a group - this is the parent class of all objects
    // all objects added to group can later be animated together
    var group = new THREE.Object3D();
    // group.position.y = 50;
    this.scene.add(group);

    // CUBE
    var geometry = new THREE.CubeGeometry(50, 50, 50); // height, width, depth
    // var material = new THREE.MeshBasicMaterial({color: 0x00ff00}); // will be green with no shading
    var material = new THREE.MeshLambertMaterial({color: 0x00ff00});  // requires lighting, otherwise will be completely black
    var cube = new THREE.Mesh(geometry, material);  // Mesh is combination of cube geometry and material
    cube.position.x = -90; // offset x axis
    group.add(cube);

    // SPHERE - this time, define the geometry directly inside the Mesh
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xCC0000});
    var sphere = new THREE.Mesh(
      new THREE.SphereGeometry(
        60, 15, 16  // radius, 16 segments horizontally, 16 segments vertically (the more detailed, the heavier to render)
      ), sphereMaterial);
    group.add(sphere);

    this.renderer.render(this.scene, this.camera);

    // animation - simple example with set interval
    var self = this;
    setInterval(function() {
      // rotate the cub
      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;
      // also rotate the group
      group.rotation.y += 1;
      self.renderer.render(self.scene, self.camera);
    }, 60);

  };

  TP.init();

})();
