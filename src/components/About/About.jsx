import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../../contexts/LanguageContext'
import { gsap } from 'gsap'
import './About.css'

const About = () => {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })
  const contentRef = useRef(null)
  const textCardRef = useRef(null)
  const infoItem1Ref = useRef(null)
  const infoItem2Ref = useRef(null)
  const infoItem3Ref = useRef(null)

  useEffect(() => {
    if (inView && contentRef.current) {
      const textCard = contentRef.current.querySelector('.about__text')
      const infoItems = contentRef.current.querySelectorAll('.about__info-item')

      // Set initial states
      gsap.set(textCard, { opacity: 0, y: 50, scale: 0.95 })
      infoItems.forEach((item) => {
        gsap.set(item, { opacity: 0, x: 30, scale: 0.9 })
      })

      // Animate with timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      tl.to(textCard, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.1)'
      })
      .to(infoItems, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.2)'
      }, '-=0.4')
    }
  }, [inView])

  // Mouse move handler for interactive cards
  const handleMouseMove = (e, cardRef) => {
    if (!cardRef?.current || window.innerWidth < 968) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

    gsap.to(cardRef.current, {
      x: x * 10,
      y: y * 10,
      rotationY: x * 3,
      rotationX: y * -3,
      duration: 0.5,
      ease: 'power1.out',
      transformPerspective: 1000
    })
  }

  const handleMouseLeave = (cardRef) => {
    if (!cardRef?.current) return
    
    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: 'power2.out'
    })
  }

  // Setup event listeners for info items
  useEffect(() => {
    const items = [infoItem1Ref, infoItem2Ref, infoItem3Ref]
    const cleanupFunctions = []
    
    items.forEach((itemRef) => {
      const item = itemRef.current
      if (item) {
        const handleMove = (e) => handleMouseMove(e, itemRef)
        const handleLeave = () => handleMouseLeave(itemRef)
        
        item.addEventListener('mousemove', handleMove)
        item.addEventListener('mouseleave', handleLeave)
        
        cleanupFunctions.push(() => {
          item.removeEventListener('mousemove', handleMove)
          item.removeEventListener('mouseleave', handleLeave)
        })
      }
    })
    
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [])

  return (
    <section id="about" className="about" ref={ref} aria-label="About section">
      <div className="about__container">
        <h2 className="about__title">{t('about.title')}</h2>
        <div className="about__content" ref={contentRef}>
          <div 
            className="about__text"
            ref={textCardRef}
            onMouseMove={(e) => handleMouseMove(e, textCardRef)}
            onMouseLeave={() => handleMouseLeave(textCardRef)}
          >
            <p className="about__paragraph">{t('about.content')}</p>
          </div>
          <div className="about__info" role="list">
            <div 
              className="about__info-item" 
              role="listitem"
              ref={infoItem1Ref}
            >
              <span className="about__info-label" aria-hidden="true">📍</span>
              <span className="about__info-value">{t('about.location')}</span>
            </div>
            <div 
              className="about__info-item" 
              role="listitem"
              ref={infoItem2Ref}
            >
              <span className="about__info-label" aria-hidden="true">📞</span>
              <a 
                href={`tel:${t('about.phone')}`} 
                className="about__info-value about__info-value--link"
                aria-label={`Phone: ${t('about.phone')}`}
              >
                {t('about.phone')}
              </a>
            </div>
            <div 
              className="about__info-item" 
              role="listitem"
              ref={infoItem3Ref}
            >
              <span className="about__info-label" aria-hidden="true">✉️</span>
              <a 
                href={`mailto:${t('about.email')}`} 
                className="about__info-value about__info-value--link"
                aria-label={`Email: ${t('about.email')}`}
              >
                {t('about.email')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

