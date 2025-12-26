import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../../contexts/LanguageContext'
import { gsap } from 'gsap'
import { skills } from '../../data/skills'
import './Skills.css'

const Skills = () => {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  const skillsRef = useRef(null)

  useEffect(() => {
    if (inView && skillsRef.current) {
      gsap.from(skillsRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })
    }
  }, [inView])

  return (
    <section id="skills" className="skills" ref={ref} aria-label="Skills section">
      <div className="skills__container">
        <h2 className="skills__title">{t('skills.title')}</h2>
        <div className="skills__grid" ref={skillsRef} role="list">
          <div className="skills__category">
            <h3 className="skills__category-title">{t('skills.languages')}</h3>
            <div className="skills__list">
              {skills.languages.map((skill, index) => (
                <div key={index} className="skills__item">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div className="skills__category">
            <h3 className="skills__category-title">{t('skills.frameworks')}</h3>
            <div className="skills__list">
              {skills.frameworks.map((skill, index) => (
                <div key={index} className="skills__item">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div className="skills__category">
            <h3 className="skills__category-title">{t('skills.tools')}</h3>
            <div className="skills__list">
              {skills.tools.map((skill, index) => (
                <div key={index} className="skills__item">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div className="skills__category">
            <h3 className="skills__category-title">{t('skills.databases')}</h3>
            <div className="skills__list">
              {skills.databases.map((skill, index) => (
                <div key={index} className="skills__item">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

