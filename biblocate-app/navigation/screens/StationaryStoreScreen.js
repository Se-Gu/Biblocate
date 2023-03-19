import { View as GraphicsView } from "expo-graphics";
import ExpoTHREE, { THREE } from "expo-three";
import React from "react";

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
    this.camera.position.z = 5;
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
    });

    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.scene.add(new THREE.AmbientLight(0x404040));

    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(3, 3, 3);
    this.scene.add(light);
  };

  onRender = (delta) => {
    this.cube.rotation.x += 3.5 * delta;
    this.cube.rotation.y += 2 * delta;
    this.renderer.render(this.scene, this.camera);
  };
}
// map
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// fundamentals
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// axes on screen for help
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

//camera.position.set(0, 2, 5);
camera.position.set(10, 10, 10);
//camera.position.y = 2;

// ORBIT CONTROLS
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// CUBE
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: "rgb(52, 146, 235)"});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.material.transparent = true;
box.material.opacity = 1.0;
scene.add(box);
cubeCounter = 1;

// plane
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: "rgb(204, 196, 182)",
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

// grid helper
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// animation functions
function animateCube(time){
    if (cubeCounter % 600 == 0){
        if (box.material.opacity < 0.8){
            box.material.opacity += 0.01;
        }
        else{
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
	renderer.render( scene, camera );
}

renderer.setAnimationLoop(animate);