import { TimelineProvider, useTimeline } from './controller/TimelineContext';
import Toolbar from './view/components/Toolbar';
import TimelineCanvas from './view/components/TimelineCanvas';
import EventModal from './view/components/EventModal';
import Toast from './view/components/Toast';

function TimelineApp() {
  const { currentTheme } = useTimeline();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${currentTheme.bg} ${currentTheme.fontClass}`}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body, html { background: white !important; color: black !important; }
          .print-clean-canvas {
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: visible !important;
          }
          .event-card { break-inside: avoid; page-break-inside: avoid; }
        }
      `}</style>

      <Toolbar />

      <main className="flex-1 w-full overflow-x-auto">
        <TimelineCanvas />
      </main>

      <EventModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <TimelineProvider>
      <TimelineApp />
    </TimelineProvider>
  );
}
