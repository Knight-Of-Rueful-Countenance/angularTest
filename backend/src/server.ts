import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.root";

const result = dotenv.config();
if (result.error) {
  throw result.error;
}
async function start() {
  const app = express();
  const port = process.env.PORT || 4000;
  app.set("port", process.env.PORT || 4000);
  mongoose.set("debug", true);
  mongoose.Promise = global.Promise;
  let connected = false;
  while (!connected) {
    mongoose.connect(process.env.DB, {useNewUrlParser: true}).then(
      // tslint:disable-next-line: no-console
      () => {console.log("Database is connected");
             // tslint:disable-next-line: no-console
             mongoose.connection.db.collections( (err, names) => {console.log(names); });
             connected = true;
    },
      // tslint:disable-next-line: no-console
      (err) => { console.log(" Can not connect to the database" + err); }
    );
    if (!connected) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api/auth", authRoutes);

  // tslint:disable-next-line: no-empty
  const server = app.listen(port);
}

start();
