import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import HeaderTop from './components/HeaderTop/HeaderTop'
import HeaderNav from './components/HeaderNav/HeaderNav'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'
import Contact from './components/Contact/Contact'
import WebGLBackground from './components/WebGLBackground/WebGLBackground'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app">
          <WebGLBackground />
          <HeaderTop />
          <HeaderNav />
          <main className="main">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App

