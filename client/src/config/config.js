/* eslint-disable */
const nftAbi = require('./getNftAbi.js');
const dexAbi = require('./getDexAbi.js');
const { marketplaceAddress, nftAddress } = require('./getAddresses.js');
module.exports = {
    nftAbi: nftAbi,
    dexAbi: dexAbi,
    marketplaceAddress: marketplaceAddress,
    nftAddress: nftAddress
}