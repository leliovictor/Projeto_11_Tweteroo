import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = []; //juntar os dois e ja adicionar o avatar ao tweet no post para facilitar?
const tweets = [];

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

server.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (username === "" || avatar === "")
    return res.status(400).send("Todos os campos são obrigatórios!");

  if (!isImage(avatar)) return res.status(400).send("Foto com formato inválido");

  users.push(req.body);
  console.log(users);

  res.status(201).send("OK");
});

server.get("/tweets", (req, res) => {
  if (isNaN(req.query.page) || req.query.page < 0)
    res.status(400).send("Informe uma página válida!");

  const tweetsInterval = req.query.page * 10;
  const lastTweets = tweets
    .slice(-tweetsInterval, tweets.length + 10 - tweetsInterval)
    .reverse();

  res.send(lastTweets);
});

server.get("/tweets/:person", (req, res) => {
  const person = req.params.person;
  console.log(person);
  console.log(tweets);
  res.send("OK");
});

server.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  const { user } = req.headers;

  const username = users.find((obj) => user === obj.username);
  tweets.push({ ...username, tweet });

  res.status(201).send("OK");
});

server.listen(5000);
