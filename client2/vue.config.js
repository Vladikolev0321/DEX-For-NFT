/* eslint-disable */
const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
const fs = require('fs');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

const dexAbiContent = require('./src/utils/dexAbi.json');
const nftAbiContent = require('./src/utils/nftAbi.json');

let marketplaceAddress = process.env.MarketplaceAddress;
let nftAddress = process.env.NftAddress;

console.log(nftAddress);

let nftAbi = JSON.stringify(...nftAbiContent)

// fs.readFile('../contracts/build/contracts/NFT.json', 'utf8', (err, data) => {
//     if (err) {
//         console.log(`Error reading ABI file from disk: ${err}`);
//     } else {
//         nftAbi = data.abi;
//     }
// });

let dexAbi = [];
dexAbi.push(JSON.stringify(...dexAbiContent));
console.log(dexAbi)
// fs.readFile('../contracts/build/contracts/DEX.json', 'utf8', (err, data) => {

//     if (err) {
//         console.log(`Error reading ABI file from disk: ${err}`);
//     } else {
//         dexAbi = JSON.parse(data).abi;
//         console.log(JSON.parse(data.substring(0, 6000)));
//     }
// });

const addresses = {
    nftAbi: nftAbi,
    dexAbi: dexAbi,
    marketplaceAddress: {
      'address': marketplaceAddress.toString()
    },
    nftAddress: {
      'address': nftAddress.toString()
    }
}

console.log(addresses)

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin(),
      new webpack.DefinePlugin({
        'addresses': addresses,
      })
    ]
  },
})