export default function InputField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon: Icon,
  rightSlot,
  textarea = false,
  rows = 5,
  className = '',
}) {
  const baseClass = `input-field w-full !text-slate-100 placeholder:!text-slate-500 ${
    Icon ? 'pl-10' : 'pl-4'
  } ${rightSlot ? 'pr-24' : 'pr-4'} ${textarea ? 'py-3' : 'h-12'} ${className}`;

  return (
    <div>
      {label ? (
        <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          {label}
        </label>
      ) : null}

      <div className="relative">
        {Icon ? (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        ) : null}

        {textarea ? (
          <textarea
            id={id}
            name={name}
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={baseClass}
            style={{ colorScheme: 'dark' }}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={baseClass}
            style={{ colorScheme: 'dark' }}
          />
        )}

        {rightSlot ? (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">{rightSlot}</div>
        ) : null}
      </div>
    </div>
  );
}
