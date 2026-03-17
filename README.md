# Fighting Game Events — BaalsDepe

A Laravel 12 + React 19 site that displays fighting game events run by BaalsDepe with filtering by role/game, fuzzy search by event name, and pagination.

## Stack

- **Backend:** PHP 8.4, Laravel 12
- **Frontend:** React 19, Webpack, SCSS
- **Data:** Events stored in MariaDB and exposed via Laravel Eloquent (seeded from `organizer-event-db.json`, API: `GET /api/events`)
- **Docker:** PHP app + MariaDB with volumes for local development

## Run locally

### With Docker

1. Copy env and build assets (first time):

   ```bash
   cp .env.example .env
   # generate app key using the app image (has pdo_mysql/mariadb driver)
   docker compose run --rm app php artisan key:generate
   docker run --rm -v "$(pwd):/app" -w /app node:22-alpine npm install && npx webpack --mode=production
   ```

2. Run migrations and seed the MariaDB database:

   ```bash
   docker compose run --rm app php artisan migrate
   docker compose run --rm app php artisan db:seed
   ```

3. Start app and DB:

   ```bash
   docker compose up --build
   ```

4. Open **http://localhost:8000**

Code changes on the host are reflected in the container via the mounted volume. Rebuild frontend after changing JS/SCSS:

   ```bash
   docker run --rm -v "$(pwd):/app" -w /app node:22-alpine npx webpack --mode=production
   ```

   Or run `npm run dev` (webpack watch) in a separate terminal if you have Node locally.

### Without Docker

- PHP 8.2 + Composer: `composer install`, `cp .env.example .env`, `php artisan key:generate`, `php artisan migrate`, `php artisan db:seed`, `php artisan serve`
- Node: `npm install`, `npm run build` (or `npm run dev` for watch)
- Events are seeded from `organizer-event-db.json` into the database; the events list is served from MariaDB via Eloquent.

## Features

- **Event name search** — Fuzzy search at the top (Fuse.js on event name).
- **Filters** — Role (Event Organizer, Game Lead, Bracket Runner, Seeder) and Game (Killer Instinct (2013), Street Fighter III: 3rd Strike). Multi-select; combined with AND.
- **Pagination** — 20, 40, or 100 events per page with Previous/Next.

## Build

- **JS:** `resources/js/app.jsx` → `public/js/app.js`
- **SCSS:** `resources/scss/app.scss` → `public/css/app.css`

```bash
npm run build
```

## License

MIT
