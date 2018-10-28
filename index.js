// Set up express server

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {
  getSushiBars,
  addSushiBar,
  deleteSushiBars,
  replaceSushiBars,
  searchSushiBars
} = require("./services/api.controller");

app.use(bodyParser.json());

app.get("", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/sushi_bar", async (req, res) => {
  const sushiBars = await getSushiBars();
  res.status(200).json(sushiBars);
});
app.get("/sushi_bar/:id", async (req, res) => {
  const result = await searchSushiBars(req.params.id);
  res.status(200).json(result);
});

app.post("/sushi_bar/add/:name/:rating", async (req, res) => {
  const addedSushiBar = await addSushiBar(req.params);
  if (typeof addedSushiBar === "string") {
    res.status(400).send();
    return;
  }
  res.status(200).json(addedSushiBar[0]);
});

app.put("/sushi_bar/replace/:id/:name/:rating", async (req, res) => {
  const check = await searchSushiBars(Number(req.params.id));
  if (check.length === 0) {
    const result2 = await addSushiBar(req.params);
    res.status(200).send(result2[0]);
    return;
  }
  const result = await replaceSushiBars(req.params);
  res.status(200).json(result);
});

app.delete("/sushi_bar/delete", async (req, res) => {
  await deleteSushiBars();
  const result = await getSushiBars();
  res.status(200).json(result);
});

const setupExpressServer = () => {
  return app;
};

module.exports = { setupExpressServer };
