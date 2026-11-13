import { TimelineData } from './types';

const STORAGE_KEY = 'timeline_editor_v1';

export function loadTimeline(fallback: TimelineData): TimelineData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Error leyendo localStorage:", e);
  }
  return fallback;
}

export function saveTimeline(timeline: TimelineData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timeline));
  } catch (e) {
    console.error("No se pudo guardar en localStorage:", e);
  }
}