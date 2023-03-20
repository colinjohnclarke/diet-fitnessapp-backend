const express = require("express");
const router = express.Router();

const path = require("path");

router.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "..", "views", "404.html"));
});

module.exports = router;
