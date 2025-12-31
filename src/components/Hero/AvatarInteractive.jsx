import { useEffect, useRef, useState } from 'react'
import avatarImg from '../../assets/images/avatar-diego.webp'
import './AvatarInteractive.css'

const AvatarInteractive = () => {
  const avatarRef = useRef(null)
  const containerRef = useRef(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height

      // Very subtle 3D rotation effect
      setRotation({
        x: y * -5, // Reduced from -10
        y: x * 5   // Reduced from 10
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleClick = () => {
    if (!avatarRef.current) return

    // More visible bounce animation on click
    avatarRef.current.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
    avatarRef.current.style.transform = `scale(1.15) rotateY(${rotation.y * 2}deg) rotateX(${rotation.x * 2}deg)`
    
    setTimeout(() => {
      avatarRef.current.style.transition = 'transform 0.4s ease-out'
      avatarRef.current.style.transform = `scale(1) rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`
    }, 250)
  }

  return (
    <div 
      className="avatar-interactive-container" 
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div 
        className={`avatar-interactive ${isHovering ? 'hovering' : ''}`}
        ref={avatarRef}
        onClick={handleClick}
        style={{
          transform: `
            rotateY(${rotation.y}deg) 
            rotateX(${rotation.x}deg)
          `,
          transition: 'transform 0.15s ease-out'
        }}
      >
        {/* Glow effects */}
        <div className="avatar-glow avatar-glow-1"></div>
        <div className="avatar-glow avatar-glow-2"></div>
        
        {/* Main avatar image */}
        <div className="avatar-image-wrapper">
          <img 
            src={avatarImg} 
            alt="Diego Mota Cavalcante" 
            title="Diego Mota Cavalcante"
            width="231"
            height="231"
            sizes="(max-width: 768px) 140px, 200px"
            loading="eager"
            className="avatar-image"
            decoding="async"
            fetchPriority="high"
          />
          
          {/* Overlay effects */}
          <div className="avatar-overlay"></div>
          <div className="avatar-border"></div>
        </div>

        {/* Floating particles around avatar */}
        <div className="avatar-particles">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                '--angle': `${(360 / 12) * i}deg`,
                '--delay': `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AvatarInteractive

