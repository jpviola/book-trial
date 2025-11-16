const serverlessExpress = require("@vendia/serverless-express");
const app = require("../src/server");

module.exports = serverlessExpress({ app });
