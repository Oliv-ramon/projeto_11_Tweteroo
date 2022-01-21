import express, { json } from "express";

let user = {
  username: "",
  avatar: "",
};
const tweets = [];

const server = express();
server.use(json());

server.post("/sign-up", (req, res) => {
  user = req.body;
  res.send("OK");
});

server.post("/tweets", (req, res) => {
  tweets.push({ ...req.body, avatar: user.avatar});
  res.send("OK");
});

server.get("/tweets", (req, res) => {
  const last10tweets = tweets.slice(tweets.length-10);
  res.send(last10tweets);
});

server.listen(5000, console.log("Runing Api"))