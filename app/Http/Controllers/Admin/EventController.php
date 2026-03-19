<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * List events for admin (ordered by event_date desc). Returns JSON for the API.
     */
    public function index(): JsonResponse
    {
        $events = Event::query()
            ->orderByDesc('event_date')
            ->get()
            ->map(fn (Event $e) => $this->eventToArray($e));

        return response()->json(['events' => $events]);
    }

    /**
     * Store a new event.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'event_date' => 'required|date',
            'name' => 'required|string|max:255',
            'game' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'major' => 'nullable|string|max:255',
            'role' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $event = Event::create($validated);

        return response()->json(['event' => $this->eventToArray($event)], 201);
    }

    /**
     * Show a single event.
     */
    public function show(Event $event): JsonResponse
    {
        return response()->json(['event' => $this->eventToArray($event)]);
    }

    /**
     * Update an event.
     */
    public function update(Request $request, Event $event): JsonResponse
    {
        $validated = $request->validate([
            'event_date' => 'required|date',
            'name' => 'required|string|max:255',
            'game' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'major' => 'nullable|string|max:255',
            'role' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $event->update($validated);

        return response()->json(['event' => $this->eventToArray($event)]);
    }

    /**
     * Delete an event.
     */
    public function destroy(Event $event): JsonResponse
    {
        $event->delete();

        return response()->json(null, 204);
    }

    private function eventToArray(Event $e): array
    {
        return [
            'id' => $e->id,
            'event_date' => $e->event_date?->format('Y-m-d'),
            'date' => $e->event_date?->format('M jS, Y'),
            'name' => $e->name,
            'game' => $e->game,
            'url' => $e->url,
            'major' => $e->major,
            'role' => $e->role,
            'notes' => $e->notes ?? '',
        ];
    }
}
