import { useEffect, useRef } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../data/projects'
import Button from '../Button'
import TechTag from '../TechTag'
import AnimatedCube3D from '../AnimatedCube3D'
import './Projects.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const { t } = useLanguage()
  const wrapperRef = useRef(null)
  const containerRef = useRef(null)
  const imagesRef = useRef([])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const container = containerRef.current

    if (!wrapper || !container) return

    const images = Array.from(container.querySelectorAll('.projects__image'))
    const totalItems = images.length

    if (totalItems === 0) return

    const visibleClipPath = 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)'
    const hiddenClipPath = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'

    // Set wrapper height based on number of items (100vh per item)
    const wrapperHeight = totalItems * 100
    wrapper.style.height = `${wrapperHeight}vh`

    // Initialize all images
    images.forEach((image, index) => {
      // Set z-index so later images appear on top
      gsap.set(image, {
        zIndex: index,
        immediateRender: true
      })

      if (index === 0) {
        // First image starts visible
        gsap.set(image, {
          clipPath: visibleClipPath,
          immediateRender: true
        })
      } else {
        // Other images start hidden
        gsap.set(image, {
          clipPath: hiddenClipPath,
          immediateRender: true
        })
      }
    })

    // Create GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
      },
    })

    // Animate each image sequentially
    for (let i = 0; i < totalItems; i++) {
      const nextImage = images[i + 1]

      // If not the last item, reveal next image
      if (i + 1 < totalItems && nextImage) {
        const transitionDuration = 1
        const pauseDuration = 0.5

        // Pause before revealing next
        tl.to({}, {
          duration: pauseDuration,
          ease: 'none'
        })

        // Reveal next image - clip-path controlled by scroll
        tl.to(
          nextImage,
          {
            clipPath: visibleClipPath,
            duration: transitionDuration,
            ease: 'none',
          }
        )
      }
    }

    // Handle resize
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 250)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [t])

  // Keyboard navigation for accessibility
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const images = containerRef.current?.querySelectorAll('.projects__image')
      if (!images) return

      const visibleClipPath = 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)'
      const hiddenClipPath = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'

      images.forEach((img, idx) => {
        img.style.clipPath = idx === index ? visibleClipPath : hiddenClipPath
      })
    }
  }

  return (
    <section id="projects" className="projects" aria-label="Projects section">
      <div className="projects__wrapper" ref={wrapperRef}>
        <div className="projects__container" ref={containerRef}>
          {projects.map((project, index) => {
            const projectData = t(project.translationKey)
            return (
              <div
                key={project.id}
                className="projects__image"
                data-index={index}
                style={index !== 0 ? { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' } : {}}
                role="group"
                aria-label={projectData.title}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={el => {
                  if (el) imagesRef.current[index] = el
                }}
              >
                <div className="projects__image-wrapper">
                  <picture>
                    {project.imageDesktop && (
                      <source
                        media="(min-width: 1024px)"
                        srcSet={project.imageDesktop}
                      />
                    )}
                    <img
                      src={project.image}
                      alt={projectData.title}
                      className="projects__image-img"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </picture>
                </div>
                <div className="projects__content">
                  <div className="projects__item">
                    <AnimatedCube3D />
                    <div className="projects__item-header">
                      <h2 className="projects__title-main">{projectData.title}</h2>
                    </div>
                    <div className="projects__item-description">
                      <div className="projects__item-body">
                        <div className="projects__description">
                          <p>{projectData.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="projects__card-tech">
                      {project.technologies.map((tech, techIndex) => (
                        <TechTag key={techIndex}>
                          {tech}
                        </TechTag>
                      ))}
                    </div>
                    <div className="projects__card-actions">
                      <Button
                        href={project.liveUrl}
                        variant="primary"
                        size="small"
                        target="_blank"
                        rel="noopener noreferrer"
                        ariaLabel={`${t('projects.viewProject')} - ${projectData.title}`}
                      >
                        {t('projects.viewProject')}
                      </Button>
                      {project.codeUrl !== '#' && (
                        <Button
                          href={project.codeUrl}
                          variant="outline"
                          size="small"
                          target="_blank"
                          rel="noopener noreferrer"
                          ariaLabel={`${t('projects.viewCode')} - ${projectData.title}`}
                        >
                          {t('projects.viewCode')}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects
