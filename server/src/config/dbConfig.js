const dotenv = require('dotenv');
dotenv.config({path: '../.env'});
module.exports = {
    dbName: process.env.DBNAME,
    pwd: process.env.MPWD,
    uName: process.env.UNAME
};