import { Request, Response, NextFunction } from "express";
import { NoteDBModel } from "../models/mongodb/NoteSchema";

// @desc Get all notes in collection
// @route GET /api/v1/notes
// @access Protected (public for now)

export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notes = await NoteDBModel.find()
        if (!notes) {
            return res.status(404).json({
                success: false,
                error: "No notes found"
            })
        }

        return res.status(200).json({
            success: true,
            data: notes
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "500 Internal Server Error"
        })
    }
}

// @desc Get notes belonging to a specific deck
// @route GET /api/v1/notes/deck/:deck_uuid
// @access Protected (public for now)

export const getNotesByDeck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notes = await NoteDBModel.find({"deck_uuid": req.params.deck_uuid})

        if (!notes) {
            return res.status(404).json({
                success: false,
                error: "No notes found"
            })
        }

        return res.status(200).json({
            success: true,
            length: notes.length,
            data: notes
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "500 Internal Server Error"
        })
    }
}

// @desc Get notes having a particular set of tags (takes a query string)
// @route GET /api/v1/notes/tags
// @access Protected (public for now)

export const getNotesByTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tags = req.query.tags
        const notes = await NoteDBModel.find({"tags": {"$in": tags}})

        if (!notes) {
            return res.status(404).json({
                success: false,
                error: "No notes found"
            })
        }

        return res.status(200).json({
            success: true,
            length: notes.length,
            data: notes
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "500 Internal Server Error"
        })
    }
}

// @desc Add a new note to the collection
// @route POST /api/v1/notes/
// @access Protected (public for now)

export const addNewNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const note = req.body;
        const created = await NoteDBModel.create(note);

        return res.status(201).json({
            success: true,
            data: created
        });
    } catch (err) {
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map((val: any) => val.message)

            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: "500 Internal Server Error"
            })
        }
    }
}

// @desc Delete a note from the collection
// @route DELETE /api/v1/notes/:guid
// @access Protected (public for now)

export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await NoteDBModel.findOneAndDelete({"guid": req.params.guid}, {}, (err, docs) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                })
            } else {
                return res.status(200).json({
                    success: true,
                    data: docs
                })
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "500 Internal Server Error"
        })
    }
}