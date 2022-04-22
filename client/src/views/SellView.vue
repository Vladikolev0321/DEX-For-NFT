<template>
    <UploadComponent @export-data="getData" :message="'Upload'"/>
</template>

<script>
import UploadComponent from '../components/UploadNft.vue';
import dexAbi from '../utils/dexAbi.json';
import nftAbi from '../utils/nftAbi.json';
const Web3 = require("web3");
const ethers = require('ethers');
export default {
    components: {
        UploadComponent
    },
    methods: {
        async getData(formData) {
            await this.setUpNft(formData);
        },
        async setUpNft(formData) {
            let web3 = new Web3(window.ethereum);
            let marketplace = new web3.eth.Contract(dexAbi, "0x8Ac556773AEAE39D29E618B9Dc9C9b3b04d27451");
            let nft = new web3.eth.Contract(nftAbi, "0xb904A7D08a6C3Ba86Fa4860e86F698aC6fdf3396");
            
            // get current account
            let accounts = await web3.eth.getAccounts();
            // get tokenId of new nft 
            const id = await formData.tokenId;
            // approve marketplace to spend nft
            // VERY SUSPICIOUS
            await nft.methods.setApprovalForAll("0x8Ac556773AEAE39D29E618B9Dc9C9b3b04d27451", true).send({from: accounts[0]});
            // add nft to marketplace
            const listingPrice = ethers.utils.parseEther(formData.price.toString());
            await marketplace.methods.listToken("0xb904A7D08a6C3Ba86Fa4860e86F698aC6fdf3396", id, listingPrice).send({from: accounts[0]});
        }
    }
}
</script>