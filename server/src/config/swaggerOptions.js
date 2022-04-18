const PORT = require('./serverConfig.js');

module.exports = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "DEX for NFTs",
            version: "1.0.0",
            description: "A decentralized application for nft exchanges",
            contact: {
                name: "Petar Borisov",
            },
        },

        servers: [{
            url: `http://localhost:${PORT}`,
            description: "My API Documentation",
        }, ],
    },
    apis: ["./server.js"],
};