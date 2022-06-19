import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = []; //juntar os dois e ja adicionar o avatar ao tweet no post para facilitar?
const tweets = [];

//Function below just to population tweets to test, erase after done!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function populationTweets(n) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    const y = i % 2 === 0 ? i : i - 1;
    const obj = {
      username: `Teste-${y}`,
      avatar:
        "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
      tweet: `Tweet ${i + 1}`,
    };
    tweets.push(obj);
  }
}

populationTweets(15); //ERASE AFTER DONE !
console.log(tweets); //ERASE AFTER DONE !

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

  console.log(users);

  res.status(201).send("OK");
});

server.get("/tweets", (req, res) => {
  if (isNaN(req.query.page) || req.query.page < 0)
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
  res.send(personTweets);
});

server.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  const { user } = req.headers;

  const username = users.find((obj) => user === obj.username);
  tweets.push({ ...username, tweet });

  res.status(201).send("OK");
});

server.listen(5000);
