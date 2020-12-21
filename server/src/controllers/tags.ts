import { Request, Response, NextFunction } from "express";
import { NoteDBModel } from "../models/mongodb/NoteSchema";

// @desc Get all the note tags in the current collection
// @route GET /api/v1/tags
// @access Protected (public for now)

export const getTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tags = await NoteDBModel.find({tags: {$exists: true, $not: {$size: 0}}}).select({"tags": 1})

        return res.status(200).json({
            success: true,
            length: tags.length,
            data: tags
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "500 Internal Server Error"
        })
    }
}