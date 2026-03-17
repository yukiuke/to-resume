# Laravel Conversion Plan: Organizer Events

## 1. Schema Analysis
JSON Source: `organizer-event-db.json`
Target DB: MariaDB (via Laravel Eloquent/Migrations)

Fields:
- `date` (string: "Oct 24th, 2021") -> Suggest casting or parsing to date for better querying.
- `name` (string)
- `game` (string)
- `url` (string)
- `major` (string|nullable)
- `role` (string)
- `notes` (text)

## 2. Laravel Migration Steps
1. Create Migration: `php artisan make:migration create_events_table`
2. Define Schema in `database/migrations/YYYY_MM_DD_HHMMSS_create_events_table.php`:
   ```php
   Schema::create('events', function (Blueprint $table) {
       $table->id();
       $table->string('date'); // Consider parsing this to a real DATE type
       $table->string('name');
       $table->string('game');
       $table->string('url');
       $table->string('major')->nullable();
       $table->string('role');
       $table->text('notes')->nullable();
       $table->timestamps();
   });
   ```

## 3. Eloquent Model Definition
1. Create Model: `php artisan make:model OrganizedEvent`
2. Define Model in `app/Models/OrganizedEvent.php`:
   ```php
   protected $fillable = ['date', 'name', 'game', 'url', 'major', 'role', 'notes'];
   ```

## 4. Seeding Strategy
1. Create Seeder: `php artisan make:seeder EventSeeder`
2. Implementation in `database/seeders/EventSeeder.php`:
   - Load `database_path('data/organizer-event-db.json')` (move file there).
   - Iterate through the `events` array.
   - Use `OrganizedEvent::create($event)`.

## 5. Verification
1. Run `php artisan migrate`.
2. Run `php artisan db:seed --class=EventSeeder`.
3. Verify count in Tinker: `OrganizedEvent::count()`.
