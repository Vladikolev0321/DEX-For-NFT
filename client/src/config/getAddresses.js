/* eslint-disable */
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});
module.exports = {
    marketplaceAddress: process.env.MarketplaceAddress,
    nftAddress: process.env.NftAddress
};