import { useEffect, useRef } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { gsap } from 'gsap'
import ParticleCanvas from './ParticleCanvas'
import './Hero.css'

const Hero = () => {
  const { t } = useLanguage()
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descriptionRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5')
    .from(descriptionRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5')
    .from(ctaRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.3')
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
        <div className="hero__glass">
          <h1 className="hero__title" ref={titleRef}>
            {t('hero.title')}
          </h1>
          <h2 className="hero__subtitle" ref={subtitleRef}>
            {t('hero.subtitle')}
          </h2>
          <p className="hero__description" ref={descriptionRef}>
            {t('hero.description')}
          </p>
          <button
            className="hero__cta"
            ref={ctaRef}
            onClick={scrollToProjects}
            aria-label={t('hero.cta')}
          >
            {t('hero.cta')}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero

