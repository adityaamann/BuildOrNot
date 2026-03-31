import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ShieldCheck, ChartColumnBig, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import FeaturesSection from '../components/FeaturesSection';
import PricingSection from '../components/PricingSection';
import { useEffect, useState } from 'react';

const FAQS = [
  {
    question: 'What does this tool do?',
    answer:
      'It analyzes your startup idea and generates a detailed validation report including market demand, competitors, risks, and a viability score.',
  },
  {
    question: 'How accurate is the analysis?',
    answer:
      'The analysis is based on AI models trained on real-world business patterns. It provides strong directional insights, but final success depends on execution.',
  },
  {
    question: 'How long does it take?',
    answer: 'Most reports are generated within 10-20 seconds.',
  },
  {
    question: 'Is my idea safe?',
    answer: 'Yes. Your idea is private and not shared or stored beyond generating your report.',
  },
  {
    question: 'Do I need technical knowledge?',
    answer: 'No. Anyone can use this tool - just describe your idea in simple words.',
  },
  {
    question: 'Can I use this for any industry?',
    answer: 'Yes. The tool works across multiple industries including SaaS, AI, e-commerce, and more.',
  },
  {
    question: 'What should I write for best results?',
    answer:
      'Keep your idea clear and specific. 1-3 lines describing the problem and solution works best.',
  },
  {
    question: 'Is this free to use?',
    answer:
      'Yes, the core features are free to use. Advanced features may be introduced later.',
  },
];

const HERO_METRICS = [
  'Market viability scoring',
  'Competitor mapping in seconds',
  'Monetization and risk insights',
];

export default function LandingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const targetId = location.hash.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash]);

  return (
    <div className="w-full flex-1 pb-12">
      <section id="top" className="panel-card relative mx-auto mt-8 w-full max-w-6xl overflow-hidden rounded-3xl px-6 py-12 md:px-8 md:py-16 lg:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        />
        <div className="pointer-events-none absolute -bottom-28 right-6 h-72 w-72 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute -top-24 left-4 h-56 w-56 rounded-full bg-brand-mint/18 blur-3xl float-slow" />

        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="subtle-badge reveal-up">Executive Validation Suite</p>
            <h1 className="reveal-up-delay mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl">
              Decision-grade startup validation.
              <br />
              <span className="bg-gradient-to-r from-brand-amber via-[#f3ddb5] to-brand-mist bg-clip-text text-transparent">
                Before you write a single line.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base text-slate-300 md:text-lg">
              BuildOrNot turns rough ideas into a structured, investor-ready decision report with market demand, competitors, monetization paths, and execution risks.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/analyze" className="block w-full max-w-xs">
                <Button className="h-12 w-full px-7" fullWidth>
                  Generate Report
                </Button>
              </Link>
              <span className="metric-pill">
                <Sparkles className="h-3.5 w-3.5 text-brand-amber" />
                Typical runtime: under 20s
              </span>
            </div>
          </div>

          <div className="panel-card rounded-2xl border-white/15 p-6 lg:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">What You Receive</p>
            <div className="section-divider mt-4" />
            <ul className="mt-5 space-y-4">
              {HERO_METRICS.map((metric) => (
                <li key={metric} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-brand-gold/35 bg-brand-gold/12 text-brand-amber">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-slate-300">{metric}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                <ChartColumnBig className="h-3.5 w-3.5 text-brand-amber" />
                Signal Quality
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Each report includes clear rationale and score breakdown so you can decide whether to ship, pivot, or drop the idea.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection />

      <section id="faqs" className="mx-auto mt-16 w-full max-w-6xl px-6 py-12 md:py-16 lg:py-20">
        <div className="mb-10 text-center">
          <p className="subtle-badge mb-4">Need Clarity?</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Frequently Asked Questions</h2>
        </div>

        <div className="mx-auto max-w-5xl space-y-3">
          {FAQS.map((item, index) => {
            const isOpen = openFaqIndex === index;

            return (
              <div
                key={item.question}
                className={`rounded-xl border bg-[rgba(10,16,28,0.78)] shadow-soft transition-all duration-200 ${
                  isOpen ? 'border-brand-gold/45' : 'border-white/10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors hover:bg-white/[0.03]"
                >
                  <span className="text-base font-medium leading-tight text-slate-100 md:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="min-h-0">
                    <p className="border-t border-white/10 bg-white/[0.02] px-5 py-3 text-sm leading-relaxed text-slate-300">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <PricingSection />
    </div>
  );
}
