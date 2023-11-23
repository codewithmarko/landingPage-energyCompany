import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { waterVertexShaders } from './shaders/water/vertex.glsl';

// console.log(waterVertexShaders);
const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');
const canvas3 = document.getElementById('canvas3');

class Object {
  constructor(canvas, name) {
    this.experience = new Experience(canvas);
    this.scene = this.experience.scene;
    this.textureLoader = this.experience.textureLoader;
    this.gltfLoader = this.experience.gltfLoader;

    this.texture = this.createTextures(name);
    this.material = this.setMaterial(name);
    this.loadGLTF(name);
  }

  createTextures(name) {
    const bakedTexture = this.textureLoader.load(
      `./models/${name}/${name}Baked.jpg`
    );
    bakedTexture.flipY = false;
    bakedTexture.colorSpace = THREE.SRGBColorSpace;
    return bakedTexture;
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(2, 2, 2);
  }
  setMaterial(name) {
    const material = new THREE.MeshBasicMaterial({ map: this.texture });

    return material;
  }
  loadGLTF(name) {
    this.gltfLoader.load(`./models/${name}/${name}.glb`, (gltf) => {
      gltf.scene.traverse((child) => {
        child.material = this.material;
      });

      const waterMesh = gltf.scene.children.find(
        (child) => child.name === 'waterAquaPure'
      );

      if (waterMesh) {
        this.createAdditionalMaterial(name, waterMesh);
      }

      console.log(waterMesh);
      this.scene.add(gltf.scene);
    });
  }

  createAdditionalMaterial(name, mesh) {
    if (name === 'aquapure') {
      const waterAquaPureMaterial = new THREE.MeshBasicMaterial({
        color: 0x5f75ff,
      });
      mesh.material = waterAquaPureMaterial;
    }
  }
}

class Experience {
  constructor(canvas) {
    this.canvas = canvas;

    this.scene = this.createScene();
    this.camera = this.createCamera();
    this.renderer = this.createRenderer();
    this.controls = this.setControls();
    this.textureLoader = this.createTextureLoader();
    this.gltfLoader = this.createGLTFLoader();

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
  }

  createScene() {
    return (this.scene = new THREE.Scene());
  }

  createCamera() {
    const camera = new THREE.PerspectiveCamera(
      65,
      this.canvas.clientWidth / this.canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 8);
    camera.updateProjectionMatrix();
    this.scene.add(camera);
    return camera;
  }

  createTextureLoader() {
    const textureLoader = new THREE.TextureLoader();
    return textureLoader;
  }

  createDracoLoader() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./models/draco/');
    return dracoLoader;
  }
  createGLTFLoader() {
    const gltfLoader = new GLTFLoader();
    return gltfLoader;
  }

  setControls() {
    const controls = new OrbitControls(this.camera, this.canvas);
    controls.enableDamping = true;
    controls.maxPolarAngle = Math.PI / 2.5;
    controls.minDistance = 4.0;
    controls.maxDistance = 8.0;
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

  clock = new THREE.Clock();

  renderRequested = false;

  tick() {
    console.log('tick');
    this.renderRequested = undefined;
    this.controls.update();
    const elapsedTime = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
  }

  requestRenderIfNotRequested() {
    console.log('requestedFrame');
    if (!this.renderRequested) {
      this.renderRequested = true;

      window.requestAnimationFrame(() => this.tick());
    }
  }
}

//! Setting für Kamera müssen eingefühgt werden.

const solara = new Object(canvas1, 'solara');

const aquapure = new Object(canvas3, 'aquapure');
