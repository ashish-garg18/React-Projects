const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Route 1 : Get all the notes using : GET "/api/notes/fetchAllNotes." login required
router.get('/fetchAllNotes', fetchuser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id });
      res.json(notes)
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
   }
})

// Route 2 : Add a new Note using : POST "/api/notes/addNote." login required
router.post('/addNote', fetchuser, [
   body('title', "Title must be at least 3 characters").isLength({ min: 3 }),
   body('description', 'description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {

   try {
      const { title, description, tag } = req.body;

      // if there are errror return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
         user: req.user.id, title, description, tag
      })

      const savedNote = await note.save();
      res.json(savedNote)
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
   }
})

// Route 3 : Update an existing Note using : PUT "/api/notes/updateNote." login required
router.put('/updateNote/:id', fetchuser, async (req, res) => {
   const { title, description, tag } = req.body;
   try {
      //  Create a new Note object
      const newNote = {};
      if (title) { newNote.title = title };
      if (description) { newNote.description = description };
      if (tag) { newNote.tag = tag };

      // Find the note to be updated and update it
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found!") }

      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed");
      }

      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
      res.json(note);
   } catch {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
   }
})

// Route 4 : Delete an existing Note using : DELETE "/api/notes/deleteNote." login required
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
   try {
      // Find the note to be deleted and delete it
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found!") }

      // check user 
      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed");
      }

      note = await Note.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", note: note });
   } catch {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
   }
})

module.exports = router;