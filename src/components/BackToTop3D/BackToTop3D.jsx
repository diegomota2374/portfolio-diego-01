import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTheme } from '../../contexts/ThemeContext'
import { gsap } from 'gsap'
import * as THREE from 'three'
import './BackToTop3D.css'

const BackToTop = () => {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [rightOffset, setRightOffset] = useState(0)
  const isVisibleRef = useRef(false)
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const coinRef = useRef(null)
  const animationFrameRef = useRef(null)
  const targetRotationRef = useRef({ x: 0, y: 0, z: 0 })
  const currentRotationRef = useRef({ x: 0, y: 0, z: 0 })
  const isHoveringRef = useRef(false)

  // Calculate right offset based on container max-width
  useEffect(() => {
    const calculateRightOffset = () => {
      const maxWidth = 1440 // --max-w-container
      const viewportWidth = window.innerWidth
      
      // Get container padding based on viewport
      let padding = 5 // base px-6
      if (viewportWidth >= 1280) padding = 50 // xl:px-20
      else if (viewportWidth >= 1024) padding = 30 // lg:px-16
      else if (viewportWidth >= 768) padding = 20 // md:px-12
      else if (viewportWidth >= 640) padding = 10 // sm:px-8
      
      // Calculate right offset: if viewport > max-width, center the container and add padding
      if (viewportWidth > maxWidth) {
        const margin = (viewportWidth - maxWidth) / 2
        setRightOffset(margin + padding)
      } else {
        setRightOffset(padding)
      }
    }

    calculateRightOffset()
    window.addEventListener('resize', calculateRightOffset)
    return () => window.removeEventListener('resize', calculateRightOffset)
  }, [])

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const visible = scrollY > 300
      setIsVisible(visible)
      isVisibleRef.current = visible
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Three.js scene setup and animation
  useEffect(() => {
    if (!containerRef.current) return

    // Color scheme based on theme
    const isLight = theme === 'light'
    const coinColor = isLight ? 0x2a4a6a : 0x1a2a4a
    const accentColor = isLight ? 0x4a90e2 : 0x33ffaa

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
    camera.position.set(0, 0, 4.5)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    const size = 200
    renderer.setSize(size, size)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting setup - adjust colors based on theme
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const directionalLight1 = new THREE.DirectionalLight(accentColor, 1.2)
    directionalLight1.position.set(5, 5, 5)
    directionalLight1.castShadow = true
    scene.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(isLight ? 0x6ba3f0 : 0x4a90e2, 0.8)
    directionalLight2.position.set(-5, -5, 5)
    scene.add(directionalLight2)

    const pointLight = new THREE.PointLight(accentColor, 0.8, 10)
    pointLight.position.set(0, 0, 5)
    scene.add(pointLight)

    const spotLight = new THREE.SpotLight(accentColor, 1.5, 10, Math.PI / 6, 0.5)
    spotLight.position.set(0, 3, 5)
    spotLight.target.position.set(0, 0, 0)
    scene.add(spotLight)
    scene.add(spotLight.target)

    // Create glass coin
    const coinGroup = new THREE.Group()

    // Coin body - glass cylinder
    const coinGeometry = new THREE.CylinderGeometry(1, 1, 0.3, 64)
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: coinColor,
      transparent: true,
      opacity: 0.6,
      metalness: 0.2,
      roughness: 0.05,
      side: THREE.DoubleSide
    })

    const coinBody = new THREE.Mesh(coinGeometry, glassMaterial)
    coinGroup.add(coinBody)

    // Front face
    const frontFaceGeometry = new THREE.CircleGeometry(1, 64)
    const frontFace = new THREE.Mesh(frontFaceGeometry, glassMaterial)
    frontFace.position.y = 0.15
    frontFace.rotation.x = Math.PI / 2
    coinGroup.add(frontFace)

    // Back face
    const backFace = new THREE.Mesh(frontFaceGeometry, glassMaterial)
    backFace.position.y = -0.15
    backFace.rotation.x = -Math.PI / 2
    coinGroup.add(backFace)

    // Border ring
    const borderGeometry = new THREE.RingGeometry(0.95, 1, 64)
    const borderMaterial = new THREE.MeshStandardMaterial({
      color: accentColor,
      emissive: accentColor,
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide
    })

    const frontBorder = new THREE.Mesh(borderGeometry, borderMaterial)
    frontBorder.position.y = 0.16
    frontBorder.rotation.x = Math.PI / 2
    coinGroup.add(frontBorder)

    const backBorder = new THREE.Mesh(borderGeometry, borderMaterial)
    backBorder.position.y = -0.16
    backBorder.rotation.x = -Math.PI / 2
    coinGroup.add(backBorder)

    // Upward arrow shape
    const arrowShape = new THREE.Shape()
    arrowShape.moveTo(0, 0.5)
    arrowShape.lineTo(-0.2, 0.1)
    arrowShape.lineTo(-0.08, 0.1)
    arrowShape.lineTo(-0.08, -0.2)
    arrowShape.lineTo(0.08, -0.2)
    arrowShape.lineTo(0.08, 0.1)
    arrowShape.lineTo(0.2, 0.1)
    arrowShape.lineTo(0, 0.5)

    const arrowGeometry = new THREE.ShapeGeometry(arrowShape)
    const arrowMaterial = new THREE.MeshStandardMaterial({
      color: accentColor,
      emissive: accentColor,
      emissiveIntensity: 2.0,
      side: THREE.DoubleSide
    })

    // Front arrow - always pointing up
    const frontArrow = new THREE.Mesh(arrowGeometry, arrowMaterial)
    frontArrow.position.y = 0.17
    frontArrow.rotation.x = Math.PI / 2
    frontArrow.rotation.z = 0
    frontArrow.scale.set(1.3, 1.3, 1)
    coinGroup.add(frontArrow)

    // Back arrow - always pointing up (compensated for flip)
    const backArrow = new THREE.Mesh(arrowGeometry, arrowMaterial)
    backArrow.position.y = -0.17
    backArrow.rotation.x = -Math.PI / 2
    backArrow.rotation.z = Math.PI
    backArrow.scale.set(1.3, 1.3, 1)
    coinGroup.add(backArrow)

    // Initial rotation - show face forward
    coinGroup.rotation.x = -Math.PI / 2
    coinGroup.rotation.y = 0
    coinGroup.rotation.z = 0
    scene.add(coinGroup)
    coinRef.current = coinGroup

    // Initialize rotation refs for horizontal flip
    currentRotationRef.current.x = -Math.PI / 2
    currentRotationRef.current.y = 0
    currentRotationRef.current.z = 0
    targetRotationRef.current.x = -Math.PI / 2
    targetRotationRef.current.y = 0
    targetRotationRef.current.z = 0

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)

      if (coinRef.current && rendererRef.current && containerRef.current) {
        if (!isHoveringRef.current && isVisibleRef.current) {
          // Continuous horizontal flip animation
          const time = Date.now() * 0.0008
          coinRef.current.rotation.z = Math.sin(time) * Math.PI
          coinRef.current.rotation.x = -Math.PI / 2
          coinRef.current.rotation.y = 0
        } else if (isHoveringRef.current) {
          // Mouse interaction - follow horizontal movement
          const lerpFactor = 0.1
          currentRotationRef.current.z += (targetRotationRef.current.z - currentRotationRef.current.z) * lerpFactor
          coinRef.current.rotation.z = currentRotationRef.current.z
          coinRef.current.rotation.x = -Math.PI / 2
          coinRef.current.rotation.y = 0
        }

        renderer.render(scene, camera)
      }
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return
      const newSize = window.innerWidth >= 1024 ? 200 : 160
      rendererRef.current.setSize(newSize, newSize)
      cameraRef.current.aspect = 1
      cameraRef.current.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
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
  }, [theme])

  // Handle visibility animation
  useEffect(() => {
    if (containerRef.current) {
      if (isVisible) {
        containerRef.current.style.pointerEvents = 'auto'
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, scale: 0, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }
        )
      } else {
        containerRef.current.style.pointerEvents = 'none'
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 0,
          y: 20,
          duration: 0.3,
          ease: 'power2.in'
        })
      }
    }
  }, [isVisible])

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    // Spin animation on click
    if (coinRef.current) {
      gsap.to(coinRef.current.rotation, {
        y: '+=720',
        duration: 0.8,
        ease: 'power2.out'
      })
    }
  }

  const handleMouseMove = (e) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2

    isHoveringRef.current = true
    targetRotationRef.current.z = x * Math.PI
  }

  const handleMouseLeave = () => {
    isHoveringRef.current = false
    targetRotationRef.current.z = 0
  }

  return (
    <div
      ref={containerRef}
      className={`back-to-top-3d ${!isVisible ? 'back-to-top-3d--hidden' : ''}`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={t('backToTop.label')}
      title={t('backToTop.label')}
      style={{ 
        pointerEvents: isVisible ? 'auto' : 'none',
        right: `${rightOffset}px`
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    />
  )
}

export default BackToTop
