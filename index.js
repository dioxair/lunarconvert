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

	let dateAndTime = date.toLocaleString('en-US', {
		timeZone: 'America/New_York',
	});

	return dateAndTime;
}

app.use(function logger(req, res, next) {
	console.log(`${getTime()} EST - ${req.method} ${req.path} - ${req.ip}`);
	console.log("")
	fs.appendFile("logs.txt", `${getTime()} EST - ${req.method} ${req.path} - ${req.ip}
`, err => {
		if (err) {
			console.log(err)
		}
	})
	next();
});

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/views/index.html`);
});

app.get("/mp3", (req, res) => {
	res.sendFile(`${__dirname}/views/mp3.html`);
});

app.get("/avi", (req, res) => {
	res.sendFile(`${__dirname}/views/avi.html`);
});

app.get("/flv", (req, res) => {
	res.sendFile(`${__dirname}/views/flv.html`);
});

app.get("/gif", (req, res) => {
	res.sendFile(`${__dirname}/views/gif.html`);
});

app.get("/mov", (req, res) => {
	res.sendFile(`${__dirname}/views/mov.html`);
});

app.get("/mkv", (req, res) => {
	res.sendFile(`${__dirname}/views/mkv.html`);
});

app.use("/public", express.static(__dirname + "/public"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});