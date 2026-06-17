const http = require("https");

const options = {
  method: "GET",
  hostname: "streaming-availability.p.rapidapi.com",
  port: null,
  path: "/shows/%7Btype%7D/%7Bid%7D",
  headers: {
    "x-rapidapi-key": "450376d6fdmsh789827cd491ecb8p17bab7jsn06073bfbf0a0",
    "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
