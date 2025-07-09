// // import { Server } from "socket.io";
// // import http from "http";
// // import express from "express";

// // const app = express();
// // const server = http.createServer(app);

// // const io = new Server(server, {
// //   cors: {
// //     origin: ["http://localhost:5173"],
// //   },
// // });

// // export function getReceiverSocketId(userId) {
// //   return userSocketMap[userId];
// // }

// // // used to store online users
// // const userSocketMap = {}; // {userId: socketId}

// // io.on("connection", (socket) => {
// //   console.log("A user connected", socket.id);

// //   const userId = socket.handshake.query.userId;
// //   if (userId) userSocketMap[userId] = socket.id;

// //   // io.emit() is used to send events to all the connected clients
// //   io.emit("getOnlineUsers", Object.keys(userSocketMap));

// //   socket.on("disconnect", () => {
// //     console.log("A user disconnected", socket.id);
// //     delete userSocketMap[userId];
// //     io.emit("getOnlineUsers", Object.keys(userSocketMap));
// //   });
// // });

// // export { io, app, server };



// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();
// const server = http.createServer(app);

// // ✅ Allow both localhost and Render frontend
// const io = new Server(server, {
//   cors: {
//     origin: [
//       "http://localhost:5173",                  // for local development
//       "https://chatapp-ui-bc0m.onrender.com",   // for production
//     ],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // 🔒 Store userId -> socketId mapping
// const userSocketMap = {}; // { userId: socketId }

// // 🔍 Utility function to get receiver's socket ID
// export function getReceiverSocketId(userId) {
//   return userSocketMap[userId];
// }

// // 🧠 Socket event handlers
// io.on("connection", (socket) => {
//   console.log("✅ A user connected:", socket.id);

//   const userId = socket.handshake.query.userId;
//   if (userId) {
//     userSocketMap[userId] = socket.id;
//   }

//   // Broadcast online users to everyone
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   socket.on("disconnect", () => {
//     console.log("❌ A user disconnected:", socket.id);
//     if (userId) {
//       delete userSocketMap[userId];
//     }
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chatapp-ui-bc0m.onrender.com"],
    credentials: true,
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export { io, app, server };


// // 📤 Export for use in main server file
// export { io, app, server };

