import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './WebGLBackground.css'

const WebGLBackground = () => {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const animationIdRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
    const renderer = new THREE.WebGLRenderer({
      canvas: mountRef.current,
      alpha: true,
      antialias: !isMobile
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = isMobile ? 800 : isTablet ? 1200 : 2000
    const positions = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)

    const color1 = new THREE.Color(0x00ff88)
    const color2 = new THREE.Color(0x4a90e2)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 20

      const mixFactor = Math.random()
      const color = color1.clone().lerp(color2, mixFactor)
      colors[i] = color.r
      colors[i + 1] = color.g
      colors[i + 2] = color.b
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    let lineGeometry = null
    let lineMaterial = null
    let lines = null
    
    const linePositions = []
    const lineColors = []
    const maxConnections = 3

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3
      let connections = 0
      
      for (let j = i + 1; j < particlesCount && connections < maxConnections; j++) {
        const j3 = j * 3
        const dx = positions[i3] - positions[j3]
        const dy = positions[i3 + 1] - positions[j3 + 1]
        const dz = positions[i3 + 2] - positions[j3 + 2]
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (distance < 2) {
          linePositions.push(positions[i3], positions[i3 + 1], positions[i3 + 2])
          linePositions.push(positions[j3], positions[j3 + 1], positions[j3 + 2])

          const opacity = 1 - distance / 2
          lineColors.push(colors[i3], colors[i3 + 1], colors[i3 + 2], opacity)
          lineColors.push(colors[j3], colors[j3 + 1], colors[j3 + 2], opacity)
          connections++
        }
      }
    }

    if (linePositions.length > 0) {
      lineGeometry = new THREE.BufferGeometry()
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
      lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 4))

      lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.3
      })

      lines = new THREE.LineSegments(lineGeometry, lineMaterial)
      scene.add(lines)
    }

    const clock = new THREE.Clock()

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      particles.rotation.x = elapsedTime * 0.1
      particles.rotation.y = elapsedTime * 0.15

      const positions = particlesGeometry.attributes.position.array
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3
        positions[i3 + 1] += Math.sin(elapsedTime + i) * 0.001
      }
      particlesGeometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      const isMobileNow = window.innerWidth < 768
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(isMobileNow ? 1 : Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      if (particlesGeometry) particlesGeometry.dispose()
      if (particlesMaterial) particlesMaterial.dispose()
      if (lineGeometry) {
        lineGeometry.dispose()
      }
      if (lineMaterial) {
        lineMaterial.dispose()
      }
      if (lines) {
        scene.remove(lines)
        lines.geometry?.dispose()
        lines.material?.dispose()
      }
    }
  }, [])

  return <canvas ref={mountRef} className="webgl-background" />
}

export default WebGLBackground

