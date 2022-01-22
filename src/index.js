import express, { json } from "express";
import cors from "cors";

const users = [];
const tweets = [];

const server = express();
server.use(json());
server.use(cors());

server.post("/sign-up", (req, res) => {
  const invalidData = !(req.body.username && req.body.avatar);

  if (invalidData) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }
  users.push(req.body);
  res.status(201).send("OK");
});

server.post("/tweets", (req, res) => {
  const invalidData = !(req.body.tweet && req.headers.user);
  
  if (invalidData) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const currentUser = users.find((user)  => user.username === req.headers.user);
  
  tweets.push({ 
    username: req.headers.user,
    tweet: req.body.tweet,
    avatar: currentUser.avatar 
  });
  
  res.status(201).send("OK");
});

server.get("/tweets", (req, res) => {
  if (!req.query.page || parseInt(req.query.page) < 1) {
    res.status(400).send("Informe uma página válida!");
    return;
  }

  const the10tweets = tweets.slice(parseInt(req.query.page)*10 -  10, parseInt(req.query.page)*10);
  res.send(the10tweets);
});

server.get("/tweets/:username", (req, res) => {
  const userTweets = tweets.filter((tweet) => tweet.username === req.params.username);
  res.send(userTweets);
});

server.listen(5000, console.log("Runing Api"));