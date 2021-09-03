const dotenv = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

app.use(express.json());
app.use(morgan("dev"));


app.use("/api/users", users);
app.use("/api/auth", auth);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));