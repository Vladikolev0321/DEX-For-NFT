const { uName, pwd, dbName } = require('../config/dbConfig.js');
const authString = "mongodb+srv://" + uName + ":" + pwd + "@cluster0.ns8pm.mongodb.net/" + dbName + "?retryWrites=true&w=majority";

async function createConnection(mongoose){
  try {
    await mongoose.connect(authString, { useNewUrlParser: true });
    console.log("Connected to the database");
  } catch (error) {
    console.log(`Error while trying to connect to the MongoDB database: ${error}`);
    return;
  }
}

module.exports = {
  createConnection
};