import { useTheme } from '../../contexts/ThemeContext'
import { useLanguage } from '../../contexts/LanguageContext'
import './Footer.css'

const Footer = () => {
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()
  const currentYear = new Date().getFullYear()
  const copyrightText = t('footer.copyright').replace('{year}', currentYear)

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          {copyrightText}
        </p>
        <div className="footer__controls">
          <button
            className="footer__toggle footer__toggle--language"
            onClick={toggleLanguage}
            aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            title={language === 'pt' ? 'EN' : 'PT'}
          >
            {language === 'pt' ? 'EN' : 'PT'}
          </button>
          <button
            className="footer__toggle footer__toggle--theme"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Mudar para modo escuro'}
            title={theme === 'dark' ? 'Light' : 'Dark'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer

