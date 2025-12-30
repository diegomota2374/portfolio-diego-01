import cruzVermelhaImg from '../assets/images/projects/Cruz-Vermelha-normal.webp'
import cruzVermelhaImgMobile from '../assets/images/projects/Cruz-Vermelha-normal-m.webp'
import haipeImg from '../assets/images/projects/haipe-normal.webp'
import haipeImgMobile from '../assets/images/projects/haipe-normal-m.webp'
import mneImg from '../assets/images/projects/mne.webp'
import mneImgMobile from '../assets/images/projects/mne-m.webp'

export const projects = [
  {
    id: 1,
    translationKey: 'projects.items.0',
    technologies: ['WordPress', 'PHP', 'MySQL'],
    image: cruzVermelhaImgMobile,
    imageDesktop: cruzVermelhaImg,
    liveUrl: '#',
    codeUrl: '#'
  },
  {
    id: 2,
    translationKey: 'projects.items.1',
    technologies: ['WordPress', 'PHP', 'MySQL'],
    image: haipeImgMobile,
    imageDesktop: haipeImg,
    liveUrl: 'https://buzzvel.com/portfolio/haipe-studio',
    codeUrl: '#'
  },
  {
    id: 3,
    translationKey: 'projects.items.2',
    technologies: ['WordPress', 'PHP', 'GSAP', 'ScrollTrigger'],
    image: mneImgMobile,
    imageDesktop: mneImg,
    liveUrl: 'https://portugal4unsc.com/',
    codeUrl: '#'
  }
]

