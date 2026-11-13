import { Edit3, Check } from 'lucide-react';
import { useTimeline } from '../../controller/TimelineContext';

export default function TimelineHeader() {
  const {
    timeline, setTimeline, editingHeader, setEditingHeader,
    previewMode, currentTheme, layoutMode, showToast
  } = useTimeline();

  return (
    <div className={`text-center mx-auto mb-12 sm:mb-16 ${layoutMode === 'horizontal' ? 'max-w-3xl sticky left-0 right-0' : 'max-w-3xl'}`}>
      {editingHeader && !previewMode ? (
        <div className="bg-white/95 p-5 rounded-2xl border-2 border-indigo-500 shadow-lg text-slate-900 space-y-3 text-left">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Título Principal</label>
            <input
              type="text"
              value={timeline.title}
              onChange={(e) => setTimeline({ ...timeline, title: e.target.value })}
              className="w-full text-xl sm:text-2xl font-bold px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Título de la línea de tiempo"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Subtítulo o Descripción General</label>
            <input
              type="text"
              value={timeline.subtitle}
              onChange={(e) => setTimeline({ ...timeline, subtitle: e.target.value })}
              className="w-full text-sm sm:text-base px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Subtítulo descriptivo"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => { setEditingHeader(false); showToast("Título actualizado."); }}
              className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              Listo
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !previewMode && setEditingHeader(true)}
          className={`group relative rounded-2xl p-3 transition-all ${!previewMode ? 'cursor-pointer hover:ring-2 hover:ring-indigo-400/50' : ''}`}
          title={!previewMode ? "Haz clic para editar el título y subtítulo" : ""}
        >
          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 ${currentTheme.textPrimary}`}>
            {timeline.title || "Línea de Tiempo Sin Título"}
          </h2>
          <p className={`text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed ${currentTheme.textSecondary}`}>
            {timeline.subtitle}
          </p>
          {!previewMode && (
            <span className="no-print inline-flex items-center gap-1 mt-3 text-[11px] font-medium px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 opacity-75 group-hover:opacity-100 transition-opacity">
              <Edit3 className="w-3 h-3" /> Haz clic para editar encabezado
            </span>
          )}
        </div>
      )}
    </div>
  );
}