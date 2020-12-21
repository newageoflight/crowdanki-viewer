import express from "express";
import { addNewNote, getNotes, getNotesByDeck, getNotesByTags, deleteNote } from './../controllers/notes';

export const router = express.Router();

router.route("/")
    .get(getNotes)
    .post(addNewNote)

router.route("/:guid")
    .delete(deleteNote)

router.route("/deck/:deck_uuid")
    .get(getNotesByDeck)

router.route("/tags")
    .get(getNotesByTags)