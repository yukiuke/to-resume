export const ROLE_OPTIONS = [
  { value: 'event-organizer', label: 'Event Organizer' },
  { value: 'tournament-organizer', label: 'Tournament Organizer' },
  { value: 'game-lead', label: 'Game Lead' },
  { value: 'bracket-runner', label: 'Bracket Runner' },
  { value: 'seeder', label: 'Seeder' },
];

export const GAME_OPTIONS = [
  'Killer Instinct (2013)',
  'Street Fighter III: 3rd Strike',
];

export const PER_PAGE_OPTIONS = [20, 40, 100];

export function roleToLabel(role) {
  const found = ROLE_OPTIONS.find((o) => o.value === role);
  return found ? found.label : role || '—';
}
