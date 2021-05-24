import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

//Normal Map
const texture = new THREE.TextureLoader()
const textMap = texture.load( './static/Material/NormalMap.png' );
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusGeometry( .3, .1, 16, 100 );
const geometry = new THREE.ConeGeometry(0.3,0.6,30,35)
// Materials

// const material = new THREE.MeshBasicMaterial()
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.2
material.metalness = 1
material.color = new THREE.Color(0x49ef4)
material.NormalMap = textMap 

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.8)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
const pointLight1 = new THREE.PointLight(0xff0000, 2)
pointLight1.position.x = 1
pointLight1.position.y = 1
pointLight1.position.z = 1
scene.add(pointLight)
scene.add(pointLight1)
gui.add(pointLight.position,'y').min(-3).max(3).step(0.01)
gui.add(pointLight.position,'x').min(-3).max(3).step(0.01)
gui.add(pointLight.position,'z').min(-3).max(3).step(0.01)
gui.add(pointLight,'intensity')
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()