const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');

// Fetch all notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

// Add a note
router.post('/addnote', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  const note = new Note({ title, description, tag, user: req.user.id });
  const savedNote = await note.save();
  res.json(savedNote);
});

// Update a note
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;

  let note = await Note.findById(req.params.id);
  if (!note) return res.status(404).send("Not Found");

  if (note.user.toString() !== req.user.id) return res.status(401).send("Not Allowed");

  note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
  res.json(note);
});

// Delete a note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  let note = await Note.findById(req.params.id);
  if (!note) return res.status(404).send("Not Found");

  if (note.user.toString() !== req.user.id) return res.status(401).send("Not Allowed");

  note = await Note.findByIdAndDelete(req.params.id);
  res.json({ success: "Note has been deleted", note: note });
});

module.exports = router;
