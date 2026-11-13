import {
  Plus, Download, Upload, RotateCcw, Check, X, Palette, Layout, Eye,
  Sparkles, Image as ImageIcon, FileJson, Printer, FileCode
} from 'lucide-react';
import { useTimeline } from '../../controller/TimelineContext';
import { THEMES } from '../../model/themes';
import { ThemeKey } from '../../model/types';

export default function Toolbar() {
  const {
    timeline, layoutMode, setLayoutMode, themeKey, setThemeKey,
    density, setDensity, previewMode, setPreviewMode,
    resetConfirm, setResetConfirm, exportMenuOpen, setExportMenuOpen,
    isExportingPng, fileInputRef,
    handleOpenAddModal, handleResetDefault, handleImportJSON,
    handleExportPNG, handleExportJSON, handleExportHTML, handlePrintPDF
  } = useTimeline();

  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm text-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">

        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">ChronoCanvas</h1>
            <p className="text-[11px] text-slate-500 hidden sm:block">Editor interactivo de líneas de tiempo</p>
          </div>
        </div>

        {/* Controles centrales */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {/* Layout */}
          <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setLayoutMode('vertical')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                layoutMode === 'vertical' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Vista Vertical Clásica"
            >
              <Layout className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Vertical</span>
            </button>
            <button
              onClick={() => setLayoutMode('horizontal')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                layoutMode === 'horizontal' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Vista Horizontal Panorámica"
            >
              <Layout className="w-3.5 h-3.5 rotate-90" />
              <span className="hidden md:inline">Horizontal</span>
            </button>
          </div>

          {/* Theme */}
          <div className="relative flex items-center">
            <Palette className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 pointer-events-none" />
            <select
              value={themeKey}
              onChange={(e) => setThemeKey(e.target.value as ThemeKey)}
              aria-label="Seleccionar tema visual"
              className="pl-8 pr-3 py-1.5 text-xs font-medium bg-slate-100 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-200/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {Object.entries(THEMES).map(([key, t]) => (
                <option key={key} value={key}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Density */}
          <div className="hidden lg:inline-flex items-center rounded-lg bg-slate-100 p-1 border border-slate-200">
            <button onClick={() => setDensity('compact')} className={`px-2 py-1 rounded text-xs font-medium ${density === 'compact' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-600'}`} title="Densidad Compacta">Compacto</button>
            <button onClick={() => setDensity('normal')} className={`px-2 py-1 rounded text-xs font-medium ${density === 'normal' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-600'}`} title="Densidad Normal">Normal</button>
            <button onClick={() => setDensity('spacious')} className={`px-2 py-1 rounded text-xs font-medium ${density === 'spacious' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-600'}`} title="Densidad Amplia">Amplio</button>
          </div>

          {/* Preview */}
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              previewMode
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Ocultar controles de edición para previsualizar el resultado final"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{previewMode ? 'Modo Edición' : 'Vista Limpia'}</span>
          </button>
        </div>

        {/* Acciones principales */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => handleOpenAddModal(timeline.events.length)}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir Hito</span>
          </button>

          {resetConfirm ? (
            <div className="flex items-center gap-1 bg-rose-50 border border-rose-200 px-2 py-1 rounded-lg">
              <span className="text-[11px] font-medium text-rose-800">¿Reiniciar?</span>
              <button onClick={handleResetDefault} className="p-1 bg-rose-600 text-white rounded hover:bg-rose-700" title="Confirmar restauración"><Check className="w-3 h-3" /></button>
              <button onClick={() => setResetConfirm(false)} className="p-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300" title="Cancelar"><X className="w-3 h-3" /></button>
            </div>
          ) : (
            <button
              onClick={() => setResetConfirm(true)}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="Restaurar los 10 hitos originales"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title="Importar archivo JSON"
          >
            <Upload className="w-4 h-4" />
          </button>

          {/* Export menu */}
          <div className="relative">
            <button
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              disabled={isExportingPng}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              <span>{isExportingPng ? 'Generando...' : 'Exportar'}</span>
            </button>

            {exportMenuOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setExportMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-slate-200 py-1.5 z-40 text-slate-800">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Opciones de Exportación
                  </div>
                  <button onClick={handleExportPNG} className="w-full px-3.5 py-2.5 text-left text-xs hover:bg-slate-50 flex items-start gap-3 transition-colors">
                    <ImageIcon className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">Imagen PNG (Alta Calidad)</div>
                      <div className="text-[11px] text-slate-500">Captura completa sin botones de edición</div>
                    </div>
                  </button>
                  <button onClick={handlePrintPDF} className="w-full px-3.5 py-2.5 text-left text-xs hover:bg-slate-50 flex items-start gap-3 transition-colors">
                    <Printer className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">Imprimir / Guardar PDF</div>
                      <div className="text-[11px] text-slate-500">Diseño editorial optimizado para papel</div>
                    </div>
                  </button>
                  <button onClick={handleExportHTML} className="w-full px-3.5 py-2.5 text-left text-xs hover:bg-slate-50 flex items-start gap-3 transition-colors">
                    <FileCode className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">Página Web HTML</div>
                      <div className="text-[11px] text-slate-500">Archivo estático listo para compartir</div>
                    </div>
                  </button>
                  <button onClick={handleExportJSON} className="w-full px-3.5 py-2.5 text-left text-xs hover:bg-slate-50 flex items-start gap-3 transition-colors border-t border-slate-100">
                    <FileJson className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">Respaldo de Datos (JSON)</div>
                      <div className="text-[11px] text-slate-500">Guarda tu progreso para editarlo luego</div>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}