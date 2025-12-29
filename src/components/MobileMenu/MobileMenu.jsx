import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTheme } from '../../contexts/ThemeContext'
import './MobileMenu.css'

const MobileMenu = () => {
  const { t, language, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isHeaderTopHidden, setIsHeaderTopHidden] = useState(false)

  useEffect(() => {
    // Previne scroll do body quando menu está aberto
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    // Detecta quando HeaderTop está escondido (quando HeaderNav está sticky)
    const handleScroll = () => {
      setIsHeaderTopHidden(window.scrollY > 100)
    }

    handleScroll() // Verifica no mount
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
      setIsOpen(false) // Fecha o menu após clicar
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    { id: 'hero', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'contact', label: t('nav.contact') }
  ]

  return (
    <>
      <button
        className={`mobile-menu__toggle ${isOpen ? 'mobile-menu__toggle--open' : ''}`}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isOpen}
      >
        <span className="mobile-menu__hamburger">
          <span className="mobile-menu__line mobile-menu__line--1"></span>
          <span className="mobile-menu__line mobile-menu__line--2"></span>
          <span className="mobile-menu__line mobile-menu__line--3"></span>
        </span>
      </button>

      {createPortal(
        <div className={`mobile-menu__overlay ${isOpen ? 'mobile-menu__overlay--open' : ''}`} onClick={toggleMenu}>
          <nav
            className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className={`mobile-menu__list ${isHeaderTopHidden ? 'mobile-menu__list--sticky' : ''}`}>
              {menuItems.map((item) => (
                <li key={item.id} className="mobile-menu__item">
                  <a
                    href={`#${item.id}`}
                    className="mobile-menu__link"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.id)
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {isHeaderTopHidden && (
                <li className="mobile-menu__item mobile-menu__item--controls">
                  <div className="mobile-menu__controls">
                    <button
                      className="mobile-menu__control-btn mobile-menu__control-btn--language"
                      onClick={toggleLanguage}
                      aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
                      title={language === 'pt' ? 'EN' : 'PT'}
                    >
                      {language === 'pt' ? 'EN' : 'PT'}
                    </button>
                    <button
                      className="mobile-menu__control-btn mobile-menu__control-btn--theme"
                      onClick={toggleTheme}
                      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Mudar para modo escuro'}
                      title={theme === 'dark' ? 'Light' : 'Dark'}
                    >
                      {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </nav>
        </div>,
        document.body
      )}
    </>
  )
}

export default MobileMenu

