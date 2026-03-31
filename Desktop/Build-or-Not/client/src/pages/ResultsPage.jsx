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

  // Extract data from router state
  const report = location.state?.report;
  const originalIdea = location.state?.idea || 'Your Startup Idea';

  useEffect(() => {
    // If someone goes directly to /results without analyzing an idea, send them back
    if (!report) {
      console.warn('No report found in state. Redirecting back to /analyze.');
      navigate('/analyze', { replace: true });
    } else {
      console.log('ResultsPage mounted with report:', report);
    }
  }, [report, navigate]);

  if (!report) return null; // Prevent flash before redirect

  return (
    <div className="mx-auto mb-16 w-full max-w-6xl py-2">
      <div className="mb-8">
        <Link to="/analyze" className="mb-4 inline-flex items-center text-sm font-medium text-slate-400 transition-colors hover:text-brand-amber">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Test Another Idea
        </Link>

        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-slate-100">
              Validation Report
              <span className="rounded-md border border-brand-gold/30 bg-brand-gold/12 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-amber">
                AI Generated
              </span>
            </h1>
            <p className="mt-2 max-w-3xl text-slate-400">
              Based on: <span className="italic text-slate-300">"{originalIdea.substring(0, 100)}{originalIdea.length > 100 ? '...' : ''}"</span>
            </p>
          </div>
          <div className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-surface-800/70 px-4 py-3 shadow-inner lg:w-auto">
            <Sparkles className="w-5 h-5 text-brand-amber" />
            <p className="text-sm text-slate-300 font-light leading-snug">
              {report.ideaSummary}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-8">
          <ScoreGauge score={report.finalScore?.score || 0} summary={report.finalScore?.summary} />
        </div>
        <div className="lg:col-span-4">
          <ReportCard icon={BarChart3} title="Market Demand" className="h-full">
            <div className="flex flex-col h-full">
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold capitalize text-white">
                  {report.marketDemand?.level || 'Medium'}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">Demand</span>
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
                <span className="text-sm text-slate-300 leading-relaxed">{strategy}</span>
              </li>
            ))}
          </ul>
        </ReportCard>

        <Card className="flex flex-col p-6" hoverable>
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg border border-brand-gold/30 bg-brand-gold/12 p-2 text-brand-amber">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold tracking-wide text-slate-100">Competitor Analysis</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-900/70 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium rounded-tl-lg">Competitor</th>
                  <th className="border-l border-white/10 px-4 py-3 font-medium">Strengths</th>
                  <th className="rounded-tr-lg border-l border-white/10 px-4 py-3 font-medium">Weaknesses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {report.competitors?.map((comp, idx) => (
                  <tr key={idx} className="transition-colors hover:bg-surface-800/30">
                    <td className="px-4 py-4 align-top">
                      <p className="font-semibold text-white mb-1">{comp.name}</p>
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
          <div className="space-y-4 mt-2">
            {report.risks?.map((risk, idx) => (
              <div key={idx} className="flex gap-4 rounded-xl border border-white/10 bg-surface-900/45 p-4 transition-colors hover:border-rose-400/35">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500/10">
                  <span className="text-rose-300 font-bold text-sm">{idx + 1}</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  {risk}
                </p>
              </div>
            ))}
          </div>
        </ReportCard>
      </div>
    </div>
  );
}
