const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");

const SERVER_PORT = process.env.SERVER_PORT || 5001;

// INIT
const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

// MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
io.on("connection", (socket) => {
  console.log("Usuário conectado!", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("Usuário desconectado!", socket.id);
  });

  socket.on("set_username", (username) => {
    socket.data.username = username;
    console.log("text" + username);
  });

  socket.on("message", (text) => {
    console.log(socket.data.username);
    io.emit("receive_message", {
      text,
      authorId: socket.id,
      author: socket.data.username,
    });
  });
});

server.listen(SERVER_PORT, () =>
  console.log("Socket server running on port: " + SERVER_PORT)
);
