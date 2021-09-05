const dotenv = require("dotenv").config();
const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const sessionStore = new SQLiteStore({ db: "sessions.sqlite" });
const morgan = require("morgan");

const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

app.use(express.json());
app.use(session({
  name: "sid",
  store: sessionStore,
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 3,
    sameSite: false,
    secure: false
  }
}));
app.use(morgan("dev"));

app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));