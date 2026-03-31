import {
  BrainCircuit,
  BarChart3,
  Users,
  WalletCards,
  Gauge,
  ShieldAlert,
} from 'lucide-react';

const FEATURES = [
  {
    icon: BrainCircuit,
    title: 'AI-Powered Idea Validation',
    description: 'Get instant insights on market demand, competitors, and risks.',
  },
  {
    icon: BarChart3,
    title: 'Market Research',
    description: 'Understand competitors, trends, and positioning.',
  },
  {
    icon: Users,
    title: 'Audience Analysis',
    description: 'Identify your ideal users and segments.',
  },
  {
    icon: WalletCards,
    title: 'Monetization Plan',
    description: 'Discover revenue models for your idea.',
  },
  {
    icon: Gauge,
    title: 'Idea Score',
    description: 'Get a clear score to measure potential.',
  },
  {
    icon: ShieldAlert,
    title: 'Risk Detection',
    description: 'Identify challenges before building.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="mx-auto mt-16 w-full max-w-6xl px-6 py-12 md:py-16 lg:py-20">
      <div className="mb-10 text-center">
        <p className="subtle-badge mb-4">Core Capabilities</p>
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Features</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <article
            key={title}
            className="panel-card rounded-2xl p-6 hover:-translate-y-0.5"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-gold/30 bg-brand-gold/12 text-brand-amber">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-100">{title}</h3>
            <p className="text-sm text-slate-400">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
