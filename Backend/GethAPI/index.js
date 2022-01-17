const {
    getBlockData,
    getBlockNumber,
    getBlockTransactionsCount,
    getTransaction
} = require("./gethapi.js")
const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());
app.listen(PORT);


app.get('/getBlockNumber', async(req, res) => {
    let blockNumber = await getBlockNumber();
    if (blockNumber) {
        res.status(201).send({
            text: `Block Number: ${blockNumber}`
        });
    } else {
        res.sendStatus(404);
    }

});

app.post('/getBlockTransactionsCount', async(req, res) => {
    const { hash } = req.body;
    let blockTransactionsCount = await getBlockTransactionsCount(hash);
    if (blockTransactionsCount) {
        res.status(201).send({
            text: `Transactions count: ${blockTransactionsCount}`
        });
    } else {
        res.sendStatus(404);
    }
});

app.post('/getTransaction', async(req, res) => {
    const { hash } = req.body;
    let transaction = await getTransaction(hash);
    if (transaction) {
        res.status(201).send({
            text: `Transaction: ${transaction}`
        });
    } else {
        res.sendStatus(404);
    }
});

app.post('/getBlockData', async(req, res) => {
    const { number } = req.body;
    let blockData = await getBlockData(number);
    if (blockData) {
        res.status(201).send({
            text: `Block Data: ${JSON.stringify(blockData)}`
        });
    } else {
        res.sendStatus(404);
    }
});