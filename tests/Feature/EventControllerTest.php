<?php

namespace Tests\Feature;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EventControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_events_from_database(): void
    {
        Carbon::setTestNow('2024-01-01');

        $first = Event::create([
            'event_date' => '2023-01-01',
            'name' => 'Older Event',
            'game' => 'Killer Instinct (2013)',
            'url' => 'https://example.com/older',
            'major' => null,
            'role' => 'tournament-organizer',
            'notes' => 'First',
        ]);

        $second = Event::create([
            'event_date' => '2024-01-01',
            'name' => 'Newer Event',
            'game' => 'Street Fighter III: 3rd Strike',
            'url' => 'https://example.com/newer',
            'major' => 'Some Major',
            'role' => 'event-organizer',
            'notes' => 'Second',
        ]);

        $response = $this->getJson('/api/events');

        $response->assertOk();

        $response->assertJson([
            'events' => [
                [
                    'date' => 'Jan 1st, 2024',
                    'name' => $second->name,
                    'game' => $second->game,
                    'url' => $second->url,
                    'major' => $second->major,
                    'role' => $second->role,
                    'notes' => $second->notes,
                ],
                [
                    'date' => 'Jan 1st, 2023',
                    'name' => $first->name,
                    'game' => $first->game,
                    'url' => $first->url,
                    'major' => $first->major,
                    'role' => $first->role,
                    'notes' => $first->notes,
                ],
            ],
        ]);

        Carbon::setTestNow();
    }
}

