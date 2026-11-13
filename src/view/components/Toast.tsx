import { useTimeline } from '../../controller/TimelineContext';

export default function Toast() {
  const { toast } = useTimeline();
  if (!toast) return null;

  return (
    <div className="no-print fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl border bg-slate-900 text-white border-slate-700 text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-4">
      <span className={`w-2 h-2 rounded-full ${toast.type === 'error' ? 'bg-rose-500' : 'bg-emerald-400'}`} />
      <span>{toast.message}</span>
    </div>
  );
}