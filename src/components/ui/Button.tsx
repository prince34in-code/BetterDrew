import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
  const baseStyles = 'px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4';

  const variants = {
    primary: 'bg-forest-green text-warm-white hover:bg-muted-gold hover:text-forest-green focus:ring-muted-gold/50',
    secondary: 'bg-coconut-cream text-forest-green hover:bg-muted-gold focus:ring-forest-green/30',
    outline: 'bg-transparent border-2 border-warm-white text-warm-white hover:bg-muted-gold hover:border-muted-gold hover:text-forest-green focus:ring-warm-white/50',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
