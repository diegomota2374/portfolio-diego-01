import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../../contexts/LanguageContext'
import { gsap } from 'gsap'
import './Contact.css'

const Contact = () => {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  useEffect(() => {
    if (inView && formRef.current) {
      gsap.from(formRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
    }
  }, [inView])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    }, 1000)
  }

  return (
    <section id="contact" className="contact" ref={ref} aria-label="Contact section">
      <div className="contact__container">
        <h2 className="contact__title">{t('contact.title')}</h2>
        <div className="contact__content">
          <div className="contact__info">
            <div className="contact__info-item">
              <span className="contact__info-icon">📍</span>
              <div className="contact__info-text">
                <h3 className="contact__info-label">Localização</h3>
                <p className="contact__info-value">Fortaleza – CE, Brasil</p>
              </div>
            </div>
            <div className="contact__info-item">
              <span className="contact__info-icon">📞</span>
              <div className="contact__info-text">
                <h3 className="contact__info-label">Telefone</h3>
                <a href="tel:+5585996370976" className="contact__info-value contact__info-value--link">
                  +55 (85) 99637-0976
                </a>
              </div>
            </div>
            <div className="contact__info-item">
              <span className="contact__info-icon">✉️</span>
              <div className="contact__info-text">
                <h3 className="contact__info-label">E-mail</h3>
                <a href="mailto:diegomota2374@gmail.com" className="contact__info-value contact__info-value--link">
                  diegomota2374@gmail.com
                </a>
              </div>
            </div>
            <div className="contact__social">
              <a
                href="https://linkedin.com/in/diego-mota-cavalcante"
                className="contact__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                💼 LinkedIn
              </a>
              <a
                href="https://github.com/diegomota2374"
                className="contact__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                💻 GitHub
              </a>
            </div>
          </div>
          <form className="contact__form" ref={formRef} onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <label htmlFor="name" className="contact__form-label">
                {t('contact.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="contact__form-input"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="email" className="contact__form-label">
                {t('contact.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="contact__form-input"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="message" className="contact__form-label">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                className="contact__form-textarea"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                aria-required="true"
              ></textarea>
            </div>
            {submitStatus === 'success' && (
              <div className="contact__form-message contact__form-message--success" role="alert">
                {t('contact.success')}
              </div>
            )}
            <button
              type="submit"
              className="contact__form-submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? t('contact.sending') : t('contact.send')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

