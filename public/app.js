import * as THREE from 'three';

// const Detector = require('../tools/Detector');

// if (Detector.webgl) {
//   // Initiate function or other initializations here
//   animate();
// } else {
//   const warning = Detector.getWebGLErrorMessage();
//   document.getElementById('container').appendChild(warning);
// }

let state = {
  // scene,
  // camera,
  // renderer,
  // cube,
  // loader,
  // title,
  // lines,
  view: 0
}

const init = () => {
  generateSceneDefaults();

  setViewForCube();

  animate();

}

const generateSceneDefaults = () => {

  state.scene = new THREE.Scene();
  console.log(state);
  state.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  state.renderer = new THREE.WebGLRenderer({ antialias: true });
  state.renderer.setSize(window.innerWidth * .9, window.innerHeight * .9);
  document.body.appendChild(state.renderer.domElement);
  createLights();

  state.loader = new THREE.FontLoader();

  document.addEventListener('mousedown', switchView, false);
  document.addEventListener('keypress', rotateCube, false);
  document.addEventListener('touchstart', rotateCube, false);
  document.addEventListener('touchmove', rotateCube, false);
  document.addEventListener('keydown', rotateCube, false);

}


const rotateCube = () => {
  state.cube.rotation.x += 0.1;
  state.cube.rotation.y += 0.1;
}

const switchView = () => {
  state.view++;
  if (state.view > 2) state.view = 0;
  if (state.view === 0) {
    setViewForCube();
  }
  else if (state.view === 1) {
    setViewForLines();
  }
  else if (state.view === 2) {
    setViewForText();
  }
  createLights();
}

const createLights = () => {
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.125);

  dirLight.position.set(0, 0, 1).normalize();

  state.scene.add(dirLight);



  const pointLight = new THREE.PointLight(0xffffff, 1.5);

  pointLight.position.set(0, 100, 90);

  state.scene.add(pointLight);
}


const createCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  return new THREE.Mesh(geometry, material);
}

const setViewForCube = () => {
  state.scene = new THREE.Scene();
  state.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  state.cube = createCube();
  state.scene.add(state.cube);
  state.camera.position.z = 5;
}

const createLines = () => {


  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

  const geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 10, 0));
  geometry.vertices.push(new THREE.Vector3(10, 0, 0));

  return new THREE.Line(geometry, material);

}

const setViewForLines = () => {
  state.scene = new THREE.Scene();

  state.lines = createLines();
  state.scene.add(state.lines);

  state.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  state.camera.position.set(0, 0, 100);
  state.camera.lookAt(new THREE.Vector3(0, 0, 0));
}


const createText = (text) => {
  return state.loader.load('../fonts/helvetiker_regular.typeface.json', function (font) {

    return new THREE.TextGeometry(`${text}`, {
      font: font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelSegments: 5
    });
  });
}

const setViewForText = (text) => {
  state.scene = new THREE.Scene();
  state.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  state.title = createText(text);
  state.scene.add(state.title);
  state.camera.position.z = 5;

}

//SPINNING CUBE 

const animate = () => {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.1;
  // cube.rotation.y += 0.1;

  state.renderer.render(state.scene, state.camera);
}


init();









// document.addEventListener('mousedown', onDocumentMouseDown, false);
// document.addEventListener('keypress', onDocumentKeyPress, false);
// document.addEventListener('touchstart', onDocumentTouchStart, false);

// document.addEventListener('touchmove', onDocumentTouchMove, false);


// document.addEventListener('keydown', onDocumentKeyDown, false);


// function onDocumentMouseDown() {
//   cube.rotation.x += 0.1;
//   cube.rotation.y += 0.1;
// }


// function onDocumentKeyPress() {
//   cube.rotation.x += 0.1;
//   cube.rotation.y += 0.1;
// }


