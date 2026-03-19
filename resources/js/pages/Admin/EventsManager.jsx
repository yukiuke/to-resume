import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { GAME_OPTIONS, ROLE_OPTIONS } from '../../constants';
import {
  createEvent,
  deleteEvent,
  getEvents,
  getEvent,
  updateEvent,
} from '../../adminApi';

const emptyForm = {
  event_date: '',
  name: '',
  game: '',
  url: '',
  major: '',
  role: '',
  notes: '',
};

export default function EventsManager() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getEvents();
      setEvents(data.events || []);
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError('');
    setDialogOpen(true);
  };

  const openEdit = async (id) => {
    setEditingId(id);
    setFormError('');
    try {
      const data = await getEvent(id);
      const e = data.event;
      setForm({
        event_date: e.event_date || '',
        name: e.name || '',
        game: e.game || '',
        url: e.url || '',
        major: e.major || '',
        role: e.role || '',
        notes: e.notes || '',
      });
      setDialogOpen(true);
    } catch {
      setFormError('Failed to load event');
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setFormError('');
  };

  const handleSave = async () => {
    setFormError('');
    setSubmitting(true);
    try {
      if (editingId) {
        await updateEvent(editingId, form);
      } else {
        await createEvent(form);
      }
      closeDialog();
      loadEvents();
    } catch (err) {
      try {
        const data = await (typeof err.json === 'function' ? err.json() : Promise.resolve({}));
        setFormError(data.message || 'Save failed');
      } catch {
        setFormError('Save failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = (event) => {
    setDeleteConfirm(event);
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await deleteEvent(deleteConfirm.id);
      setDeleteConfirm(null);
      loadEvents();
    } catch {
      setDeleteConfirm(null);
    }
  };

  if (loading) {
    return <Typography>Loading events…</Typography>;
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Events</Typography>
        <Button variant="contained" onClick={openCreate}>
          Add event
        </Button>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Game</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Major</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.date}</TableCell>
              <TableCell>{e.name}</TableCell>
              <TableCell>{e.game}</TableCell>
              <TableCell>{e.role}</TableCell>
              <TableCell>{e.major || '—'}</TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => openEdit(e.id)} title="Edit">
                  <EditIcon />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => handleDeleteConfirm(e)} title="Delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit event' : 'Add event'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Date (YYYY-MM-DD)"
            value={form.event_date}
            onChange={(e) => setForm((f) => ({ ...f, event_date: e.target.value }))}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Game</InputLabel>
            <Select
              value={form.game}
              label="Game"
              onChange={(e) => setForm((f) => ({ ...f, game: e.target.value }))}
            >
              {GAME_OPTIONS.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="URL"
            value={form.url}
            onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Major"
            value={form.major}
            onChange={(e) => setForm((f) => ({ ...f, major: e.target.value }))}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={form.role}
              label="Role"
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
            >
              {ROLE_OPTIONS.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Notes"
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            margin="normal"
            multiline
            minRows={2}
          />
          {formError && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {formError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={submitting}>
            {submitting ? 'Saving…' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Delete event?</DialogTitle>
        <DialogContent>
          {deleteConfirm && (
            <Typography>
              Delete &quot;{deleteConfirm.name}&quot;? This cannot be undone.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
