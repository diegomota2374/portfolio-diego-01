import { useTheme } from '../../contexts/ThemeContext'
import { useLanguage } from '../../contexts/LanguageContext'
import './HeaderTop.css'

const HeaderTop = () => {
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()

  return (
    <header className="header-top">
      <div className="header-top__container">
        <button
          className="header-top__toggle header-top__toggle--language"
          onClick={toggleLanguage}
          aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
          title={language === 'pt' ? 'EN' : 'PT'}
        >
          {language === 'pt' ? 'EN' : 'PT'}
        </button>
        <button
          className="header-top__toggle header-top__toggle--theme"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Mudar para modo escuro'}
          title={theme === 'dark' ? 'Light' : 'Dark'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

export default HeaderTop

