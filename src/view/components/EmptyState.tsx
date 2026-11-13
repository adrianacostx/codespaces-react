import { useTimeline } from '../../controller/TimelineContext';

export default function EmptyState() {
  const { currentTheme, handleOpenAddModal, handleResetDefault } = useTimeline();

  return (
    <div className="text-center py-16 px-4 rounded-2xl border-2 border-dashed border-slate-300 max-w-md mx-auto">
      <p className={`text-sm mb-4 ${currentTheme.textSecondary}`}>
        No hay hitos en la línea de tiempo actualmente.
      </p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => handleOpenAddModal(0)}
          className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700"
        >
          Crear Primer Hito
        </button>
        <button
          onClick={handleResetDefault}
          className="px-4 py-2 bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-300"
        >
          Cargar 10 Originales
        </button>
      </div>
    </div>
  );
}