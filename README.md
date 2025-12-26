# Portfolio - Diego Mota Cavalcante

Portfolio pessoal desenvolvido com foco em animações complexas usando Three.js e GSAP. Uma landing page moderna, responsiva e otimizada para SEO e acessibilidade.

## 🚀 Tecnologias

- **React** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server
- **Tailwind CSS 4** - Framework CSS utilitário
- **Three.js** - Biblioteca 3D para animações de partículas
- **GSAP** - Biblioteca de animações de alta performance
- **React Intersection Observer** - Para animações baseadas em scroll

## ✨ Características

- 🎨 **Animações Complexas**: Partículas 3D com Three.js e animações suaves com GSAP
- 🌓 **Temas Dark/Light**: Sistema de temas com cores personalizadas
  - Dark: Azul escuro quase preto (#0a0e27) e verde (#00ff88)
  - Light: Azul claro (#4a90e2) e branco cinzento/gelo (#f5f7fa)
- 🌐 **Multilíngue**: Suporte para Português e Inglês com toggle
- 📱 **Responsivo**: Design adaptável para todos os dispositivos
- ♿ **Acessível**: Seguindo as melhores práticas de acessibilidade (WCAG)
- 🔍 **SEO Otimizado**: Meta tags, estrutura semântica e Open Graph
- 🎯 **Navegação Sticky**: Header sempre acessível durante o scroll
- 💎 **Efeito Glass**: Design moderno com efeito de vidro (glassmorphism)

## 📋 Estrutura

```
portfolio/
├── src/
│   ├── components/
│   │   ├── HeaderTop/      # Toggles de tema e idioma
│   │   ├── HeaderNav/      # Navegação sticky
│   │   ├── Hero/           # Seção principal com partículas
│   │   ├── About/          # Seção sobre mim
│   │   ├── Projects/       # Seção de projetos
│   │   ├── Skills/         # Seção de habilidades
│   │   └── Contact/        # Formulário de contato
│   ├── contexts/
│   │   ├── ThemeContext.jsx    # Contexto de tema
│   │   └── LanguageContext.jsx # Contexto de idioma
│   ├── data/
│   │   ├── translations.js # Traduções PT/EN
│   │   ├── projects.js     # Dados dos projetos
│   │   └── skills.js       # Dados das habilidades
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Convenções de Código

- **BEM Notation**: Todas as classes CSS seguem a metodologia BEM
- **CSS Separado**: Cada componente tem seu próprio arquivo CSS
- **Componentes Funcionais**: Utilizando React Hooks
- **Context API**: Para gerenciamento de estado global (tema e idioma)

## 🚀 Como executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📱 Seções

1. **Hero**: Animação de partículas 3D com efeito glass e informações principais
2. **Sobre**: Apresentação profissional e informações de contato
3. **Projetos**: Grid de projetos com tecnologias utilizadas
4. **Habilidades**: Categorização de skills técnicas
5. **Contato**: Formulário de contato e links sociais

## 🎯 SEO e Acessibilidade

- Meta tags otimizadas
- Estrutura semântica HTML5
- ARIA labels em elementos interativos
- Navegação por teclado
- Contraste adequado (WCAG AA)
- Atributo lang dinâmico
- Focus states visíveis

## 📝 Licença

Este projeto é pessoal e foi desenvolvido como portfolio.

## 👨‍💻 Autor

**Diego Mota Cavalcante**
- 📧 Email: diegomota2374@gmail.com
- 📱 Telefone: +55 (85) 99637-0976
- 💼 [LinkedIn](https://linkedin.com/in/diego-mota-cavalcante)
- 💻 [GitHub](https://github.com/diegomota2374)

