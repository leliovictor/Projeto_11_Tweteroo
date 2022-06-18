import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

server.post("/sign-up", (req, res) => {
  users.push(req.body);

  console.log(users);
  res.send("OK");
});

server.get("/tweets", (req, res) => {
  const lastTweets = tweets.slice(tweets.length-10, tweets.length).reverse(); //Agiliza?
  res.send(lastTweets);
});

server.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  const user = users.find((obj) => username === obj.username);

  tweets.push({...req.body, avatar:user.avatar});

  res.send("OK");
});

server.listen(5000);
