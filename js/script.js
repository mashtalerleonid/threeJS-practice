import * as THREE from "https://cdn.skypack.dev/three@0.134.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/controls/OrbitControls.js";
import { mergeBufferGeometries } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/utils/BufferGeometryUtils.js";

// import * as a from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/controls";

const rangeEl = document.querySelector("#range");
rangeEl.addEventListener("input", render);

const canvas = document.querySelector("canvas");

let length = 1200;
const width = 600;
let thickness = 25;
let lipHeight = 40;
const lipThickness = 10;

let scene = new THREE.Scene();
scene.background = new THREE.Color("black");

let axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

let camera = new THREE.PerspectiveCamera(
  75,
  canvas.offsetWidth / canvas.offsetHeight,
  2,
  2000
);
camera.position.set(200, 450, 1000);
// camera.lookAt(0, 0, 0);

let renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(100, 500, 1000);
scene.add(light);

const light1 = new THREE.AmbientLight(0x404040);
scene.add(light1);

const controls = new OrbitControls(camera, canvas);
controls.addEventListener("change", render);
controls.update();

// ---------------------------------------------------------------------
// let material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
const texture = new THREE.TextureLoader().load("./images/fon.jpg", render);
const planeTexture = new THREE.TextureLoader().load(
  "./images/slot.png",
  generatePlane
);
// // texture.repeat.x = 0.5;
// // texture.repeat.y = 0.3;
// texture.wrapT = THREE.RepeatWrapping;
// texture.wrapS = THREE.RepeatWrapping;

let material = new THREE.MeshPhongMaterial({
  // map: texture,
  color: 0xaaaaaa,
});

let floorGeo = null;
let lipRightGeo = null;
let lipBottomGeo = null;
let lipLeftGeo = null;
let lipTopGeo = null;
let geometry = null;
let planeGeo = null;
let plane = null;

function calcGeo() {
  length = Number(rangeEl.value);

  floorGeo = new THREE.BoxBufferGeometry(length, thickness, width);

  lipRightGeo = new THREE.BoxBufferGeometry(lipThickness, lipHeight, width);
  lipRightGeo.translate(
    (length - lipThickness) / 2,
    (lipHeight - thickness) / 2,
    0
  );

  lipBottomGeo = new THREE.BoxBufferGeometry(length, lipHeight, lipThickness);
  lipBottomGeo.translate(
    0,
    (lipHeight - thickness) / 2,
    (width - lipThickness) / 2
  );

  lipLeftGeo = new THREE.BoxBufferGeometry(lipThickness, lipHeight, width);
  lipLeftGeo.translate(
    -(length - lipThickness) / 2,
    (lipHeight - thickness) / 2,
    0
  );

  lipTopGeo = new THREE.BoxBufferGeometry(length, lipHeight, lipThickness);
  lipTopGeo.translate(
    0,
    (lipHeight - thickness) / 2,
    -(width - lipThickness) / 2
  );
}

generateGeometry();

let floor = new THREE.Mesh(geometry, material);

// -------------------
function generatePlane() {
  planeGeo = new THREE.PlaneBufferGeometry(200, 200);
  const planeMaterial = new THREE.MeshBasicMaterial({
    map: planeTexture,
  });
  plane = new THREE.Mesh(planeGeo, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.set(200, thickness / 2 + 1, 100);

  floor.add(plane);
  render();
}
// ---------------------

scene.add(floor);

// -----------------------

// geometry = new THREE.PlaneBufferGeometry(200, 200);
// material = new THREE.MeshBasicMaterial({
//   color: 0xffffff,
//   // side: THREE.DoubleSide,
// });
// const plane = new THREE.Mesh(geometry, material);
// plane.rotation.x = -Math.PI / 2;
// plane.position.set(200, thickness / 2 + 1, 100);
// // scene.add(plane);

// --------------------------
// camera.updateProjectionMatrix();

function generateGeometry() {
  calcGeo();

  geometry = mergeBufferGeometries([
    floorGeo,
    lipRightGeo,
    lipBottomGeo,
    lipLeftGeo,
    lipTopGeo,
  ]);

  if (plane) {
    plane.position.set(length / 2 - 150, thickness / 2 + 1, 100);
  }
}

function render() {
  // texture.repeat.x = length / texture.image.naturalWidth;
  // texture.repeat.y = width / texture.image.naturalHeight;
  // texture.wrapT = THREE.RepeatWrapping;
  // texture.wrapS = THREE.RepeatWrapping;

  floor.geometry.dispose();

  generateGeometry();

  floor.geometry = geometry;

  renderer.render(scene, camera);
  // thickness += 1;
  // lipHeight += 1;
  // floor.rotation.x += 0.01;
  // floor.translateY(1);
  // camera.updateProjectionMatrix();
  // requestAnimationFrame(animate);
}

// render();
