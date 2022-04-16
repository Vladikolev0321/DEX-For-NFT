const dotenv = require('dotenv');
dotenv.config({path: './.env'});
module.exports = {
  port: process.env.PORT
};