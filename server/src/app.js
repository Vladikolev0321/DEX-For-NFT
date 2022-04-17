const express = require('express');
const mongoose = require("mongoose");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const options = require('./config/swaggerOptions.js');
const specs = swaggerJsDoc(options);

app.use(express.json());
app.listen(PORT);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

/** 
 * @swagger
 * /register:
 *   post:
 *     description: Register to the site
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
 *                      "name": "Daniel",
 *                      "email": "tmpmail@gmail.com",
 *                      "password": "pass"
 *                  }
 *     responses:
 *       '201':
 *         description: User registered
 *       '401': 
 *         description: Unauthorized
 */
app.post('/register', register);

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
 *                      "email": "tmpmail@gmail.com",
 *                      "password": "password"
 *                  }
 *     responses:
 *       '200':
 *         description: Return user data
 *       '401':
 *         description: Invalid credentials
 */
app.post('/login', login);

/** 
 * @swagger
 * /nfts:
 *   get:
 *     description: Get all nfts for sale
 *     responses:
 *       '200':
 *         description: Return user data
 *       '401':
 *         description: Invalid credentials
 */
app.get('/nfts', getNfts);

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
app.get('/nft/:id', getNft);

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
 *         description: OK
 *       '401':
 *         description: Invalid credentials
 */
app.post('/nft/:id/buy', auth, buy);

/** 
 * @swagger
 * /sell:
 *   get:
 *     description: Sell Nft
 *     responses:
 *       '200':
 *         description: Nft id 
 *       '401': 
 *         description: Anauthorized
 *       '500'
 *         description: Server error
 */
app.post('/sell', auth, sell);

/** 
 * @swagger
 * /:userId/nfts:
 *   get:
 *     description: Get user nfts by provided userId
 *     responses:
 *       '200':
 *         description: Nft id 
 *       '401': 
 *         description: Anauthorized
 *       '500'
 *         description: Server error
 */
app.get('/:userId/nfts', auth, getNfts);

/** 
 * @swagger
 * /nft/:id/unlist:
 *   delete:
 *     description: Unlist nft from sales list
 *     responses:
 *       '200':
 *         description: Nft id 
 *       '401': 
 *         description: Anauthorized
 *       '500'
 *         description: Server error
 */
app.delete('/nft/:id/unlist', auth, unlist);

module.exports = app; 