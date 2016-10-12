var g_scene;
var g_controls;
var g_camera, g_scene, g_renderer;
var g_mesh;
var xyzT=2;////

function init() {
    g_scene = new THREE.Scene();
    var container = document.getElementById('drawingArea');

    var height = window.innerHeight;
    var width = window.innerWidth;
    g_camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    g_scene.add(g_camera);

    g_renderer = new THREE.WebGLRenderer({
	alpha : true,
	antialias : true
    });
    
    g_renderer.shadowMap.enabled = true;
    g_renderer.setClearColor(0xbbd7e9, 1);
    container.appendChild(g_renderer.domElement);
    

    g_controls = new THREE.OrbitControls(g_camera, g_renderer.domElement);
    g_controls.enableDamping = true;
    g_controls.dampingFactor = 0.25;
    g_controls.enableZoom = true;
    g_camera.position.set(g_camera.position.x, g_camera.position.y + 100, g_camera.position.z + 600);

    var resizeCallback = function() {
	var panelWidth = window.innerWidth;
	var panelHeight = window.innerHeight;

	var devicePixelRatio = window.devicePixelRatio || 1;
	g_renderer.setSize(panelWidth * devicePixelRatio, panelHeight * devicePixelRatio);
	g_renderer.domElement.style.width = panelWidth + 'px';
	g_renderer.domElement.style.height = panelHeight + 'px';
	g_camera.aspect = panelWidth / panelHeight;
	g_camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', resizeCallback, false);
    resizeCallback();

    createLights();
    createFloor();
    createMesh();

    
}


function createLights() {
    var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x101010, 0.9)
    g_scene.add(hemisphereLight);

    var ambientLight = new THREE.AmbientLight(0x2f2f2f)
    g_scene.add(ambientLight);

    var sunLight = new THREE.DirectionalLight(0xffffff, 0.30);
    sunLight.position.set(300, 600, 500);
    sunLight.castShadow = true;
    sunLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera());
    g_scene.add(sunLight);
}


function createFloor() {
    var groundMaterial = new THREE.MeshPhongMaterial({
	shininess : 80,
	color : 0xd3d3d3,
	specular : 0xd3d3d3
    });

    var floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(6000, 3000), groundMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -45;
    floor.receiveShadow = true;
    g_scene.add(floor);
}


function createMesh() {
  g_mesh = new Mesh(g_scene,xyzT);/////
}


function animate() {
    g_controls.update();

    window.addEventListener('keydown', onKeyDown, false);////

    // Render scene
    requestAnimationFrame(animate);
    //console.log(g_scene.children.length);
    if(g_scene.children[5]){
    //g_scene.children[5].geometry.scale(xyzT,xyzT,xyzT);
    
    }
    g_renderer.render(g_scene, g_camera);
}

function onKeyDown(e){////
    KeyDownFunc(e);
}

function KeyDownFunc(e){////

	// ------------------------------------------------------------
	// 入力情報を取得
	// ------------------------------------------------------------
	// キーコード
	var key_code = e.keyCode;
	// Shiftキーの押下状態
	var shift_key = e.shiftKey;
	// Ctrlキーの押下状態
	var ctrl_key = e.ctrlKey;
	// Altキーの押下状態
	var alt_key = e.altKey;

    if(e.keyCode == 84){
           if(g_scene.children[5]){
           g_scene.children[5].geometry.scale(xyzT,xyzT,xyzT);
           //g_scene.children[5].geometry.scale(30,30,30);
    }
    }
    if(e.keyCode == 82){
           if(g_scene.children[5]){
           g_scene.children[5].geometry.scale(xyzT/4,xyzT/4,xyzT/4);
    }
    }
    
    
    if(e.keyCode == 87){
           if(g_scene.children[5]){
           g_scene.children[5].geometry.rotation(0,1,0);
    }
    }
    if(e.keyCode == 83){
           if(g_scene.children[5]){
           g_scene.children[5].geometry.rotation(0,-1,0);
    }
    }
    if(e.keyCode == 65){
           if(g_scene.children[5]){
           g_scene.children[5].geometry.rotation(1,0,0);
    }
    }
    if(e.keyCode == 68){
           if(g_scene.children[5]){
           g_scene.children[5].geometry.rotation(-1,0,0);
    }
    }
	// ------------------------------------------------------------
	// 出力テスト
	// ------------------------------------------------------------
	console.log("code:" + xyzT);
	console.log("code:" + key_code);
	console.log("shift:" + shift_key);
	console.log("ctrl" + ctrl_key);
	console.log("alt:" + alt_key);
}
