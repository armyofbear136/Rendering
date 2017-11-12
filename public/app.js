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
  materials: [],
  view: 0
}

const init = () => {
  generateView();

  setViewForCube();

  animate();

}

const generateView = async () => {

  state.scene = createScene();
  state.renderer = createRenderer(.9, .9, true);
  state.camera = createPCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  state.loader = new THREE.FontLoader();
  console.log(await createFont('helvetiker', 'bold'));
  state.font = await createFont('helvetiker', 'bold');
  console.log("THIS IS THE FONT", state.font);




  document.body.appendChild(state.renderer.domElement);

  createLights();


  state.materials = createMaterials();



  document.addEventListener('mousedown', switchView, false);
  document.addEventListener('keypress', rotateCube, false);
  document.addEventListener('touchstart', rotateCube, false);
  document.addEventListener('touchmove', rotateCube, false);
  document.addEventListener('keydown', rotateCube, false);

}


const rotateCube = () => {
  state.cube.rotation.x += 0.1;
  state.cube.rotation.y += 0.1;
  state.camera.position.z++;
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

const createScene = () => {
  return new THREE.Scene();
}

const createPCamera = (fov, aspect, near, fat) => {
  return new THREE.PerspectiveCamera(fov, aspect, near, fat);
}



const createRenderer = (width, height, aa) => {
  let renderer = new THREE.WebGLRenderer({ antialias: aa });
  renderer.setSize(window.innerWidth * width, window.innerHeight * height);
  return renderer;
}

const createMaterials = () => {
  return [
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
    new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
  ];
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
  state.scene = createScene();

  state.lines = createLines();
  state.scene.add(state.lines);

  state.camera = createPCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  state.camera.position.set(0, 0, 100);
  state.camera.lookAt(new THREE.Vector3(0, 0, 0));
}

const createFont = async (fontName, fontWeight) => {
  const fontString = '../fonts/' + fontName + '_' + fontWeight + '.typeface.json'
  console.log("FONT STRING", fontString);
  await state.loader.load(fontString, function (response) {
    console.log("LOADER RESPONSE ", response);
    state.font = response;
    //return response;
    // refreshText();
  });
}

const setViewForText = (text) => {
  console.log("TITLE OBJECT: ", state.title, "FONT OBJECT: ", state.font);
  state.scene = createScene();


  const textData = {
    font: state.font,
    size: 80,
    height: 5,
    curveSegments: 12,
    bevelThickness: 10,
    bevelSize: 8,
    bevelEnabled: true,
    material: 0,
    extrudeMaterial: 1
  }

  state.title = createText(text, textData);
  state.camera = createPCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  state.scene.add(state.title);
  state.camera.position.z = 5;
}


const createText = (text, textData) => {
  let textGeo = new THREE.TextGeometry(text, textData);
  const hover = 30;


  textGeo.computeBoundingBox();

  textGeo.computeVertexNormals();

  // "fix" side normals by removing z-component of normals for side faces

  // (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)

  if (!textData.bevelEnabled) {
    var triangleAreaHeuristics = 0.1 * (height * size);
    for (var i = 0; i < textGeo.faces.length; i++) {
      var face = textGeo.faces[i];
      if (face.materialIndex == 1) {
        for (var j = 0; j < face.vertexNormals.length; j++) {
          face.vertexNormals[j].z = 0;
          face.vertexNormals[j].normalize();
        }
        var va = textGeo.vertices[face.a];
        var vb = textGeo.vertices[face.b];
        var vc = textGeo.vertices[face.c];
        var s = THREE.GeometryUtils.triangleArea(va, vb, vc);
        if (s > triangleAreaHeuristics) {
          for (var j = 0; j < face.vertexNormals.length; j++) {
            face.vertexNormals[j].copy(face.normal);
          }
        }
      }
    }
  }
  var centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
  let textMesh1 = new THREE.Mesh(textGeo, state.materials);
  textMesh1.position.x = centerOffset;
  textMesh1.position.y = hover;
  textMesh1.position.z = 0;
  textMesh1.rotation.x = 0;
  textMesh1.rotation.y = Math.PI * 2;

  return textMesh1;

  if (mirror) {
    let textMesh2 = new THREE.Mesh(textGeo, state.materials);
    textMesh2.position.x = centerOffset;
    textMesh2.position.y = -hover;
    textMesh2.position.z = height;
    textMesh2.rotation.x = Math.PI;
    textMesh2.rotation.y = Math.PI * 2;
    return textMesh2;
  }
}



// const createText = (text) => {
//   let textGeo;
//   state.loader.load('../fonts/helvetiker_regular.typeface.json', function (font) {

//     textGeo = new THREE.TextGeometry(`${text}`, {
//       font: font,
//       size: 80,
//       height: 5,
//       curveSegments: 12,
//       bevelEnabled: true,
//       bevelThickness: 10,
//       bevelSize: 8,
//       bevelSegments: 5
//     });
//   });
//   console.log("created text geometry", textGeo);
//   return textGeo;
// }


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


