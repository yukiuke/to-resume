import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import SearchBar from './components/SearchBar';
import RoleFilter from './components/RoleFilter';
import GameFilter from './components/GameFilter';
import Pagination from './components/Pagination';
import EventGrid from './components/EventGrid';
import { PER_PAGE_OPTIONS } from './constants';

function normalizeRole(event) {
  if (event.role === 'oganizer') return { ...event, role: 'organizer' };
  return event;
}

export default function MainApp() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roles, setRoles] = useState([]);
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE_OPTIONS[0]);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        const list = (data.events || []).map(normalizeRole);
        setEvents(list);
      })
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = events;

    if (roles.length) {
      list = list.filter((e) => e.role && roles.includes(e.role));
    }
    if (games.length) {
      list = list.filter((e) => e.game && games.includes(e.game));
    }

    if (search.trim()) {
      const fuse = new Fuse(list, {
        keys: ['name'],
        threshold: 0.4,
      });
      list = fuse.search(search.trim()).map((r) => r.item);
    }

    return list;
  }, [events, search, roles, games]);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    if (page !== safePage) setPage(safePage);
  }, [safePage, page]);

  const handlePerPageChange = (value) => {
    setPerPage(value);
    setPage(1);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleRolesChange = (value) => {
    setRoles(value);
    setPage(1);
  };

  const handleGamesChange = (value) => {
    setGames(value);
    setPage(1);
  };

  if (loading) {
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">Fighting Game Events — BaalsDepe</h1>
        </header>
        <p className="app__loading">Loading events…</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Fighting Game Events — BaalsDepe</h1>
      </header>

      <div className="app__toolbar">
        <SearchBar value={search} onChange={handleSearch} />
        <RoleFilter selected={roles} onChange={handleRolesChange} />
        <GameFilter selected={games} onChange={handleGamesChange} />
      </div>

      <Pagination
        page={page}
        perPage={perPage}
        total={filtered.length}
        onPageChange={setPage}
        onPerPageChange={handlePerPageChange}
      />

      <EventGrid events={paginated} />
    </div>
  );
}
