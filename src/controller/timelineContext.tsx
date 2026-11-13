import { createContext, useContext, ReactNode } from 'react';
import { useTimelineController, TimelineController } from './useTimelineController';

const TimelineContext = createContext<TimelineController | null>(null);

export function TimelineProvider({ children }: { children: ReactNode }) {
  const controller = useTimelineController();
  return (
    <TimelineContext.Provider value={controller}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline(): TimelineController {
  const ctx = useContext(TimelineContext);
  if (!ctx) throw new Error("useTimeline debe usarse dentro de <TimelineProvider>");
  return ctx;
}