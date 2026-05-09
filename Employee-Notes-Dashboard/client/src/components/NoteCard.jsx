function NoteCard({ note, onEdit, onDelete }) {
  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <article className="note-card">
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <div className="note-footer">
        <span>Created At: {formattedDate}</span>
        <div className="note-actions">
          <button type="button" className="secondary-button" onClick={() => onEdit(note)}>
            Edit
          </button>
          <button type="button" className="danger-button" onClick={() => onDelete(note._id)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;
