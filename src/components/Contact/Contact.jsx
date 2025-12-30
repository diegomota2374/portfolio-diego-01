import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../../contexts/LanguageContext'
import { gsap } from 'gsap'
import emailjs from '@emailjs/browser'
import Button from '../Button'
import './Contact.css'

const Contact = () => {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const infoItem1Ref = useRef(null)
  const infoItem2Ref = useRef(null)
  const infoItem3Ref = useRef(null)
  const socialRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  useEffect(() => {
    if (inView) {
      const infoItems = [infoItem1Ref.current, infoItem2Ref.current, infoItem3Ref.current]
      const socialLinks = socialRef.current?.querySelectorAll('.contact__social-link')
      const form = formRef.current

      // Set initial states
      infoItems.forEach((item) => {
        if (item) {
          gsap.set(item, { opacity: 0, x: -30, scale: 0.9 })
        }
      })
      
      if (socialLinks) {
        gsap.set(socialLinks, { opacity: 0, y: 20 })
      }
      
      if (form) {
        gsap.set(form, { opacity: 0, y: 50, scale: 0.95 })
      }

      // Animate with timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      // Animate info items
      tl.to(infoItems, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.2)'
      })
      
      // Animate social links
      if (socialLinks) {
        tl.to(socialLinks, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        }, '-=0.3')
      }
      
      // Animate form
      if (form) {
        tl.to(form, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.1)'
        }, '-=0.4')
      }
    }
  }, [inView])

  // Mouse move handler for interactive cards
  const handleMouseMove = (e, cardRef) => {
    if (!cardRef?.current || window.innerWidth < 968) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

    gsap.to(cardRef.current, {
      x: x * 8,
      y: y * 8,
      rotationY: x * 2,
      rotationX: y * -2,
      duration: 0.5,
      ease: 'power1.out',
      transformPerspective: 1000
    })
  }

  const handleMouseLeave = (cardRef) => {
    if (!cardRef?.current) return
    
    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: 'power2.out'
    })
  }

  // Setup event listeners for info items
  useEffect(() => {
    const items = [infoItem1Ref, infoItem2Ref, infoItem3Ref]
    const cleanupFunctions = []
    
    items.forEach((itemRef) => {
      const item = itemRef.current
      if (item) {
        const handleMove = (e) => handleMouseMove(e, itemRef)
        const handleLeave = () => handleMouseLeave(itemRef)
        
        item.addEventListener('mousemove', handleMove)
        item.addEventListener('mouseleave', handleLeave)
        
        cleanupFunctions.push(() => {
          item.removeEventListener('mousemove', handleMove)
          item.removeEventListener('mouseleave', handleLeave)
        })
      }
    })
    
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  // Força estilos do autocomplete quando detectado
  useEffect(() => {
    if (!formRef.current) return
    
    const inputs = formRef.current.querySelectorAll('.contact__form-input')
    const isLight = document.documentElement.classList.contains('light')
    
    const fixAutofillStyle = (input) => {
      // Usa requestAnimationFrame para garantir que o autocomplete já foi aplicado
      requestAnimationFrame(() => {
        try {
          // Tenta verificar se o autocomplete está ativo
          const computedStyle = window.getComputedStyle(input)
          const bgColor = computedStyle.backgroundColor
          
          // Se o background mudou para o padrão do autocomplete (amarelo/branco claro)
          if (bgColor && (bgColor.includes('rgb(250, 255, 189)') || bgColor.includes('rgb(255, 255, 236)'))) {
            if (isLight) {
              input.style.setProperty('-webkit-box-shadow', '0 0 0 1000px rgba(255, 255, 255, 0.9) inset', 'important')
              input.style.setProperty('-webkit-text-fill-color', '#0a0e27', 'important')
            } else {
              input.style.setProperty('-webkit-box-shadow', '0 0 0 1000px rgba(255, 255, 255, 0.1) inset', 'important')
              input.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important')
            }
          }
        } catch (e) {
          // Fallback: aplica os estilos de qualquer forma
          if (isLight) {
            input.style.setProperty('-webkit-box-shadow', '0 0 0 1000px rgba(255, 255, 255, 0.9) inset', 'important')
            input.style.setProperty('-webkit-text-fill-color', '#0a0e27', 'important')
          } else {
            input.style.setProperty('-webkit-box-shadow', '0 0 0 1000px rgba(255, 255, 255, 0.1) inset', 'important')
            input.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important')
          }
        }
      })
    }
    
    const handleInput = (e) => fixAutofillStyle(e.target)
    const handleFocus = (e) => fixAutofillStyle(e.target)
    
    inputs.forEach(input => {
      input.addEventListener('input', handleInput)
      input.addEventListener('focus', handleFocus)
      // Verifica após um pequeno delay quando o campo recebe foco
      input.addEventListener('focus', () => {
        setTimeout(() => fixAutofillStyle(input), 50)
      })
    })
    
    return () => {
      inputs.forEach(input => {
        input.removeEventListener('input', handleInput)
        input.removeEventListener('focus', handleFocus)
      })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // EmailJS configuration
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    // Check if EmailJS is configured
    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS não está configurado. Verifique as variáveis de ambiente.')
      setIsSubmitting(false)
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
      return
    }

    try {
      // Initialize EmailJS
      emailjs.init(publicKey)

      // Send email
      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'diegomota2374@gmail.com', // Seu email de destino
      })

      // Success
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      console.error('Erro ao enviar email:', error)
      
      // Tratamento específico para erros comuns
      if (error.status === 412) {
        console.error('Erro de autenticação Gmail. Verifique as permissões do serviço no EmailJS.')
        console.error('Solução: Acesse o EmailJS Dashboard e reconecte o serviço Gmail com todas as permissões.')
      } else if (error.status === 400) {
        console.error('Erro na requisição. Verifique os parâmetros do template.')
      } else if (error.status === 0 || !navigator.onLine) {
        console.error('Sem conexão com a internet.')
      }
      
      setIsSubmitting(false)
      setSubmitStatus('error')
      
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    }
  }

  return (
    <section id="contact" className="contact" ref={ref} aria-label="Contact section">
      <div className="contact__container">
        <h2 className="contact__title">{t('contact.title')}</h2>
        <div className="contact__content">
          <div className="contact__info" ref={infoRef}>
            <div 
              className="contact__info-item" 
              ref={infoItem1Ref}
              role="listitem"
            >
              <span className="contact__info-icon" aria-hidden="true">📍</span>
              <div className="contact__info-text">
                <h3 className="contact__info-label">{t('contact.locationLabel')}</h3>
                <p className="contact__info-value">{t('about.location')}</p>
              </div>
            </div>
            <div 
              className="contact__info-item" 
              ref={infoItem2Ref}
              role="listitem"
            >
              <span className="contact__info-icon" aria-hidden="true">📞</span>
              <div className="contact__info-text">
                <h3 className="contact__info-label">{t('contact.phoneLabel')}</h3>
                <a 
                  href={`tel:${t('about.phone').replace(/\s/g, '')}`} 
                  className="contact__info-value contact__info-value--link"
                  aria-label={`Phone: ${t('about.phone')}`}
                >
                  {t('about.phone')}
                </a>
              </div>
            </div>
            <div 
              className="contact__info-item" 
              ref={infoItem3Ref}
              role="listitem"
            >
              <span className="contact__info-icon" aria-hidden="true">✉️</span>
              <div className="contact__info-text">
                <h3 className="contact__info-label">{t('contact.emailLabel')}</h3>
                <a 
                  href={`mailto:${t('about.email')}`} 
                  className="contact__info-value contact__info-value--link"
                  aria-label={`Email: ${t('about.email')}`}
                >
                  {t('about.email')}
                </a>
              </div>
            </div>
            <div className="contact__social" ref={socialRef}>
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
            {submitStatus === 'error' && (
              <div className="contact__form-message contact__form-message--error" role="alert">
                {t('contact.error')}
              </div>
            )}
            <Button
              type="submit"
              variant="primary"
              size="medium"
              fullWidth={true}
              disabled={isSubmitting}
              ariaLabel={isSubmitting ? t('contact.sending') : t('contact.send')}
            >
              {isSubmitting ? t('contact.sending') : t('contact.send')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

