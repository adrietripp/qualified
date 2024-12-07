const express = require("express");
const getZoos = require("./utils/getZoos");
const validateZip = require("./middleware/validateZip");

const app = express();


app.get("/check/:zip", validateZip, (req, res) => {
  const { zip } = req.params;
  const zoos = getZoos(zip) || [];

  if (zoos.length > 0) {
    res.send(`${zip} exists in our records.`);
  } else {
    res.send(`${zip} does not exist in our records.`);
  }
});
app.get("/zoos/all", (req, res) => {
  const { admin } = req.query;

  if (admin === "true") {
    const allZoos = getZoos("all");
    res.send(`All zoos: ${allZoos.join("; ")}`);
  } else {
    res.status(403).send("You do not have access to that route.");
  }
});



app.get("/zoos/:zip", validateZip, (req, res) => {
  const { zip } = req.params;
  const zoos = getZoos(zip) || [];

  if (zoos.length > 0) {
    res.send(`${zip} zoos: ${zoos.join("; ")}`);
  } else {
    res.send(`${zip} has no zoos.`);
  }
});


app.get("/zoos/all", (req, res) => {
  const { admin } = req.query;

  if (admin === "true") {
    const allZoos = getZoos("all");
    res.send(`All zoos: ${allZoos.join("; ")}`);
  } else {
    res.status(403).send("You do not have access to that route.");
  }
});


app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(400).send(err.message);
});


app.use((req, res) => {
  res.status(404).send("That route could not be found!");
});

module.exports = app;



  