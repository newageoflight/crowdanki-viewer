import express from "express";
// import { ApolloServer, gql } from "apollo-server";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";

import { connectDB } from "./config/db";
import { router as deckRouter } from "./routes/decks"
import { router as noteRouter } from "./routes/notes"
import { router as tagRouter } from "./routes/tags"
// import http from "http";
// import { Server as IoServer } from "socket.io";
// import { schema } from "./models/GQSchema"

// import { GQInitialState } from './data/InitialState';

dotenv.config({ path: "./config/config.env" })
connectDB();

const app = express();
const port = process.env.PORT || 4000;
app.use(morgan("dev"));
app.use(express.json())
app.use(express.static(path.join("public", "media")))

app.use("/api/v1/decks", deckRouter)
app.use("/api/v1/notes", noteRouter)
app.use("/api/v1/tags", tagRouter)

// don't do anything for now, just post the data to our server to see if it works properly
// ok now that the data's been posted we can start working with MongoDB

app.get("/getdata", (req, res) => {
    console.log("Retrieving data from server")
    console.log("Sending initial state");
})

app.get("/getdecks", (req, res) => {
    console.log("Sending deck list only")
})

// Socket connection should note:
// - Who connected?
// - Who edited?
// io.on("connection", (socket) => {
//     console.log("New socket connection opened");
//     socket.emit("message", "Hello world!")

//     socket.on("disconnect", () => {
//         console.log("User disconnected");
//     })
// })
// Only one problem, how do you display this in the app?
// Getting the frontend editor to emit events is easy enough but you'll run into problems with display
// Need to make cursors highlighted with names (how to do this???)

app.listen(port, () => console.log(`App listening on port ${port}`))