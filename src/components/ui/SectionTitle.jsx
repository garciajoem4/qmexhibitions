const SectionTitle = ({ 
  subtitle, 
  title, 
  description,
  align = 'center',
  className = '' 
}) => {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto' : ''} mb-16 ${alignments[align]} ${className}`}>
      {subtitle && (
        <span className="inline-block text-accent-gold font-semibold text-sm uppercase tracking-[0.2em] mb-4">
          {subtitle}
        </span>
      )}
      
      {title && (
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
          {title}
        </h2>
      )}
      
      {description && (
        <p className="text-lg text-white/70 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
