import { useEffect, useState } from 'react';
import api from './services/api';
import NoteCard from './components/NoteCard';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/notes');
      setNotes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setEditingId('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError('Please fill in both fields');
      return;
    }

    try {
      setError('');
      if (editingId) {
        await api.put(`/notes/${editingId}`, {
          title,
          description
        });
        setMessage('Note updated successfully');
      } else {
        await api.post('/notes', {
          title,
          description
        });
        setMessage('Note created successfully');
      }

      resetForm();
      await fetchNotes();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleEdit = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setDescription(note.description);
    setMessage('Editing existing note');
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Delete this note?');

    if (!shouldDelete) {
      return;
    }

    try {
      setError('');
      await api.delete(`/notes/${id}`);
      setMessage('Note deleted successfully');
      if (editingId === id) {
        resetForm();
      }
      await fetchNotes();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete note');
    }
  };

  return (
    <div className="page">
      <main className="dashboard">
        <section className="hero">
          <p className="eyebrow">Employee Notes Dashboard</p>
          <h1>Keep track of daily work notes in one place.</h1>
          <p className="subtitle">
            Add a note, update it later if needed, and see every note appear as a separate card below.
          </p>
        </section>

        <section className="panel">
          <form className="note-form" onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter note title"
              />
            </div>

            <div className="field-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="4"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Write the note details"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                {editingId ? 'Update Note' : 'Add Note'}
              </button>
              {editingId ? (
                <button type="button" className="secondary-button" onClick={resetForm}>
                  Cancel
                </button>
              ) : null}
            </div>
          </form>

          {message ? <p className="status success">{message}</p> : null}
          {error ? <p className="status error">{error}</p> : null}
        </section>

        <section className="notes-section">
          <div className="section-header">
            <h2>All Notes</h2>
            <button type="button" className="secondary-button" onClick={fetchNotes}>
              Refresh
            </button>
          </div>

          {loading ? <p className="empty-state">Loading notes...</p> : null}

          {!loading && notes.length === 0 ? (
            <p className="empty-state">No notes found. Add the first one above.</p>
          ) : null}

          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
