import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

server.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  
  if (username === "" || avatar === "")
  res.status(400).send("Todos os campos são obrigatórios!");
  
  if (!isImage(avatar)) res.status(400).send("Foto com formato inválido");

  users.push(req.body);
  res.send("OK");
});

server.get("/tweets", (req, res) => {
  const lastTweets = tweets.slice(-10, tweets.length).reverse();
  res.send(lastTweets);
});

server.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  const user = users.find((obj) => username === obj.username);
  tweets.push({ ...req.body, avatar: user.avatar });

  res.send("OK");
});

server.listen(5000);
