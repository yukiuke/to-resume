import { roleToLabel } from '../constants';

export default function EventCard({ event }) {
  const { name, date, game, url, major, role, notes } = event;
  return (
    <article className="event-card">
      <h3 className="event-card__title">
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="event-card__link">
            {name || '—'}
          </a>
        ) : (
          <span>{name || '—'}</span>
        )}
      </h3>
      <dl className="event-card__meta">
        <dt>Date</dt>
        <dd>{date || '—'}</dd>
        <dt>Game</dt>
        <dd>{game || '—'}</dd>
        <dt>Role</dt>
        <dd>{roleToLabel(role)}</dd>
        {major != null && major !== '' && (
          <>
            <dt>Major</dt>
            <dd>{major}</dd>
          </>
        )}
        {notes != null && notes !== '' && (
          <>
            <dt>Notes</dt>
            <dd>{notes}</dd>
          </>
        )}
      </dl>
    </article>
  );
}
