import { lazy, Suspense } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import HeaderTop from './components/HeaderTop/HeaderTop'
import HeaderNav from './components/HeaderNav/HeaderNav'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import BackToTop3D from './components/BackToTop3D/BackToTop3D'
import './App.css'

// Lazy load heavy WebGL components
const WebGLBackground = lazy(() => import('./components/WebGLBackground/WebGLBackground'))

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app">
          <Suspense fallback={null}>
            <WebGLBackground />
          </Suspense>
          <HeaderTop />
          <HeaderNav />
          <main className="main">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
          <BackToTop3D />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App

