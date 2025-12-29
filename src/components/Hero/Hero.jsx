import { useEffect, useRef } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { gsap } from 'gsap'
import ParticleCanvas from './ParticleCanvas'
import AvatarInteractive from './AvatarInteractive'
import Button from '../Button'
import './Hero.css'

const Hero = () => {
  const { t } = useLanguage()
  const heroRef = useRef(null)
  const glassRef = useRef(null)
  const avatarSectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descriptionRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    // Small delay to ensure everything is rendered
    const timer = setTimeout(() => {
      // Check if all refs exist
      if (!glassRef.current || !avatarSectionRef.current || !titleRef.current) {
        console.warn('GSAP: Some refs are not ready yet')
        return
      }

      // Set initial states to prevent flash
      gsap.set(glassRef.current, { opacity: 0, scale: 0.9 })
      gsap.set(avatarSectionRef.current, { opacity: 0, scale: 0 })
      gsap.set(titleRef.current, { opacity: 0, y: 50 })
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 })
      gsap.set(descriptionRef.current, { opacity: 0, y: 30 })
      gsap.set(ctaRef.current, { opacity: 0, y: 20 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      // Animate card first
      tl.to(glassRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.2)'
      })
      // Animate avatar
      .to(avatarSectionRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.4')
      // Animate texts in sequence
      .to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1
      }, '-=0.3')
      .to(subtitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8
      }, '-=0.5')
      .to(descriptionRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8
      }, '-=0.5')
      .to(ctaRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6
      }, '-=0.3')

      console.log('✅ GSAP animations started')
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      const offset = 120
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="hero" className="hero" ref={heroRef} aria-label="Hero section">
      <ParticleCanvas />
      <div className="hero__content">
        <div className="hero__glass" ref={glassRef}>
          {/* Avatar Interactive - in foreground */}
          <div className="hero__avatar-section" ref={avatarSectionRef}>
            <AvatarInteractive />
          </div>

          {/* Text content section */}
          <div className="hero__text-section">
            <h1 className="hero__title" ref={titleRef}>
              {t('hero.title')}
            </h1>
            <h2 className="hero__subtitle" ref={subtitleRef}>
              {t('hero.subtitle')}
            </h2>
            <p className="hero__description" ref={descriptionRef}>
              {t('hero.description')}
            </p>
            <div ref={ctaRef}>
              <Button
                onClick={scrollToProjects}
                variant="primary"
                size="medium"
                ariaLabel={t('hero.cta')}
              >
                {t('hero.cta')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

