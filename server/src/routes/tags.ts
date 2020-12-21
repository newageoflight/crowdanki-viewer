import express from "express";
import { getTags } from './../controllers/tags';

export const router = express.Router();

router.route("/").get(getTags)