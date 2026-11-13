import { useTimeline } from '../../controller/TimelineContext';
import VerticalEventCard from './VerticalEventCard';

export default function VerticalTimeline() {
  const { timeline, currentTheme, spacingClasses } = useTimeline();

  return (
    <div className="relative">
      <div className={`absolute left-5 md:left-1/2 top-2 bottom-2 w-0.5 md:-translate-x-1/2 ${currentTheme.lineColor}`} />
      <div className={`relative ${spacingClasses.gapY}`}>
        {timeline.events.map((event, index) => (
          <VerticalEventCard
            key={event.id}
            event={event}
            index={index}
            isEven={index % 2 === 0}
            totalEvents={timeline.events.length}
          />
        ))}
      </div>
    </div>
  );
}