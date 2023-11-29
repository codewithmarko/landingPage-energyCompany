import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import waterVertexShader from '../glsl/water/vertex.glsl';
import waterFragmentShader from '../glsl/water/fragment.glsl';

//Canvases

const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');
const canvas3 = document.getElementById('canvas3');

//Loaders
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./models/draco/');

//Global materials
let waterAquaPureMaterial;

//new Object creates new imported Blender model
class Object {
  constructor(canvas, name, fov, x, y, z, minDistance, maxDistance) {
    this.experience = new Experience(
      canvas,
      fov,
      x,
      y,
      z,
      minDistance,
      maxDistance
    );
    this.scene = this.experience.scene;

    this.textureLoader = this.experience.textureLoader;
    this.gltfLoader = this.experience.gltfLoader;

    this.texture = this.createTextures(name);
    this.material = this.createMaterial(name);
    this.loadGLTF(name);

    //Time
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    //Time
  }

  clock = new THREE.Clock();

  timeTick = () => {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = (this.current - this.start) / 1000;

    window.requestAnimationFrame(() => {
      this.timeTick();
    });

    waterAquaPureMaterial.uniforms.uTime.value = this.elapsed;
  };

  createTextures(name) {
    const bakedTexture = this.textureLoader.load(
      `./models/${name}/${name}Baked.jpg`
    );
    bakedTexture.flipY = false;
    bakedTexture.colorSpace = THREE.SRGBColorSpace;
    return bakedTexture;
  }

  createMaterial() {
    const material = new THREE.MeshBasicMaterial({ map: this.texture });
    return material;
  }

  createAdditionalMaterial(name, mesh) {
    if (name === 'aquapure') {
      //   color: 0x5f75ff,
      waterAquaPureMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColorStart: { value: new THREE.Color(0x5f75ff) },
          uColorEnd: { value: new THREE.Color(0xffff) },
        },
        vertexShader: waterVertexShader,
        fragmentShader: waterFragmentShader,
      });
      mesh.material = waterAquaPureMaterial;
    }
    //Start the time tick function after adding the material
    window.requestAnimationFrame(() => {
      this.timeTick();
    });
  }

  loadGLTF(name) {
    this.gltfLoader.load(`./models/${name}/${name}.glb`, (gltf) => {
      gltf.scene.traverse((child) => {
        child.material = this.material;
      });

      //Check if model needs repositioning on canvas
      if (gltf.parser.options.path === './models/windstream/') {
        gltf.scene.position.y = -4;
      }

      //Check if child of model needs shader material
      const waterMesh = gltf.scene.children.find(
        (child) => child.name === 'waterAquaPure'
      );

      if (waterMesh) {
        this.createAdditionalMaterial(name, waterMesh);
      }

      this.scene.add(gltf.scene);
    });
  }
}

//Will be called when creating a new Object, sets up the scene.
class Experience {
  constructor(canvas, fov, x, y, z, minDistance, maxDistance) {
    this.canvas = canvas;

    this.scene = this.createScene();
    this.camera = this.createCamera(fov, x, y, z);
    this.renderer = this.createRenderer();
    this.controls = this.setControls(minDistance, maxDistance);
    this.textureLoader = textureLoader;
    this.gltfLoader = gltfLoader;

    window.addEventListener('resize', () => this.resize());
    window.addEventListener('load', () => this.requestRenderIfNotRequested());
    this.controls.addEventListener('change', () =>
      this.requestRenderIfNotRequested()
    );
  }

  resize() {
    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(
      this.canvas.clientWidth,
      this.canvas.clientHeight,
      false
    );
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.requestRenderIfNotRequested();
  }

  createScene() {
    const scene = new THREE.Scene();

    return scene;
  }

  createCamera(fov, x, y, z) {
    const camera = new THREE.PerspectiveCamera(
      fov,
      this.canvas.clientWidth / this.canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(x, y, z);

    camera.updateProjectionMatrix();
    this.scene.add(camera);
    return camera;
  }

  setControls(minDistance, maxDistance) {
    const controls = new OrbitControls(this.camera, this.canvas);
    controls.enableDamping = true;
    controls.maxPolarAngle = Math.PI / 2.5;
    controls.minDistance = minDistance;
    controls.maxDistance = maxDistance;
    return controls;
  }

  createRenderer() {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);
    this.camera.updateProjectionMatrix();

    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    return renderer;
  }

  renderRequested = false;

  tick() {
    this.renderRequested = undefined;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  requestRenderIfNotRequested() {
    if (!this.renderRequested) {
      this.renderRequested = true;

      window.requestAnimationFrame(() => this.tick());
    }
  }
}

//canvas, name, fov,x,y,z, minDistance, maxDistance
const solara = new Object(canvas1, 'solara', 65, 0, 8, 8, 6.0, 8.0);
const windstream = new Object(
  canvas2,
  'windstream',
  65,
  -6.40659264189567,
  5.584728290347182,
  -11.37985916291501,
  10,
  15.0
);
const aquapure = new Object(canvas3, 'aquapure', 65, 0, 3, 12, 9.0, 12.0);
