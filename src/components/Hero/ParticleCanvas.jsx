import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ParticleCanvas = () => {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const particlesRef = useRef(null)
  const animationFrameRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const linesRef = useRef(null)
  const shockwaveRef = useRef({ active: false, time: 0, position: { x: 0, y: 0, z: 0 } })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create particles
    const particleCount = 800
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)

    const color1 = new THREE.Color(0x00ff88) // Green
    const color2 = new THREE.Color(0x4a90e2) // Blue

    for (let i = 0; i < particleCount * 3; i += 3) {
      const x = (Math.random() - 0.5) * 15
      const y = (Math.random() - 0.5) * 15
      const z = (Math.random() - 0.5) * 15

      positions[i] = x
      positions[i + 1] = y
      positions[i + 2] = z

      originalPositions[i] = x
      originalPositions[i + 1] = y
      originalPositions[i + 2] = z

      velocities[i] = (Math.random() - 0.5) * 0.02
      velocities[i + 1] = (Math.random() - 0.5) * 0.02
      velocities[i + 2] = (Math.random() - 0.5) * 0.02

      const mixedColor = color1.clone().lerp(color2, Math.random())
      colors[i] = mixedColor.r
      colors[i + 1] = mixedColor.g
      colors[i + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current = { 
      mesh: particles, 
      velocities, 
      originalPositions,
      positions 
    }

    // Create lines between nearby particles
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    })
    const lineGeometry = new THREE.BufferGeometry()
    const linePositions = new Float32Array(particleCount * particleCount * 3)
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)
    linesRef.current = lines

    // Mouse move handler
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    // Click handler for shockwave effect
    const handleClick = (event) => {
      // Trigger shockwave effect at mouse position
      const rect = renderer.domElement.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      
      shockwaveRef.current = {
        active: true,
        time: 0,
        position: {
          x: x * 5,
          y: y * 5,
          z: 0
        }
      }
    }

    // Touch handlers for mobile
    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0]
        handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY })
      }
    }

    const handleTouchStart = () => {
      handleClick()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    renderer.domElement.addEventListener('click', handleClick)
    renderer.domElement.addEventListener('touchstart', handleTouchStart, { passive: true })

    // Animation
    let time = 0
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      time += 0.01

      // Update shockwave
      if (shockwaveRef.current.active) {
        shockwaveRef.current.time += 0.05
        if (shockwaveRef.current.time > 3) {
          shockwaveRef.current.active = false
          shockwaveRef.current.time = 0
        }
      }

      // Animate particles
      if (particlesRef.current) {
        const { mesh, velocities, originalPositions, positions } = particlesRef.current
        const positionAttribute = mesh.geometry.attributes.position

        // Update particles and create connections
        const linePositions = []
        const maxDistance = 2

        for (let i = 0; i < positions.length; i += 3) {
          // Move particles
          positions[i] += velocities[i]
          positions[i + 1] += velocities[i + 1]
          positions[i + 2] += velocities[i + 2]

          // Shockwave effect
          if (shockwaveRef.current.active) {
            const shockPos = shockwaveRef.current.position
            const dx = positions[i] - shockPos.x
            const dy = positions[i + 1] - shockPos.y
            const dz = positions[i + 2] - shockPos.z
            const distFromShock = Math.sqrt(dx * dx + dy * dy + dz * dz)
            
            const shockRadius = shockwaveRef.current.time * 5
            const shockThickness = 2
            
            if (distFromShock > shockRadius - shockThickness && distFromShock < shockRadius + shockThickness) {
              const force = 0.3
              positions[i] += (dx / distFromShock) * force
              positions[i + 1] += (dy / distFromShock) * force
              positions[i + 2] += (dz / distFromShock) * force
            }
          }

          // Mouse attraction
          const mouseX = mouseRef.current.x * 5
          const mouseY = mouseRef.current.y * 5
          const dx = mouseX - positions[i]
          const dy = mouseY - positions[i + 1]
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 3) {
            positions[i] += dx * 0.01
            positions[i + 1] += dy * 0.01
          }

          // Boundary check
          if (Math.abs(positions[i]) > 10 || Math.abs(positions[i + 1]) > 10 || Math.abs(positions[i + 2]) > 10) {
            positions[i] = originalPositions[i]
            positions[i + 1] = originalPositions[i + 1]
            positions[i + 2] = originalPositions[i + 2]
          }

          positionAttribute.setXYZ(i / 3, positions[i], positions[i + 1], positions[i + 2])

          // Check distance to nearby particles for connections
          for (let j = i + 3; j < positions.length; j += 3) {
            const dx = positions[i] - positions[j]
            const dy = positions[i + 1] - positions[j + 1]
            const dz = positions[i + 2] - positions[j + 2]
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

            if (dist < maxDistance) {
              linePositions.push(positions[i], positions[i + 1], positions[i + 2])
              linePositions.push(positions[j], positions[j + 1], positions[j + 2])
            }
          }
        }

        positionAttribute.needsUpdate = true

        // Update lines
        if (linesRef.current) {
          const linePositionAttribute = linesRef.current.geometry.attributes.position
          for (let i = 0; i < linePositions.length && i < linePositionAttribute.count * 3; i++) {
            linePositionAttribute.array[i] = linePositions[i] || 0
          }
          linePositionAttribute.needsUpdate = true
        }
      }

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      renderer.domElement.removeEventListener('click', handleClick)
      renderer.domElement.removeEventListener('touchstart', handleTouchStart)
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (containerRef.current && renderer.domElement) {
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

  return <div ref={containerRef} className="particle-canvas" />
}

export default ParticleCanvas

