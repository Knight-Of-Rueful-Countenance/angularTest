"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const result = dotenv_1.default.config();
if (result.error) {
    throw result.error;
}
const app = express_1.default();
const port = process.env.PORT || 4000;
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(process.env.DB, { useNewUrlParser: true }).then(
// tslint:disable-next-line: no-console
() => { console.log("Database is connected"); }, 
// tslint:disable-next-line: no-console
(err) => { console.log(" Can not connect to the database" + err); });
app.use(cors_1.default());
app.use(bodyParser.json());
// tslint:disable-next-line: no-empty
const server = app.listen(() => {
    // tslint:disable-next-line: no-console
    console.log("Server Started at " + port);
});
//# sourceMappingURL=server.js.map