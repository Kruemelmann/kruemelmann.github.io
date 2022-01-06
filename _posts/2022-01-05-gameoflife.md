---

layout: blog
title: game of life john conway's
published: true
tags: bazel golang

---

Playground for my john conways game of life implementation. for now its just a playground not an article (maybe later)


<div>
    <canvas id="myCanvas" width="1000" height="800"></canvas>
    <script>
    'use strict'
    let res = 10;
    let grid_border_thickness = 0.07;

    const isPrime = num => {
        for(let i = 2, s = Math.sqrt(num); i <= s; i++)
            if(num % i === 0) return false;
        return num > 1;
    }

    function gen2dArr(cols, rows) {
        //get a 2d canvas
        let grid = [...Array(rows)].map(x=>Array(cols).fill(0))

        //fill with random vals
        let filled_percent = 1/6
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid.length; j++) {
                if(Math.random() < filled_percent) {
                    grid[i][j] = Math.round(Math.random());
                }
            }
        }

 // spawn a glider
 //       let xcor = 10;
 //       let ycor = 10;
 //       grid[xcor-1][ycor-1] = 0;//top left
 //       grid[xcor][ycor-1] = 0;//top mid
 //       grid[xcor+1][ycor-1] = 1;//top right
 //       grid[xcor-1][ycor] = 1;//mid left
 //       grid[xcor+1][ycor] = 1;//mid right
 //       grid[xcor-1][ycor+1] = 0;//below left
 //       grid[xcor][ycor+1] = 1;//below mid
 //       grid[xcor+1][ycor+1] = 1;//below right
        return grid;
    }

    //draw the grid
    function drawGrid(ctx, grid) {
        ctx.lineWidth = grid_border_thickness;
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid.length; j++) {
                let xcor = i * res;
                let ycor = j * res;

                ctx.beginPath();
                if(grid[i][j] == undefined) {
                    console.log("err")
                }

                if(grid[i][j] == 1) {
                    ctx.fillStyle = "black";
                    ctx.fillRect(xcor, ycor, res, res);
                } else {
                    ctx.fillStyle = "white";
                    ctx.rect(xcor, ycor, res, res);
                    ctx.fill()
                    ctx.stroke()
                }
            }
        }
    }


    function calcNeighbours(grid, xcor, ycor) {
        let sum = 0;
        sum += grid[xcor-1][ycor-1];//top left
        sum += grid[xcor][ycor-1];//top mid
        sum += grid[xcor+1][ycor-1];//top right

        sum += grid[xcor-1][ycor];//mid left
        sum += grid[xcor+1][ycor];//mid right

        sum += grid[xcor-1][ycor+1];//below left
        sum += grid[xcor][ycor+1];//below mid
        sum += grid[xcor+1][ycor+1];//below right

        return sum
    }

    function playTheGameOfLife(grid, cols, rows) {
    //TODO remove this this is eating performance:) instead toggle between two arrays
        let new_grid = gen2dArr(cols, rows);
        let n = 0;

        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                // no flickering at the borders -> TODO remove this and move to an infinite grid
                if(i == 0 || j == 0 || i >= grid.length-1 || i >= grid[i].length-1) {
                    new_grid[i][j] = 0
                    continue
                }

                n = calcNeighbours(grid, i, j);
                if(grid[i][j] == 0) {
                    //dead cell
                    if(n == 3) {
                        new_grid[i][j] = 1;
                    } else {
                        new_grid[i][j] = 0;
                    }
                } else if (grid[i][j] == 1) {
                    //living cell
                    if(n < 2) {
                        new_grid[i][j] = 0;
                    } else if (n == 2 || n == 3) {
                        new_grid[i][j] = 1;
                    } else {
                        new_grid[i][j] = 0;
                    }
                }
            }
        }

        return new_grid
    }

    (async () => {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        let cols = c.width / res;
        let rows = c.height / res;

        let grid = await gen2dArr(cols, rows);

        drawGrid(ctx, grid);

        //actualy play the game
        function test(){
            setTimeout(function(){
                drawGrid(ctx, grid);
                grid = playTheGameOfLife(grid, cols, rows)
                test()
            }, 100);
        }
        // FIXME add button to toggle animation
        //        test()
    })();
    </script>
</div>





## 3d game of live


<div>
    <div id="three-container"> </div>
	<style>
		a {
			color: #08f;
		}
	</style>
	<div id="info">
		<a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> - voxel painter - webgl<br>
		<strong>click</strong>: add voxel, <strong>shift + click</strong>: remove voxel
	</div>
	<script type="module">
		import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
		let camera, scene, renderer;
		let plane;
		let pointer, raycaster, isShiftDown = false;
		let rollOverMesh, rollOverMaterial;
		let cubeGeo, cubeMaterial;
		const objects = [];

        let resolution = 0.5;
        let three_container = document.querySelector("#three-container")

		init();
		render();

		function init() {
			camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
			camera.position.set( 500, 800, 1300 );
			camera.lookAt( 0, 0, 0 );

			scene = new THREE.Scene();
			scene.background = new THREE.Color( 0xf0f0f0 );

			// roll-over helpers
			const rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
			rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
			rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
			scene.add( rollOverMesh );

			// cubes
			cubeGeo = new THREE.BoxGeometry( 50, 50, 50 );
			cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xfeb74c, map: new THREE.TextureLoader().load( 'textures/square-outline-textured.png' ) } );

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
			three_container.appendChild( renderer.domElement );

			document.addEventListener( 'pointermove', onPointerMove );
			document.addEventListener( 'pointerdown', onPointerDown );
			document.addEventListener( 'keydown', onDocumentKeyDown );
			document.addEventListener( 'keyup', onDocumentKeyUp );

			//

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

		function onPointerDown( event ) {

			pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

			raycaster.setFromCamera( pointer, camera );

			const intersects = raycaster.intersectObjects( objects, false );

			if ( intersects.length > 0 ) {

				const intersect = intersects[ 0 ];

				// delete cube

				if ( isShiftDown ) {

					if ( intersect.object !== plane ) {

						scene.remove( intersect.object );

						objects.splice( objects.indexOf( intersect.object ), 1 );

					}

					// create cube

				} else {

					const voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
					voxel.position.copy( intersect.point ).add( intersect.face.normal );
					voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
					scene.add( voxel );

					objects.push( voxel );

				}

				render();

			}

		}
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
	</script>
</div>


