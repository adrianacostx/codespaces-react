export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
  color: string;
}

export interface TimelineData {
  title: string;
  subtitle: string;
  events: TimelineEvent[];
}

export interface ModalEvent extends TimelineEvent {
  isNew?: boolean;
}

export type LayoutMode = 'vertical' | 'horizontal';
export type Density = 'compact' | 'normal' | 'spacious';
export type ThemeKey = 'modernLight' | 'darkTech' | 'vintagePaper' | 'minimalBlue';
export type ToastType = 'success' | 'error';

export interface ToastMessage {
  message: string;
  type: ToastType;
}

export interface ThemeConfig {
  name: string;
  bg: string;
  canvasBg: string;
  textPrimary: string;
  textSecondary: string;
  cardBg: string;
  lineColor: string;
  dotRing: string;
  fontClass: string;
}

export interface ColorBadgeConfig {
  label: string;
  dot: string;
  badgeLight: string;
  badgeDark: string;
  borderAccent: string;
}

export type Themes = Record<ThemeKey, ThemeConfig>;
export type ColorBadges = Record<string, ColorBadgeConfig>;

export interface SpacingConfig {
  gapY: string;
  padCard: string;
  gapX: string;
  minW: string;
}