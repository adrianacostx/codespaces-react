import { useTimeline } from '../../controller/TimelineContext';
import HorizontalEventCard from './HorizontalEventCard';

export default function HorizontalTimeline() {
  const { timeline, currentTheme, spacingClasses } = useTimeline();

  return (
    <div className="relative pt-8 pb-6">
      <div className={`absolute left-0 right-0 top-12 h-0.5 ${currentTheme.lineColor}`} />
      <div className={`flex items-stretch ${spacingClasses.gapX}`}>
        {timeline.events.map((event, index) => (
          <HorizontalEventCard
            key={event.id}
            event={event}
            index={index}
            totalEvents={timeline.events.length}
          />
        ))}
      </div>
    </div>
  );
}