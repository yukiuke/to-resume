const BASE = '/baalsdepe/admin';
const API_BASE = `${BASE}/api`;

function getCsrfToken() {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute('content') : null;
}

function defaultHeaders() {
  const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };
  const token = getCsrfToken();
  if (token) headers['X-CSRF-TOKEN'] = token;
  return headers;
}

export function login(username, password) {
  return fetch(`${BASE}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: defaultHeaders(),
    body: JSON.stringify({ username, password }),
  });
}

export function logout() {
  return fetch(`${BASE}/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: defaultHeaders(),
  });
}

export function me() {
  return fetch(`${API_BASE}/me`, { credentials: 'include', headers: defaultHeaders() });
}

export function getEvents() {
  return fetch(`${API_BASE}/events`, { credentials: 'include', headers: defaultHeaders() }).then((r) =>
    r.json()
  );
}

export function getEvent(id) {
  return fetch(`${API_BASE}/events/${id}`, { credentials: 'include', headers: defaultHeaders() }).then(
    (r) => r.json()
  );
}

export function createEvent(data) {
  return fetch(`${API_BASE}/events`, {
    method: 'POST',
    credentials: 'include',
    headers: defaultHeaders(),
    body: JSON.stringify(data),
  }).then((r) => (r.ok ? r.json() : Promise.reject(r)));
}

export function updateEvent(id, data) {
  return fetch(`${API_BASE}/events/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: defaultHeaders(),
    body: JSON.stringify(data),
  }).then((r) => (r.ok ? r.json() : Promise.reject(r)));
}

export function deleteEvent(id) {
  return fetch(`${API_BASE}/events/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: defaultHeaders(),
  }).then((r) => (r.ok ? Promise.resolve() : Promise.reject(r)));
}
