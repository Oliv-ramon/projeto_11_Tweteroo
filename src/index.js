import express, { json } from "express";

const users = [];
const tweets = [];

const server = express();
server.use(json());

server.post("/sign-up", (req, res) => {
  users.push(req.body);
  res.send("OK");
});

server.post("/tweets", (req, res) => {
  const currentUser = users.find((user)  => user.username === req.body.username);
  tweets.push({ ...req.body, avatar: currentUser.avatar});
  res.send("OK");
});

server.get("/tweets", (req, res) => {
  const last10tweets = tweets.slice(tweets.length-10);
  res.send(last10tweets);
});

server.listen(5000, console.log("Runing Api"));