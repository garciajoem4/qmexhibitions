import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  href,
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer';
  
  const variants = {
    primary: 'glass-button',
    secondary: 'bg-transparent border-2 border-white/30 hover:border-white/60 hover:bg-white/10 rounded-full text-white',
    outline: 'bg-transparent border-2 border-accent-gold/50 hover:border-accent-gold hover:bg-accent-gold/10 rounded-full text-accent-gold',
    ghost: 'bg-transparent hover:bg-white/10 rounded-lg text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a ref={ref} href={href} className={combinedStyles} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button ref={ref} className={combinedStyles} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
