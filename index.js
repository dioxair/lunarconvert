const express = require("express");
const app = express();
const fs = require("fs");

app.use((_, res, next) => {
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

function getTime() {
  const date = new Date();

  let dateAndTime = date.toLocaleString("en-US", {
    timeZone: "America/New_York",
  });

  return dateAndTime;
}

app.use(function logger(req, res, next) {
  console.log(`${getTime()} EST - ${req.method} ${req.path} - ${req.ip}`);
  console.log("");
  fs.appendFile(
    "logs.txt",
    `${getTime()} EST - ${req.method} ${req.path} - ${req.ip}
`,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  next();
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/video/index.html`);
});

app.get("/video/mp4", (req, res) => {
  res.sendFile(`${__dirname}/views/video/index.html`);
});

app.get("/audio/mp3", (req, res) => {
  res.sendFile(`${__dirname}/views/audio/mp3.html`);
});

app.get("/video/avi", (req, res) => {
  res.sendFile(`${__dirname}/views/video/avi.html`);
});

app.get("/video/flv", (req, res) => {
  res.sendFile(`${__dirname}/views/video/flv.html`);
});

app.get("/video/gif", (req, res) => {
  res.sendFile(`${__dirname}/views/video/gif.html`);
});

app.get("/video/mov", (req, res) => {
  res.sendFile(`${__dirname}/views/video/mov.html`);
});

app.get("/video/mkv", (req, res) => {
  res.sendFile(`${__dirname}/views/video/mkv.html`);
});

app.get("/audio/ogg", (req, res) => {
  res.sendFile(`${__dirname}/views/audio/ogg.html`);
});

app.use("/public", express.static(__dirname + "/public"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
