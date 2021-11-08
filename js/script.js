import * as THREE from "https://cdn.skypack.dev/three@0.134.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector("canvas");

const length = 1200;
const width = 600;
const thickness = 25;
const lipHeight = 40;
const lipThickness = 10;

var scene = new THREE.Scene();
scene.background = new THREE.Color("black");

var camera = new THREE.PerspectiveCamera(
  75,
  canvas.offsetWidth / canvas.offsetHeight,
  2,
  2000
);
camera.position.set(200, 450, 1000);
// camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(100, 500, 1000);
scene.add(light);

const controls = new OrbitControls(camera, canvas);
// controls.target.set(0, 5, 0);
controls.update();

let material = new THREE.LineBasicMaterial({
  color: 0x0000ff,
});
let points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(1000, 0, 0)];
let geometry = new THREE.BufferGeometry().setFromPoints(points);
let lineOX = new THREE.Line(geometry, material);

material = new THREE.LineBasicMaterial({
  color: 0xff0000,
});
points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1000, 0)];
geometry = new THREE.BufferGeometry().setFromPoints(points);
let lineOY = new THREE.Line(geometry, material);

material = new THREE.LineBasicMaterial({
  color: 0x00ff00,
});
points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 1000)];
geometry = new THREE.BufferGeometry().setFromPoints(points);
let lineOZ = new THREE.Line(geometry, material);

let groupCoordSystem = new THREE.Group();
groupCoordSystem.add(lineOX, lineOY, lineOZ);
scene.add(groupCoordSystem);
// ---------------------------------------------------------------------
material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });

geometry = new THREE.BoxBufferGeometry(length, thickness, width);
let floor = new THREE.Mesh(geometry, material);

geometry = new THREE.BoxBufferGeometry(lipThickness, lipHeight, width);
let lipRight = new THREE.Mesh(geometry, material);
lipRight.position.set(
  (length - lipThickness) / 2,
  (lipHeight - thickness) / 2,
  0
);

geometry = new THREE.BoxBufferGeometry(length, lipHeight, lipThickness);
let lipBottom = new THREE.Mesh(geometry, material);
lipBottom.position.set(
  0,
  (lipHeight - thickness) / 2,
  (width - lipThickness) / 2
);

geometry = new THREE.BoxBufferGeometry(lipThickness, lipHeight, width);
let lipLeft = new THREE.Mesh(geometry, material);
lipLeft.position.set(
  -(length - lipThickness) / 2,
  (lipHeight - thickness) / 2,
  0
);

geometry = new THREE.BoxBufferGeometry(length, lipHeight, lipThickness);
let lipTop = new THREE.Mesh(geometry, material);
lipTop.position.set(
  0,
  (lipHeight - thickness) / 2,
  -(width - lipThickness) / 2
);

let groupFloor = new THREE.Group();
groupFloor.add(floor, lipRight, lipBottom, lipLeft, lipTop);

scene.add(groupFloor);

// -----------------------

geometry = new THREE.PlaneBufferGeometry(200, 200);
material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  // side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2;
plane.position.set(200, thickness / 2 + 1, 100);
scene.add(plane);

// --------------------------
// renderer.render(scene, camera);
// camera.updateProjectionMatrix();

function animate() {
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();
