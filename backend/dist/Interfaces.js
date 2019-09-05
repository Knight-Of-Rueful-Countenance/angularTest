"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const creds = new mongoose_1.default.Schema({
    password: {
        type: String
    },
    username: {
        type: String
    }
}, {
    collection: "credentials"
});
const Credentials = mongoose_1.default.model("Credentials", creds);
exports.Credentials = Credentials;
Credentials.ensureIndexes({ username: 1 });
const tok = new mongoose_1.default.Schema({
    access_key: {
        type: String
    },
    expiry: {
        type: String
    }
}, {
    collection: "tokens"
});
const Tokens = mongoose_1.default.model("Tokens", tok);
exports.Tokens = Tokens;
Tokens.ensureIndexes({ access_key: 1 });
exports.default = {
    Credentials,
    Tokens
};
//# sourceMappingURL=Interfaces.js.map