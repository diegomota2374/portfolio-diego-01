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
  const [currentCategorySlide, setCurrentCategorySlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const categoriesList = [
    { key: 'languages', title: 'skills.languages', skills: skills.languages },
    { key: 'frameworks', title: 'skills.frameworks', skills: skills.frameworks },
    { key: 'tools', title: 'skills.tools', skills: skills.tools },
    { key: 'databases', title: 'skills.databases', skills: skills.databases }
  ]

  // Check if mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (inView) {
      if (isMobile) {
        // Animate swiper slides
        const swiperWrapper = document.querySelector('.skills__swiper-wrapper')
        if (swiperWrapper) {
          const slides = Array.from(swiperWrapper.querySelectorAll('.skills__swiper-slide'))
          slides.forEach((slide) => {
            gsap.set(slide, { opacity: 0, y: 60 })
          })
          gsap.to(slides, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
          })
        }
      } else if (skillsRef.current) {
        // Animate grid categories
        const categories = Array.from(skillsRef.current.children)
        categories.forEach((category) => {
          gsap.set(category, { opacity: 0, y: 60 })
        })
        gsap.to(categories, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        })
      }
    }
  }, [inView, isMobile])


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

  // Swiper navigation handlers for categories
  const handlePrevCategory = () => {
    setCurrentCategorySlide((prev) => 
      prev > 0 ? prev - 1 : categoriesList.length - 1
    )
  }

  const handleNextCategory = () => {
    setCurrentCategorySlide((prev) => 
      prev < categoriesList.length - 1 ? prev + 1 : 0
    )
  }

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      // Swipe left - next category
      handleNextCategory()
    } else if (distance < -minSwipeDistance) {
      // Swipe right - prev category
      handlePrevCategory()
    }

    touchStartX.current = 0
    touchEndX.current = 0
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

  const renderCategory = (categoryKey, categoryTitle, categorySkills) => {
    return (
      <div 
        key={categoryKey}
        className="skills__category"
      >
        <h3 className="skills__category-title">{categoryTitle}</h3>
        <div className="skills__list">
          {categorySkills.map((skill, index) =>
            renderSkillCard(skill, categoryKey, index)
          )}
        </div>
      </div>
    )
  }

  return (
    <section id="skills" className="skills" ref={ref} aria-label="Skills section">
      <div className="skills__container">
        <h2 className="skills__title">{t('skills.title')}</h2>
        {isMobile ? (
          <div 
            className="skills__swiper-wrapper"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="skills__swiper-container"
              style={{
                transform: `translateX(-${currentCategorySlide * 100}%)`
              }}
            >
              {categoriesList.map((category) => (
                <div key={category.key} className="skills__swiper-slide">
                  {renderCategory(category.key, t(category.title), category.skills)}
                </div>
              ))}
            </div>
            <div className="skills__swiper-controls">
              <button
                className="skills__swiper-button skills__swiper-button--prev"
                onClick={handlePrevCategory}
                aria-label={t('skills.prevSlide') || 'Previous category'}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <div className="skills__swiper-pagination">
                {categoriesList.map((_, index) => (
                  <button
                    key={index}
                    className={`skills__swiper-pagination-bullet ${
                      index === currentCategorySlide ? 'skills__swiper-pagination-bullet--active' : ''
                    }`}
                    onClick={() => setCurrentCategorySlide(index)}
                    aria-label={`Go to ${categoriesList[index].key} category`}
                  />
                ))}
              </div>
              <button
                className="skills__swiper-button skills__swiper-button--next"
                onClick={handleNextCategory}
                aria-label={t('skills.nextSlide') || 'Next category'}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="skills__grid" ref={skillsRef} role="list">
            {categoriesList.map((category) =>
              renderCategory(category.key, t(category.title), category.skills)
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Skills

