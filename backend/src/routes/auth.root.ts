import bcrypt from "bcrypt";
import express from "express";
import {ObjectId} from "mongodb";
import uuid from "uuid";
import {Credentials, Tokens} from "../Interfaces";

const app = express();
const authRoutes = express.Router();

// To do: parse input for correctness. Make sure https is being used.

authRoutes.route("/new").post( (req, res) => {
  const creds = new Credentials( {
    password: bcrypt.hashSync(req.body.password, 8),
    username: req.body.username
  });
  creds.save().then(
    (resu) => {

      // tslint:disable-next-line: variable-name
      const access_key: string = uuid.v1();
      const expiry: number = Date.now() + 86400;
      const toks = new Tokens({access_key, expiry});
      toks.save().then((resu2) => {
        res.status(200).json({expiry, access_key, message: "OK"});
      }).catch(() => {res.status(400).json({message: "Password added, but failed to give you access token"}); });
    }
  ).catch((err) => {
    res.status(400).json({message: "Failed to save to database"});
  });
});

authRoutes.route("/login").post( (req, res) => {
  try {
  // tslint:disable-next-line: no-console
  console.log("started to do the thing");

  const result: any = Credentials.findOne({username: req.body.username }, {password: 1});
  if (bcrypt.compareSync(req.body.password, result.password)) {
    // tslint:disable-next-line: variable-name
    const access_key: string = uuid.v1();
    const expiry: number = Date.now() + 86400;
    res.status(200).json({expiry, access_key, message: "OK"});
    // tslint:disable-next-line: no-console
    console.log("successfully did the thing");
  } else {
    res.status(400).json({message: "Invalid Password"});
    // tslint:disable-next-line: no-console
    console.log("Invalid password");
  }
} catch (err) {
  res.status(400).json({message: err});
  // tslint:disable-next-line: no-console
  console.log("failed: " + err);
}
});

authRoutes.route("/change").post( (req, res) => {
  try {
    const result: any = Credentials.findOne({username: req.body.username }, {password: 1});
    if (bcrypt.compareSync(req.body.password, result.password)) {
      Credentials.updateOne({_id: new ObjectId(result._id)}, {password: req.body.password});
      res.status(200).json({message: "OK"});
    } else {
      res.status(400).json({message: "Invalid Password"});
    }
  } catch (err) {
    res.status(400).json({message: err});
  }
});

export default authRoutes;
