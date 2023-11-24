const express = require("express");
const Notes = require("../models/Notes");
const fetchUser = require("../middlewares/fetchUser");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// @route GET /api/auth/allNotes
// @desc get all the notes of a user
router.get("/allNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    return res.json(notes);
  } catch (error) {
    return res.status(500).json({ error: "Internal error occured" });
  }
});

// @route GET /api/auth/addNotes
// @desc add all the notes of a user
router.post(
  "/addNotes",
  fetchUser,
  [
    body("title", "Enter a valid title.").isLength({ min: 7 }),
    body("description", "Enter a valid description.").isLength({ min: 7 }),
  ],
  async (req, res) => {
    try {
        const {title, description, tag} = req.body
      // Checking for validation array
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Add a note to database
      const newNotes = await Notes({
        title: title,
        description: description,
        tag: tag,
        user: req.user.id,
      });
      newNotes.save();

      res.json(newNotes);
    } catch (error) {
      return res.status(500).json({ error: "Internal error occured" });
    }
  }
);

// @route Patch /api/auth/updateNote
// @desc update a note of a user
router.patch(
  "/updateNote/:id",
  fetchUser,
  async (req, res) => {
    try {
        const {title, description, tag} = req.body

      // Find a note in database
        let note = await Notes.findById(req.params.id);
        console.log(note)
        // if not found
        if(!note){
            return res.status(400).json({error: "Please enter correct note id."})
        }
        // checking correct user
        if(note.user.toString() !== req.user.id){
            return res.status(401).json({error: "Not Authorized"})
        }

        // edited content
        const newNote = {};
        if(title){
          newNote.title = title
        }
        if(description){
          newNote.description = description
        }
        if(tag){
          newNote.tag = tag
        }

        // updating note
        note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new: true})
        res.json(note)

    } catch (error) {
      return res.status(500).json({ error: "Internal error occured" });
    }
  }
);


// @route Delete /api/auth/deleteNote
// @desc delete a note of a user
router.delete(
  "/deleteNote/:id",
  fetchUser,
  async (req, res) => {
    try {

      // Find a note in database
        let note = await Notes.findById(req.params.id);
        // if not found
        if(!note){
            return res.status(400).json({error: "Please enter correct note id."})
        }
        // checking correct user
        if(note.user.toString() !== req.user.id){
            return res.status(401).json({error: "Not Authorized"})
        }

        // delete a note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json(note)

    } catch (error) {
      return res.status(500).json({ error: "Internal error occured" });
    }
  }
);

module.exports = router;
