import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import {
  TimelineData, TimelineEvent, ModalEvent, LayoutMode, Density,
  ThemeKey, ToastMessage, ToastType, SpacingConfig
} from '../model/types';
import { INITIAL_TIMELINE_DATA } from '../model/timelineData';
import { THEMES, COLOR_BADGES } from '../model/themes';
import { loadTimeline, saveTimeline } from '../model/storage';
import { downloadJSON, downloadHTML, printPDF } from './exporters';

declare global {
  interface Window {
    html2canvas?: any;
  }
}

const SPACING_MAP: Record<Density, SpacingConfig> = {
  compact:   { gapY: "space-y-4",  padCard: "p-4",         gapX: "gap-4",  minW: "w-72" },
  normal:    { gapY: "space-y-8",  padCard: "p-5 sm:p-6",  gapX: "gap-6",  minW: "w-80 sm:w-96" },
  spacious:  { gapY: "space-y-12", padCard: "p-6 sm:p-8",  gapX: "gap-10", minW: "w-96 sm:w-[28rem]" }
};

export function useTimelineController() {
  // ─── Estado principal ─────────────────────────────────────────
  const [timeline, setTimeline] = useState<TimelineData>(() => loadTimeline(INITIAL_TIMELINE_DATA));

  const [layoutMode, setLayoutMode] = useState<LayoutMode>('vertical');
  const [themeKey, setThemeKey] = useState<ThemeKey>('modernLight');
  const [density, setDensity] = useState<Density>('normal');
  const [previewMode, setPreviewMode] = useState(false);

  const [editingHeader, setEditingHeader] = useState(false);
  const [modalEvent, setModalEvent] = useState<ModalEvent | null>(null);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [resetConfirm, setResetConfirm] = useState(false);

  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentTheme = THEMES[themeKey];
  const isDark = themeKey === 'darkTech';
  const spacingClasses = SPACING_MAP[density];

  // ─── Efectos ──────────────────────────────────────────────────
  useEffect(() => {
    saveTimeline(timeline);
  }, [timeline]);

  useEffect(() => {
    if (!window.html2canvas) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // ─── Toasts ───────────────────────────────────────────────────
  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

  // ─── Acciones de edición ──────────────────────────────────────
  const handleOpenAddModal = (index: number = timeline.events.length) => {
    setInsertIndex(index);
    setModalEvent({
      id: `hito-${Date.now()}`,
      date: "2026",
      title: "",
      description: "",
      category: "Nuevo Hito",
      color: "indigo",
      isNew: true
    });
  };

  const handleOpenEditModal = (event: TimelineEvent) => {
    setInsertIndex(null);
    setModalEvent({ ...event, isNew: false });
  };

  const handleSaveEvent = (e: FormEvent) => {
    e.preventDefault();
    if (!modalEvent) return;
    if (!modalEvent.title.trim() || !modalEvent.date.trim()) {
      showToast("La fecha y el título son obligatorios.", "error");
      return;
    }
    const { isNew, ...cleanEvent } = modalEvent;
    if (isNew) {
      const updatedEvents = [...timeline.events];
      updatedEvents.splice(insertIndex ?? updatedEvents.length, 0, cleanEvent);
      setTimeline({ ...timeline, events: updatedEvents });
      showToast("Nuevo hito añadido correctamente.");
    } else {
      const updatedEvents = timeline.events.map((ev) =>
        ev.id === cleanEvent.id ? cleanEvent : ev
      );
      setTimeline({ ...timeline, events: updatedEvents });
      showToast("Cambios guardados en el hito.");
    }
    setModalEvent(null);
  };

  const handleDeleteEvent = (id: string) => {
    setTimeline({
      ...timeline,
      events: timeline.events.filter((ev) => ev.id !== id)
    });
    setDeleteConfirmId(null);
    showToast("Hito eliminado de la línea de tiempo.");
  };

  const handleMoveEvent = (index: number, direction: number) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= timeline.events.length) return;
    const updated = [...timeline.events];
    const [movedItem] = updated.splice(index, 1);
    updated.splice(newIndex, 0, movedItem);
    setTimeline({ ...timeline, events: updated });
  };

  const handleResetDefault = () => {
    setTimeline(INITIAL_TIMELINE_DATA);
    setResetConfirm(false);
    showToast("Se han restaurado los 10 hitos históricos originales.");
  };

  // ─── Exportación / Importación ────────────────────────────────
  const handleExportPNG = async () => {
    setExportMenuOpen(false);
    if (!window.html2canvas) {
      showToast("El motor de imagen aún se está cargando. Intenta de nuevo en un segundo.", "error");
      return;
    }

    setIsExportingPng(true);
    const previousPreviewState = previewMode;
    setPreviewMode(true);

    setTimeout(async () => {
      try {
        const element = canvasRef.current;
        if (!element) throw new Error("Canvas no encontrado");

        const canvas = await window.html2canvas(element, {
          scale: 2,
          useCORS: true,
          backgroundColor: currentTheme.canvasBg,
          scrollX: 0,
          scrollY: 0,
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight
        });

        const dataUrl = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = `linea-de-tiempo-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        showToast("¡Imagen PNG de alta resolución descargada!");
      } catch (err) {
        console.error("Error exportando PNG:", err);
        showToast("Hubo un error al generar la imagen PNG.", "error");
      } finally {
        setPreviewMode(previousPreviewState);
        setIsExportingPng(false);
      }
    }, 250);
  };

  const handleExportJSON = () => {
    setExportMenuOpen(false);
    downloadJSON(timeline);
    showToast("Proyecto exportado como archivo JSON.");
  };

  const handleImportJSON = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && Array.isArray(parsed.events)) {
          setTimeline({
            title: parsed.title || "Línea de Tiempo Importada",
            subtitle: parsed.subtitle || "",
            events: parsed.events.map((ev: any, idx: number) => ({
              id: ev.id || `imported-${Date.now()}-${idx}`,
              date: ev.date || "Sin fecha",
              title: ev.title || "Hito sin título",
              description: ev.description || "",
              category: ev.category || "General",
              color: COLOR_BADGES[ev.color] ? ev.color : "indigo"
            }))
          });
          showToast("¡Línea de tiempo importada con éxito!");
        } else {
          showToast("El archivo JSON no tiene el formato válido.", "error");
        }
      } catch (err) {
        showToast("Error al leer el archivo JSON.", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleExportHTML = () => {
    setExportMenuOpen(false);
    downloadHTML(timeline, themeKey, isDark);
    showToast("Archivo HTML independiente descargado.");
  };

  const handlePrintPDF = () => {
    setExportMenuOpen(false);
    printPDF();
  };

  // ─── API pública del controlador ──────────────────────────────
  return {
    // estado
    timeline, setTimeline,
    layoutMode, setLayoutMode,
    themeKey, setThemeKey,
    density, setDensity,
    previewMode, setPreviewMode,
    editingHeader, setEditingHeader,
    modalEvent, setModalEvent,
    deleteConfirmId, setDeleteConfirmId,
    resetConfirm, setResetConfirm,
    exportMenuOpen, setExportMenuOpen,
    isExportingPng,
    toast,
    // refs
    canvasRef, fileInputRef,
    // valores derivados
    currentTheme, isDark, spacingClasses,
    // helpers
    showToast,
    // handlers
    handleOpenAddModal, handleOpenEditModal, handleSaveEvent,
    handleDeleteEvent, handleMoveEvent, handleResetDefault,
    handleExportPNG, handleExportJSON, handleImportJSON,
    handleExportHTML, handlePrintPDF
  };
}

export type TimelineController = ReturnType<typeof useTimelineController>;