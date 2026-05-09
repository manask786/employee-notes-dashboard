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
    res.status(500).json({ message: 'Server error' });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
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
    res.status(500).json({ message: 'Server error' });
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
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote
};
