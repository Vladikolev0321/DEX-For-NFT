const net = require('net');
const Web3 = require('web3');
const web3 = new Web3('/home/petar/.ethereum/geth.ipc', net);

const getBlockData = async(number) => {
    let result = await web3.eth.getBlock(number);
    return result;
};

const getBlockTransactionsCount = async(hash) => {
    var count = await web3.eth.getBlockTransactionCount(hash);
    return count;
};

const getTransaction = async(hash) => {
    var transaction = await web3.eth.getTransaction(hash);
    return transaction;
};

const getBlockNumber = async() => {
    var number = await web3.eth.blockNumber;
    return number;
};


module.exports = {
    getBlockData,
    getBlockNumber,
    getBlockTransactionsCount,
    getTransaction
}