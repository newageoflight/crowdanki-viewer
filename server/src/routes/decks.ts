import express from "express";
import { getDecks } from './../controllers/decks';

export const router = express.Router()

router.route("/")
    .get(getDecks)

// More endpoints coming soon...
