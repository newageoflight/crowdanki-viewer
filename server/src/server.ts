import express from "express";
import path from "path";
// import http from "http";
// import { Server as IoServer } from "socket.io";
import { InitialState } from './data/InitialState';

const app = express();
const port = 4000;
// const httpServer = new http.Server(app);
// const io = new IoServer(httpServer);
app.use(express.static(path.join("public", "media")))

app.get("/getdata", (req, res) => {
    console.log("Server called, sending initial state");
    res.send(InitialState);
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

app.listen(port, () => console.log(`App listening on port ${port}`))