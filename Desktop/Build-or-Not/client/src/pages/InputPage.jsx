import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, AlertCircle, Sparkles, ShieldCheck, Zap, Timer, ChevronRight } from 'lucide-react';
import { analyzeIdea } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';

const IDEA_TYPES = ['SaaS', 'AI Tool', 'Marketplace', 'Consumer App', 'Fintech'];

const EXAMPLE_IDEAS = [
  'AI agent that drafts support replies from past ticket history for B2B SaaS teams.',
  'Subscription app that helps freelancers automate follow-ups and collect invoices faster.',
  'Marketplace connecting neighborhood fitness coaches with users for live micro-sessions.',
  'Fintech dashboard that predicts cash-flow risk for small businesses using bank activity.',
];

const WRITING_TIPS = [
  'Describe the problem first, then your solution.',
  'Mention who the product is for.',
  'Add one clear differentiator from existing tools.',
];

export default function InputPage() {
  const navigate = useNavigate();

  const [idea, setIdea] = useState('');
  const [ideaType, setIdeaType] = useState(IDEA_TYPES[0]);
  const [targetAudience, setTargetAudience] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateIdea = () => {
    const randomIdea = EXAMPLE_IDEAS[Math.floor(Math.random() * EXAMPLE_IDEAS.length)];
    setIdea(randomIdea);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!idea.trim()) {
      setError('Please describe your startup idea.');
      return;
    }
    if (idea.trim().length < 10) {
      setError('Idea description is too short. Please provide at least 10 characters.');
      return;
    }

    setIsAnalyzing(true);

    try {
      const enrichedIdea = [
        `Idea Type: ${ideaType}`,
        targetAudience.trim() ? `Target Audience: ${targetAudience.trim()}` : null,
        `Core Idea: ${idea.trim()}`,
      ]
        .filter(Boolean)
        .join('\n');

      const report = await analyzeIdea(enrichedIdea, '');
      setIsAnalyzing(false);
      navigate('/results', { state: { report, idea, industry: ideaType } });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again later.');
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center py-10">
      <div className="w-full">
        <div className="mb-8 text-center">
          <p className="subtle-badge mb-4">Idea Review</p>
          <h1 className="mb-3 text-4xl font-semibold tracking-tight text-slate-100">Validate your startup idea</h1>
          <p className="text-slate-400">Describe the concept once. Get a structured decision report in seconds.</p>
        </div>

        <Card className="relative grid gap-8 p-8 md:p-10 lg:grid-cols-[1.2fr_0.8fr]" hoverable>
          <div>
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-400/40 bg-rose-500/10 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
                <p className="text-sm text-rose-100">{error}</p>
              </div>
            )}

            <div className="mb-6 flex flex-wrap items-center gap-2">
              {IDEA_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setIdeaType(type)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold tracking-[0.08em] transition-all ${
                    ideaType === type
                      ? 'border-brand-gold/45 bg-brand-gold/18 text-brand-amber'
                      : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-brand-mist/45 hover:text-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <InputField
                  id="idea"
                  name="idea"
                  label="What are you building?"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  rows={8}
                  textarea
                  className="leading-relaxed text-base"
                  placeholder="e.g. AI copilot that turns customer calls into actionable product insights for SaaS teams."
                />
                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>Keep it clear. 1-3 lines usually works best.</span>
                  <span className={idea.length < 10 && idea.length > 0 ? 'text-rose-400' : ''}>{idea.length}/2000</span>
                </div>
              </div>

              <InputField
                id="targetAudience"
                name="targetAudience"
                label="Target audience (optional)"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Early-stage SaaS founders with 3-20 person teams"
              />

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleGenerateIdea}
                  className="inline-flex items-center rounded-xl border border-white/15 bg-[#111b2d]/75 px-4 py-2 text-sm font-medium text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-mist/55 hover:bg-[#111b2d]"
                >
                  <Sparkles className="mr-2 h-4 w-4 text-brand-amber" />
                  Generate idea
                </button>
                <p className="text-xs text-slate-500">Need inspiration? Start with one click.</p>
              </div>

              <div className="pt-2">
                <Button type="submit" fullWidth className="h-14 text-base">
                  <Search className="mr-2 h-5 w-5" />
                  Get Validation Report
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-amber">Quality Tips</p>
              <ul className="mt-4 space-y-3">
                {WRITING_TIPS.map((tip) => (
                  <li key={tip} className="flex gap-2 text-sm text-slate-300">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Why teams use this</p>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p className="inline-flex items-center gap-2">
                  <Zap className="h-4 w-4 text-brand-amber" />
                  Fast analysis for early decisions
                </p>
                <p className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-amber" />
                  Secure token-based processing
                </p>
                <p className="inline-flex items-center gap-2">
                  <Timer className="h-4 w-4 text-brand-amber" />
                  Results delivered in seconds
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
