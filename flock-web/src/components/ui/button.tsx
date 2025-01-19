import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
  size?: "default" | "lg"
}

export function Button({ 
  children, 
  variant = "default", 
  size = "default",
  className = "",
  ...props 
}: ButtonProps) {
  const baseStyles = "rounded-md font-medium transition-colors"
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 hover:bg-gray-100"
  }
  const sizeStyles = {
    default: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
} 