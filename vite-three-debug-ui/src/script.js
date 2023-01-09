import './style.css';
import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

// Canvas 
const canvas = document.querySelector('canvas.webgl');

/**
 * Create Camera
 */

// Size 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Camera 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/**
 * Resize
 */

// Create object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Eventlistener for the Fullscreen Handler
 */
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitfullscreenElement;

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitrequestFullscreen) {
            canvas.webkitrequestFullscreen();
        }

    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }

        else if (document.webkitExitFullscreen) {
            canvas.webkitExitFullscreen();
        }

    }
});

// Renderer 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Animations
const clock = new THREE.Clock();

const tick = () => {

    const elapsedTime = clock.getElapsedTime();
    controls.update();

    camera.lookAt(mesh.position);
    // Renderer 
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();

/**
 * Debug UI
 */
const gui = new GUI();

gui
    .add(mesh.position, 'x')
    .min(-3)
    .max(3)
    .step(0.1)
    .name('X Position');

gui
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.1);

gui
    .add(mesh.position, 'z')
    .min(-3)
    .max(3)
    .step(0.1);

gui
    .add(mesh, 'visible');

gui
    .add(material, 'wireframe');

