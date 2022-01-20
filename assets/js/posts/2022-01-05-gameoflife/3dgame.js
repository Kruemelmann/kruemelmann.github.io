import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer;
let plane;
let pointer, raycaster, isShiftDown = false;
let rollOverMesh, rollOverMaterial;
let cubeGeo, cubeMaterial;
const objects = [];

let resolution = 0.7;
let three_container = document.querySelector("#three-container")

init();
render();

function init() {
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 500, 800, 1300 );
    camera.lookAt( 0, 0, 0 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x101010 );

    // roll-over helpers
    const rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
    rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
    rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
    scene.add( rollOverMesh );

    // cubes
    cubeGeo = new THREE.BoxGeometry( 50, 50, 50 );
    cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xff0000} );

    // grid
    const gridHelper = new THREE.GridHelper( 1000, 20 );
    scene.add( gridHelper );

    //
    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    const geometry = new THREE.PlaneGeometry( 1000, 1000 );
    geometry.rotateX( - Math.PI / 2 );

    plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
    scene.add( plane );

    objects.push( plane );

    // lights

    const ambientLight = new THREE.AmbientLight( 0x606060 );
    scene.add( ambientLight );

    const directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
    scene.add( directionalLight );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth* resolution, window.innerHeight *resolution);
    renderer.domElement.style.width  = '100%';
    renderer.domElement.style.height = 'auto';

    three_container.appendChild( renderer.domElement );
    const controls = new OrbitControls( camera, renderer.domElement );

    document.addEventListener( 'pointermove', onPointerMove );
    //document.addEventListener( 'pointerdown', onPointerDown );
    document.addEventListener( 'keydown', onDocumentKeyDown );
    document.addEventListener( 'keyup', onDocumentKeyUp );
    window.addEventListener( 'resize', onWindowResize );
}

//TODO
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth*resolution, window.innerHeight*resolution );
    render();
}

function onPointerMove( event ) {

    pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

    raycaster.setFromCamera( pointer, camera );

    const intersects = raycaster.intersectObjects( objects, false );

    if ( intersects.length > 0 ) {

        const intersect = intersects[ 0 ];

        rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
        rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );

    }

    render();

}

//function onPointerDown( event ) {
    //pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
    //raycaster.setFromCamera( pointer, camera );
    //const intersects = raycaster.intersectObjects( objects, false );
    //if ( intersects.length > 0 ) {
        //const intersect = intersects[ 0 ];
        //if ( isShiftDown ) {
            //// delete cube
            //if ( intersect.object !== plane ) {
                //scene.remove( intersect.object );
                //objects.splice( objects.indexOf( intersect.object ), 1 );
            //}
        //} else {
            //// create cube
            //const voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
            //voxel.position.copy( intersect.point ).add( intersect.face.normal );
            //voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
            //console.log(intersect.point);
            //scene.add( voxel );
            //objects.push( voxel );
        //}
        //render();
    //}
//}

function onDocumentKeyDown( event ) {
    switch ( event.keyCode ) {
        case 16: isShiftDown = true; break;
    }
}
function onDocumentKeyUp( event ) {
    switch ( event.keyCode ) {
        case 16: isShiftDown = false; break;
    }
}
function render() {
    renderer.render( scene, camera );
}


//draw a cube todo document
function drawcube(x,y,z){
    let face = {x: 0,y: 1,z: 6,}
    //50 is the cube size
    let point = {x: 50 * x,y: 50 * y,z: 50 * z,}

    const voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
    voxel.position.copy( point ).add( face );
    voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
    scene.add( voxel );
    objects.push( voxel );
}

//3d game of life
function gen3dArr(grid_length, grid_width, grid_height) {
    let grid = new Array(grid_length)

    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(grid_height)
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = new Array(grid_width)
        }
    }
    return grid
}
let grid = gen3dArr(10,10,10)


generateRandomCubes(grid)

function generateRandomCubes(grid) {
    generateSector(-1,-1,-1)
    generateSector(-1,-1,1)
    generateSector(-1,1,-1)
    generateSector(-1,1,1)
    generateSector(1,-1,-1)
    generateSector(1,-1,1)
    generateSector(1,1,-1)
    generateSector(1,1,1)
}

function generateSector(signi, signj, signk) {
    //fill with random vals
    let filled_percent = 1/10
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            for (let k = 0; k < grid[i][j].length; k++) {
                if(Math.random() < filled_percent) {
                    grid[i][j][k] = Math.round(Math.random());
                    if (grid[i][j][k] == 1) {
                        drawcube(signi*i,signj*j,signk*k)
                    }
                } else {
                    grid[i][j][k] = 0;
                }
            }
        }
    }
}
//
//actualy play the game
function animate(){
    setTimeout(function(){

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                for (let k = 0; k < grid[i][j].length; k++) {
                    if(Math.random() < 1/10) {
                        grid[i][j][k] = Math.round(Math.random());
                        if (grid[i][j][k] == 1) {
                            drawcube(i,j,k)
                        }
                    } else {
                        grid[i][j][k] = 0;
                    }
                }
            }
        }

        animate()
    }, 1000);
}
// FIXME add button to toggle animation
animate()
