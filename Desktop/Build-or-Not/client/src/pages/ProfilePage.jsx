import { UserCircle2, Mail, IdCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 items-start justify-center py-10">
      <Card className="w-full max-w-2xl p-8 md:p-10" hoverable>
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl border border-brand-gold/35 bg-brand-gold/12 p-2 text-brand-amber">
            <UserCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">My Account</h1>
            <p className="text-sm text-slate-400">Your profile and login details</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="mb-1 text-xs uppercase tracking-[0.14em] text-slate-500">Name</p>
            <p className="text-base font-medium text-slate-100">{user?.name || 'Not available'}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-1 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
              <Mail className="h-3.5 w-3.5" />
              Email
            </div>
            <p className="text-base font-medium text-slate-100">{user?.email || 'Not available'}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-1 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
              <IdCard className="h-3.5 w-3.5" />
              User ID
            </div>
            <p className="text-base font-medium text-slate-100 break-all">{user?.id || 'Not available'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
