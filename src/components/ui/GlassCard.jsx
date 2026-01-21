import { forwardRef } from 'react';

const GlassCard = forwardRef(({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        glass-card 
        ${hover ? 'hover:scale-[1.02]' : ''} 
        ${glow ? 'glow-gold' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
