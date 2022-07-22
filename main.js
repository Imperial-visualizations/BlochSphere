//box in front of hex color code, replaces#
import * as THREE from "../node_modules/three/build/three.module.js";
//import {OrbitControls} from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import {OrbitControls} from "../vendor_mods/three/examples/jsm/controls/OrbitControls.js";


//import * as THREE from 'three';
//import { OrbitControls } from 'OrbitControls';

//test git

var controls, camera, renderer;
const scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z=5; //making this smaller, moves sphere closer to you
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#110912");
renderer.setSize(window.innerWidth, window.innerHeight); //makes makes sphere located at center
document.body.appendChild(renderer.domElement);
//so far the black screen you see on the browser is not responsive as we change the screen size
//to correct this:
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / innerHeight; 
    camera.updateProjectionMatrix();
})
var geometry_sphere = new THREE.SphereGeometry(1, 100, 100); //the last number controls how smooth sphere is and so does the second
const geometry_circle = new THREE.CircleGeometry(1,100);
const circle_material = new THREE.MeshBasicMaterial ({color: 0xA0BBEC,side: THREE.DoubleSide});

const circle = new THREE.Mesh(geometry_circle, circle_material);
scene.add(circle);
var material_sphere = new THREE.MeshLambertMaterial({color: 0xB9F4FF,transparent:true, opacity:0.5});
var mesh = new THREE.Mesh(geometry_sphere, material_sphere);
scene.add(mesh);
const axesHelper = new THREE.AxesHelper(1); /* X axis is red. The Y axis is green. The Z axis is blue.*/
scene.add( axesHelper );
//so far we see a black jagged circle 
//add in light:
/*var light = new THREE.PointLight(0xFFFFFF,1,100);
light.position.set(10,10,10);*/
const light = new THREE.AmbientLight( 0x404040 ,3); // soft white light
scene.add( light );

controls = new OrbitControls(camera, renderer.domElement);

/*var dir2 = new THREE.Vector3();
let rad = 1;
let phi = Math.PI/2;
let theta = 0.33*Math.PI;

let dir = dir2.setFromSphericalCoords(rad, phi + Math.PI/2, theta);*/ /*since phi taken from y axis, and users will enter from x axis need to account for the pi/2 difference */
/*let dircomp = dir2.setFromSphericalCoords(1,Math.PI/3, Math.PI/3);*/
/*r, phi, theta where phi is the polar and theta is azimuthal*/
//normalize the direction vector (convert to vector of length 1)
/*dir.normalize();*/
var rangeInput_rad = document.getElementById("myRange_rad");
var rangeInput_theta = document.getElementById("myRange_theta");
var rangeInput_phi = document.getElementById("myRange_phi");
//var rangeInput_xrot = document.getElementById("xrotaxis");
//var rangeInput_yrot = document.getElementById("yrotaxis");
//var rangeInput_zrot = document.getElementById("zrotaxis");
var buttonInput_rad = document.getElementById("btn_rad");



if (buttonInput_rad.addEventListener) {
    buttonInput_rad.addEventListener("click", testtest, false);
   
}
else if (buttonInput_rad.attachEvent) {
    buttonInput_rad.attachEvent('onclick', testtest);
    
}

// window.addEventListener("load",function() {
//     document.getElementById("xrotaxis").addEventListener("click",setAxis);
//  })

// window.addEventListener("load",function() {
//     document.getElementById("yrotaxis").addEventListener("click",setAxis);
//  })

//  window.addEventListener("load",function() {
//     document.getElementById("zrotaxis").addEventListener("click",setAxis);
//  })

// var vectors = [];
// function setAxis(){
    
//     //const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
//     if (vectors.length == 1){
//         console.log(vectors.length);
//         var selectedObject = scene.getObjectByName(line);
//         scene.remove(selectedObject);
        
