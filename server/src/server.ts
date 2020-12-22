import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import * as dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import cors from "cors";

import { connectDB } from "./config/db";
import { router as deckRouter } from "./routes/decks"
import { router as noteRouter } from "./routes/notes"
import { router as tagRouter } from "./routes/tags"

dotenv.config({ debug: true })
connectDB();

const app = express();
const port = process.env.PORT || 4000;

const httpServer = http.createServer(app);
const io = new SocketServer(httpServer, { path: "/api/v1/syncedits" });

app.use(morgan("dev"));
app.use(cors())
app.use(express.json())
app.use(express.static(path.join("public", "media")))

app.use("/api/v1/decks", deckRouter)
app.use("/api/v1/notes", noteRouter)
app.use("/api/v1/tags", tagRouter)
// TODO: add a route for user authentication/registration with passport.js

// Socket connection should note:
// - Who connected?
// - Who edited?
io.on("connection", (socket: any) => {
    console.log("New socket connection opened");

    socket.emit({"message": "Hello World!"})

    socket.on("*", (event: any, data: any) => {
        console.log(event, data);
    })

    socket.on("disconnect", () => {
        console.log("User disconnected");
    })
})
// Only one problem, how do you display this in the app?
// Getting the frontend editor to emit events is easy enough but you'll run into problems with display
// Need to make cursors highlighted with names (how to do this???)

httpServer.listen(port, () => console.log(`App listening on port ${port}`))