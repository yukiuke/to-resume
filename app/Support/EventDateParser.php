<?php

namespace App\Support;

use Carbon\Carbon;
use Carbon\Exceptions\InvalidFormatException;

class EventDateParser
{
    /**
     * Parse a human-friendly event date string from the JSON source
     * into a Y-m-d date string suitable for the database.
     */
    public static function parse(string $raw): string
    {
        $raw = trim($raw);

        if ($raw === '' || strtolower($raw) === 'today') {
            return Carbon::today()->toDateString();
        }

        // Normalize common ordinal suffixes and missing comma variants.
        $normalized = preg_replace('/(st|nd|rd|th)/i', '', $raw);
        $normalized = preg_replace('/\s+/', ' ', $normalized);

        $candidates = [
            $normalized,
            str_replace(',', '', $normalized),
        ];

        foreach ($candidates as $candidate) {
            try {
                return Carbon::parse($candidate)->toDateString();
            } catch (InvalidFormatException $e) {
                // Try next candidate.
            }
        }

        // Fallback: let Carbon try the original string; if it still fails, rethrow.
        try {
            return Carbon::parse($raw)->toDateString();
        } catch (InvalidFormatException $e) {
            throw $e;
        }
    }
}

