import { View as GraphicsView } from "expo-graphics";
import ExpoTHREE, { THREE } from "expo-three";
import React from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class App extends React.Component {
  componentWillMount() {
    THREE.suppressExpoWarnings();
  }

  render() {
    // Create an `ExpoGraphics.View` covering the whole screen, tell it to call our
    // `onContextCreate` function once it's initialized.
    return (
      <GraphicsView
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
      />
    );
  }

  // This is called by the `ExpoGraphics.View` once it's initialized
  onContextCreate = async ({
    gl,
    canvas,
    width,
    height,
    scale: pixelRatio,
  }) => {
    this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    this.renderer.setClearColor(0xffffff);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    // this.camera.position.z = 5;
    this.camera.position.set(10, 10, 10); // new code
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
    });
    const axesHelper = new THREE.AxesHelper(3); // new code
    this.scene.add(axesHelper); // new code

    const orbit = new OrbitControls(this.camera, this.renderer.domElement); // new code
    orbit.update(); // new code

    // -- our cube start
    const boxGeometry = new THREE.BoxGeometry();
    const boxMaterial = new THREE.MeshBasicMaterial({
      color: "rgb(52, 146, 235)",
    });
    this.box = new THREE.Mesh(boxGeometry, boxMaterial);
    this.box.material.transparent = true;
    this.box.material.opacity = 1.0;
    this.scene.add(this.box);
    this.cubeCounter = 1;
    // -- our cube end

    // this.cube = new THREE.Mesh(geometry, material);
    //this.scene.add(this.cube);

    // -- our plane start
    const planeGeometry = new THREE.PlaneGeometry(30, 30);
    const entranceTexture = new THREE.TextureLoader().load(
      "../../assets/giris.png"
    );

    this.scene.background = entranceTexture;

    // immediately use the texture for material creation
    const entrancePlaneMaterial = new THREE.MeshBasicMaterial({
      map: entranceTexture,
    });
    /*
    var img = new THREE.MeshBasicMaterial({
      map: THREE.TextureLoader().load("../../assets/giris.png"),
    });
    */
    /*
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: "rgb(204, 196, 182)",
      side: THREE.DoubleSide,
    });
    */
    this.plane = new THREE.Mesh(planeGeometry, entrancePlaneMaterial);
    this.scene.add(this.plane);
    this.plane.rotation.x = -0.5 * Math.PI;
    this.plane.receiveShadow = true;
    // -- our plane end

    // -- our grid helper start
    this.gridHelper = new THREE.GridHelper(30);
    this.scene.add(this.gridHelper);

    // -- our grid helper end
    this.scene.add(new THREE.AmbientLight(0x404040));

    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(3, 3, 3);
    this.scene.add(light);
  };

  animateCube = (delta) => {
    if (this.cubeCounter % 600 == 0) {
      if (this.box.material.opacity < 0.8) {
        this.box.material.opacity += 0.01;
      } else {
        this.box.material.opacity = 0.4;
      }
    }
    this.rotationSpeed = 0.5;
    this.box.rotation.x = this.box.rotation.x + delta * this.rotationSpeed;
    this.box.rotation.y = this.box.rotation.y + delta * this.rotationSpeed;
    this.plane.rotation.x = this.plane.rotation.x + delta * this.rotationSpeed;
    this.plane.rotation.y = this.plane.rotation.y + delta * this.rotationSpeed;
  };

  onRender = (delta) => {
    this.cubeCounter += 1;
    this.animateCube(delta);
    //this.cube.rotation.x += 3.5 * delta;
    //this.cube.rotation.y += 2 * delta;
    //console.log(this.cubeCounter);
    //console.log("Delta: ", delta);
    this.renderer.render(this.scene, this.camera);
  };
}
// map
// import * as THREE from 'three';

// fundamentals
// included: const scene = new THREE.Scene();
// kinda included: const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// included : const renderer = new THREE.WebGLRenderer();
// included : renderer.setSize(window.innerWidth, window.innerHeight);
// included: document.body.appendChild(renderer.domElement);

// axes on screen for help
// newly added: const axesHelper = new THREE.AxesHelper(3);
// newly added: scene.add(axesHelper);

//camera.position.set(0, 2, 5);
// newly added: camera.position.set(10, 10, 10);
//camera.position.y = 2;

// ORBIT CONTROLS
// newly added: const orbit = new OrbitControls(camera, renderer.domElement);
// newly added: orbit.update();

// CUBE (added)
/*
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: "rgb(52, 146, 235)" });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.material.transparent = true;
box.material.opacity = 1.0;
scene.add(box);
cubeCounter = 1;

// plane (added)
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: "rgb(204, 196, 182)",
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

// grid helper (added)
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);
*/

// animation functions
/*
function animateCube(time) {
  if (cubeCounter % 600 == 0) {
    if (box.material.opacity < 0.8) {
      box.material.opacity += 0.01;
    } else {
      box.material.opacity = 0.4;
    }
  }
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;
}

function animate(time) {
  cubeCounter += 1;
  animateCube(time);
  //requestAnimationFrame( animate );
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

*/
