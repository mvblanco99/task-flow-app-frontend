import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

const Button = ({ className, variant = 'primary', isLoading, children, disabled, ...props }: ButtonProps) => {
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/30",
    secondary: "bg-slate-800 text-white hover:bg-slate-900",
    outline: "border-2 border-gray-200 text-slate-700 hover:bg-gray-50",
    ghost: "text-primary-600 hover:bg-primary-50 hover:text-primary-700"
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;