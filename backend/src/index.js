// // import express from "express";
// // import dotenv from "dotenv";
// // import cookieParser from "cookie-parser";
// // import cors from "cors";

// // import path from "path";

// // import { connectDB } from "./lib/db.js";

// // import authRoutes from "./routes/auth.route.js";
// // import messageRoutes from "./routes/message.route.js";
// // import { app, server } from "./lib/socket.js";

// // dotenv.config();

// // const PORT = process.env.PORT;
// // const __dirname = path.resolve();

// // app.use(express.json());
// // app.use(cookieParser());
// // // app.use(
// // //   cors({
// // //     origin: "http://localhost:5173",
// // //     credentials: true,
// // //   })
// // // );

// // app.use(
// //   cors({
// //     origin: ["http://localhost:5173", "https://chatapp-ui-bc0m.onrender.com"],
// //     credentials: true,
// //   })
// // );


// // app.use("/api/auth", authRoutes);
// // app.use("/api/messages", messageRoutes);

// // if (process.env.NODE_ENV === "production") {
// //   app.use(express.static(path.join(__dirname, "../frontend/dist")));

// //   app.get("*", (req, res) => {
// //     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
// //   });
// // }

// // server.listen(PORT, () => {
// //   console.log("server is running on PORT:" + PORT);
// //   connectDB();
// // });

// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";

// import { connectDB } from "./lib/db.js";
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { app, server } from "./lib/socket.js";

// dotenv.config();

// const PORT = process.env.PORT || 5001;
// const __dirname = path.resolve();

// // ✅ Middleware
// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://chatapp-ui-bc0m.onrender.com"],
//     credentials: true,
//   })
// );

// // ✅ API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // ✅ Serve static frontend in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//   });
// }

// // ✅ Start server and connect DB
// server.listen(PORT, () => {
//   console.log("🚀 Server running on PORT:", PORT);
//   connectDB();
// });

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js"; // or use `const app = express();` if not using socket.io

dotenv.config();

const PORT = process.env.PORT || 5000;

// fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json()); // ✅ this line needs express imported!
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://chatapp-ui-bc0m.onrender.com"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
  connectDB();
});
