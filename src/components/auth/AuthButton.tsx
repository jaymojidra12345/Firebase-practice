import { type ButtonHTMLAttributes } from 'react'

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  variant?: 'primary' | 'secondary'
}

export function AuthButton({
  loading = false,
  variant = 'primary',
  children,
  disabled,
  className = '',
  ...props
}: AuthButtonProps) {
  const base =
    'flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60'
  const styles =
    variant === 'primary'
      ? 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500/30'
      : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={`${base} ${styles} ${className}`}
      {...props}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
}
