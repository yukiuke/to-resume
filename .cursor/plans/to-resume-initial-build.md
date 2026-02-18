# Prompt
Create a modern website resume that displays a grid of Fighting Game Events (and details) that BaalsDepe (aka Yuki) has run. The grid must be filterable by "role" and/or "game" categories. Events names should be fuzzy-searchable via a text input. The Event-name search field should be located towards the top of the page. The grid of event details should be paginated with user-options for 20, 40 and 100 events per page. Use @to-resume-initial-build-md as directives for the Tech Stack, Filter categories, Docker and Webpack requirements.
# Tech Stack
- PHP8.4.*
- MariaDB
- Laravel 12 PHP Framework
- React@19.*
- Webpack
- Docker (for local development)
- Node (if necessary)
- Composer (if necessary)
- dotenv (for local docker setup)
# Filter Roles
Tied to the "role" field in `./organizer-event-db.json`. Structured here as `Display ("role" value)`.
- Event Organizer (organizer)
- Game Lead (game-lead)
- Bracket Runner (bracket-runner)
- Seeder (seeder)
# Filter Games
Tied to the "game" field in `./organizer-event-db.json`.
- Killer Instinct (2013)
- Street Fighter III: 3rd Strike
# Webpack Requirements
- Name of JS file input/output
- Name of SCSS file input and CSS output.
- Image processor? Do you have enough images that this is useful??
# Docker Requirements
- Use Docker Volumes to watch for changes to the codebase on the host machine and instantly apply them to the docker instance.