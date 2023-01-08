import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Canvas 
const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

// Size 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

/**
 * Rezise
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


/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
};
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);

});


// Create Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
scene.add(mesh);

/**
 *   Create Camera 
*/


// Camera 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000);
// const aspectRation = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(aspectRation * -1, aspectRation * 1, 1, -1, 0.1, 100);
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
scene.add(camera);

const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// controls.target.y = 1;


// Renderer 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// Clock
const clock = new THREE.Clock();

// GSAP Animation
//gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
//gsap.to(mesh.position, { duration: 1, delay: 2, x: -2 })
//gsap.to(mesh.position, { duration: 1, delay: 3, x: 0 })

// Animations
const tick = () => {

    const elapsedTime = clock.getElapsedTime();
    // Update objects
    // mesh.rotation.y = elapsedTime;

    /**
     *   Update Camera 
     */
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2; 
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
    // camera.position.y = cursor.y * 5;
    // camera.lookAt(mesh.position);

    // Update Controls
    controls.update();

    // Renderer 
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();