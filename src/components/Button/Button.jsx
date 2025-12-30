import './Button.css'

const Button = ({ 
  children, 
  onClick, 
  href,
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
  ariaLabel,
  className = '',
  target,
  rel
}) => {
  const buttonClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full-width',
    disabled && 'btn--disabled',
    className
  ].filter(Boolean).join(' ')

  // If href is provided, render as anchor tag
  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        onClick={onClick}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    )
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

export default Button

