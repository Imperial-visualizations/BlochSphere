

// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000)
// camera.position.z=3
// scene.add(camera)
// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({color:'red'})
// const mesh = new THREE.Mesh(geometry,material)
// scene.add(mesh)

// const renderer = new THREE.WebGLRenderer({antialias:true})
// renderer.setClearColor("#e5e5e5")
// renderer.setSize(window.innerWidth,window.innerHeight)
// document.body.appendChild(renderer.donElement)
// renderer.render(scene, camera)

import * as THREE from 'three';
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)
camera.position.z = 5;
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);
window.addEventListener('resize', () => {
renderer.setSize(window.innerWidth,window.innerHeight);
camera.aspect = window.innerWidth / window.innerHeight;

camera.updateProjectionMatrix();
})

var geometry = new THREE.SphereGeometry(1, 10, 10);
var material = new THREE.MeshLambertMaterial({color: 0xFFCC00});
var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
renderer.render(scene, camera)