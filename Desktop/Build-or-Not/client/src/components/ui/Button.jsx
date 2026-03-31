export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  fullWidth = false,
  disabled = false,
  onClick,
}) {
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-12 items-center justify-center rounded-xl px-5 text-sm font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variantClass} ${
        fullWidth ? 'w-full' : ''
      } ${className}`.trim()}
    >
      {children}
    </button>
  );
}
