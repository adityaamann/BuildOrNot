import { Loader2 } from 'lucide-react';
import Card from './ui/Card';

export default function LoadingSpinner({ message = 'Analyzing your idea...' }) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-2xl items-center justify-center px-4">
      <Card className="w-full p-10 text-center">
        <p className="subtle-badge mb-5">Processing</p>
        <div className="relative mx-auto w-fit">
          <div className="absolute inset-0 rounded-full bg-brand-gold/35 blur-xl" />
          <Loader2 className="relative z-10 h-14 w-14 animate-spin text-brand-amber" />
        </div>

        <h3 className="mt-6 text-xl font-semibold tracking-tight text-slate-100">{message}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-400">
          Our AI is analyzing market demand, competitors, and monetization potential. This usually takes a few seconds.
        </p>
      </Card>
    </div>
  );
}
