
// Find the latest version by visiting https://cdn.skypack.dev/three.

//import * as THREE from 'https://cdn.skypack.dev/three@0.127.0';
import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.137.5-HJEdoVYPhjkiJWkt6XIa/mode=imports/optimized/three.js';
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene();
const chart = new THREE.Group(); //
scene.background = new THREE.Color(0xffffff)

//Light
const ambientlight = new THREE.AmbientLight(0x404040);
scene.add(ambientlight);

const directionallight = new THREE.DirectionalLight(0x404040, 2.6);
scene.add(directionallight);
scene.add(directionallight.target);
directionallight.position.set(0, 1, 1)
directionallight.target.position.set(0, 1, -1)

//select dotSelector
const dotSelector = [
  new THREE.SphereGeometry(.05, 8, 8),
  new THREE.MeshBasicMaterial({ color: 0x000000 })
]

function updateSizes() {
  sizes.width = window.innerWidth / 2
  sizes.height = window.innerHeight
}
// Sizes
const sizes = {
  scaleFactor: 400
}
updateSizes()

// Camera
//const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
const camera = new THREE.OrthographicCamera(
  sizes.width / - sizes.scaleFactor,
  sizes.width / sizes.scaleFactor,
  sizes.height / sizes.scaleFactor,
  sizes.height / - sizes.scaleFactor, 1, 1000);
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)

window.addEventListener('resize', () => {
  // Update sizes
  updateSizes()

  // Update camera
  //camera.aspect = sizes.width / sizes.height
  camera.left = sizes.width / - sizes.scaleFactor
  camera.right = sizes.width / sizes.scaleFactor
  camera.top = sizes.height / sizes.scaleFactor
  camera.bottom = sizes.height / - sizes.scaleFactor
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



let time = Date.now()
const clock = new THREE.Clock()

const tick = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()

/**
 *
 * @param {array of five numbers, 0 - 100} data
 * @param {array of two numbers (0 - 4), indices of selected values} comps
 * @param {one of four: 'pie', 'pie3D', 'stackedBar', 'stackedBar3D'} barType
 * @returns percent of smaller value of bigger value from selected vals of data
 */
export function generateChart(data, comps, barType) {
  let res;
  switch (barType) {
    case 'pie':
      res = generatePieChart(data, comps, false)
      break;
    case 'pie3D':
      res = generatePieChart(data, comps, true)
      break;
    case 'stackedBar':
      res = generateStackedBarChart(data, comps, false)
      break;
    case 'stackedBar3D':
      res = generateStackedBarChart(data, comps, true)
      break;
    default:
      console.log('unrecognized chart type');
      break;
  }

  return res;

}

export function clearChart() {
  chart.children.forEach((e) => {
    e.geometry.dispose();
    e.material.dispose();
  })
  chart.remove(...chart.children)
  chart.rotation.set(0, 0, 0)
}

//Helper
function generateStackedBarChart(data, comps, is3D) {
  const size = 1;
  const sum = data.reduce((a, b) => a + b)

  const width = 1 * size
  let heightStart = -1;
  data.forEach((e, index) => {
    const height = e / sum * 2
    const geometry = new THREE.BoxGeometry(width, height, width)
    const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(.18 * (index + 1), .18 * (index + 1), .18 * (index + 1)), })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.y = heightStart + height / 2;

    if (comps.includes(index)) {
      const marker = new THREE.Mesh(...dotSelector)
      marker.position.set(0, height / 2 + heightStart, width / 2)
      chart.add(marker)
    }
    chart.add(mesh)
    heightStart += height

  })

  is3D ? chart.rotation.set(.3, .7, 0) : null
  scene.add(chart);
  const res = Math.round(Math.min(data[comps[1]], data[comps[0]]) / Math.max(data[comps[1]], data[comps[0]]) * 100)
  return res
}

//Helper
function generatePieChart(data, comps, is3D) {
  const size = 1;
  const sum = data.reduce((a, b) => a + b)

  const cRad = 1 * size
  const cHeight = 0.4 * size;
  let thetaStart = 0;
  data.forEach((e, index) => {
    const thetaLength = e / sum * Math.PI * 2
    const geometry = new THREE.CylinderGeometry(cRad, cRad, cHeight, 10, 1, false, thetaStart, thetaLength)
    const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(.18 * (index + 1), .18 * (index + 1), .18 * (index + 1)), })
    const mesh = new THREE.Mesh(geometry, material)

    if (comps.includes(index)) {
      const marker = new THREE.Mesh(...dotSelector)
      marker.position.set(cRad * Math.sin(thetaStart + thetaLength / 2), cHeight * 0.5, cRad * Math.cos(thetaStart + thetaLength / 2))
      chart.add(marker)
    }
    chart.add(mesh)

    is3D ? chart.rotateX(.12) : chart.rotateX(Math.PI / 2)
    scene.add(chart)
    thetaStart += thetaLength

  })

  const res = Math.round(Math.min(data[comps[1]], data[comps[0]]) / Math.max(data[comps[1]], data[comps[0]]) * 100)
  return res
}
