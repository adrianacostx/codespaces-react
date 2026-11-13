import { Plus, Edit3, X, Check } from 'lucide-react';
import { useTimeline } from '../../controller/TimelineContext';
import { COLOR_BADGES } from '../../model/themes';

export default function EventModal() {
  const { modalEvent, setModalEvent, handleSaveEvent } = useTimeline();

  if (!modalEvent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            {modalEvent.isNew ? (
              <><Plus className="w-4 h-4 text-indigo-600" />Añadir Nuevo Hito</>
            ) : (
              <><Edit3 className="w-4 h-4 text-indigo-600" />Editar Hito Histórico</>
            )}
          </h3>
          <button onClick={() => setModalEvent(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSaveEvent} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha o Periodo *</label>
              <input
                type="text" required
                value={modalEvent.date}
                onChange={(e) => setModalEvent({ ...modalEvent, date: e.target.value })}
                placeholder="Ej: 1995 o 2022 - Presente"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Etiqueta / Categoría</label>
              <input
                type="text"
                value={modalEvent.category}
                onChange={(e) => setModalEvent({ ...modalEvent, category: e.target.value })}
                placeholder="Ej: Sistemas, IA, Teoría..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Título del Hito *</label>
            <input
              type="text" required
              value={modalEvent.title}
              onChange={(e) => setModalEvent({ ...modalEvent, title: e.target.value })}
              placeholder="Ej: Nacimiento de JavaScript"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Descripción Detallada</label>
            <textarea
              rows={4}
              value={modalEvent.description}
              onChange={(e) => setModalEvent({ ...modalEvent, description: e.target.value })}
              placeholder="Describe el impacto histórico y los detalles clave..."
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Color Distintivo del Nodo</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(COLOR_BADGES).map(([key, c]) => (
                <button
                  type="button" key={key}
                  onClick={() => setModalEvent({ ...modalEvent, color: key })}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    modalEvent.color === key
                      ? 'border-slate-900 bg-slate-100 ring-2 ring-slate-900/10'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${c.dot}`} />
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button type="button" onClick={() => setModalEvent(null)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-colors flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              Guardar Hito
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}