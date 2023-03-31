import React from "react";
import { GLView } from "expo-gl";
import { Text, View } from "react-native";
import * as THREE from "three";

export default function Wayfinding() {
  const onContextCreate = async (gl) => {
    // Create a Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Create a WebGLRenderer and attach it to the GL context
    const renderer = new THREE.WebGLRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // Render the scene
    const render = () => {
      requestAnimationFrame(render);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  return (
    <View>
      <Text>Hello</Text>
      <GLView
        style={{ flex: 1, width: "100%", height: "100%" }}
        onContextCreate={onContextCreate}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          This is a spinning cube!
        </Text>
      </GLView>
    </View>
  );
}
