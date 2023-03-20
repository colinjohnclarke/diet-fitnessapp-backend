const whitelist = [
  "http://wwww.google.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
  "http://localhost:3600",
  "http://localhost:3000",
  "http://localhost:3001",
];

const corsOptions = {
  origin: (origin, callback) => {
    if ((whitelist.indexOf(origin) !== -1) | !origin) {
      callback(null, true);
    } else {
      console.log("not allowed by Cors");
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
