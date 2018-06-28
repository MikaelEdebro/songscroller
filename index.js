const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const keys = require("./config/keys");

app.get("/", (req, res) => {
  res.send({ helloo: keys.test });
});

// serve up react app in prod
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT);
