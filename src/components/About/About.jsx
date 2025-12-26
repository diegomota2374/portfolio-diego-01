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

  useEffect(() => {
    if (inView && contentRef.current) {
      gsap.from(contentRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      })
    }
  }, [inView])

  return (
    <section id="about" className="about" ref={ref} aria-label="About section">
      <div className="about__container">
        <h2 className="about__title">{t('about.title')}</h2>
        <div className="about__content" ref={contentRef}>
          <div className="about__text">
            <p className="about__paragraph">{t('about.content')}</p>
          </div>
          <div className="about__info" role="list">
            <div className="about__info-item" role="listitem">
              <span className="about__info-label" aria-hidden="true">📍</span>
              <span className="about__info-value">{t('about.location')}</span>
            </div>
            <div className="about__info-item" role="listitem">
              <span className="about__info-label" aria-hidden="true">📞</span>
              <a 
                href={`tel:${t('about.phone')}`} 
                className="about__info-value about__info-value--link"
                aria-label={`Phone: ${t('about.phone')}`}
              >
                {t('about.phone')}
              </a>
            </div>
            <div className="about__info-item" role="listitem">
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

