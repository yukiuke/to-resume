<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class EventController extends Controller
{
    /**
     * Return all events from organizer-event-db.json with role normalized (oganizer -> organizer).
     */
    public function index(): JsonResponse
    {
        $path = base_path('organizer-event-db.json');

        if (!is_readable($path)) {
            return response()->json(['events' => [], 'error' => 'Events file not found'], 404);
        }

        $data = json_decode(file_get_contents($path), true);
        $events = $data['events'] ?? [];

        $events = array_map(function (array $event): array {
            if (isset($event['role']) && $event['role'] === 'oganizer') {
                $event['role'] = 'organizer';
            }
            return $event;
        }, $events);

        return response()->json(['events' => $events]);
    }
}
