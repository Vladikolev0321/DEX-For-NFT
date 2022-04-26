/* eslint-disable */
import * as fs from 'fs';
let nftAbi = {};
fs.readFile('../../../contracts/build/contracts/NFT.json', 'utf8', (err, data) => {

    if (err) {
        console.log(`Error reading ABI file from disk: ${err}`);
    } else {
        nftAbi = JSON.parse(data).abi;
    }
});

exports.nftAbi;