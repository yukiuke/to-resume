import EventCard from './EventCard';

export default function EventGrid({ events }) {
  if (!events.length) {
    return (
      <p className="events-empty">No events match your filters or search.</p>
    );
  }
  return (
    <div className="event-grid">
      {events.map((event, i) => (
        <EventCard key={i} event={event} />
      ))}
    </div>
  );
}
