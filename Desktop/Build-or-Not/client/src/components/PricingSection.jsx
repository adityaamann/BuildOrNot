import Button from './ui/Button';
import { Link } from 'react-router-dom';

const PRICING_PLANS = [
  {
    name: 'Free',
    description: 'Validate ideas quickly with core analysis features.',
    price: 'INR 0/month',
    buttonLabel: 'Get Started',
    disabled: false,
    comingSoon: false,
  },
  {
    name: 'Pro',
    description: 'Advanced reports and deeper startup intelligence.',
    price: 'Coming Soon',
    buttonLabel: 'Coming Soon',
    disabled: true,
    comingSoon: true,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="mx-auto mt-16 w-full max-w-6xl px-6 py-12 md:py-16 lg:py-20">
      <div className="mb-10 text-center">
        <p className="subtle-badge mb-4">Pricing</p>
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Simple, Transparent Pricing</h2>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
        {PRICING_PLANS.map((plan) => (
          <article
            key={plan.name}
            className={`panel-card relative flex h-full flex-col rounded-2xl p-6 ${
              plan.comingSoon ? 'opacity-75' : ''
            }`}
          >
            {plan.comingSoon ? (
              <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-slate-200">
                Coming Soon
              </span>
            ) : null}

            <h3 className="text-xl font-semibold text-slate-100">{plan.name}</h3>
            <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
            <p className={`mt-6 font-bold text-white ${plan.comingSoon ? 'text-3xl' : 'text-4xl'}`}>{plan.price}</p>

            <div className="mt-6">
              {plan.comingSoon ? (
                <Button
                  type="button"
                  variant="secondary"
                  fullWidth
                  disabled
                  className="cursor-not-allowed opacity-50"
                >
                  {plan.buttonLabel}
                </Button>
              ) : (
                <Link to="/#top" className="block w-full">
                  <Button type="button" variant="primary" fullWidth>
                    {plan.buttonLabel}
                  </Button>
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
