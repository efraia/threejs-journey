import './style.css';
import * as THREE from 'three';
import GUI from 'lil-gui';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

// Canvas 
const canvas = document.querySelector('canvas.webgl');

// Color
const objectParams = {
    color: '#ff0000',
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
    }

};

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
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update Camera 
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update Rendere 
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Create object
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({ color: objectParams.color, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Eventlistener for the Fullscreen Handler
 */
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

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

/**
 * Debug UI
 */
const gui = new GUI({ width: 400 });


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
gui
    .addColor(objectParams, 'color')
    .onChange(() => (
        material.color.set(objectParams.color)
    ));

gui
    .add(objectParams, 'spin');

tick();

