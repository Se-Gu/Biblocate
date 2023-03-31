// import React from "react";
// import { GLView } from "expo-gl";
// import { Text, View } from "react-native";
// import * as THREE from "three";

// export default function Wayfinding() {
//   const onContextCreate = async (gl) => {
//     // Create a Three.js scene
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       gl.drawingBufferWidth / gl.drawingBufferHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 5;

//     const geometry = new THREE.BoxGeometry(1, 1, 1);
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     // Create a WebGLRenderer and attach it to the GL context
//     const renderer = new THREE.WebGLRenderer({ gl });
//     renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

//     // Render the scene
//     const render = () => {
//       requestAnimationFrame(render);
//       cube.rotation.x += 0.01;
//       cube.rotation.y += 0.01;
//       renderer.render(scene, camera);
//       gl.endFrameEXP();
//     };
//     render();
//   };

//   return (
//     <View>
//       <Text>Hello</Text>
//       <GLView
//         style={{ flex: 1, width: "100%", height: "100%" }}
//         onContextCreate={onContextCreate}
//       >
//         <Text style={{ color: "white", textAlign: "center" }}>
//           This is a spinning cube!
//         </Text>
//       </GLView>
//     </View>
//   );
// }

import { GLView, View as GraphicsView } from "expo-gl";
import * as THREE from "three";
import React from "react";
import { Text, View } from "react-native";

export default class Wayfinding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
    //THREE.suppressExpoWarnings();
  }

  render() {
    // Create an `ExpoGraphics.View` covering the whole screen, tell it to call our
    // `onContextCreate` function once it's initialized.
    return (
      <View>
        <Text>Something</Text>
        <GLView
          onContextCreate={this.onContextCreate}
          onRender={this.onRender}
        />
      </View>
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
    const renderer = new THREE.WebGLRenderer({ gl, pixelRatio, width, height });
    //this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    this.renderer.setClearColor(0xffffff);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    // this.camera.position.z = 5;
    this.camera.position.set(10, 10, 10); // new code
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
    });
    /*
    const axesHelper = new THREE.AxesHelper(3); // new code
    this.scene.add(axesHelper); // new code
    */

    const orbit = new OrbitControls(this.camera, this.renderer.domElement);
    orbit.update();

    // cube
    const boxGeometry = new THREE.BoxGeometry();
    const boxMaterial = new THREE.MeshBasicMaterial({
      color: "rgb(52, 146, 235)",
    });
    this.box = new THREE.Mesh(boxGeometry, boxMaterial);
    this.box.material.transparent = true;
    this.box.material.opacity = 1.0;
    this.scene.add(this.box);
    this.cubeCounter = 1;

    // plane
    const planeGeometry = new THREE.PlaneGeometry(30, 30);
    const entranceTexture = new THREE.TextureLoader().load(
      "../../assets/giris.png"
    );

    this.scene.background = entranceTexture;

    // immediately use the texture for material creation
    const entrancePlaneMaterial = new THREE.MeshBasicMaterial({
      map: entranceTexture,
    });
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

    // insert image
    this.insertImage();
    this.insertLight();
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
    this.updateScene(delta);
    this.renderer.render(this.scene, this.camera);
  };

  updateScene = (delta) => {
    this.cubeCounter += 1;
    this.animateCube(delta);
    //this.cube.rotation.x += 3.5 * delta;
    //this.cube.rotation.y += 2 * delta;
    //console.log(this.cubeCounter);
    //console.log("Delta: ", delta);
  };

  insertImage = () => {
    /**
     * Image
     **/

    // Create a texture loader so we can load our image file
    var loader = new THREE.TextureLoader();

    // Load an image file into a custom material
    var material = new THREE.MeshLambertMaterial({
      map: loader.load(
        "https://s3.amazonaws.com/duhaime/blog/tsne-webgl/assets/cat.jpg"
      ),
    });

    // create a plane geometry for the image with a width of 10
    // and a height that preserves the image's aspect ratio
    var geometry = new THREE.PlaneGeometry(10, 10 * 0.75);

    // combine our image geometry and material into a mesh
    var mesh = new THREE.Mesh(geometry, material);

    // set the position of the image mesh in the x,y,z dimensions
    mesh.position.set(0, 0, 0);

    // add the image to the scene
    this.scene.add(mesh);
  };

  insertLight = () => {
    // Add a point light with #fff color, .7 intensity, and 0 distance
    var light = new THREE.PointLight(0xffffff, 1, 0);

    // Specify the light's position
    light.position.set(1, 1, 100);

    // Add the light to the scene
    this.scene.add(light);
  };
}