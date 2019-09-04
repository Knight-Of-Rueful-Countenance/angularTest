import mongoose from "mongoose";

const creds = new mongoose.Schema({
  password: {
    type: String
  },
  username: {
    type: String
  }
}, {
  collection: "credentials"
});

const Credentials = mongoose.model("Credentials", creds);
Credentials.ensureIndexes({username:  1 });

const tok = new mongoose.Schema({
  access_key: {
    type: String
  },
  expiry: {
    type: String
  }
}, {
  collection: "tokens"
});
const Tokens = mongoose.model("Tokens", tok);
Tokens.ensureIndexes({access_key:  1 });

export {Tokens, Credentials};

export default {
  Credentials,
  Tokens
};
