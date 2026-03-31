import Card from './ui/Card';

export default function ReportCard({ icon: Icon, title, children, className = '' }) {
  return (
    <Card className={`flex h-full flex-col ${className}`} hoverable>
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div className="rounded-lg border border-brand-gold/30 bg-brand-gold/12 p-2 text-brand-amber">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <h3 className="text-lg font-semibold tracking-wide text-slate-100">{title}</h3>
      </div>

      <div className="flex-1 leading-relaxed text-slate-300">
        {children}
      </div>
    </Card>
  );
}
