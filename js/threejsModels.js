import { render } from 'sass';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');
const canvas3 = document.getElementById('canvas3');
const canvasTest = document.getElementById('canvasTest');

class Object {
  constructor(color, canvas) {
    this.experience = new Experience(canvas);
    this.scene = this.experience.scene;

    this.setGeometry();
    this.setMaterial(color);
    this.setMesh();
    this.scene.add(this.mesh);

    // this.experience.tick();
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(2, 2, 2);
  }
  setMaterial(color) {
    this.material = new THREE.MeshBasicMaterial({
      color: color,
    });
  }
  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}

class Experience {
  constructor(canvas) {
    this.canvas = canvas;

    this.scene = this.createScene();
    this.camera = this.createCamera();
    this.renderer = this.createRenderer();
    this.controls = this.setControls();

    window.requestAnimationFrame(() => this.tick());
    window.addEventListener('resize', () => this.resize());
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
      75,
      this.canvas.clientWidth / this.canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3);
    camera.updateProjectionMatrix();
    this.scene.add(camera);
    return camera;
  }

  setControls() {
    const controls = new OrbitControls(this.camera, this.canvas);
    controls.enableDamping = true;
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
    this.renderRequested = undefined;
    console.log('animate');
    this.controls.update();
    const elapsedTime = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
  }

  requestRenderIfNotRequested() {
    console.log('ASDF');
    if (!this.renderRequested) {
      this.renderRequested = true;

      window.requestAnimationFrame(() => this.tick());
    }
  }
}

const test = new Object(0x00ff00, canvas1);
const test2 = new Object(0xff0000, canvas2);
const test3 = new Object(0x0000ff, canvas3);
