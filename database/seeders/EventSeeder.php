<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Support\EventDateParser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = base_path('database/data/organizer-event-db.json');

        if (! is_readable($path)) {
            return;
        }

        $json = file_get_contents($path);
        $data = json_decode($json, true);
        $events = $data['events'] ?? [];

        if (! is_array($events) || $events === []) {
            return;
        }

        Event::truncate();

        foreach ($events as $event) {
            if (! isset($event['date'], $event['name'])) {
                continue;
            }

            $eventDate = EventDateParser::parse($event['date']);

            Event::create([
                'event_date' => $eventDate,
                'name' => $event['name'],
                'game' => $event['game'] ?? '',
                'url' => $event['url'] ?? '',
                'major' => $event['major'] ?? null,
                'role' => $event['role'] ?? '',
                'notes' => $event['notes'] ?? '',
            ]);
        }
    }
}
