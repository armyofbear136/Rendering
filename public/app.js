import * as THREE from 'three';
// const express = require('express');
// const app = express();
// app.use('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', './index.html'));
// });

// const PORT = 8000;

// const startListening = () => {
//   // start listening (and create a 'server' object representing our server)
//   const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//   // set up our socket control center
//   // const io = socketio(server);
//   // require('./socket')(io);
// };
// const Detector = require('../tools/Detector');

// if (Detector.webgl) {
//   // Initiate function or other initializations here
//   animate();
// } else {
//   const warning = Detector.getWebGLErrorMessage();
//   document.getElementById('container').appendChild(warning);
// }


// SPINNING CUBE 

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth * .9, window.innerHeight * .9);
// document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;

// function animate() {
//   requestAnimationFrame(animate);

//   cube.rotation.x += 0.1;
//   cube.rotation.y += 0.1;

//   renderer.render(scene, camera);
// }
// animate();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var scene = new THREE.Scene();

//create a blue LineBasicMaterial
var material = new THREE.LineBasicMaterial({ color: 0x0000ff });

var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 10, 0));
geometry.vertices.push(new THREE.Vector3(10, 0, 0));

var line = new THREE.Line(geometry, material);

scene.add(line);
renderer.render(scene, camera);
