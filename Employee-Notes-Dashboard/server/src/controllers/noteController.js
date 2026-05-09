const Note = require('../models/Note');

const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const note = await Note.create({
      title: title.trim(),
      description: description.trim()
    });

    res.status(201).json({
      message: 'Note created successfully',
      note
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Error creating note', error: error.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        description: description.trim()
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({
      message: 'Note updated successfully',
      note
    });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Error updating note', error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote
};
