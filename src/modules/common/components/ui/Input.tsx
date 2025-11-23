import React, { forwardRef } from 'react';
import { cn } from '../../../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            error && "border-red-500 focus:ring-red-200",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 font-medium animate-pulse">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;