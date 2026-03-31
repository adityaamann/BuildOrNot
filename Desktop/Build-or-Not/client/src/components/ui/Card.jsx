export default function Card({
  children,
  className = '',
  hoverable = false,
  as: Component = 'div',
}) {
  const hoverClass = hoverable
    ? 'hover:-translate-y-0.5 hover:border-brand-gold/35 hover:shadow-glow'
    : '';

  return (
    <Component
      className={`panel-card p-6 ${hoverClass} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
