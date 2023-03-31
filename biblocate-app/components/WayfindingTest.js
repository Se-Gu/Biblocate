import TNSTHREE from "@nativescript/canvas-three";
import * as THREE from "three";

var camera, scene, renderer;
var geometry, material, mesh;

canvas; // Canvas instance
init();
animate();

const Canvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("webgl");

    const { drawingBufferWidth: width, drawingBufferHeight: height } = context;
    camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ context });
    renderer.setSize(width, height);
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};
export default Canvas;

/*
function init() {}

function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
}

*/
