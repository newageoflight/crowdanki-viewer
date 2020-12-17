import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import path from "path";
// import http from "http";
// import { Server as IoServer } from "socket.io";
import { schema } from "./models/GQSchema"
import { InitialState } from './data/InitialState';

const app = express();
const port = process.env.PORT || 4000;
// const httpServer = new http.Server(app);
// const io = new IoServer(httpServer);
// move to mongodb to store decks
// also should consider finding some way to store images in db but in a way compatible with the current setup
app.use(cors());
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))
app.use(express.static(path.join("public", "media")))

app.get("/getdata", (req, res) => {
    console.log("Sending initial state");
    res.send(InitialState);
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