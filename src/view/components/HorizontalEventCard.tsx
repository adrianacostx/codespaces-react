import { ArrowLeft, ArrowRight, Edit3, Trash2 } from 'lucide-react';
import { useTimeline } from '../../controller/TimelineContext';
import { COLOR_BADGES } from '../../model/themes';
import { TimelineEvent } from '../../model/types';

interface Props {
  event: TimelineEvent;
  index: number;
  totalEvents: number;
}

export default function HorizontalEventCard({ event, index, totalEvents }: Props) {
  const {
    previewMode, currentTheme, isDark, spacingClasses,
    deleteConfirmId, setDeleteConfirmId,
    handleMoveEvent, handleOpenEditModal, handleDeleteEvent
  } = useTimeline();

  const colorStyle = COLOR_BADGES[event.color] || COLOR_BADGES.indigo;

  return (
    <div className={`event-card relative flex flex-col ${spacingClasses.minW} shrink-0`}>
      <div className="flex items-center justify-center mb-6 relative">
        <div className={`w-4 h-4 rounded-full z-10 ring-4 ${colorStyle.dot} ${currentTheme.dotRing} shadow-sm`} />
      </div>

      <div className={`group flex-1 flex flex-col justify-between rounded-2xl border border-t-4 ${colorStyle.borderAccent.replace('border-l-', 'border-t-')} ${currentTheme.cardBg} ${spacingClasses.padCard} transition-all hover:shadow-md`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-md border ${isDark ? colorStyle.badgeDark : colorStyle.badgeLight}`}>
              {event.date}
            </span>
            {event.category && (
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                {event.category}
              </span>
            )}
          </div>

          <h3 className={`text-base font-bold mb-2 leading-snug ${currentTheme.textPrimary}`}>{event.title}</h3>
          <p className={`text-xs leading-relaxed ${currentTheme.textSecondary}`}>{event.description}</p>
        </div>

        {!previewMode && (
          <div className="no-print mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button onClick={() => handleMoveEvent(index, -1)} disabled={index === 0} className="p-1.5 rounded hover:bg-slate-200/70 text-slate-500 disabled:opacity-30" title="Mover a la izquierda">
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleMoveEvent(index, 1)} disabled={index === totalEvents - 1} className="p-1.5 rounded hover:bg-slate-200/70 text-slate-500 disabled:opacity-30" title="Mover a la derecha">
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button onClick={() => handleOpenEditModal(event)} className="p-1.5 rounded hover:bg-indigo-100 text-indigo-600" title="Editar hito">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              {deleteConfirmId === event.id ? (
                <div className="flex items-center gap-1 bg-rose-100 px-1.5 py-0.5 rounded">
                  <button onClick={() => handleDeleteEvent(event.id)} className="text-rose-700 font-bold text-[11px]">Sí</button>
                  <button onClick={() => setDeleteConfirmId(null)} className="text-slate-600 text-[11px]">No</button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirmId(event.id)} className="p-1.5 rounded hover:bg-rose-100 text-rose-600" title="Eliminar hito">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}