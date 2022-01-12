require("dotenv").config();
require("./config/database").connect();
const express = require('express');
const app = express();
const PORT = 8080;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require("./middleware/auth");

app.use(express.json())
app.listen(PORT);

// importing user context
const User = require("./model/user");


app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });



app.post('/register', async(req, res) =>{
    //const { username, password, email } = req.body;
    // create user and add it to db
    //
    
     // Our register logic starts here
  try {
    // Get user input
    
    const { username, password, email } = req.body;

    // Validate user input
    if (!(username && password && email)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }

    // res.status(201).send({
    //     text: `User ${username} registered!`
    // });
    
});

app.post('/login', async(req, res) =>{

try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }


    // if(user){
    //     res.status(200).send({
    //         text: `Logged in ${username}!`
    //     });
    // }

    // // if user provides invalid credentials
    // res.sendStatus(401);

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


