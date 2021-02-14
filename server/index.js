const express = require("express");

require("dotenv").config();
const PORT = process.env.PORT || 7400;
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//
const morgan = require("morgan");
const mongoose = require("mongoose");
//

const authRouter = require("./routes/User.router");
const TodoRouter = require("./routes/Todo.router");

//

app.use(cors());
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//

app.use("/auth", authRouter);

app.use("/todos", TodoRouter);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`App database connected  successfully... `);
  });
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
