/* eslint-disable */
import * as fs from 'fs';
let dexAbi = {};
fs.readFile('../../../contracts/build/contracts/DEX.json', 'utf8', (err, data) => {

    if (err) {
        console.log(`Error reading ABI file from disk: ${err}`);
    } else {
        dexAbi = JSON.parse(data).abi;
    }
});

exports.dexAbi;