//         const points = [];
//         points.push( new THREE.Vector3( 0, 0, 0 ) );
//         points.push( new THREE.Vector3( rangeInput_xrot.value, rangeInput_yrot.value, rangeInput_zrot.value ) );


//         const geometry = new THREE.BufferGeometry().setFromPoints( points );
//         //const line = new THREE.Line( geometry, material );

//         var line = new THREE.Line(
//             geometry,
//             new THREE.LineBasicMaterial({
//                 color: 0x0000ff
//             }));
//         scene.add(line);
//         vectors.push(line);
//         console.log(vectors);
//         console.log("check");}

//     else {const points = [];
//         points.push( new THREE.Vector3( 0, 0, 0 ) );
//         points.push( new THREE.Vector3( rangeInput_xrot.value, rangeInput_yrot.value, rangeInput_zrot.value ) );
    
    
//         const geometry = new THREE.BufferGeometry().setFromPoints( points );
//         //const line = new THREE.Line( geometry, material );
    
//         var line = new THREE.Line(
//             geometry,
//             new THREE.LineBasicMaterial({
//                 color: 0x0000ff
//             }));
//         scene.add(line);
//         vectors.push(line);
//         console.log(vectors);
//         console.log("check");}
// }
function testtest(e) {
    console.log(rangeInput_rad.value);
    
    var r = rangeInput_rad.value;
    let theta=rangeInput_theta.value;
    let phi = -rangeInput_phi.value;

    let x=r*Math.cos(phi)*Math.sin(theta); //default is radians
    let y=r*Math.sin(phi)*Math.sin(theta);
    let z=r*Math.cos(theta);

    let dir = new THREE.Vector3(x,y,z);
    dir.normalize();
    const origin = new THREE.Vector3( 0, 0, 0 );
   
    const hex = 6E6361;
    const hexcomp=0xff0000;

    const arrowHelper = new THREE.ArrowHelper( dir, origin, r, hex );
    /*const arrowHelpercomp = new THREE.ArrowHelper( dircomp, origin, 1, hexcomp);*/
    
    scene.add( arrowHelper ); 
    return [dir, r];
} 
/*scene.add(arrowHelpercomp);*/

/*
var button = document.getElementById("rotatebutton");

button.onclick = rotate();*/
    

document.getElementById ("paulixbutton").onclick = function() {let vector = testtest()[0]
    
    var axis = new THREE.Vector3( 1, 0, 0 );
    var angle = Math.PI;
    const origin = new THREE.Vector3( 0, 0, 0 );
    const hex = 0xAA4A44; //add 0x in front of googled hex code
    const new_vector=vector.applyAxisAngle( axis, angle );
   
    const arrowHelpernew = new THREE.ArrowHelper( new_vector, origin, testtest()[1], hex );

    scene.add( arrowHelpernew );
    console.log("clickedx");
   }


document.getElementById ("pauliybutton").onclick = function() {let vector = testtest()[0]
   
    var axis = new THREE.Vector3( 0, 1, 0 );
    var angle = Math.PI;
    const origin = new THREE.Vector3( 0, 0, 0 );
    const hex = 0xAA4A44;
    const new_vector=vector.applyAxisAngle( axis, angle );

    const arrowHelpernew = new THREE.ArrowHelper( new_vector, origin, testtest()[1], hex );

    scene.add( arrowHelpernew );
    console.log("clickedy");
   }
    
    
   document.getElementById ("paulizbutton").onclick = function() {let vector = testtest()[0]
   
    var axis = new THREE.Vector3( 0, 0, 1 );
    var angle = Math.PI;
    const origin = new THREE.Vector3( 0, 0, 0 );
    const hex = 0xAA4A44;
    const new_vector=vector.applyAxisAngle( axis, angle );

    const arrowHelpernew = new THREE.ArrowHelper( new_vector, origin, testtest()[1], hex );

    scene.add( arrowHelpernew );
    console.log("clickedz");
   }

   document.getElementById ("identity").onclick = function() {
    const origin = new THREE.Vector3( 0, 0, 0 );
    const hex = 0xAA4A44;
    const arrowHelper = new THREE.ArrowHelper(testtest()[0] , origin, testtest()[1], hex );
    const arrowHelpernew = arrowHelper;

    scene.add( arrowHelpernew );
    console.log("clickedid");
   }

   document.getElementById ("hadamard").onclick = function() {

    let vector = testtest()[0]
   
    var axis1 = new THREE.Vector3( 0, 1, 0 );
    var angle1 = Math.PI/2;

    const new_vector1=vector.applyAxisAngle( axis1, angle1 );
    
    var axis2 = new THREE.Vector3(1,0,0);
    var angle2=Math.PI

    const new_vector2=new_vector1.applyAxisAngle( axis2, angle2 );
    const origin = new THREE.Vector3( 0, 0, 0 );
    const hex = 0xAA4A44;
    const arrowHelpernew = new THREE.ArrowHelper( new_vector2, origin, testtest()[1], hex );
    /*90º rotation around the Y-axis, followed by a 180º rotation around the X-axis*/
    scene.add( arrowHelpernew );
    console.log("clickedhad");
   }

   
