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
    return res.status(400).send("Todos os campos são obrigatórios!");

  if (!isImage(avatar))
    return res.status(400).send("Foto com formato inválido");

  if (username.split(" ").length > 1)
    return res.status(400).send("Não é aceito espaços no 'username'");

  users.push(req.body);

  res.status(201).send("OK");
});

server.get("/tweets", (req, res) => {
  if (isNaN(req.query.page) || req.query.page <= 0)
    res.status(400).send("Informe uma página válida!");

  const numbersOfTweetsPerPage = 10;
  const tweetsInterval = req.query.page * 10;
  const lastTweets = tweets
    .slice(
      -tweetsInterval,
      tweetsInterval === numbersOfTweetsPerPage
        ? tweets.length
        : -tweetsInterval + numbersOfTweetsPerPage
    )
    .reverse();

  res.send(lastTweets);
});

server.get("/tweets/:person", (req, res) => {
  const person = req.params.person;
  const personTweets = tweets.filter((obj) => person === obj.username);
  personTweets.reverse();
  res.send(personTweets);
});

server.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  const { user } = req.headers;

  if (user === "" || tweet === "")
    return res.status(400).send("Todos os campos são obrigatórios!");

  const username = users.find((obj) => user === obj.username);
  tweets.push({ ...username, tweet });

  res.status(201).send("OK");
});

server.listen(5000);
