import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  BarChart3,
  Banknote,
  ShieldAlert,
  Target,
  ArrowLeft,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import ReportCard from '../components/ReportCard';
import ScoreGauge from '../components/ScoreGauge';
import Card from '../components/ui/Card';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const report = location.state?.report;
  const originalIdea = location.state?.idea || 'Your Startup Idea';

  useEffect(() => {
    if (!report) {
      navigate('/analyze', { replace: true });
    }
  }, [report, navigate]);

  if (!report) return null;

  return (
    <div className="mx-auto mb-16 w-full max-w-6xl py-2">
      <div className="mb-8">
        <Link to="/analyze" className="mb-4 inline-flex items-center text-sm font-medium text-slate-400 transition-colors hover:text-brand-amber">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Test Another Idea
        </Link>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <p className="subtle-badge mb-3">Report Ready</p>
            <h1 className="flex flex-wrap items-center gap-3 text-3xl font-semibold tracking-tight text-slate-100">
              Validation Report
              <span className="rounded-md border border-brand-gold/30 bg-brand-gold/12 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-brand-amber">
                AI Generated
              </span>
            </h1>
            <p className="mt-2 max-w-3xl text-slate-400">
              Based on: <span className="italic text-slate-300">"{originalIdea.substring(0, 130)}{originalIdea.length > 130 ? '...' : ''}"</span>
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 shadow-inner">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-amber">
              <Sparkles className="h-3.5 w-3.5" />
              AI Summary
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{report.ideaSummary}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ScoreGauge score={report.finalScore?.score || 0} summary={report.finalScore?.summary} />
        </div>

        <div className="lg:col-span-4">
          <ReportCard icon={BarChart3} title="Market Demand" className="h-full">
            <div className="flex h-full flex-col">
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold capitalize text-white">
                  {report.marketDemand?.level || 'Medium'}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Demand</span>
              </div>
              <p className="overflow-y-auto pr-2 text-sm leading-relaxed text-slate-300 md:text-base">
                {report.marketDemand?.reasoning}
              </p>
            </div>
          </ReportCard>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ReportCard icon={Banknote} title="Monetization">
          <ul className="space-y-3">
            {report.monetization?.map((strategy, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-brand-amber" />
                <span className="text-sm leading-relaxed text-slate-300">{strategy}</span>
              </li>
            ))}
          </ul>
        </ReportCard>

        <Card className="flex flex-col p-6" hoverable>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg border border-brand-gold/30 bg-brand-gold/12 p-2 text-brand-amber">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold tracking-wide text-slate-100">Competitor Analysis</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase text-slate-400">
                <tr>
                  <th className="rounded-tl-lg px-4 py-3 font-medium">Competitor</th>
                  <th className="border-l border-white/10 px-4 py-3 font-medium">Strengths</th>
                  <th className="rounded-tr-lg border-l border-white/10 px-4 py-3 font-medium">Weaknesses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {report.competitors?.map((comp, idx) => (
                  <tr key={idx} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-4 py-4 align-top">
                      <p className="mb-1 font-semibold text-white">{comp.name}</p>
                      <p className="text-xs text-slate-500">{comp.description}</p>
                    </td>
                    <td className="border-l border-white/10 px-4 py-4 align-top">
                      <p className="text-slate-300">{comp.strength}</p>
                    </td>
                    <td className="border-l border-white/10 px-4 py-4 align-top">
                      <p className="text-slate-300">{comp.weakness}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <ReportCard icon={ShieldAlert} title="Risks">
          <div className="mt-2 space-y-4">
            {report.risks?.map((risk, idx) => (
              <div key={idx} className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-rose-400/35">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500/12">
                  <span className="text-sm font-bold text-rose-300">{idx + 1}</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">{risk}</p>
              </div>
            ))}
          </div>
        </ReportCard>
      </div>
    </div>
  );
}
