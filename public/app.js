import * as THREE from 'three';
// const Detector = require('../tools/Detector');

// if (Detector.webgl) {
//   // Initiate function or other initializations here
//   animate();
// } else {
//   const warning = Detector.getWebGLErrorMessage();
//   document.getElementById('container').appendChild(warning);
// }

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * .9, window.innerHeight * .9);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;

  renderer.render(scene, camera);
}
animate();
