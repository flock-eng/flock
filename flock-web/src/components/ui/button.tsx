import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
  size?: 'default' | 'lg'
}

export function Button({ 
  children, 
  variant = 'default', 
  size = 'default',
  className = '',
  ...props 
}: ButtonProps) {
  const variantClasses = variant === 'outline' 
    ? 'border border-gray-300 hover:bg-gray-100' 
    : 'bg-blue-500 text-white hover:bg-blue-600'
  
  const sizeClasses = size === 'lg'
    ? 'px-6 py-3 text-lg'
    : 'px-4 py-2'

  return (
    <button
      className={`rounded-md transition-colors ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
} 