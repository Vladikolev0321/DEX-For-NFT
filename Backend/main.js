const express = require('express');
const app = express();
const PORT = 8080;
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");



app.use( express.json() )
app.listen(PORT);



const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },

    servers: [
      {
        url: "http://localhost:4001",
        description: "My API Documentation",
      },
    ],
  },
  apis: ["./Routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


app.post('/register', (req, res) =>{
    const { username, password, email } = req.body;
    // create user and add it to db
    // 

    res.status(201).send({
        text: `User ${username} registered!`
    });
    
});

app.post('/login', (req, res) =>{
    const { username, password, email } = req.body;
    // check if user exists
    // 
    user = {}

    if(user){
        res.status(200).send({
            text: `Logged in ${username}!`
        });
    }

    // if user provides invalid credentials
    res.sendStatus(401);

});


app.get('/nfts', (req, res) =>{


    // get nfts list from db
    nfts = [];
    res.status(200).send({
        nfts: nfts
    });

});

app.get('/nft/:id', (req, res) =>{
    const { id } = req.params

    // get nft with given id from db
    nft = {}

    if(nft){ 
        res.status(200).send({
            nft: nft
        });
    }

    res.sendStatus(404);


});

// buy -- remove nft from list
app.post('/nft/:id/buy', (req, res) =>{
    const { id } = req.params
    
    // get nft with this id from db
    nft = {}

    //  check if buyer has enough
    //  money to buy nft from wallet
    // remove nft from db

    //success
    res.sendStatus(200);
    // failure
    res.sendStatus(424);

});


// sell -- add nft to list
app.post('/sell', (req, res) =>{
    const { nft_name,  description, nft_address, image, seller_name, nft_price } = req.body;
    
    // check if user has this nft(contract level)
    // add nft to db

    //success
    res.sendStatus(200);
    // failure
    res.sendStatus(424);

});

// settings 
app.get('/settings', (req, res) =>{
    
    // get user from db
    userInfo = {};

    res.send({
        userInfo: userInfo
    });

});
// 

app.post('/deleteAccount', (req, res) =>{
    // get currentUser from db

    //remove from db
    
    res.sendStatus(200);
});


