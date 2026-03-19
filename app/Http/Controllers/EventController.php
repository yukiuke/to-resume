<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\JsonResponse;

class EventController extends Controller
{
    /**
     * Return all events from the database, ordered by most recent date.
     */
    public function index(): JsonResponse
    {
        $events = Event::query()
            ->orderByDesc('event_date')
            ->get()
            ->map(function (Event $event): array {
                return [
                    'date' => $event->event_date?->format('M jS, Y'),
                    'name' => $event->name,
                    'game' => $event->game,
                    'url' => $event->url,
                    'major' => $event->major,
                    'role' => $event->role,
                    'notes' => $event->notes,
                ];
            });

        return response()->json(['events' => $events]);
    }
}
