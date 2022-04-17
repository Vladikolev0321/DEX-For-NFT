const NFT = artifacts.require('NFT');
const DEX = artifacts.require('DEX');

module.exports = function (deployer) {
	deployer.deploy(NFT);
	deployer.deploy(DEX);
};