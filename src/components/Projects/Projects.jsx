import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../../contexts/LanguageContext'
import { gsap } from 'gsap'
import { projects } from '../../data/projects'
import './Projects.css'

const Projects = () => {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  const projectsRef = useRef(null)

  useEffect(() => {
    if (inView && projectsRef.current) {
      gsap.from(projectsRef.current.children, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      })
    }
  }, [inView])

  return (
    <section id="projects" className="projects" ref={ref} aria-label="Projects section">
      <div className="projects__container">
        <h2 className="projects__title">{t('projects.title')}</h2>
        <div className="projects__grid" ref={projectsRef} role="list">
          {projects.map((project) => (
            <article key={project.id} className="projects__card" role="listitem">
              <div className="projects__card-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="projects__card-content">
                <h3 className="projects__card-title">{project.title}</h3>
                <p className="projects__card-description">{project.description}</p>
                <div className="projects__card-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="projects__card-tech-item">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="projects__card-actions">
                  <a
                    href={project.liveUrl}
                    className="projects__card-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t('projects.viewProject')} - ${project.title}`}
                  >
                    {t('projects.viewProject')}
                  </a>
                  <a
                    href={project.codeUrl}
                    className="projects__card-link projects__card-link--secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t('projects.viewCode')} - ${project.title}`}
                  >
                    {t('projects.viewCode')}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

