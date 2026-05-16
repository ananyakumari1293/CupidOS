require("dotenv").config();

const express = require("express");

const cors = require("cors");

const http = require("http");

const mongoose = require("mongoose");

const { Server } = require("socket.io");

const Message = require("./models/Message");

const app = express();

/* MONGODB CONNECTION */

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log(
    "MongoDB connected 💖"
  );

})

.catch((err) => {

  console.log(err);

});

/* HTTP SERVER */

const server = http.createServer(app);

/* SOCKET SERVER */

const io = new Server(server, {

  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }

});

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

/* TEST ROUTE */

app.get("/", (req, res) => {

  res.json({
    message: "CupidOS backend running 💖"
  });

});

/* GET ROOM MESSAGES */

app.get(
  "/messages/:roomId",
  async (req, res) => {

    try {

      const messages =
        await Message.find({

          roomId:
            req.params.roomId

        });

      res.json(messages);

    }

    catch(err) {

      console.log(err);

      res.status(500).json({
        error: "failed"
      });

    }

  }
);

/* SOCKET CONNECTION */

io.on("connection", (socket) => {

  console.log(
    "user connected:",
    socket.id
  );

  /* JOIN ROOM */

  socket.on("join_room", (roomId) => {

    socket.join(roomId);

    console.log(
      `user joined room: ${roomId}`
    );

  });

  /* SEND MESSAGE */

  socket.on(
    "send_message",
    async (data) => {

      try {

        /* SAVE TO DATABASE */

        await Message.create({

          roomId: data.roomId,

          username: data.username,

          text: data.text,

          time: data.time,

          reaction: data.reaction

        });

        /* SEND TO ROOM */

        io.in(data.roomId).emit(
          "receive_message",
          data
        );

      }

      catch(err) {

        console.log(err);

      }

    }
  );

  /* TYPING */

  socket.on("typing", (data) => {

    socket.to(data.roomId).emit(
      "show_typing",
      data.username
    );

  });

  /* DISCONNECT */

  socket.on("disconnect", () => {

    console.log(
      "user disconnected"
    );

  });

});

/* PORT */

const PORT = process.env.PORT || 5000;

/* START SERVER */

server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});