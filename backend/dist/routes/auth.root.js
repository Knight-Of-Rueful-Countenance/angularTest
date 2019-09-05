"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const uuid_1 = __importDefault(require("uuid"));
const Interfaces_1 = require("../Interfaces");
const app = express_1.default();
const authRoutes = express_1.default.Router();
// To do: parse input for correctness. Make sure https is being used.
authRoutes.route("/new").post((req, res) => {
    const creds = new Interfaces_1.Credentials({
        password: bcrypt_1.default.hashSync(req.body.password, 8),
        username: req.body.username
    });
    creds.save().then((resu) => {
        // tslint:disable-next-line: variable-name
        const access_key = uuid_1.default.v1();
        const expiry = Date.now() + 86400;
        const toks = new Interfaces_1.Tokens({ access_key, expiry });
        toks.save().then((resu2) => {
            res.status(200).json({ expiry, access_key, message: "OK" });
        }).catch(() => { res.status(400).json({ message: "Password added, but failed to give you access token" }); });
    }).catch((err) => {
        res.status(400).json({ message: "Failed to save to database" });
    });
});
authRoutes.route("/login").post((req, res) => {
    try {
        // tslint:disable-next-line: no-console
        console.log("started to do the thing");
        const result = Interfaces_1.Credentials.findOne({ username: req.body.username }, { password: 1 });
        if (bcrypt_1.default.compareSync(req.body.password, result.password)) {
            // tslint:disable-next-line: variable-name
            const access_key = uuid_1.default.v1();
            const expiry = Date.now() + 86400;
            res.status(200).json({ expiry, access_key, message: "OK" });
        }
        else {
            res.status(400).json({ message: "Invalid Password" });
        }
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
authRoutes.route("/change").post((req, res) => {
    try {
        const result = Interfaces_1.Credentials.findOne({ username: req.body.username }, { password: 1 });
        if (bcrypt_1.default.compareSync(req.body.password, result.password)) {
            Interfaces_1.Credentials.updateOne({ _id: new mongodb_1.ObjectId(result._id) }, { password: req.body.password });
            res.status(200).json({ message: "OK" });
        }
        else {
            res.status(400).json({ message: "Invalid Password" });
        }
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.default = authRoutes;
//# sourceMappingURL=auth.root.js.map