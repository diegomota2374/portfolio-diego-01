import { useEffect, useRef, useState } from 'react'
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
  const [flippedCards, setFlippedCards] = useState(new Set())
  const animatedBarsRef = useRef(new Set())

  useEffect(() => {
    if (inView && skillsRef.current) {
      const categories = Array.from(skillsRef.current.children)
      
      // Set initial states to prevent flash
      categories.forEach((category) => {
        gsap.set(category, { opacity: 0, y: 60 })
      })

      // Animate with stagger
      gsap.to(categories, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })
    }
  }, [inView])

  // Animate progress bars only for newly flipped cards
  useEffect(() => {
    flippedCards.forEach((cardId) => {
      // Only animate if this card hasn't been animated yet
      if (!animatedBarsRef.current.has(cardId)) {
        const cardElement = document.querySelector(`[data-card-id="${cardId}"]`)
        if (cardElement) {
          const progressBar = cardElement.querySelector('.skills__card-bar-fill')
          if (progressBar) {
            const proficiency = parseInt(progressBar.getAttribute('data-proficiency') || '0')
            // Mark as animated immediately to prevent duplicate animations
            animatedBarsRef.current.add(cardId)
            // Wait for flip animation to start before animating progress bar
            setTimeout(() => {
              gsap.fromTo(progressBar, 
                { width: '0%' },
                { 
                  width: `${proficiency}%`,
                  duration: 0.8,
                  ease: 'power2.out',
                  delay: 0.2
                }
              )
            }, 300)
          }
        }
      }
    })
  }, [flippedCards])

  const handleCardClick = (cardId) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(cardId)) {
        // Card is being flipped back - reset its bar animation state
        newSet.delete(cardId)
        animatedBarsRef.current.delete(cardId)
        // Reset progress bar width when flipping back
        const cardElement = document.querySelector(`[data-card-id="${cardId}"]`)
        if (cardElement) {
          const progressBar = cardElement.querySelector('.skills__card-bar-fill')
          if (progressBar) {
            gsap.set(progressBar, { width: '0%' })
          }
        }
      } else {
        newSet.add(cardId)
      }
      return newSet
    })
  }

  const handleKeyDown = (e, cardId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleCardClick(cardId)
    }
  }

  const renderSkillCard = (skill, categoryKey, index) => {
    const cardId = `${categoryKey}-${index}`
    const isFlipped = flippedCards.has(cardId)
    const skillName = typeof skill === 'string' ? skill : skill.name
    const proficiency = typeof skill === 'object' ? skill.proficiency : null

    return (
      <div
        key={cardId}
        data-card-id={cardId}
        className={`skills__card ${isFlipped ? 'skills__card--flipped' : ''}`}
        onClick={() => handleCardClick(cardId)}
        onKeyDown={(e) => handleKeyDown(e, cardId)}
        tabIndex={0}
        role="button"
        aria-label={`${skillName} - ${t('skills.clickHint')}`}
      >
        <div className="skills__card-inner">
          <div className="skills__card-front">
            <span className="skills__card-name">{skillName}</span>
            <span className="skills__card-hint">{t('skills.clickHint')}</span>
          </div>
          {proficiency !== null && (
            <div className="skills__card-back">
              <div className="skills__card-proficiency">
                <span className="skills__card-percentage">{proficiency}%</span>
                <div className="skills__card-bar">
                  <div
                    className="skills__card-bar-fill"
                    data-proficiency={proficiency}
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
              <span className="skills__card-name-back">{skillName}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <section id="skills" className="skills" ref={ref} aria-label="Skills section">
      <div className="skills__container">
        <h2 className="skills__title">{t('skills.title')}</h2>
        <div className="skills__grid" ref={skillsRef} role="list">
          <div className="skills__category">
            <h3 className="skills__category-title">{t('skills.languages')}</h3>
            <div className="skills__list">
              {skills.languages.map((skill, index) =>
                renderSkillCard(skill, 'languages', index)
              )}
            </div>
          </div>
          <div className="skills__category">
            <h3 className="skills__category-title">{t('skills.frameworks')}</h3>
            <div className="skills__list">
              {skills.frameworks.map((skill, index) =>
                renderSkillCard(skill, 'frameworks', index)
              )}
            </div>
          </div>
          <div className="skills__category">
            <h3 className="skills__category-title">{t('skills.tools')}</h3>
            <div className="skills__list">
              {skills.tools.map((skill, index) =>
                renderSkillCard(skill, 'tools', index)
              )}
            </div>
          </div>
          <div className="skills__category">
            <h3 className="skills__category-title">{t('skills.databases')}</h3>
            <div className="skills__list">
              {skills.databases.map((skill, index) =>
                renderSkillCard(skill, 'databases', index)
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

