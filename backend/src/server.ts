import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const app = express();
const port = process.env.PORT || 4000;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, {useNewUrlParser: true}).then(
  // tslint:disable-next-line: no-console
  () => {console.log("Database is connected"); },
  // tslint:disable-next-line: no-console
  (err) => { console.log(" Can not connect to the database" + err); }
);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// tslint:disable-next-line: no-empty
const server = app.listen(() => {
  // tslint:disable-next-line: no-console
  console.log("Server Started at " + port);
});
