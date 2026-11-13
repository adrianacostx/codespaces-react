import { Themes, ColorBadges } from './types';

export const THEMES: Themes = {
  modernLight: {
    name: "Moderno Claro",
    bg: "bg-slate-50",
    canvasBg: "#f8fafc",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    cardBg: "bg-white border-slate-200/80 shadow-sm",
    lineColor: "bg-slate-300",
    dotRing: "ring-slate-50",
    fontClass: "font-sans"
  },
  darkTech: {
    name: "Modo Oscuro Tech",
    bg: "bg-slate-950",
    canvasBg: "#020617",
    textPrimary: "text-slate-100",
    textSecondary: "text-slate-400",
    cardBg: "bg-slate-900/90 border-slate-800 shadow-lg shadow-black/40",
    lineColor: "bg-slate-700",
    dotRing: "ring-slate-950",
    fontClass: "font-sans"
  },
  vintagePaper: {
    name: "Papel Vintage",
    bg: "bg-[#f4efe6]",
    canvasBg: "#f4efe6",
    textPrimary: "text-stone-900",
    textSecondary: "text-stone-700",
    cardBg: "bg-[#fbf8f1] border-stone-300 shadow-sm",
    lineColor: "bg-stone-400",
    dotRing: "ring-[#f4efe6]",
    fontClass: "font-serif"
  },
  minimalBlue: {
    name: "Minimalista Azul",
    bg: "bg-sky-50/70",
    canvasBg: "#f0f9ff",
    textPrimary: "text-sky-950",
    textSecondary: "text-sky-800/80",
    cardBg: "bg-white border-sky-200 shadow-sm",
    lineColor: "bg-sky-300",
    dotRing: "ring-sky-50",
    fontClass: "font-sans"
  }
};

export const COLOR_BADGES: ColorBadges = {
  indigo: { label: "Índigo", dot: "bg-indigo-500", badgeLight: "bg-indigo-100 text-indigo-800 border-indigo-200", badgeDark: "bg-indigo-950 text-indigo-300 border-indigo-800", borderAccent: "border-l-indigo-500" },
  violet: { label: "Violeta", dot: "bg-violet-500", badgeLight: "bg-violet-100 text-violet-800 border-violet-200", badgeDark: "bg-violet-950 text-violet-300 border-violet-800", borderAccent: "border-l-violet-500" },
  blue: { label: "Azul", dot: "bg-blue-500", badgeLight: "bg-blue-100 text-blue-800 border-blue-200", badgeDark: "bg-blue-950 text-blue-300 border-blue-800", borderAccent: "border-l-blue-500" },
  cyan: { label: "Cian", dot: "bg-cyan-500", badgeLight: "bg-cyan-100 text-cyan-800 border-cyan-200", badgeDark: "bg-cyan-950 text-cyan-300 border-cyan-800", borderAccent: "border-l-cyan-500" },
  teal: { label: "Turquesa", dot: "bg-teal-500", badgeLight: "bg-teal-100 text-teal-800 border-teal-200", badgeDark: "bg-teal-950 text-teal-300 border-teal-800", borderAccent: "border-l-teal-500" },
  emerald: { label: "Esmeralda", dot: "bg-emerald-500", badgeLight: "bg-emerald-100 text-emerald-800 border-emerald-200", badgeDark: "bg-emerald-950 text-emerald-300 border-emerald-800", borderAccent: "border-l-emerald-500" },
  amber: { label: "Ámbar", dot: "bg-amber-500", badgeLight: "bg-amber-100 text-amber-800 border-amber-200", badgeDark: "bg-amber-950 text-amber-300 border-amber-800", borderAccent: "border-l-amber-500" },
  orange: { label: "Naranja", dot: "bg-orange-500", badgeLight: "bg-orange-100 text-orange-800 border-orange-200", badgeDark: "bg-orange-950 text-orange-300 border-orange-800", borderAccent: "border-l-orange-500" },
  rose: { label: "Rosa", dot: "bg-rose-500", badgeLight: "bg-rose-100 text-rose-800 border-rose-200", badgeDark: "bg-rose-950 text-rose-300 border-rose-800", borderAccent: "border-l-rose-500" },
  fuchsia: { label: "Fucsia", dot: "bg-fuchsia-500", badgeLight: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200", badgeDark: "bg-fuchsia-950 text-fuchsia-300 border-fuchsia-800", borderAccent: "border-l-fuchsia-500" }
};