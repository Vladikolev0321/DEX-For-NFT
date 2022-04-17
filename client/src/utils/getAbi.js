const fs = require('fs');
const dexContract = JSON.parse(fs.readFileSync('../../../contracts/build/contracts/DEX.json', 'utf8'));
const nftContract = JSON.parse(fs.readFileSync('../../../contracts/build/contracts/NFT.json', 'utf8'));

const dexAbi = JSON.stringify(dexContract.abi);
const nftAbi = JSON.stringify(nftContract.abi);

export default {dexAbi, nftAbi};