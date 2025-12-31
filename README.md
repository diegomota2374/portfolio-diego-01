# Portfolio - Diego Mota Cavalcante

Personal portfolio developed with a focus on complex animations using Three.js and GSAP. A modern, responsive landing page optimized for SEO and accessibility.

## 🚀 Technologies

- **React 18** - JavaScript library for building user interfaces
- **Vite** - High-performance build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework (alpha version)
- **Three.js** - 3D library for particle animations and WebGL
- **GSAP** - High-performance animation library
  - **ScrollTrigger** - Plugin for scroll-based animations
- **React Intersection Observer** - For scroll and visibility-based animations
- **EmailJS** - Service for sending emails via contact form

## ✨ Features

- 🎨 **Complex Animations**: 
  - Interactive 3D particles with Three.js in the background
  - Smooth animations with GSAP and ScrollTrigger
  - Parallax effects and scroll-based animations
  - "Back to Top" button with animated 3D coin
  - Animated 3D cube in the projects section
- 🌓 **Dark/Light Themes**: Theme system with custom colors
  - Dark: Almost black dark blue (#0a0e27) and green (#00ff88)
  - Light: Light blue (#4a90e2) and grayish white/ice (#f5f7fa)
  - Preference persistence in localStorage
- 🌐 **Multilingual**: Support for Portuguese and English with toggle
  - Complete translations of the entire interface
  - Preference persistence in localStorage
- 📱 **Responsive**: Design adaptable for all devices
  - Optimized mobile menu
  - Responsive images (mobile/desktop)
  - Automatic particle adjustment per device
- ♿ **Accessible**: Following best accessibility practices (WCAG)
  - ARIA labels on interactive elements
  - Complete keyboard navigation
  - Adequate contrast (WCAG AA)
  - Visible focus states
- 🔍 **SEO Optimized**: Meta tags, semantic structure and Open Graph
  - Dynamic meta tags
  - Open Graph and Twitter Cards
  - HTML5 semantic structure
- 🎯 **Sticky Navigation**: Header always accessible during scroll
- 💎 **Glass Effect**: Modern design with glass effect (glassmorphism)
- 📧 **Contact Form**: EmailJS integration for sending emails
- 🎭 **Interactivity**: 3D hover effects on cards and interactive elements

## 📋 Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── HeaderTop/          # Theme and language toggles
│   │   ├── HeaderNav/          # Sticky navigation
│   │   ├── MobileMenu/         # Responsive mobile menu
│   │   ├── Hero/               # Main section with particles
│   │   │   ├── ParticleCanvas.jsx    # 3D particles canvas
│   │   │   └── AvatarInteractive.jsx # Interactive avatar
│   │   ├── About/              # About me section
│   │   ├── Projects/           # Projects section
│   │   ├── Skills/             # Skills section
│   │   ├── Contact/           # Contact form with EmailJS
│   │   ├── Footer/            # Footer with toggles
│   │   ├── BackToTop3D/       # 3D button to return to top
│   │   ├── WebGLBackground/   # WebGL particles background
│   │   ├── Button/            # Reusable button component
│   │   ├── TechTag/           # Technology tag
│   │   └── AnimatedCube3D/     # Animated 3D cube
│   ├── contexts/
│   │   ├── ThemeContext.jsx    # Theme context (dark/light)
│   │   └── LanguageContext.jsx # Language context (pt/en)
│   ├── data/
│   │   ├── translations.js      # PT/EN translations
│   │   ├── projects.js          # Projects data
│   │   └── skills.js            # Skills data
│   ├── assets/
│   │   ├── images/             # Images and projects
│   │   └── icons/              # Icons and favicons
│   ├── styles/
│   │   ├── variables.css       # CSS variables
│   │   └── utilities.css       # CSS utilities
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── opgdmc.webp            # Open Graph image
├── package.json
├── vite.config.js             # Vite configuration with path aliases
├── tailwind.config.js         # Tailwind CSS 4 configuration
├── postcss.config.js          # PostCSS configuration
├── index.html
└── README.md
```

## 🎨 Code Conventions

- **BEM Notation**: All CSS classes follow the BEM methodology
- **Separate CSS**: Each component has its own CSS file
- **Functional Components**: Using React Hooks
- **Context API**: For global state management (theme and language)
- **Path Aliases**: Use of aliases for imports (`@/`, `@components/`, `@assets/`, etc.)
- **ESLint**: Configured to maintain code quality
- **TypeScript Types**: React types installed for better DX

## 🚀 How to Run

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Preview the build
npm run preview

# Lint the code
npm run lint
```

### Environment Variables

For the contact form to work, create a `.env` file in the project root with the following variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**How to get the credentials:**
1. Visit [EmailJS](https://www.emailjs.com/)
2. Create an account and configure an email service
3. Create an email template
4. Copy the credentials to the `.env` file

> **Note:** The form will work even without these variables, but will show an error when trying to send.

## 📱 Sections

1. **Hero**: 
   - Interactive 3D particle animations in the background
   - Interactive avatar with hover effects
   - Main information with GSAP animations
   - Glassmorphism effect

2. **About**: 
   - Professional presentation
   - Contact information (location, phone, email)
   - Scroll-based entrance animations

3. **Projects**: 
   - Responsive project grid
   - Optimized images (mobile/desktop)
   - Technology tags used
   - Links to live projects
   - ScrollTrigger animations
   - Animated 3D cube as decorative element

4. **Skills**: 
   - Technical skills categorization
   - Languages, frameworks, tools and databases
   - Animated progress bars
   - Staggered entrance animations

5. **Contact**: 
   - Contact form integrated with EmailJS
   - Interactive information cards with 3D effect
   - Links to social networks (LinkedIn, GitHub)
   - Form validation
   - Visual success/error feedback

6. **Footer**: 
   - Dynamic copyright
   - Theme and language toggles
   - Minimalist design

7. **Back to Top**: 
   - Floating button with animated 3D coin
   - Appears after 300px scroll
   - Continuous rotation animation
   - Hover interaction with 3D movement

## 🎯 SEO and Accessibility

### SEO
- Optimized and dynamic meta tags
- HTML5 semantic structure
- Open Graph tags for social networks
- Twitter Cards configured
- Dynamic canonical URL
- Optimized meta description
- Theme color configured

### Accessibility
- ARIA labels on interactive elements
- Complete keyboard navigation
- Adequate contrast (WCAG AA)
- Dynamic lang attribute (pt-BR/en)
- Visible focus states
- Appropriate semantic roles
- Descriptive labels in forms
- Accessible error/success messages

## 🛠️ Technical Features

### Performance
- Image lazy loading
- Particle optimization per device (mobile: 800, tablet: 1200, desktop: 2000)
- Automatic code splitting with Vite
- Production-optimized build

### Animations
- **GSAP Timeline**: Complex and sequential animations
- **ScrollTrigger**: Scroll-based animations
- **Intersection Observer**: Visibility detection for animations
- **Three.js**: Optimized 3D rendering
- **RequestAnimationFrame**: Efficient animation loop

### Responsiveness
- Breakpoints: mobile (< 768px), tablet (768px - 1024px), desktop (> 1024px)
- Responsive images with mobile/desktop versions
- Optimized mobile menu
- Automatic WebGL rendering adjustment

## 📝 License

This is a personal project developed as a portfolio.

## 👨‍💻 Author

**Diego Mota Cavalcante**
- 📧 Email: diegomota2374@gmail.com
- 📱 Phone: +55 (85) 99637-0976
- 💼 [LinkedIn](https://linkedin.com/in/diego-mota-cavalcante)
- 💻 [GitHub](https://github.com/diegomota2374)
