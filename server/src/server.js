const mongoose = require("mongoose");
const port = require('./config/serverConfig.js');

const app = require('./app.js');
const { createConnection } = require('./models/connect.js');

// Catch synchronous exeptions 
process.on('uncaughtException', err => {
    console.log("Uncaught Exception. Startng shut down ...");
    console.log(err.name, err.message);
    process.exit(1);
});

// Strat connection with mongo
createConnection(mongoose);

// event listener for errors
mongoose.connection.on("error", function (error) {
    console.log(`Error: ${error}`);
});

// set port who listens for requests
const PORT = port || 8071;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// Add global unhandled error event listener because it is posssible 
// to have uncaught errors/promise rejections somewhere in my code
process.on('unhandledRejection', err => {
    console.log("Unhandled Rejection. Startng shut down ...");
    console.log(err.name, err.message);
    // shut down server but wait for pending requests to finish
    server.close(() => {
        process.exit(1);
    });
});