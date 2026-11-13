import { Calendar, ArrowUp, ArrowDown, Edit3, Trash2, Plus } from 'lucide-react';
import { useTimeline } from '../../controller/TimelineContext';
import { COLOR_BADGES } from '../../model/themes';
import { TimelineEvent } from '../../model/types';

interface Props {
  event: TimelineEvent;
  index: number;
  isEven: boolean;
  totalEvents: number;
}

export default function VerticalEventCard({ event, index, isEven, totalEvents }: Props) {
  const {
    previewMode, currentTheme, isDark, spacingClasses,
    deleteConfirmId, setDeleteConfirmId,
    handleMoveEvent, handleOpenEditModal, handleDeleteEvent, handleOpenAddModal
  } = useTimeline();

  const colorStyle = COLOR_BADGES[event.color] || COLOR_BADGES.indigo;

  return (
    <div className={`event-card relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Nodo en la línea */}
      <div className={`absolute left-5 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 mt-6 md:mt-0 z-10 ring-4 ${colorStyle.dot} ${currentTheme.dotRing} shadow-sm`} />

      {/* Espaciador opuesto */}
      <div className="hidden md:block md:w-1/2" />

      {/* Contenedor de la tarjeta */}
      <div className={`w-full pl-12 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
        <div className={`group relative rounded-2xl border border-l-4 ${colorStyle.borderAccent} ${currentTheme.cardBg} ${spacingClasses.padCard} transition-all duration-200 hover:shadow-md`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-md border ${isDark ? colorStyle.badgeDark : colorStyle.badgeLight}`}>
                <Calendar className="w-3.5 h-3.5" />
                {event.date}
              </span>
              {event.category && (
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                  {event.category}
                </span>
              )}
            </div>

            {!previewMode && (
              <div className="no-print flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleMoveEvent(index, -1)} disabled={index === 0} className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 disabled:opacity-30" title="Mover arriba">
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleMoveEvent(index, 1)} disabled={index === totalEvents - 1} className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 disabled:opacity-30" title="Mover abajo">
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleOpenEditModal(event)} className="p-1.5 rounded-lg hover:bg-indigo-100 text-indigo-600" title="Editar hito">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                {deleteConfirmId === event.id ? (
                  <div className="flex items-center gap-1 bg-rose-100 px-1.5 py-0.5 rounded-lg">
                    <button onClick={() => handleDeleteEvent(event.id)} className="text-rose-700 font-bold text-[11px] px-1">Borrar</button>
                    <button onClick={() => setDeleteConfirmId(null)} className="text-slate-600 text-[11px] px-1">No</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirmId(event.id)} className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-600" title="Eliminar hito">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

          <h3 className={`text-base sm:text-lg font-bold mb-2 leading-snug ${currentTheme.textPrimary}`}>{event.title}</h3>
          <p className={`text-xs sm:text-sm leading-relaxed ${currentTheme.textSecondary}`}>{event.description}</p>

          {!previewMode && (
            <button
              onClick={() => handleOpenAddModal(index + 1)}
              className="no-print absolute -bottom-3.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity bg-indigo-600 text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 hover:bg-indigo-700 z-20"
              title="Insertar un nuevo hito aquí"
            >
              <Plus className="w-3 h-3" /> Insertar aquí
            </button>
          )}
        </div>
      </div>
    </div>
  );
}