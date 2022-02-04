const express = require('express');
const app = express();
const PORT = 8080;
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");



app.use(express.json())
app.listen(PORT);


const options = {
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
            url: "http://localhost:8080",
            description: "My API Documentation",
        }, ],
    },
    apis: ["./main.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));




/** 
 * @swagger
 * /register:
 *   post:
 *     description: register to the site
 *     requestBody:
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                password:
 *                  type: string
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *            examples:
 *              '0':
 *                value: |-
 *                  {
 *                      "name": "Dido",
 *                      "email": "template@at.com",
 *                      "password": "pass"
 *                  }
 *     responses:
 *       '201':
 *         description: User registered
 */
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    // create user and add it to db

    if(!name || !email || !password){
        res.sendStatus(401);
    }else{
        res.status(201).send({
            text: `User ${name} registered`
        });
    }

});




/** 
 * @swagger
 * /login:
 *   post:
 *     description: login to the site
 *     requestBody:
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                password:
 *                  type: string
 *                email:
 *                  type: string
 *            examples:
 *              '0':
 *                value: |-
 *                  {
 *                      "email": "template@at.com",
 *                      "password": "pass"
 *                  }
 *     responses:
 *       '200':
 *         description: Success
 *       '401':
 *         description: Invalid credentials
 */
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // check if user exists
    // 
    user = {};
    if (user) {
        res.status(200).send({
            text: `Logged in ${email}`
        });
    }
    // if user provides invalid credentials
    res.sendStatus(401);
});




/** 
 * @swagger
 * /nfts:
 *   get:
 *     description: Get all nfts for sale
 *     responses:
 *       '200':
 *         description: Success
 */
app.get('/nfts', (req, res) => {
    // get nfts list from db
    nfts = [];
    res.status(200).send({
        nfts: nfts
    });
});




/** 
 * @swagger
 * /home:
 *   get:
 *     description: Get related nfts for sale
 *     responses:
 *       '200':
 *         description: Success
 */
app.get('/home', (req, res) => {
    // get nfts list from db
    nfts = [];
    res.status(200).send({
        nfts: nfts
    });
});

/** 
 * @swagger
 * /nft/{id}:
 *   get:
 *     description: Get all nfts for sale
 *     parameters:
 *       - name: id
 *         in: query
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       '200':
 *         description: Created
 *       '404':
 *         description: Not found
 */
app.get('/nft/:id', (req, res) => {
    const { id } = req.params;
    // get nft with given id from db
    nft = {};

    if (nft) {
        res.status(200).send({
            nft: nft
        });
    }
    res.sendStatus(404);
});

/** 
 * @swagger
 * /nft/{id}/buy:
 *   post:
 *     description: buy current nft
 *     requestBody:
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                password:
 *                  type: string
 *                email:
 *                  type: string
 *            examples:
 *              '0':
 *                value: |-
 *                  {
 *                      "email": "template@at.com",
 *                      "password": "pass"
 *                  }
 *     responses:
 *       '201':
 *         description: Auto generated using Swagger Inspector
 *       '401':
 *         description: Invalid credentials
 */
app.post('/nft/:id/buy', (req, res) => {
    const { id } = req.params;
    // buy -- remove nft from list
    // get nft with this id from db
    nft = {};
    // check if buyer has enough money to buy nft from wallet
    // change nft owners and other paramerers for ownership
    // change nft status
    //success
    res.sendStatus(200);
    // failure
    res.sendStatus(424);

});





// sell -- add nft to list
app.post('/sell', (req, res) => {
    const { name, description, address, image, owner, price } = req.body;

    // check if user has this nft(contract level)
    // add nft to db

    //success
    res.sendStatus(200);
    // failure
    res.sendStatus(424);

});




/** 
 * @swagger
 * /settings:
 *   get:
 *     description: Get user/account ettings
 *     responses:
 *       '200':
 *         description: Success
 */
app.get('/settings', (req, res) => {

    // get user name and email from db
    usernameEmailData = {};

    res.sendStatus(200).send({
        accountInfo: usernameEmailData
    });

});





app.put('/settings/change-password', (req, res) => {

    // remove user if exists
    res.status(200).send({
        text: `Removed user`
    });
    res.sendStatus(400);

});




app.delete('/deleteAccount', (req, res) => {
    // get currentUser from db

    //remove from db
    res.status(200).send({
        text: `Removed user`
    });
    res.sendStatus(400);
});




/** 
 * @swagger
 * /my-nfts:
 *   get:
 *     description: Get user nfts for sale
 *     responses:
 *       '200':
 *         description: Success
 */
app.get('/my-nfts', (req, res) => {
    // get nfts list from db which the current user owns
    nfts = [];
    res.status(200).send({
        nfts: nfts
    });

});


app.delete('/nft/:id/remove-forsale', (req, res) => {
    // How to overuse nft route
    // If user has access to the choosen nft then he can remove it from sale's list
    nft = [];
    res.status(200).send({
        text: `Removed from sale`
    });
    res.sendStatus(404);

});

/** 
 * @swagger
 * /account:
 *   get:
 *     description: Get account properties
 *     responses:
 *       '200':
 *         description: Success
 */
app.get('/account', (req, res) => {

    // get user from db
    account = {};

    res.status(200).send({
        accountInfo: account
    });

});



module.exports = app; // for testing

