

import * as THREE from 'three';

import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const tau = Math.PI*2;
let camera, scene, renderer;

let pill;

const pills = [];
window.pills = pills;

const pillDistance = 2.0;
const halfPillDistance = pillDistance/2;
const pillDepthModifier = 0.1;

const clonePillToRandomLocation = function() {
    if (pill) {
        const clonedPill = pill.clone();
        clonedPill.position.set(
            -halfPillDistance + (Math.random()*pillDistance),
            -halfPillDistance*pillDepthModifier + (Math.random()*pillDistance*pillDepthModifier),
            -halfPillDistance + (Math.random()*pillDistance)
        );
        clonedPill.rotation.set(
            Math.random()*tau,
            Math.random()*tau,
            Math.random()*tau,
        );
        scene.add(clonedPill);
        pills.push(clonedPill);
        render();
    };
};

const addPillButton = document.getElementById('add-pill');
if (addPillButton) {
    addPillButton.addEventListener('click', clonePillToRandomLocation);
};

init();
render();

function init() {

    

    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true} );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.domElement.classList.add('ibuprofen-canvas');
    document.body.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 
        90,
        window.innerWidth / window.innerHeight, 
        0.01, // near clipping plane needed to be moved closer to the camera
        2000
    );
    camera.position.set( 0, 1, 0 );
    window.camera = camera;
    camera.rotation.x = -Math.PI/2; 

    const environment = new RoomEnvironment( renderer );
    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0xbbbbbb );
    scene.environment = pmremGenerator.fromScene( environment ).texture;
    environment.dispose();

    
    const grid = new THREE.GridHelper( 2, 10, 0xffffff, 0xffffff );
    grid.material.opacity = 1;
    grid.material.depthWrite = false;
    grid.material.transparent = true;
    scene.add( grid );
    

    const ktx2Loader = new KTX2Loader()
        .setTranscoderPath( 'jsm/libs/basis/' )
        .detectSupport( renderer );

    const loader = new GLTFLoader().setPath( 'models/' );
    loader.setKTX2Loader( ktx2Loader );
    loader.setMeshoptDecoder( MeshoptDecoder );
    loader.load( 'ibuprofen.glb', function ( gltf ) {

        // coffeemat.glb was produced from the source scene using gltfpack:
        // gltfpack -i coffeemat/scene.gltf -o coffeemat.glb -cc -tc
        // The resulting model uses EXT_meshopt_compression (for geometry) and KHR_texture_basisu (for texture compression using ETC1S/BasisLZ)

        gltf.scene.scale.setScalar(10);

        pill = gltf.scene;
        window.pill = pill;
        clonePillToRandomLocation();
        clonePillToRandomLocation();
        clonePillToRandomLocation();
        clonePillToRandomLocation();
        clonePillToRandomLocation();
        clonePillToRandomLocation();
        render();
    } );
/*
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render ); // use if there is no animation loop
    controls.minDistance = 400;
    controls.maxDistance = 1000;
    controls.target.set( 0, 0, 0 );
    controls.update();
*/
    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

//

function render() {

    renderer.render( scene, camera );

}
let lastTime = 0;
const pillRotationSpeed = 2;

const animationFrameHandler = function(now) {
    const delta = (now - lastTime)/1000;
    requestAnimationFrame(animationFrameHandler);
    //console.log('what is delta?', delta);
    pills.forEach(function(pill){
        pill.rotation.z += pillRotationSpeed*delta;
    })
    render();
    lastTime = now;
}
requestAnimationFrame(animationFrameHandler);
