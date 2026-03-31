import { useEffect, useState } from 'react';
import Card from './ui/Card';

export default function ScoreGauge({ score, summary }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Animate score from 0 to target score over 1.5 seconds
    const duration = 1500;
    const steps = 30;
    const stepTime = Math.abs(Math.floor(duration / steps));
    let currentScore = 0;
    
    const timer = setInterval(() => {
      currentScore += score / steps;
      if (currentScore >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(currentScore * 10) / 10);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [score]);

  // Determine color based on score
  const getColorClass = () => {
    if (score >= 8) return 'text-brand-mint border-brand-mint/80 shadow-[0_0_26px_rgba(88,169,158,0.28)]';
    if (score >= 5) return 'text-brand-amber border-brand-amber/80 shadow-[0_0_26px_rgba(224,187,123,0.3)]';
    return 'text-rose-400 border-rose-400/80 shadow-[0_0_26px_rgba(251,113,133,0.3)]';
  };

  return (
    <Card className="relative flex flex-col items-center gap-8 overflow-hidden p-8 md:flex-row" hoverable>
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-gold/18 blur-3xl" />

      <div className="flex-shrink-0 relative">
        <div className={`z-10 flex h-40 w-40 flex-col items-center justify-center rounded-full border-4 bg-surface-900/65 backdrop-blur-sm transition-all duration-1000 ${getColorClass()}`}>
          <span className="text-5xl font-bold">{Math.round(animatedScore)}</span>
          <span className="text-sm font-medium opacity-80 uppercase tracking-widest mt-1">/ 10</span>
        </div>
      </div>

      <div className="flex-1 text-center md:text-left z-10">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-slate-100">Overall Assessment</h2>
        <p className="text-lg leading-relaxed text-slate-300">
          {summary}
        </p>
      </div>
    </Card>
  );
}
