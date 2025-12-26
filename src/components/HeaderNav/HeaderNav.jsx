import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import './HeaderNav.css'

const HeaderNav = () => {
  const { t } = useLanguage()
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
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
    <nav className={`header-nav ${isSticky ? 'header-nav--sticky' : ''}`}>
      <div className="header-nav__container">
        <div className="header-nav__logo">
          <span className="header-nav__logo-text">DMC</span>
        </div>
        <ul className="header-nav__list">
          <li className="header-nav__item">
            <a
              href="#hero"
              className="header-nav__link"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('hero')
              }}
            >
              {t('nav.home')}
            </a>
          </li>
          <li className="header-nav__item">
            <a
              href="#about"
              className="header-nav__link"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('about')
              }}
            >
              {t('nav.about')}
            </a>
          </li>
          <li className="header-nav__item">
            <a
              href="#projects"
              className="header-nav__link"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('projects')
              }}
            >
              {t('nav.projects')}
            </a>
          </li>
          <li className="header-nav__item">
            <a
              href="#skills"
              className="header-nav__link"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('skills')
              }}
            >
              {t('nav.skills')}
            </a>
          </li>
          <li className="header-nav__item">
            <a
              href="#contact"
              className="header-nav__link"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('contact')
              }}
            >
              {t('nav.contact')}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default HeaderNav

