require("dotenv").config();
const express = require("express");
const connectDB = require("./config/dbConn");
const app = express();
// const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3600;
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

app.use(express.urlencoded({ extended: false }));
//handles form data in url and can pull out as parameter

connectDB();

app.use(cors(corsOptions)); // corss orginin resource sharing

app.use(express.json());

//middleware for cookies
// app.use(cookieParser());

//serve static files
app.use(express.static("public"));

// router;
app.use("/", require("./routes/root"));
app.use("/register", require("./controllers/registerUserController"));
app.use("/auth", require("./routes/api/auth"));
app.use("/users", require("./routes/api/users"));
app.use("/favouriterecipies", require("./routes/api/recipies"));
app.use("/favouriteexercises", require("./routes/api/exercises"));

// at end of routes
app.use("/*", require("./routes/404"));

app.use(errorHandler);

// mongoose.connection.once("open", () => {
//   console.log("connected to mongoDB");
  
// });


app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}  `);
});

