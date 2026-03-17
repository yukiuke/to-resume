<?php

namespace Tests\Unit;

use App\Support\EventDateParser;
use Carbon\Carbon;
use PHPUnit\Framework\TestCase;

class EventDateParserTest extends TestCase
{
    public function test_parses_ordinal_date_with_comma(): void
    {
        $date = EventDateParser::parse('Oct 24th, 2021');

        $this->assertSame('2021-10-24', $date);
    }

    public function test_parses_ordinal_date_without_comma(): void
    {
        $date = EventDateParser::parse('Feb 4th 2023');

        $this->assertSame('2023-02-04', $date);
    }

    public function test_parses_simple_date_string(): void
    {
        $date = EventDateParser::parse('Jan 29 2022');

        $this->assertSame('2022-01-29', $date);
    }

    public function test_today_keyword_uses_current_date(): void
    {
        Carbon::setTestNow('2026-03-16');

        $this->assertSame('2026-03-16', EventDateParser::parse('today'));
        $this->assertSame('2026-03-16', EventDateParser::parse(' TODAY '));

        Carbon::setTestNow();
    }
}

