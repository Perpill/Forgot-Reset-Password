const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const db = process.env.DB_URI;

//DB connection
mongoose
  .connect(db)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
