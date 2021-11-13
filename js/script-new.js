import * as THREE from "https://cdn.skypack.dev/three@0.134.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/controls/OrbitControls.js";

const texture = new THREE.TextureLoader().load("./images/fon.jpg", animate);
texture.wrapT = THREE.RepeatWrapping;
texture.wrapS = THREE.RepeatWrapping;

const canvas = document.querySelector("canvas");

let scene = new THREE.Scene();
scene.background = new THREE.Color("black");

let axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

let camera = new THREE.PerspectiveCamera(
  75,
  canvas.offsetWidth / canvas.offsetHeight,
  2,
  100
);
camera.position.set(10, 15, 15);

let renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(20, 45, 100);
scene.add(light);
const light1 = new THREE.AmbientLight(0x404040);
scene.add(light1);

const controls = new OrbitControls(camera, canvas);
controls.addEventListener("change", animate);
controls.update();

// const figGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
// ----------------------------------
const vertices = [
  // // front
  // { pos: [-1, -1, 1], uv: [0, 0] }, // 0
  // { pos: [1, -1, 1], uv: [1, 0] }, // 1
  // { pos: [-1, 1, 1], uv: [0, 1] }, // 2
  // { pos: [1, 1, 1], uv: [1, 1] }, // 3
  // // right
  // { pos: [1, -1, 1], uv: [0, 0] }, // 4
  // { pos: [1, -1, -1], uv: [1, 0] }, // 5
  // { pos: [1, 1, 1], uv: [0, 1] }, // 6
  // { pos: [1, 1, -1], uv: [1, 1] }, // 7
  // // back
  // { pos: [1, -1, -1], uv: [0, 0] }, // 8
  // { pos: [-1, -1, -1], uv: [1, 0] }, // 9
  // { pos: [1, 1, -1], uv: [0, 1] }, // 10
  // { pos: [-1, 1, -1], uv: [1, 1] }, // 11
  // // left
  // { pos: [-1, -1, -1], uv: [0, 0] }, // 12
  // { pos: [-1, -1, 1], uv: [1, 0] }, // 13
  // { pos: [-1, 1, -1], uv: [0, 1] }, // 14
  // { pos: [-1, 1, 1], uv: [1, 1] }, // 15
  // // top
  // { pos: [1, 1, -1], uv: [0, 0] }, // 16
  // { pos: [-1, 1, -1], uv: [1, 0] }, // 17
  // { pos: [1, 1, 1], uv: [0, 1] }, // 18
  // { pos: [-1, 1, 1], uv: [1, 1] }, // 19
  // // bottom
  // { pos: [1, -1, 1], uv: [0, 0] }, // 20
  // { pos: [-1, -1, 1], uv: [1, 0] }, // 21
  // { pos: [1, -1, -1], uv: [0, 1] }, // 22
  // { pos: [-1, -1, -1], uv: [1, 1] }, // 23
  // ------------------------------
  // front
  { pos: [-6, -2, 4], uv: [0, 0.5] }, // 0
  { pos: [6, -2, 4], uv: [0.7, 0.5] }, // 1
  { pos: [6, 2, 4], uv: [0.7, 1] }, // 2
  { pos: [-6, 2, 4], uv: [0, 1] }, // 3
  // right
  { pos: [6, -2, 4], uv: [0.7, 0.5] }, // 4
  { pos: [6, -2, -4], uv: [1, 0.5] }, // 5
  { pos: [6, 2, -4], uv: [1, 1] }, // 6
  { pos: [6, 2, 4], uv: [0.7, 1] }, // 7
  //top
  { pos: [-6, 2, 4], uv: [0, 1] }, // 8
  { pos: [6, 2, 4], uv: [0.3, 0.3] }, // 9
  { pos: [6, 2, -4], uv: [1, 1] }, //10
  //bottom
  { pos: [6, -2, 4], uv: [0, 0] }, // 11
  { pos: [-6, -2, 4], uv: [1, 0] }, // 12
  { pos: [6, -2, -4], uv: [0, 1] }, // 13
  //back
  { pos: [6, -2, -4], uv: [0, 0] }, // 14
  { pos: [-6, -2, 4], uv: [0, 1] }, // 15
  { pos: [-6, 2, 4], uv: [1, 1] }, // 16
  { pos: [6, 2, -4], uv: [0, 1] }, // 17
];
const numVertices = vertices.length;
const positions = new Float32Array(numVertices * 3);
const uvs = new Float32Array(numVertices * 2);
let posNdx = 0;
let uvNdx = 0;

vertices.forEach((vertex) => {
  positions.set(vertex.pos, posNdx);
  uvs.set(vertex.uv, uvNdx);
  posNdx += 3;
  uvNdx += 2;
});
// ---------------------
for (let i = 0; i < uvs.length; i += 2) {}
// ---------------

const figGeometry = new THREE.BufferGeometry();
figGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
figGeometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

// uvs.set([0, 0], 0);
// uvs.set([1, 0], 2);
// uvs.set([1, 1], 4);
// uvs.set([0, 1], 6);
// figGeometry.attributes.uv.needsUpdate = true;

// const normals = [];
// const uvs = [];
// for (const vertex of vertices) {
//   positions.push(...vertex.pos);
//   // normals.push(...vertex.norm);
//   uvs.push(...vertex.uv);
// }

figGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(new Float32Array(positions), 3)
);
// figGeometry.setAttribute(
//   "normal",
//   new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents)
// );
figGeometry.setAttribute(
  "uv",
  new THREE.BufferAttribute(new Float32Array(uvs), 2)
);

// figGeometry.setIndex([
//   0, 1, 2, 2, 1, 3, 4, 5, 6, 6, 5, 7, 8, 9, 10, 10, 9, 11, 12, 13, 14, 14, 13,
//   15, 16, 17, 18, 18, 17, 19, 20, 21, 22, 22, 21, 23,
// ]);
figGeometry.setIndex([
  0, 1, 2, 2, 3, 0, 4, 5, 6, 6, 7, 4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 17,
  14,
]);

figGeometry.computeVertexNormals();

// ----------------------------------

const figMaterial = new THREE.MeshPhongMaterial({
  map: texture,
  // color: 0xaaaaaa,
});

let fig = new THREE.Mesh(figGeometry, figMaterial);
scene.add(fig);
console.log(fig);

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
