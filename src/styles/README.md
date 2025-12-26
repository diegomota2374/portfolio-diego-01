# Design System - Guia de Uso

Este diretório contém as definições do design system do projeto.

## Estrutura

- `variables.css` - Todas as variáveis CSS customizadas (cores, espaçamentos, tipografia, etc.)

## Como Usar

### No Tailwind (Recomendado)

Use as classes do Tailwind definidas no `tailwind.config.js`:

```jsx
// Cores
<div className="bg-dark-primary text-dark-text">
<div className="bg-light-accent text-light-text">

// Fontes
<h1 className="font-display">Título</h1>
<p className="font-sans">Texto</p>

// Tamanhos
<h1 className="text-5xl">Título Grande</h1>
<p className="text-lg">Texto Grande</p>

// Espaçamentos
<div className="max-w-container mx-auto px-8">
<section className="py-24">
```

### Com Variáveis CSS

Use as variáveis CSS nos arquivos `.css`:

```css
.meu-componente {
  background-color: var(--color-dark-primary);
  color: var(--color-dark-text);
  padding: var(--spacing-section);
  border-radius: var(--radius-lg);
  transition: var(--transition-base);
  box-shadow: var(--shadow-glass);
}
```

### Cores Disponíveis

#### Dark Mode
- `--color-dark-primary`: #0a0e27
- `--color-dark-accent`: #00ff88
- `--color-dark-bg`: #0f1419
- `--color-dark-text`: #ffffff
- `--color-dark-text-muted`: rgba(255, 255, 255, 0.7)
- `--color-dark-border`: rgba(255, 255, 255, 0.1)

#### Light Mode
- `--color-light-primary`: #4a90e2
- `--color-light-accent`: #f5f7fa
- `--color-light-bg`: #ffffff
- `--color-light-text`: #0a0e27
- `--color-light-text-muted`: rgba(10, 14, 39, 0.7)
- `--color-light-border`: rgba(0, 0, 0, 0.1)

### Fontes

- **Sans**: Inter (padrão para textos)
- **Display**: Poppins (para títulos)
- **Mono**: Fira Code (para código)

### Espaçamentos

- Container: `1200px` (use `max-w-container`)
- Seção: `6rem` (use `py-24`)
- Container padding: `2rem` (use `px-8`)

### Transições

- Base: `0.3s ease-in-out`
- Fast: `0.15s ease-in-out`
- Slow: `0.5s ease-in-out`

### Shadows

- `--shadow-glass`: Sombra para efeitos de vidro
- `--shadow-glow-green`: Brilho verde
- `--shadow-glow-blue`: Brilho azul

