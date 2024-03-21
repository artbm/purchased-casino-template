const dotenv = require("dotenv");

// Load env vars if env is not production
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./config/local.env" });
}

module.exports = {
  PORT: process.env.PORT || 7777,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  ALCHEMY_URL: process.env.ALCHEMY_URL,
  INITIAL_CHIPS_AMOUNT: 100000,
};
