
Mesh = function(scene,xyzT) {

	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {

		console.log( item, loaded, total );

	};
	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};

	var onError = function ( xhr ) {
	};

	var loader = new THREE.OBJLoader(manager );

	var mesh;

	//loader.load( './data/cube.obj', function( object ) {
	loader.load( './data/bunny.obj', function( object ) {
	//loader.load( './data/sphere.obj', function( object ) {
		mesh = object.children[0];
		var obj_geometry = mesh.geometry;
		obj_geometry.normalsNeedUpdate = true;
		obj_geometry.computeFaceNormals();
		obj_geometry.computeVertexNormals();
		obj_geometry.scale(xyzT,xyzT,xyzT);
        //obj_geometry.scale(700,700,700);
		mesh.castShadow = true;
		mesh.receiveShadow = true;		

		scene.add(mesh);

        }, onProgress, onError);


}