//earlier on: background is black but want the grey color that is set above
//to correct this:

//also orbits control only works after adding the below two lines
controls.addEventListener('change',render);

function render(){
    renderer.render(scene, camera);
}



// function buttonFunction(){

    
//     let angle=0
//         function setup(){
//         createCanvas(400,400);
//         angleMode(DEGREES);
//     }
    
//     function draw(){
//         background(0);
//         rotate(angle);
//         fill(255, 100, 50);
//         rect(0, 0, 100, 50);
//         angle = angle + 5;
//     }  
//     console.log("hello")     
    
    // const origin = new THREE.Vector3(0, 0, 0);
    // rotate(90 * 3.14 / 180)
    
   // var xDir = new THREE.Vector3(1, 0, 0);
   // var length = 1;
   // var arrow = new THREE.ArrowHelper(xDir, origin, length, 0xff0000);
   // var ob = new THREE.Object3D();
    //scene.add(ob);
    //ob.add(arrow);
    //ob.rotation.order = 'XYZ';




//without comments
{/* <script type="module">
import * as THREE from "../node_modules/three/build/three.module.js";

import {OrbitControls} from "../vendor_mods/three/examples/jsm/controls/OrbitControls.js";            
export default{

name: 'TheCanvas',
data: function(){              



var controls, camera, renderer;
const scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z=5; //making this smaller, moves sphere closer to you
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / innerHeight; 
    camera.updateProjectionMatrix();
})
var geometry_sphere = new THREE.SphereGeometry(1, 100, 100); //the last number controls how smooth sphere is and so does the second
const geometry_circle = new THREE.CircleGeometry(1,100);
const circle_material = new THREE.MeshBasicMaterial ({color: 0xA0BBEC});
const circle = new THREE.Mesh(geometry_circle, circle_material);
scene.add(circle);
var material_sphere = new THREE.MeshLambertMaterial({color: 0xB9F4FF,transparent:true, opacity:0.5});
var mesh = new THREE.Mesh(geometry_sphere, material_sphere);
scene.add(mesh);

var light = new THREE.PointLight(0xFFFFFF,1,500);
light.position.set(10,0,25);
scene.add(light);
controls = new OrbitControls(camera, renderer.domElement);
const dir = new THREE.Vector3( 0, 0, 1 );


dir.normalize();

const origin = new THREE.Vector3( 0, 0, 0 );
const length = 1;
const hex = 6E6361;

const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );

scene.add( arrowHelper );



controls.addEventListener('change',render);

function render(){
    renderer.render(scene, camera);
}
}
}
</script>
 */}

 //PUT THIS INTO APP.VUE
//  <script type="module">
// import TheCanvas from '../pg1/pg1.vue'

// export default {
//     name: 'App',
//     components: {
//         TheCanvas,
//     },
// }

// </script>



