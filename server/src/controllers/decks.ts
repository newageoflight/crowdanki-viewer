import { Request, Response, NextFunction } from "express";
import { DeckModel } from "../models/mongodb/DeckSchema"

// @desc Get all decks
// @route GET /api/v1/decks
// @access Protected (public for now)

export const getDecks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decks = await DeckModel.find({});

        return res.status(200).json({
            success: true,
            count: decks.length,
            data: decks
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "500 Internal Server Error"
        })
    }
}

// @desc Add a new deck
// @route POST /api/v1/decks
// @access Protected (public for now)


// @desc Delete a deck
// @route DELETE /api/v1/decks/:id
// @access Protected (public for now)