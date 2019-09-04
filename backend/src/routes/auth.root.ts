import bcrypt from "bcrypt";
import express from "express";
import {ObjectId} from "mongodb";
import uuid from "uuid";
import {Credentials, Tokens} from "../Interfaces";

const app = express();
const authRoutes = express.Router();

// To do: parse input for correctness. Make sure https is being used.

authRoutes.route("/api/auth/signup").post( (req, res) => {
  const creds = new Credentials( {
    password: bcrypt.hashSync(req.body.password, 8),
    username: req.body.username
  });
  creds.save().then(
    (resu) => {
      res.status(200).json({message: "OK"});
    }
  ).catch((err) => {
    res.status(400).json({message: "Failed to save to database"});
  });
});

authRoutes.route("api/auth/login").post( (req, res) => {
  try {
  const result: any = Credentials.findOne({username: req.body.username }, {password: 1});
  if (bcrypt.compareSync(req.body.password, result.password)) {
    const access_key = uuid.v1();
    res.status(200).json({access_key, message: "OK"});
  } else {
    res.status(400).json({message: "Invalid Password"});
  }
} catch (err) {
  res.status(400).json({message: err});
}
});

authRoutes.route("api/auth/change").post( (req, res) => {
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
