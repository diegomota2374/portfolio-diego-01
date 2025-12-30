import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './AnimatedCube3D.css'

const AnimatedCube3D = () => {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const cubeRef = useRef(null)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup - fixed aspect ratio to prevent deformation
    const camera = new THREE.PerspectiveCamera(
      75,
      1, // 1:1 aspect ratio - fixed
      0.1,
      1000
    )
    camera.position.z = 3
    camera.aspect = 1 // Explicitly set aspect ratio
    camera.updateProjectionMatrix()
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    })
    // Responsive size: smaller on mobile, larger on desktop
    const size = window.innerWidth >= 1024 ? 520 : 150
    renderer.setSize(size, size)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create cube geometry (wireframe) - slightly larger for thicker lines
    const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2)
    
    // Material with same style as Hero lines - increased opacity for thicker appearance
    const material = new THREE.LineBasicMaterial({
      color: 0x00ff88, // Green color matching Hero
      transparent: true,
      opacity: 0.4, // Increased opacity for more visible/thicker lines
      blending: THREE.AdditiveBlending
    })

    // Create edges for wireframe effect
    const edges = new THREE.EdgesGeometry(geometry)
    const cube = new THREE.LineSegments(edges, material)
    
    scene.add(cube)
    cubeRef.current = cube

    // Handle resize with debounce
    let resizeTimer = null
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (!containerRef.current || !rendererRef.current) return
        // Keep aspect ratio 1:1, responsive size
        const size = window.innerWidth >= 1024 ? 520 : 150
        // Update renderer size and camera aspect ratio to prevent deformation
        renderer.setSize(size, size)
        camera.aspect = 1 // Ensure 1:1 aspect ratio
        camera.updateProjectionMatrix()
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)

      // Only animate if cube and renderer exist and container is in DOM
      if (cubeRef.current && rendererRef.current && containerRef.current && containerRef.current.parentNode) {
        // Continuous rotation
        cubeRef.current.rotation.x += 0.01
        cubeRef.current.rotation.y += 0.01
        cubeRef.current.rotation.z += 0.005

        renderer.render(scene, camera)
      }
    }
    animate()

    // Cleanup
    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      })
      
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="animated-cube-3d" />
}

export default AnimatedCube3D

