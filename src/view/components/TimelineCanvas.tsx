import { useTimeline } from '../../controller/TimelineContext';
import TimelineHeader from './TimelineHeader';
import VerticalTimeline from './VerticalTimeline';
import HorizontalTimeline from './HorizontalTimeline';
import EmptyState from './EmptyState';

export default function TimelineCanvas() {
  const { canvasRef, layoutMode, currentTheme, timeline } = useTimeline();

  return (
    <div
      ref={canvasRef}
      className={`print-clean-canvas mx-auto px-4 sm:px-8 py-10 sm:py-14 transition-colors duration-300 ${
        layoutMode === 'vertical' ? 'max-w-5xl' : 'min-w-max max-w-none px-12'
      }`}
      style={{ backgroundColor: currentTheme.canvasBg }}
    >
      <TimelineHeader />
      {layoutMode === 'vertical' && <VerticalTimeline />}
      {layoutMode === 'horizontal' && <HorizontalTimeline />}
      {timeline.events.length === 0 && <EmptyState />}
    </div>
  );
}