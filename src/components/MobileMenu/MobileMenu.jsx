import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import './MobileMenu.css'

const MobileMenu = () => {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

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
            <ul className="mobile-menu__list">
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
            </ul>
          </nav>
        </div>,
        document.body
      )}
    </>
  )
}

export default MobileMenu

