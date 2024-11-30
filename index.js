import express, { json } from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";



// open the database file
const db = await open({
  filename: "chat.db",
  driver: sqlite3.Database,
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});
const treasure_location={
  "latitude":0,
  "longitude":0,
}
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.get('/Audio/music.mp3', (req, res) => {
  res.sendFile(path.join(__dirname, 'Audio', 'music.mp3'));
});

app.get("/treasure_location", (req, res) => {
  res.json(treasure_location);
});

app.get("/chat", (req, res) => {
  res.sendFile(join(__dirname, "chat.html"));
});
app.get("/map", (req, res) => {
  res.sendFile(join(__dirname, "map.html"));
});
app.get("/main", (req, res) => {
  res.sendFile(join(__dirname, "main.html"));
});
io.on("connection", async (socket) => {
  socket.on("map",async (msg) => {
    console.log("map", msg);
    io.emit("map", msg);
  });

  socket.on("chat message", async (msg) => {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS messages(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          client_offset TEXT UNIQUE,
          content TEXT,
          userName TEXT,
          time TEXT
      );
    `);
    let result;
    let parsedMsg;
    try {
      parsedMsg = JSON.parse(msg);
      const { content, userName, time } = parsedMsg;
      result = await db.run(`INSERT INTO messages (content, userName, time) VALUES (?, ?, ?)`, [content, userName, time]);
    } catch (e) {
      console.log("Invalid JSON:", msg);
      console.log(e);
      return;
    }
    io.emit('chat message', parsedMsg, result.lastID);
  });
  if (!socket.recovered) {
    try {
      await db.each('SELECT id, content, userName, time FROM messages WHERE id > ?',
        [socket.handshake.auth.serverOffset || 0],
        (_err, row) => {
          console.log("row", row);
          socket.emit('chat message', row, row.id);
        }
      )
    } catch (e) {
      console.log(e);
    }
  }
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});